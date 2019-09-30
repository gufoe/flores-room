<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api')->except([
            // 'list',
        ]);
    }

    public function create() {

        \DB::beginTransaction();

        $data = [
            'place_id' => request('place_id'),
            'price' => request('total'),
            'guest_number' => request('guest_number'),
            'code' => mb_strtoupper(str_random(6)),
            'check_in' => request('check_in'),
            'check_out' => request('check_out'),
            'is_paid' => 1,
        ];


        // TODO: validate
        validate($data, [
            'place_id' => 'required|in:'.\App\Place::ready()->pluck('id')->join(','),
            'price' => 'required|numeric|min:0',
            'check_in' => 'required|date',
            'check_out' => 'required|date',
        ]);

        $dates = dates_to_array($data['check_in'], $data['check_out']);
        if (!$dates || $data['check_in'] < to_date('now')) {
            abort(400, 'Invalid dates');
        }
        $b = user()->bookings()->create($data);

        foreach (request('bookings') as $rid => $orders) {
            $room = $b->place->rooms()
                ->select()
                ->addAvailability($dates)
                ->findOrFail($rid);
            $data = [
                'room_id' => $room->id,
                'price' => 0,
                'b1_count' => 0,
                'b2_count' => 0,
            ];
            foreach ($orders as $type => $count) {
                if (!preg_int($count) || !$count) continue;
                if ($type == 'room') {
                    if ($room->is_dorm) abort(400, "Cannot make this kind of booking - $type");
                    $data["b1_count"] = (int) $room->b1_count;
                    $data["b2_count"] = (int) $room->b2_count;
                    $data['price'] = $room->price;
                } else {
                    if (!$room->is_dorm) abort(400, "Cannot make this kind of booking - $type");
                    if ($room->{"av_b{$type}"} < $count) {
                        abort(400, 'Somebody booked already, please refresh');
                    }
                    $data["b{$type}_count"] = (int) $count;
                    $data["b{$type}_price"] = $room->{"b{$type}_price"};
                    $data['price']+= $data["b{$type}_count"] * $data["b{$type}_price"];
                }
            }

            if (!$data['price']) continue;

            $b->units()->create($data);
        }

        if ($b->calcTotal() != $b->price) {
            abort(400, 'The price has changed and thus the booking has not been made. Please refresh the page.');
        }

        \DB::commit();

        return $b;
    }

    public function listUser() {
        return user()->bookings()
            ->with('place')
            ->with('units.room')
            ->orderBy('check_in', 'desc')
            ->get();
    }
}
