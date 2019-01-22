<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Article;
use App\Model\Topic;

class AdminController extends Controller
{
    public function articleIndex ()
    {
        $articles = Article::all();

        $articles->load('topic');

        foreach($articles as $article)
        {
            $article['feature_img_large_url'] = url('api/get_image/article_thumb_large/'.$article->feature_img_path);
            $article['feature_img_medium_url'] = url('api/get_image/article_thumb_medium/'.$article->feature_img_path);
            $article['feature_img_small_url'] = url('api/get_image/article_thumb_small/'.$article->feature_img_path);
            //$article->body = json_decode($article->body);
        }

        $payload = [
            'status_flag' => 'ok',
            'status_code' => 200,
            'data' => [
                'articles' => $articles
            ]
        ];

        return $this->payload($payload);
    }

    public function topicIndex ()
    {
        $topics = Topic::all();

        $payload = [
            'status_flag' => 'ok',
            'status_code' => 200,
            'data' => [
                'topics' => $topics
            ]
        ];

        return $this->payload($payload);
    }
}
