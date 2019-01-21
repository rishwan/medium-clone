<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    public function topic()
    {
        return $this->belongsTo('App\Model\Topic', 'topic_id','id');
    }
}
