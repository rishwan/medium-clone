<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\Article as ArticleResource;
use App\Model\Article;

class ArticleController extends Controller
{
    public function getHeroFeatures()
    {
        $articles = Article::where('featured', '=', true)->limit(5)->get();

        foreach($articles as $article)
        {
            $article['url'] = 'article/'.$article->id;
            $article['feature_img_large_url'] = url('api/get_image/article_thumb_large/'.$article->feature_img_path);
            $article['feature_img_medium_url'] = url('api/get_image/article_thumb_medium/'.$article->feature_img_path);
            $article['feature_img_small_url'] = url('api/get_image/article_thumb_small/'.$article->feature_img_path);
            $article->body = json_decode($article->body);
        }

        return ArticleResource::collection($articles);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $article = Article::with('topic')->find($id);

        $article->url = 'article/'.$article->id;
        $article->feature_img_large_url = url('api/get_image/article_thumb_large/'.$article->feature_img_path);
        $article->feature_img_medium_url = url('api/get_image/article_thumb_medium/'.$article->feature_img_path);
        $article->feature_img_small_url = url('api/get_image/article_thumb_small/'.$article->feature_img_path);
        //$article->body = json_decode($article->body);

        return new ArticleResource($article);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
