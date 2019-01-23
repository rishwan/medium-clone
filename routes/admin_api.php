<?php

use Illuminate\Http\Request;

Route::post('login', [
    'as' => 'login',
    'uses' => 'AuthController@login'
]);

Route::get('logout', 'AuthController@logout');
Route::post('refresh', 'AuthController@refresh');
Route::post('me', 'AuthController@me');

/*
* Protected Routes
*/
Route::group(['middleware'=>'jwt.auth'],function(){

    Route::get('/articles/index', 'AdminController@articleIndex');
    Route::post('/article/store', 'AdminController@articleStore');
    Route::get('/article/delete/{article_id}', 'AdminController@articleDelete');
    Route::get('/article/{article_id}', 'AdminController@articleShow');
    Route::post('/article/update', 'AdminController@articleUpdate');

    Route::get('/topics/index', 'AdminController@topicIndex');

    Route::get('/tags/index', 'AdminController@tagIndex');

    Route::post('/article/image_upload', 'CommonController@imageUpload');

});