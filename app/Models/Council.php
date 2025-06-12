<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Council extends Model
{
  use HasFactory;

  protected $fillable = [
    'title',
    'user_id',
    'order',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
