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
          'id' =>'required|integer',
          'title' => 'required',
          'poster_path' =>'required',
          'vote_average' =>'required',
          'overview' =>'required',
          'budget' =>'required',
          'release_date' =>'required',
          'revenue' =>'required',
          'vote_count' =>'required',
        ]);



        if(Movie::where('id', $request->input('id'))->doesntExist()){
            $movie=Movie::create([
                'id' => $request->input('id'),
                'title' => $request->input('title'),
                'poster_path' => $request->input('poster_path'),
                'vote_average' => $request->input('vote_average'),
                'overview' => $request->input('overview'),
                'budget' => $request->input('budget'),
              'release_date' => $request->input('release_date'),

             'revenue' => $request->input('revenue'),
               'vote_count' => $request->input('vote_count'),
            ]);
        }

        return response()->json(['message' => 'Movie saved successfully.', 'data' => $movie]);
    }
}
