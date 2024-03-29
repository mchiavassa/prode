<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTempTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_temp_tokens', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('user_id');
            $table->string('token_type', 100);
            $table->string('token');
            $table->timestamp('created_at');

            $table->foreign('user_id')->references('id')->on('users');
            $table->unique(['user_id', 'token_type']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_logins');
    }
}
