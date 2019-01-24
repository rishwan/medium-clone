<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Topic;
use App\Model\Article;
use App\Http\Resources\TopicResource;
use App\Http\Resources\Article as ArticlesResource;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $topics = Topic::paginate(11);

        return TopicResource::collection($topics);
    }

    /*
     * Returns a collection of Topics with 5 articles each
     */
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
                $article->tags;
                $article->author_details = $article->authorDetails;

            }

            $topic['featured_articles'] = $articles;

        }

        return TopicResource::collection($topics);
    }

    /**
     * Returns an instance of article by the given topic id
     * @param $title
     * @return \Illuminate\Http\Response
     */
    public function getFeaturedArticle($title)
    {
        $topic = Topic::where('title','=',$title)->first();

        $article = Article::where('topic_id', '=', $topic->id)
            ->where('featured','=', true)
            ->orderBy('created_at','desc')
            ->first();

        $article->url = 'article/'.$article->id;
        $article->feature_img_large_url = url('api/get_image/article_thumb_large/'.$article->feature_img_path);
        $article->feature_img_medium_url = url('api/get_image/article_thumb_medium/'.$article->feature_img_path);
        $article->feature_img_small_url = url('api/get_image/article_thumb_small/'.$article->feature_img_path);
        $article->tags;
        $article->author_details = $article->authorDetails;

        return new ArticlesResource($article);
    }

    public function getTopicDetails($title)
    {
        $topic = Topic::where('title', '=', $title)->first();

        /*
         * sample similar topics
         */
        $similar_topics = Topic::inRandomOrder()->limit(5)->get();

        $topic->similar_topics = $similar_topics;

        return new TopicResource($topic);
    }

    function getTopicArticles($title)
    {
        $topic = Topic::where('title','=',$title)->first();

        $articles = Article::where('topic_id', '=', $topic->id)
            ->orderBy('created_at','desc')
            ->get();


        foreach($articles as $article)
        {
            $article->url = 'article/'.$article->id;
            $article->feature_img_large_url = url('api/get_image/article_thumb_large/'.$article->feature_img_path);
            $article->feature_img_medium_url = url('api/get_image/article_thumb_medium/'.$article->feature_img_path);
            $article->feature_img_small_url = url('api/get_image/article_thumb_small/'.$article->feature_img_path);
            $article->tags;
            $article->author_details = $article->authorDetails;
        }

        return ArticlesResource::collection($articles);
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

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($title)
    {


        return view('topic');
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
