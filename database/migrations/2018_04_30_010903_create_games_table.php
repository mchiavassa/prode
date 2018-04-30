<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('set_id');

            $table->string('home', 50);
            $table->string('away', 50);
            $table->string('home_score', 50)->nullable();
            $table->string('away_score', 50)->nullable();
            $table->string('home_tie_break_score', 50)->nullable();
            $table->string('away_tie_break_score', 50)->nullable();

            $table->timestamps();

            $table->foreign('set_id')->references('id')->on('game_sets');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('games');
    }
}
