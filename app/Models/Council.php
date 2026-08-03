<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Council extends Model
{
  use HasFactory;
  use Auditable;

  protected $fillable = [
    'title',
    'user_id',
    'order',
    'period_id',
  ];

  public function getAuditLabel()
  {
    return $this->title;
  }

  public function users()
  {
    return $this->belongsToMany(User::class, 'council_user')
      ->withPivot('period_id')
      ->withTimestamps();
  }
}
