<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
  use HasFactory;

  protected $fillable = [
    'name',
    'role_level',
    'description',
  ];

  public function roles()
  {
    return $this->belongsToMany(User::class, 'user_role');
  }
}
