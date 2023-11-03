<?php

namespace App\Http\Controllers;

use App\Http\Resources\CollectionResource;
use App\Models\Movie;
use App\Models\MovieCollection;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CollectionController extends Controller
{
    use HttpResponses;


    public function save(Request $request){

        $request->validate([
              'title' => 'required|unique:movie_collections,title',
          ]);

          if(MovieCollection::where('title', $request->input('title'))->doesntExist()){
              $collection=MovieCollection::create([
                  'title' => $request->input('title'),
                  'description' => $request->input('description')
              ]);
          }

          return response()->json(['message' => 'Collection saved successfully.', 'data' => $collection]);
      }


      public function getOne(Request $request,string $id){

        $collection=MovieCollection::find($id);

        if(!$collection){
            return response()->json(['message' => 'Collection not found.'], 404);
        }

        return response()->json(['data' => new CollectionResource($collection)]);

      }

      public function delete(Request $request, string $id){

        $collection=MovieCollection::find($id);

        if(!$collection){
            return response()->json(['message' => 'Collection not found.'], 404);
        }

        $collection->delete();

        return response()->json(['message' => 'Collection deleted successfully.', 'data' => '']);

      }


      public function getAll(Request $request){
        return CollectionResource::collection(MovieCollection::all());
      }


      public function addMovie(Request $request){
        $request->validate([
          'collection_id' =>'required',
          'movie' =>'required',
        ]);

        // return response()->json(['message'=>'ok']);


        $check=DB::table('movie_pivot_collections')->
        where('collection_id', $request->input('collection_id'))->
        where('movie_id', $request->input('movie.id'))->doesntExist();

        if(!$check){
            return response()->json(['message' => 'Movie exists in the collection.'], 404);
        }

        //save movie
        $request->validate([
            'movie.id' =>'required|integer',
            'movie.title' => 'required',
            'movie.poster_path' =>'required',
            'movie.vote_average' =>'required',
            'movie.overview' =>'required',
          //  'budget' =>'required',
            'movie.release_date' =>'required',
           // 'revenue' =>'required',
            'movie.vote_count' =>'required',
          ]);


          if(Movie::where('id', $request->input('movie.id'))->doesntExist()){
              $movie=Movie::create([
                  'id' => $request->input('movie.id'),
                  'title' => $request->input('movie.title'),
                  'poster_path' => $request->input('movie.poster_path'),

                  'vote_average' => $request->input('movie.vote_average'),
                  'overview' => $request->input('movie.overview'),

                  'budget' => $request->input('movie.budget') ?? null,
                  'release_date' => $request->input('movie.release_date'),

                  'revenue' => $request->input('movie.revenue') ?? null,
                  'vote_count' => $request->input('movie.vote_count'),
              ]);
          }

         //end---save movie

        DB::table('movie_pivot_collections')->insert([
            'collection_id' => $request->input('collection_id'),
          'movie_id' => $request->input('movie.id')
        ]);

        return response()->json(['message' => 'Movie added to collection successfully.', 'data' => '']) ;

      }

      public function removeMovie(Request $request){
        $request->validate([
            'collection_id' =>'required',
            'movie' =>'required',
          ]);

          $check=DB::table('movie_pivot_collections')->
          where('collection_id', $request->input('collection_id'))->
          where('movie_id', $request->input('movie.id'))->exists();

          if(!$check){
            return response()->json(['message' => 'Movie does not exist in the collection.'], 404);
        }

        DB::table('movie_pivot_collections')
        ->where('collection_id', $request->input('collection_id'))
        ->where('movie_id', $request->input('movie.id'))
        ->delete();

        return response()->json(['message' => 'Movie removed from collection successfully.', 'data' => '']);
      }

}

