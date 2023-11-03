<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('title');

            $table->string('poster_path');
            $table->float('vote_average', 8, 2);

            $table->text('overview');
            $table->string('budget')->nullable();

            $table->string('release_date');
            $table->string('revenue')->nullable();

            $table->integer('vote_count');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
