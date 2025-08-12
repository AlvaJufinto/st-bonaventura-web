<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
  protected $fillable = ['user_id', 'action', 'data', 'user_agent', 'ip_address'];

  protected $casts = [
    'data' => 'array',
  ];

  public function auditable()
  {
    return $this->morphTo();
  }

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
