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

Route::get('/', 'HomeController@index')->name('home');

Route::get('/parties', 'PartyController@index')->name('party');
Route::get('/parties/list', 'PartyController@list')->name('party.list');
Route::get('/parties/{id}', 'PartyController@details')->where('id', '[0-9]+')->name('party.details');

Route::get('/sets', 'GameSetController@index')->name('set')->middleware('auth.admin');
Route::get('/sets/create', 'GameSetController@showCreate')->name('set.create.show')->middleware('auth.admin');
Route::get('/sets/{id}', 'GameSetController@showDetails')->where('id', '[0-9]+')->name('set.details')->middleware('auth.admin');
Route::post('/sets/create', 'GameSetController@create')->name('set.create')->middleware('auth.admin');

Route::get('/sets/list', 'GameSetController@list')->name('set.list');

Route::get('/sets/{id}/games/create', 'GameController@showCreate')->where('id', '[0-9]+')->name('game.create.show')->middleware('auth.admin');
Route::post('/sets/{id}/games/create', 'GameController@create')->where('id', '[0-9]+')->name('game.create')->middleware('auth.admin');

Route::get('/sets/{id}/games/list', 'GameController@list')->where('id', '[0-9]+')->name('game.list');
