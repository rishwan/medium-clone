<?php

use Illuminate\Database\Seeder;

use App\Model\Tag;
use App\Model\Article;
use Illuminate\Support\Facades\DB;

class TaggablesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('taggables')->truncate();

        $this->command->info('> Taggables table truncated. Seeding sample data');

        $tags = Tag::all();

        $articles = Article::all();

        foreach($articles as $article)
        {
            $tag_ids = $tags->random(4)->pluck('id');

            $article->tags()->attach(
                $tag_ids->all()
            );
        }

        $this->command->info('> Taggables table seeded.');
    }
}
