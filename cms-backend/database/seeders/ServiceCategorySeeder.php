<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServiceCategory;

class ServiceCategorySeeder extends Seeder
{
    public function run(): void
    {
        ServiceCategory::create([
            'name' => 'Office Services',
        ]);

        ServiceCategory::create([
            'name' => 'Institutional Services',
        ]);
    }
}