<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    use HttpResponses;

    public function save(Request $request){

      $request->validate([
            'name' => 'required|unique:movies,name',
        ]);

        if(Movie::where('name', $request->input('name'))->doesntExist()){
            $movie=Movie::create([
                'name' => $request->input('name')
            ]);
        }

        return response()->json(['message' => 'Movie saved successfully.', 'data' => $movie]);
    }
}
