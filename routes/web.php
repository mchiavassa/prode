<?php

use App\Http\Controllers\ForecastController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\GameSetController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PartyController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\UserController;
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

Route::get('locale/{locale}', [LocaleController::class, 'switchLocale'])->name('locale.switch');

Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('logout', [LoginController::class, 'logout'])->name('logout');;
Route::any('login/{provider}', [LoginController::class, 'redirectToProvider'])->name('login.external');
Route::get('login/{provider}/callback', [LoginController::class, 'handleProviderCallback']);

Route::get('/delete', [UserController::class, 'showDelete'])->name('delete.show');
Route::post('/delete', [UserController::class, 'delete'])->name('delete');

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/rules', [HomeController::class, 'rules'])->name('rules');

Route::get('/stats', [StatsController::class, 'index'])->name('stats');
Route::get('/me/stats', [StatsController::class, 'mine'])->name('stats.mine');

Route::get('/parties', [PartyController::class, 'index'])->name('party');
Route::get('/parties/list/others', [PartyController::class, 'listOthers'])->name('party.list.others');
Route::get('/parties/list/mine', [PartyController::class, 'listMine'])->name('party.list.mine');
Route::get('/parties/{id}', [PartyController::class, 'details'])->where('id', '[0-9]+')->name('party.details');
Route::patch('/parties/{id}', [PartyController::class, 'updateDescription'])->where('id', '[0-9]+')->name('party.description');
Route::get('/parties/create', [PartyController::class, 'showCreate'])->name('party.create.show');
Route::post('/parties/create', [PartyController::class, 'create'])->name('party.create');

Route::get('/parties/{id}/joinRequests', [PartyController::class, 'joinRequestList'])->where('id', '[0-9]+')->name('party.joinRequest.list');
Route::get('/parties/{id}/ranking', [PartyController::class, 'partyRanking'])->where('id', '[0-9]+')->name('party.ranking');
Route::get('/parties/{partyId}/games/{gameId}/forecasts', [PartyController::class, 'gameForecastsOfPartyUsers'])->where('partyId', '[0-9]+')->where('gameId', '[0-9]+')->name('party.game.forecasts');
Route::post('/parties/{id}/joinRequests', [PartyController::class, 'requestJoin'])->where('id', '[0-9]+')->name('party.requestJoin');
Route::post('/parties/{partyId}/joinRequests/{joinRequestId}', [PartyController::class, 'replyJoinRequest'])->where('partyId', '[0-9]+')->where('joinRequestId', '[0-9]+')->name('party.joinRequest.reply');
Route::post('/parties/{partyId}/users/{userId}', [PartyController::class, 'makeAdmin'])->where('partyId', '[0-9]+')->where('userId', '[0-9]+')->name('party.user.makeAdmin');
Route::post('/parties/{partyId}/users/{userId}/remove', [PartyController::class, 'removeUser'])->where('partyId', '[0-9]+')->where('id', '[0-9]+')->name('party.user.remove');

Route::get('/sets', [GameSetController::class, 'index'])->name('set');
Route::get('/sets/list', [GameSetController::class, 'list'])->name('set.list');
Route::get('/sets/{id}/forecasts', [ForecastController::class, 'showGameSetGamesForecasts'])->where('id', '[0-9]+')->name('forecast.set');

Route::get('/games/forecast/next', [ForecastController::class, 'nextGamesForecast'])->name('forecast.next');
Route::get('/games/{id}/forecasts', [GameController::class, 'forecasts'])->where('id', '[0-9]+')->name('game.forecasts');

Route::post('/games/{gameId}/forecast', [ForecastController::class, 'forecastGame'])->where('gameId', '[0-9]+')->name('forecast.game');
Route::put('/games/{gameId}/forecast/{forecastId}', [ForecastController::class, 'updateForecastGame'])->where('gameId', '[0-9]+')->where('forecastId', '[0-9]+')->name('forecast.game.update');


/*
| Admin Routes
*/
Route::middleware(['auth.admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('user');

    Route::get('/admin/stats', [StatsController::class, 'admin'])->name('stats.admin');

    Route::get('/admin/sets', [GameSetController::class, 'indexAdmin'])->name('set.admin');
    Route::get('/admin/sets/list', [GameSetController::class, 'listAdmin'])->name('set.list.admin');
    Route::get('/admin/sets/create', [GameSetController::class, 'showCreate'])->name('set.create.show');
    Route::get('/admin/sets/{id}', [GameSetController::class, 'showDetails'])->where('id', '[0-9]+')->name('set.details');
    Route::post('/admin/sets/create', [GameSetController::class, 'create'])->name('set.create');
    Route::get('/admin/sets/{id}/enable', [GameSetController::class, 'enable'])->where('id', '[0-9]+')->name('set.enable');
    Route::get('/admin/sets/{id}/finish', [GameSetController::class, 'finish'])->where('id', '[0-9]+')->name('set.finish');

    Route::get('/admin/sets/{id}/games/list', [GameController::class, 'listAdmin'])->where('id', '[0-9]+')->name('game.list.admin');;
    Route::get('/admin/sets/{id}/games/create', [GameController::class, 'showCreate'])->where('id', '[0-9]+')->name('game.create.show');
    Route::post('/admin/sets/{id}/games/create', [GameController::class, 'create'])->where('id', '[0-9]+')->name('game.create');

    Route::post('/admin/games/{id}/compute', [GameController::class, 'compute'])->where('id', '[0-9]+')->name('game.compute');
    Route::post('/admin/games/{id}/revert', [GameController::class, 'revertComputed'])->where('id', '[0-9]+')->name('game.revert');
    Route::get('/admin/games/{id}', [GameController::class, 'showResultSet'])->where('id', '[0-9]+')->name('game.result.show');
    Route::post('/admin/games/{id}', [GameController::class, 'setResult'])->where('id', '[0-9]+')->name('game.result');
});
