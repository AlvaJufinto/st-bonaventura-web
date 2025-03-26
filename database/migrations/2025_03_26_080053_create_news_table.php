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
    Schema::create('news', function (Blueprint $table) {
      $table->id();
      $table->string('title')->default('Warta Minggu Paroki Pulomas');
      $table->string('alternate_title');
      $table->string('document_name');
      $table->foreignId('user_id')->constrained();
      $table->foreignId('status_id')->constrained();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('news');
  }
};
