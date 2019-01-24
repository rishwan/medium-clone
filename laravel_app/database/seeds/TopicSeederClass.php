<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

use App\Model\Topic;

class TopicSeederClass extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Topic::truncate();

        $this->command->info("> Topics table truncated. Seeding sample data");

        $faker = Faker::create();

        for($i = 1; $i <= 20; $i++)
        {
            $title = $faker->unique()->word;

            Topic::create([
                'title' => $title,
                'tag_line' => $faker->words($nb = 3, $asText = true),
                'url' => 'topic/'.$title
            ]);

        }

        $this->command->info("> Topics table seeded.");
    }
}
