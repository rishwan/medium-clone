<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();

        $this->command->info('Table: "users" truncated. Seeding samples...');

        /*
         * Default User
         */
        User::create([
            'name' => 'Ahmed Rishwan',
            'email' => 'a.rishwan@gmail.com',
            'password' => bcrypt('welcome'),
            'type' => 'admin'
        ]);

        $faker = Faker::create();

        for($i = 1; $i <= 5; $i++)
        {
            User::create([
                'name' => $faker->name,
                'email' => $faker->safeEmail,
                'password' => bcrypt('welcome'),
                'type' => 'admin'
            ]);
        }

        $this->command->info('Table: "users" seeded.');

    }
}
