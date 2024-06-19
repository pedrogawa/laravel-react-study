<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Models\Listing;
use Illuminate\Http\Request;
use App\Notifications\OfferMade;
use Illuminate\Support\Facades\Gate;

class ListingOfferController extends Controller
{
    public function store(Listing $listing, Request $request) {
        Gate::authorize('view', $listing);

        $offer = $listing->offers()->save(
            Offer::make(
                $request->validate([
                    'amount' => 'required|integer|min:1'
                ])
            )->bidder()->associate($request->user())
        );

        $listing->owner->notify(
            new OfferMade($offer)
        );

        return redirect()->back()->with(
            'success', 'Offer was made!'
        );
    }
}
