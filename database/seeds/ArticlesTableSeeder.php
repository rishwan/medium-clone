<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

use App\Model\Article;
use App\Model\Topic;
use Illuminate\Support\Facades\Storage;

class ArticlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Article::truncate();

        $this->command->info("> Articles table truncated. Seeding sample data");

        $files = Storage::files('public/samples');

        $faker = Faker::create();

        $topics = Topic::all();
        /*
         * Creating some featured articles
         */
        foreach ($topics as $topic)
        {
            for ($i = 0; $i <= 10; $i++) {
                $random_img_key = array_rand($files, 1);

                $img = Image::make(Storage::get($files[$random_img_key]));

                $image_name = uniqid('img_') . '.jpg';
                Storage::put("public/article_thumb_large/" . $image_name, $img->fit(610, 372)->encode('jpg', 75));
                Storage::put("public/article_thumb_medium/" . $image_name, $img->fit(389, 237)->encode('jpg', 75));
                Storage::put("public/article_thumb_small/" . $image_name, $img->fit(128, 128)->encode('jpg', 75));

                Article::create([
                    'topic_id' => $topic->id,
                    'title' => $faker->words(rand(4, 8), true),
                    'tag_line' => $faker->words(rand(8, 12), true),
                    'feature_img_path' => $image_name,
                    'body' => json_encode($faker->paragraphs(5, false)),
                    'published' => true,
                    'featured' => true,
                    'author' => 1
                ]);
            }
        }

        $this->command->info('> Articles table seeded');
    }
}
