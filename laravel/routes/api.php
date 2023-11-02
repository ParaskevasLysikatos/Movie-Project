<?php

use App\Http\Controllers\CollectionController;
use App\Http\Controllers\MovieController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!

http://localhost/Movie-Project/laravel/public/api/

*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::post('/saveMovie', [MovieController::class, 'save']);

Route::post('/saveCollection', [CollectionController::class, 'save']);

Route::get('/getOne/{id}', [CollectionController::class, 'getOne']);

Route::delete('/delete/{id}', [CollectionController::class, 'delete']);

Route::get('/getAll', [CollectionController::class, 'getAll']);

Route::post('/addMovie', [CollectionController::class, 'addMovie']);

Route::post('/removeMovie', [CollectionController::class,'removeMovie']);

