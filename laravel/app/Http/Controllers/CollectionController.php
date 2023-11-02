<?php

namespace App\Http\Controllers;

use App\Http\Resources\CollectionResource;
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
                  'title' => $request->input('title')
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
          'movie_id' =>'required',
        ]);

        

        $check=DB::table('movie_pivot_collections')->
        where('collection_id', $request->input('collection_id'))->
        where('movie_id', $request->input('movie_id'))->doesntExist();

        if(!$check){
            return response()->json(['message' => 'Movie exists in the collection.'], 404);
        }

        DB::table('movie_pivot_collections')->insert([
            'collection_id' => $request->input('collection_id'),
          'movie_id' => $request->input('movie_id')
        ]);

        return response()->json(['message' => 'Movie added to collection successfully.', 'data' => '']) ;

      }

      public function removeMovie(Request $request){
        $request->validate([
            'collection_id' =>'required',
            'movie_id' =>'required',
          ]);

          $check=DB::table('movie_pivot_collections')->
          where('collection_id', $request->input('collection_id'))->
          where('movie_id', $request->input('movie_id'))->exists();

          if(!$check){
            return response()->json(['message' => 'Movie does not exist in the collection.'], 404);
        }

        DB::table('movie_pivot_collections')
        ->where('collection_id', $request->input('collection_id'))
        ->where('movie_id', $request->input('movie_id'))
        ->delete();

        return response()->json(['message' => 'Movie removed from collection successfully.', 'data' => '']);
      }

}

