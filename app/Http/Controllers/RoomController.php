<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Place;

class RoomController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }

    public function save() {
        $data = [
            'name' => request('name'),
            'count' => (int) request('count') ?: 1,
            'is_dorm' => !! request('is_dorm'),
            'is_female_only' => !! request('is_female_only'),
            'perks' => (array) request('perks'),
            'shape' => array_filter((array) request('shape')),
        ];

        validate($data, [
            'name' => 'required|string',
            'is_dorm' => 'required|boolean',
            'perks' => 'array',
            'perks.*' => 'required|string',
            'shape' => 'array|min:1',
            'shape.*' => 'required|int|min:1',
        ]);

        $data['b1_count'] = (int) @$data['shape']['single'] + ((int) @$data['shape']['single-bunk']) * 2;
        $data['b2_count'] = (int) @$data['shape']['double'] + ((int) @$data['shape']['double-bunk']) * 2;

        if ($data['is_dorm']) {
            $data['price'] = null;
            $data['b1_price'] = (int) request('b1_price');
            $data['b2_price'] = (int) request('b2_price');
        } else {
            $data['price'] = (int) request('price');
            $data['b1_price'] = null;
            $data['b2_price'] = null;
        }

        $x = null;
        if ($id = request('id')) {
            $x = \App\Room::safeWrite()->findOrFail($id);
            $x->update($data);
        } else {
            $x = \App\Place::safeWrite()->findOrFail(request('place_id'))->rooms()->create($data);
        }
        return $x;
    }

    public function list($id = null) {
        $q = Place::with('rooms');

        if (request('with_bookings')) {
            $user_places = user()->places()->pluck('id')->all();
            $q->with(['bookings' => function($q) use ($user_places) {
                $q->whereIn('place_id', $user_places);
            }]);
        }

        if ($id) {
            if (is_numeric($id)) $q->where('id', $id);
            else $q->where('slug', $id);
            return $q->firstOrFail();
        } else {
            return $q->get();
        }
    }
}
