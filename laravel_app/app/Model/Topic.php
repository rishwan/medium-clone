<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    public function articles()
    {
        return $this->hasMany('App\Model\Article', 'topic_id','id');
    }
}
