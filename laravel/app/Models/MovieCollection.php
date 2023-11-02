<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class MovieCollection extends Model
{
    use HasFactory;

    protected $fillable = ['title'];

     /**
     * The movies that belong to the collection.
     */
    public function movies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class,'movie_pivot_collections', 'collection_id','movie_id');
    }
}
