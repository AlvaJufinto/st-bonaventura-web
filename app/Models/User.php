<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'username',
    'name',
    'email',
    'password',
    'role_id',
    'organization_id',
    'profile_picture',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
    'password' => 'hashed',
  ];

  public function articles()
  {
    return $this->hasMany(Article::class);
  }

  public function role()
  {
    return $this->belongsTo(Role::class, 'role_id');
  }

  public function status()
  {
    return $this->belongsTo(Status::class, 'status_id');
  }


  public function organization()
  {
    return $this->hasOne(Organization::class, 'head_id');
  }
}
