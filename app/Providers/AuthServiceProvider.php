<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::viaRequest('auth-token', function ($request) {
            $token = $request->header('Authorization');
            if (!$token) return null;

            $session = \App\Session::whereToken($token)->active()->first();
            if (!$session) return null;

            $user = $session->user;

            $uiv = $request->header('X-uiv');
            if ($session->uiv != $uiv) $session->update([ 'uiv' => $uiv ]);
            if ($user->last_uiv != $uiv) $user->update([ 'last_uiv' => $uiv ]);

            $user->updateLastSeen();
            $user->current_session = $session;
            $session->extendExpiry();

            return $user;
        });
    }
}
