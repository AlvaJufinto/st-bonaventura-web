<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
  use HasFactory;

  protected $fillable = [
    'name',
    'alternate_name',
    'description',
    'organization_type_id',
    'status_id',
    'head_id',
    'slug',
    'parent_id',
    'address',
    'image_name'
  ];

  protected static function booted()
  {
    static::creating(function ($model) {
      $model->slug = \Illuminate\Support\Str::slug($model->name);
    });
  }

  public function type()
  {
    return $this->belongsTo(OrganizationType::class, 'organization_type_id');
  }

  public function status()
  {
    return $this->belongsTo(Status::class);
  }

  public function head()
  {
    return $this->belongsTo(User::class, 'head_id');
  }

  public function parent()
  {
    return $this->belongsTo(Organization::class, 'parent_id');
  }

  public function children()
  {
    return $this->hasMany(Organization::class, 'parent_id');
  }
}
