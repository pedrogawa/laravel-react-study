<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Listing::class);

        $filters = $request->only([
            'priceFrom', 'priceTo', 'beds', 'baths', 'areaFrom', 'areaTo'
        ]);

        $query = Listing::mostRecent()
            ->filter($filters);

        return inertia('Listing/Index',
        [
            'filters' => $filters,
            'listings' => $query->paginate(10)
                ->withQueryString()
        ]);
    }

    public function show(Listing $listing)
    {

        Gate::authorize('view', $listing);

        return inertia('Listing/Show',
        [
            'listing' => $listing
        ]);
    }
}
