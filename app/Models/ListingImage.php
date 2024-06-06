<?php

namespace App\Models;

use App\Models\Listing;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ListingImage extends Model
{
    use HasFactory;

    protected $fillable = ['filename'];

    public function listing(): BelongsTo  {
        return $this->belongsTo(Listing::class);
    }
}
