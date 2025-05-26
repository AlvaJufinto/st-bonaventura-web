<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::create('organizations', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('alternate_name')->nullable();
      $table->text('description')->nullable();
      $table->string('slug');

      $table->foreignId('organization_type_id')->constrained()->onDelete('cascade');
      $table->foreignId('status_id')->default(3)->constrained()->onDelete('cascade');
      $table->foreignId('head_id')->nullable()->constrained('users')->onDelete('set null');
      $table->foreignId('parent_id')->nullable()->constrained('organizations')->onDelete('cascade');

      $table->text('address')->nullable();
      $table->text('image_name')->nullable();

      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('organizations');
  }
};
