<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('login', 'LoginController@showLoginForm')->name('login');
Route::post('logout', 'LoginController@logout')->name('logout');;
Route::get('login/{provider}', 'LoginController@redirectToProvider')->name('login.external');
Route::get('login/{provider}/callback', 'LoginController@handleProviderCallback');

Route::get('/', 'HomeController@index');

Route::get('/parties', 'PartyController@index')->name('party');
Route::get('/parties/list', 'PartyController@list')->name('party.list');
Route::get('/parties/{id}', 'PartyController@details')->where('id', '[0-9]+')->name('party.details');

