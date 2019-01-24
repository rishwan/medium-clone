<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

use App\Model\Article;
use App\Model\Topic;
use App\Model\Tag;

class AdminController extends Controller
{
    public function articleIndex ()
    {
        $articles = Article::orderBy('created_at','desc')->get();

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

    public function articleStore(request $request)
    {

        //dd($request);
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'tag_line' => 'required',
            'published' => 'required|bool',
            'topic' => 'required',
            'article_img' => 'required',
            'tags' => 'array|required|min:1'
        ]);

        if($validator->fails())
        {
            $payload = [
                'status_flag' => 'validation-error',
                'status_code' => 422,
                'data' => $validator->errors()
            ];

            return $this->payload($payload);
        }

        $article = new Article;

        $article->title = $request->get('title', null);
        $article->tag_line = $request->get('tag_line', null);
        $article->body = $request->get('body', null);
        $article->topic_id = $request->get('topic', null);
        $article->feature_img_path = $request->get('article_img', null);
        $article->published = $request->get('published');
        $article->featured = $request->get('featured', false);
        $article->author = \Auth::user()->id;
        $article->save();

        $article_tags = $request->get('tags');
        $existing_tags = Tag::all()->pluck('name');

        //dd($tags);

        /*
         * Create new tags if there are any
         */
        foreach($article_tags as $tag) {
            if(!in_array($tag, $existing_tags->toArray())) {
                $fresh_tag = new Tag;
                $fresh_tag->name = $tag;
                $fresh_tag->save();
            }
        }

        /*
         * Attach tags to article
         */
        $attachable_tags = [];
        foreach($article_tags as $tag) {
            $attachable_tags[] = Tag::where('name','=',$tag)->pluck('id')->first();
        }

        $article->tags()->sync($attachable_tags);

        $article->load('topic','tags');

        $payload = [
            'status_flag' => 'ok',
            'status_code' => 200,
            'data' => [
                'article' => $article
            ]
        ];

        return $this->payload($payload);

    }

    public function articleDelete($article_id)
    {
        Article::destroy($article_id);

        $payload = [
            'status_flag' => 'ok',
            'status_code' => 200,
            'data' => [
                'message' => 'article deleted'
            ]
        ];

        return $this->payload($payload);
    }

    public function articleShow($article_id)
    {
        $article = Article::find($article_id);

        $article->load('topic','tags');

        $article->current_tags = $article->tags->pluck('name');
        $article->feature_img_url = url('api/get_image/article_thumb_medium/'.$article->feature_img_path);

        $payload = [
            'status_flag' => 'ok',
            'status_code' => 200,
            'data' => [
                'article' => $article
            ]
        ];

        return $this->payload($payload);
    }

    public function articleUpdate(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'article_id' => 'required|integer',
            'title' => 'required',
            'tag_line' => 'required',
            'published' => 'required|bool',
            'topic' => 'required',
            'tags' => 'array|required|min:1'
        ]);

        if($validator->fails())
        {
            $payload = [
                'status_flag' => 'validation-error',
                'status_code' => 422,
                'data' => $validator->errors()
            ];

            return $this->payload($payload);
        }

        $article = Article::find($request->get('article_id'));

        $article->title = $request->get('title', null);
        $article->tag_line = $request->get('tag_line', null);
        $article->topic_id = $request->get('topic', null);
        $article->published = $request->get('published');
        $article->featured = $request->get('featured', false);
        $article->author = \Auth::user()->id;

        $body = $request->get('body', null);

        if($body)
        {
            $article->body = $body;
        }

        $featured_image = $request->get('article_img', null);

        if($featured_image)
        {
            $article->feature_img_path = $featured_image;
        }

        $article->save();

        $article_tags = $request->get('tags');
        $existing_tags = Tag::all()->pluck('name');

        /*
         * Create new tags if there are any
         */
        foreach($article_tags as $tag) {
            if(!in_array($tag, $existing_tags->toArray())) {
                $fresh_tag = new Tag;
                $fresh_tag->name = $tag;
                $fresh_tag->save();
            }
        }

        /*
         * Attach tags to article
         */
        $attachable_tags = [];
        foreach($article_tags as $tag) {
            $attachable_tags[] = Tag::where('name','=',$tag)->pluck('id')->first();
        }

        $article->tags()->sync($attachable_tags);

        $article->load('topic','tags');

        $payload = [
            'status_flag' => 'ok',
            'status_code' => 200,
            'data' => [
                'article' => $article
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

    public function tagIndex()
    {
        $tags = Tag::all();

        $payload = [
            'status_flag' => 'ok',
            'status_code' => 200,
            'data' => [
                'tags' => $tags
            ]
        ];

        return $this->payload($payload);
    }
}
