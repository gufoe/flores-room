<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except([
            'login',
        ]);
    }
    public function login() {
        try {
            $user = \App\User::loginOrSignup(request('driver'), request('id'), request('token'));
            login($user);
        } catch (\Exception $e) {
            abort(400, $e->getMessage());
        }

        return [
            'user' => $this->me($user->id),
            'token' => $user->createSession()->token,
        ];
    }

    public function logout() {
        user()->current_session->delete();
    }


    public function me(int $uid = null) {
        $u = $uid ? \App\User::find($uid) : user();
        if (!$u) return null;
        $u->places = $u->places()->with('rooms')->get();
        return $u;
    }

    public function list() {
        if (!user()->is_admin) abort(403);
        return \App\User::orderBy('created_at', 'asc')->get();
    }
}
