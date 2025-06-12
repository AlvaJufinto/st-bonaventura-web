<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Article extends Model
{
  use HasFactory;

  protected $fillable = [
    'main_image_name',
    'title',
    'slug',

    'preview',
    'published_date',
    'content',
    'expired_date',

    'publisher_id',
    'user_id',
    'status_id',
    'article_type_id'
  ];

  protected static function booted()
  {
    static::creating(function ($model) {
      $model->slug = \Illuminate\Support\Str::slug($model->title);
    });
  }

  public function user(): BelongsTo
  {
    // User::class -> '\App\Models\User'
    return $this->belongsTo(User::class);
  }

  public function status(): BelongsTo
  {
    return $this->belongsTo(Status::class);
  }

  public function publisher(): BelongsTo
  {
    return $this->belongsTo(Organization::class);
  }

  public function articleType(): BelongsTo
  {
    return $this->belongsTo(ArticleType::class);
  }
}
