<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::post('login', 'LoginController@index');
Route::post('register', 'RegisterController@index');
Route::get('customer/{id}', 'RegisterController@customerInfo');
Route::post('order', 'RegisterController@orderCreate');
Route::get('customer/transaction/{id}', 'RegisterController@transaction');
