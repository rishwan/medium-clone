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
Route::get('/topic/{title}/show', 'TopicController@getTopicDetails');
Route::get('/topic/{title}/featured-article', 'TopicController@getFeaturedArticle');
Route::get('/topic/{title}/articles/index', 'TopicController@getTopicArticles');

/*
 * Article routes
 */
Route::get('/articles/home-hero-features', 'ArticleController@getHeroFeatures');
Route::get('/articles/featured-articles/all', 'TopicController@getFeaturedArticlesByTopic');
Route::get('/article/{id}', 'ArticleController@show');


Route::get('/get_image/{directory}/{filename}','CommonController@getImage');


Route::post('login', [
    'as' => 'login',
    'uses' => 'AuthController@login'
]);
Route::get('logout', 'AuthController@logout');
Route::post('refresh', 'AuthController@refresh');
Route::post('me', 'AuthController@me');
