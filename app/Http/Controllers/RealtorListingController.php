<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class RealtorListingController extends Controller
{
    public function index(Request $request) {
        $filters = [
            'deleted' => $request->boolean('deleted'),
            ...$request->only(['by', 'order'])
        ];
        return inertia('Realtor/Index', [
            'listings' =>  Auth::user()->listings()->filter($filters)->withCount('images')->withCount('offers')->paginate(5)->withQueryString(),
            'filters' => $filters
        ]);
    }

    public function show(Listing $listing) {
        return inertia('Realtor/Show', [
            'listing' => $listing->load('offers', 'offers.bidder')
        ]);
    }

    public function destroy(Listing $listing)
    {
        Gate::authorize('update', $listing);

        $listing->deleteOrFail();

        return redirect()->back()->with('success', 'Listing was deleted!');
    }

    public function edit(Listing $listing)
    {
        Gate::authorize('update', $listing);

        return inertia('Realtor/Edit', [
            'listing' => $listing
        ]);
    }

    public function update(Request $request, Listing $listing)
    {
        $listing->update(
            $request->validate([
                'beds' => 'required|integer|min:1',
                'baths' => 'required|integer|min:1',
                'area' => 'required|integer|min:15',
                'city' => 'required',
                'code' => 'required',
                'street' => 'required',
                'street_nr' => 'required|min:1',
                'price' => 'required|integer|min:10000'
    
            ])
        );
        
        return redirect()->route('realtor.listing.index')->with('success', 'Listing was changed!');
    }

    public function create()
    {
        Gate::authorize('create', Listing::class);
        return inertia('Realtor/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->user()->listings()->create(
            $request->validate([
                'beds' => 'required|integer|min:1',
                'baths' => 'required|integer|min:1',
                'area' => 'required|integer|min:15',
                'city' => 'required',
                'code' => 'required',
                'street' => 'required',
                'street_nr' => 'required|min:1',
                'price' => 'required|integer|min:10000'
            ])
        );

        return redirect('/listing')->with('success', 'Listing was created!');
    }

    public function restore(Listing $listing) {
        $listing->restore();

        return redirect()->back()->with('success', 'Listing was restored!');
    }
}
