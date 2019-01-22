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
    Route::get('/topics/index', 'AdminController@topicIndex');
    Route::post('/article/image_upload', 'CommonController@imageUpload');
});