<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class News extends Model
{
  use HasFactory;
  use Auditable;

  protected $fillable = [
    'title',
    'alternate_title',
    'document_name',
    'status_id',
    'user_id',
  ];

  public function getAuditLabel()
  {
    return $this->alternate_title;
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function status(): BelongsTo
  {
    return $this->belongsTo(Status::class);
  }
}
