<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Place;

class PlaceController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api')->except([
            'list',
        ]);
    }

    public function save() {
        $data = request([
            'name',
            'slug',
            'type',
            'perks',
            'pics',
            'loc_city',
            'loc_addr',
            'loc_lat',
            'loc_lon',
        ]);
        validate($data, [
            'name' => 'required|string',
            'slug' => 'sometimes|string|unique:places,slug,'.request('id'),
            'type' => 'required|string',
            'perks' => 'array',
            'perks.*' => 'required|string',
            'pics' => 'array',
            'pics.*' => 'required|string',
        ]);

        if (!@$data['slug']) {
            $data['slug'] = gen_slug(Place::class, @$data['name']);
        }

        $x = null;
        if ($id = request('id')) {
            $x = user()->places()->findOrFail($id);
            $x->update($data);
        } else {
            $data['is_verified'] = false;
            $data['is_active'] = false;
            $x = user()->places()->create($data);
        }
        return $this->list($x->id);
    }

    public function list($id = null) {
        $q = Place::select();

        if ($av = request('availability')) {
            if (   !is_date($av['check_in'])
                || !is_date($av['check_out'])
                || $av['check_in'] < to_date('now')
                || $av['check_out'] <= $av['check_in']) {
                abort(400, 'Invalid dates');
            }
            if ((int) $av['n'] <= 0) {
                abort(400, 'Invalid number of people');
            }

            $dates = dates_to_array($av['check_in'], $av['check_out']);

            $q->with(['rooms' => function($q) use ($dates) {
                $q->select();
                $q->addAvailability($dates);
            }]);
        } else {
            $q->with('rooms');
        }

        if (request('with_bookings')) {
            $user_places = user()->places()->pluck('id')->all();
            $q->with(['bookings' => function($q) use ($user_places) {
                $q->whereIn('place_id', $user_places);
            }]);
        }

        if ($loc = request('distance_from')) {
            $q->addDistanceFrom($loc['lat'], $loc['lon']);
        }

        if ($order_by = request('order_by')) {
            if (!in_array($order_by, [
                'name', 'distance', 'price'
            ])) abort(400, 'Invalid order_by supplied');
            $q->orderBy($order_by, request('order_by_desc') ? 'desc' : 'asc');
        }

        if ($id) {
            if (is_numeric($id)) $q->where('id', $id);
            else $q->where('slug', $id);
            return $q->firstOrFail();
        } else {
            $res = $q->get();
            if ($av = request('availability')) {
                $res = $res->filter(function($place) use ($av) {
                    return $place->rooms->sum('availability') >= $av['n'];
                });
            }
            return $res->values();
        }
    }
}
