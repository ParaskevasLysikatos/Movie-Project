<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

         \App\Models\Movie::create([
            'name' => 'movie 1',
        ]);

        \App\Models\Movie::create([
            'name' => 'movie 2',
        ]);

        \App\Models\Movie::create([
            'name' => 'movie 3',
        ]);

        \App\Models\Movie::create([
            'name' => 'movie 4',
        ]);

        \App\Models\MovieCollection::create([
            'title' => 'collection 1',
        ]);


        \App\Models\MovieCollection::create([
            'title' => 'collection 2',
        ]);

    }
}
