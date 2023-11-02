<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

   /**
     * The colletions that have movies.
     */
    public function collections(): BelongsToMany
    {
        return $this->belongsToMany(MovieCollection::class,'movie_pivot_collections', 'movie_id','collection_id');
    }
}
