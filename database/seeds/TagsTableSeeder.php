<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

use App\Model\Tag;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tag::truncate();

        $this->command->info('> Tags table truncated. Seeding sample data');

        $faker = Faker::create();

        for($i = 1; $i <= 20; $i++)
        {

            $name = $faker->word;

            try {
                Tag::create([
                    'name' => $name
                ]);
            } catch (Exception $error) {
                continue;
            }
            //Tag::create([
            //    'name' => $faker->word
            //]);

        }

        $this->command->info('> Tags table seeded.');

    }
}
