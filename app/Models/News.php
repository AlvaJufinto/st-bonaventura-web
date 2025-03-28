<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class News extends Model
{
  use HasFactory;

  protected $fillable = [
    'title',
    'alternate_title',
    'document_name',
    'status_id',
    'user_id',
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
