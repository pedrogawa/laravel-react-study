<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class RealtorListingAcceptOfferController extends Controller
{
    public function __invoke(Offer $offer) {
        $listing = $offer->listing;
        Gate::authorize('update', Listing::class);


        $offer->update(['accepted_at' => now()]);

        $listing->sold_at = now();
        $listing->save();

        $listing->offers()->except($offer)->update(['rejected_at' => now()]);

        return redirect()->back()->with(
            'success', "Offer #{$offer->id} accepted, other offers rejected"
        );
    }
    }
