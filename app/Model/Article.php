<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    public function topic()
    {
        return $this->belongsTo('App\Model\Topic', 'topic_id','id');
    }

    public function tags()
    {
        return $this->morphToMany('App\Model\Tag', 'taggable');
    }

    public function authorDetails()
    {
        return $this->belongsTo('App\User', 'author','id');
    }
}
