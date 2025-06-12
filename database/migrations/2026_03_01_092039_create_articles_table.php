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
    Schema::create('articles', function (Blueprint $table) {
      $table->id();
      $table->string(column: 'main_image_name')->nullable();

      $table->string('title');
      $table->string('preview');
      $table->string('slug');

      $table->date('published_date');
      $table->longText('content');

      $table->foreignId('publisher_id')->nullable()->constrained('organizations', 'id')->onDelete('cascade');
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->foreignId('status_id')->constrained()->onDelete('cascade');
      $table->foreignId('article_type_id')->constrained()->onDelete('cascade');

      $table->date('expired_date')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('articles');
  }
};
