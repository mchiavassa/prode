<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateForecastsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forecasts', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('game_id');
            $table->unsignedInteger('user_id');

            $table->string('home_score', 50)->nullable();
            $table->string('away_score', 50)->nullable();
            $table->string('home_tie_break_score', 50)->nullable();
            $table->string('away_tie_break_score', 50)->nullable();
            $table->integer('points_earned')->nullable();

            $table->timestamps();

            $table->foreign('game_id')->references('id')->on('games');
            $table->foreign('user_id')->references('id')->on('users');

            $table->unique(['game_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forecasts');
    }
}
