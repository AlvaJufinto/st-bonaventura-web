<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
  use HasFactory;
  use Auditable;

  protected $fillable = [
    'name',
    'alternate_name',
    'description',
    'organization_type_id',
    'status_id',
    'head_id',
    'article_type',
    'slug',
    'parent_id',
    'address',
    'image_name'
  ];

  public function getAuditLabel()
  {
    return $this->name;
  }

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

  public function articles()
  {
    return $this->hasMany(Article::class, 'publisher_id');
  }
}
