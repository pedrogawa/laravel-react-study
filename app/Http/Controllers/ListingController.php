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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Listing::class);
        return inertia('Listing/Create');
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

    /**
     * Display the specified resource.
     */
    public function show(Listing $listing)
    {

        Gate::authorize('view', $listing);

        return inertia('Listing/Show',
        [
            'listing' => $listing
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Listing $listing)
    {
        Gate::authorize('update', $listing);

        return inertia('Listing/Edit', [
            'listing' => $listing
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
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
        
        return redirect('/listing')->with('success', 'Listing was changed!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Listing $listing)
    {
        Gate::authorize('update', $listing);

        $listing->delete();

        return redirect()->back()->with('success', 'Listing was deleted!');
    }
}
