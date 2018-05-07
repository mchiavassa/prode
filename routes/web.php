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
Route::get('/rules', 'HomeController@rules')->name('rules');
Route::get('/stats', 'HomeController@stats')->name('stats')->middleware('auth.admin');


Route::get('/parties/list', 'PartyController@list')->name('party.list');
Route::get('/parties/{id}', 'PartyController@details')->where('id', '[0-9]+')->name('party.details');

Route::get('/sets/list', 'GameSetController@list')->name('set.list');
Route::get('/sets/{id}/forecasts', 'ForecastController@showGameSetGamesForecasts')->where('id', '[0-9]+')->name('forecast.set');

Route::post('/games/{gameId}/forecast', 'ForecastController@forecastGame')->where('id', '[0-9]+')->name('forecast.game');
Route::put('/games/{gameId}/forecast/{forecastId}', 'ForecastController@updateForecastGame')->where('id', '[0-9]+')->name('forecast.game.update');

// Admin routes
Route::get('/users', 'UserController@index')->name('user');

Route::get('/admin/sets', 'GameSetController@index')->name('set')->middleware('auth.admin');
Route::get('/admin/sets/list', 'GameSetController@listAdmin')->name('set.list.admin')->middleware('auth.admin');
Route::get('/admin/sets/create', 'GameSetController@showCreate')->name('set.create.show')->middleware('auth.admin');
Route::get('/admin/sets/{id}', 'GameSetController@showDetails')->where('id', '[0-9]+')->name('set.details')->middleware('auth.admin');
Route::post('/admin/sets/create', 'GameSetController@create')->name('set.create')->middleware('auth.admin');
Route::get('/admin/sets/{id}/enable', 'GameSetController@enable')->where('id', '[0-9]+')->name('set.enable')->middleware('auth.admin');
Route::get('/admin/sets/{id}/finish', 'GameSetController@finish')->where('id', '[0-9]+')->name('set.finish')->middleware('auth.admin');

Route::get('/admin/sets/{id}/games/list', 'GameController@listAdmin')->where('id', '[0-9]+')->name('game.list.admin');
Route::get('/admin/sets/{id}/games/create', 'GameController@showCreate')->where('id', '[0-9]+')->name('game.create.show')->middleware('auth.admin');
Route::post('/admin/sets/{id}/games/create', 'GameController@create')->where('id', '[0-9]+')->name('game.create')->middleware('auth.admin');

Route::get('/admin/games/{id}/compute', 'GameController@compute')->where('id', '[0-9]+')->name('game.compute')->middleware('auth.admin');
Route::get('/admin/games/{id}', 'GameController@showResultSet')->where('id', '[0-9]+')->name('game.result.show');
Route::post('/admin/games/{id}', 'GameController@setResult')->where('id', '[0-9]+')->name('game.result');
