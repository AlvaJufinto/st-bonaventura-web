<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Article extends Model
{
  use HasFactory;

  protected $fillable = [
    'title',
    'main_image',
    'preview',
    'content',
    'publisher',
    'status_id',
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function status(): BelongsTo
  {
    return $this->belongsTo(Status::class);
  }
}
