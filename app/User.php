<?php

namespace App;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable {
    use \Illuminate\Database\Eloquent\SoftDeletes;

    public $current_session = null;
    public $guarded = ['id'];
    public $hidden = [
        'auth_token',
        'current_session',
    ];
    public $casts = [
        'is_admin' => 'boolean',
    ];

    public function sessions() {
        return $this->hasMany(Session::class);
    }

    public function places() {
        return $this->hasMany(Place::class);
    }

    public function bookings() {
        return $this->hasMany(Booking::class);
    }

    public static function loginOrSignup(string $driver, string $id = null, string $token = null) {
        $api_user = \Socialite::driver($driver)->userFromToken($token);

        return self::firstOrCreate([
            'auth_driver' => $driver,
            'auth_id' => $api_user->id,
        ], [
            'auth_token' => '',
            'name' => $api_user->name,
            'pic' => null,
            'referral_code' => str_random(5),
            'is_admin' => false,
        ]);
    }

    public function createSession() {
        $s = $this->sessions()->create([
            'token' => str_random(16),
        ]);
        $s->extendExpiry();
        return $s;
    }

    public function updateLastSeen() {
        $this->update([ 'last_seen' => to_datetime('now') ]);
    }
}
