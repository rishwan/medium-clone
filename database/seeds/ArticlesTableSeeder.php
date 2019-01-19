<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

use App\Model\Article;
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

        $files = Storage::files('public\article_images');

        $faker = Faker::create();

        /*
         * Creating some featured articles
         */
        for($i = 0; $i <= 30; $i++)
        {
            $random_img_key = array_rand($files, 1);

            Article::create([
                'topic_id' => rand(1, 20),
                'title' => $faker->words(rand(4, 8), true),
                'tag_line' => $faker->words(rand(8, 12), true),
                'feature_img_path' => $files[$random_img_key],
                'body' => json_encode($faker->paragraphs(5, false)),
                'published' => true,
                'featured' => true,
                'author' => 1
            ]);
        }

        $this->command->info('> Articles table seeded');
    }
}
