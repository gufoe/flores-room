<?php

namespace App;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable {
    use \Illuminate\Database\Eloquent\SoftDeletes;

    public $guarded = ['id'];
    public $hidden = [
        'auth_token',
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

    public static function loginOrSignup(string $driver, string $id = null, string $token = null) {
        $api_user = \Socialite::driver($driver)->userFromToken($token);

        self::updateOrCreate([
            'auth_driver' => $driver,
            'auth_id' => $api_user->id,
        ], [
            'auth_token' => $token,
            'name' => $api_user->name,
            'pic' => null,
            'referral_code' => str_random(5),
        ]);

        return self::where('auth_id', $api_user->id)->first();
    }

    public function createSession() {
        return $this->sessions()->create([
            'token' => str_random(16),
        ]);
    }
}
