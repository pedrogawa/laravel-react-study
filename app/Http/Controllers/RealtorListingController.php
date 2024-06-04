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
            'listings' =>  Auth::user()->listings()->filter($filters)->paginate(5)->withQueryString(),
            'filters' => $filters
        ]);
    }

    public function destroy(Listing $listing)
    {
        Gate::authorize('update', $listing);

        $listing->deleteOrFail();

        return redirect()->back()->with('success', 'Listing was deleted!');
    }
}
