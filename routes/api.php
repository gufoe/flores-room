<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('artisan/{pwd}/{command}', function (Request $request, $pwd, $command) {
    if ($pwd != 'porcoddio') return "Wrong password.";
    \Artisan::call($command);
    return \Artisan::output();
});

Route::post('login', 'UserController@login');
Route::post('logout', 'UserController@logout');
Route::get('user', 'UserController@me');
Route::get('user/bookings', 'BookingController@listUser');
Route::get('users', 'UserController@list');

Route::get('places/{id?}', 'PlaceController@list');
Route::post('places/{id}/toggle-active', 'PlaceController@toggleActive');
Route::post('places/{id}/toggle-verified', 'PlaceController@toggleVerified');
Route::post('places', 'PlaceController@save');
Route::post('rooms', 'RoomController@save');
Route::post('files/image', 'FileController@uploadImage');

Route::post('bookings', 'BookingController@create');
