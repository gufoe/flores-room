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
            $user = \App\User::whereHas('sessions', function ($q) use ($token) {
                $q->where('token', $token)
                ->where(function($q) {
                    $q->whereNull('expires_at')->orWhere('expires_at', '<', to_datetime('now'));
                });
            })->first();

            return $user;
        });
    }
}
