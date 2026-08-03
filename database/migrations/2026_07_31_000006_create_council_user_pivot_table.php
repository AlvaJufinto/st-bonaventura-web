<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('council_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('council_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('period_id')->constrained('periods')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['council_id', 'user_id', 'period_id'], 'council_user_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('council_user');
    }
};
