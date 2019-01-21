<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Topic;
use App\Http\Resources\TopicResource;
use App\Http\Resources\Topic as SingleTopic;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $topics = Topic::paginate(14);

        return TopicResource::collection($topics);
    }

    public function getFeaturedArticlesByTopic()
    {
        $topics = Topic::take(3)->get();

        foreach($topics as $topic)
        {
            $articles = $topic->articles->take(5);

            foreach($articles as $article)
            {
                $article['url'] = 'article/'.$article->id;
                $article['feature_img_large_url'] = url('api/get_image/article_thumb_large/'.$article->feature_img_path);
                $article['feature_img_medium_url'] = url('api/get_image/article_thumb_medium/'.$article->feature_img_path);
                $article['feature_img_small_url'] = url('api/get_image/article_thumb_small/'.$article->feature_img_path);
                $article->body = json_decode($article->body);
            }

            $topic['featured_articles'] = $articles;

        }

        return TopicResource::collection($topics);
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
    public function show($title)
    {
        return view('topic', compact('title'));
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
