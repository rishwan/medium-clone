<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/*
 * Topic routes
 */
Route::get('/topics', 'TopicController@index');

/*
 * Article routes
 */
Route::get('/articles/home-hero-features', 'ArticleController@getHeroFeatures');


Route::get('/get_image/{directory}/{filename}','CommonController@getImage');
