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

Route::get('/delete', 'UserController@showDelete')->name('delete.show');
Route::post('/delete', 'UserController@delete')->name('delete');

Route::get('/', 'HomeController@index')->name('home');
Route::get('/rules', 'HomeController@rules')->name('rules');
Route::get('/stats', 'StatsController@index')->name('stats');
Route::get('/admin/stats', 'StatsController@admin')->name('stats.admin')->middleware('auth.admin');
Route::get('/me/stats', 'StatsController@mine')->name('stats.mine');


Route::get('/parties', 'PartyController@index')->name('party');
Route::get('/parties/list', 'PartyController@list')->name('party.list');
Route::get('/parties/list/mine', 'PartyController@listMine')->name('party.list.mine');
Route::get('/parties/{id}', 'PartyController@details')->where('id', '[0-9]+')->name('party.details');
Route::patch('/parties/{id}', 'PartyController@updateDescription')->where('id', '[0-9]+')->name('party.description');
Route::get('/parties/create', 'PartyController@showCreate')->name('party.create.show');
Route::post('/parties/create', 'PartyController@create')->name('party.create');

Route::get('/parties/{id}/joinRequests', 'PartyController@joinRequestList')->where('id', '[0-9]+')->name('party.joinRequest.list');
Route::get('/parties/{id}/ranking', 'PartyController@partyRanking')->where('id', '[0-9]+')->name('party.ranking');
Route::get('/parties/{partyId}/games/{gameId}/forecasts', 'PartyController@gameForecastsOfPartyUsers')->where('partyId', '[0-9]+')->where('gameId', '[0-9]+')->name('party.game.forecasts');
Route::post('/parties/{id}/joinRequests', 'PartyController@requestJoin')->where('id', '[0-9]+')->name('party.requestJoin');
Route::post('/parties/{partyId}/joinRequests/{joinRequestId}', 'PartyController@replyJoinRequest')->where('partyId', '[0-9]+')->where('joinRequestId', '[0-9]+')->name('party.joinRequest.reply');
Route::post('/parties/{partyId}/users/{userId}', 'PartyController@makeAdmin')->where('partyId', '[0-9]+')->where('userId', '[0-9]+')->name('party.user.makeAdmin');

Route::get('/sets', 'GameSetController@index')->name('set');
Route::get('/sets/list', 'GameSetController@list')->name('set.list');
Route::get('/sets/{id}/forecasts', 'ForecastController@showGameSetGamesForecasts')->where('id', '[0-9]+')->name('forecast.set');

Route::get('/games/forecast/next', 'ForecastController@nextGamesForecast')->name('forecast.next');
Route::get('/games/{id}/audit', 'GameController@audit')->where('id', '[0-9]+')->name('game.audit');

Route::post('/games/{gameId}/forecast', 'ForecastController@forecastGame')->where('gameId', '[0-9]+')->name('forecast.game');
Route::put('/games/{gameId}/forecast/{forecastId}', 'ForecastController@updateForecastGame')->where('gameId', '[0-9]+')->where('forecastId', '[0-9]+')->name('forecast.game.update');


// Admin routes
Route::get('/users', 'UserController@index')->name('user');

Route::get('/admin/sets', 'GameSetController@indexAdmin')->name('set.admin')->middleware('auth.admin');
Route::get('/admin/sets/list', 'GameSetController@listAdmin')->name('set.list.admin')->middleware('auth.admin');
Route::get('/admin/sets/create', 'GameSetController@showCreate')->name('set.create.show')->middleware('auth.admin');
Route::get('/admin/sets/{id}', 'GameSetController@showDetails')->where('id', '[0-9]+')->name('set.details')->middleware('auth.admin');
Route::post('/admin/sets/create', 'GameSetController@create')->name('set.create')->middleware('auth.admin');
Route::get('/admin/sets/{id}/enable', 'GameSetController@enable')->where('id', '[0-9]+')->name('set.enable')->middleware('auth.admin');
Route::get('/admin/sets/{id}/finish', 'GameSetController@finish')->where('id', '[0-9]+')->name('set.finish')->middleware('auth.admin');

Route::get('/admin/sets/{id}/games/list', 'GameController@listAdmin')->where('id', '[0-9]+')->name('game.list.admin');
Route::get('/admin/sets/{id}/games/create', 'GameController@showCreate')->where('id', '[0-9]+')->name('game.create.show')->middleware('auth.admin');
Route::post('/admin/sets/{id}/games/create', 'GameController@create')->where('id', '[0-9]+')->name('game.create')->middleware('auth.admin');

Route::post('/admin/games/{id}/compute', 'GameController@compute')->where('id', '[0-9]+')->name('game.compute')->middleware('auth.admin');
Route::post('/admin/games/{id}/revert', 'GameController@revertComputed')->where('id', '[0-9]+')->name('game.revert')->middleware('auth.admin');
Route::get('/admin/games/{id}', 'GameController@showResultSet')->where('id', '[0-9]+')->name('game.result.show');
Route::post('/admin/games/{id}', 'GameController@setResult')->where('id', '[0-9]+')->name('game.result');
