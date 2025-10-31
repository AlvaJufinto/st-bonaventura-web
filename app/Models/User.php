<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
	use HasApiTokens, HasFactory, Notifiable;
	use Auditable;

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
		'status_id',
		// 'organization_id',
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

	public function assignedOrganizations()
	{
		return $this->belongsToMany(Organization::class)
			->withPivot('role')
			->withTimestamps();
	}

	public function getAuditLabel()
	{
		return $this->name;
	}

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


	public function organizations()
	{
		return $this->hasMany(Organization::class, 'head_id');
	}
}