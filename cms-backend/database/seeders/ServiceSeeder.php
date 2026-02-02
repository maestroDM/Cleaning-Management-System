<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use App\Models\ServiceCategory;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $officeCategory = ServiceCategory::where('name', 'Office Services')->first();
        $instutionalCategory = ServiceCategory::where('name', 'Institutional Services')->first();

        if(!$officeCategory || !$instutionalCategory) {
            $this->command->error('Service categories not found. Please run ServiceCategorySeeder first.');
            return;
        }

        Service::create([
            'category_id' => $officeCategory->id,
            'name' => 'Office Cleaning',
            'description' => 'Professional office cleaning services to keep your workspace clean and organized.',
            'price' => 1000,
        ]);

        Service::create([
            'category_id' => $instutionalCategory->id,
            'name' => 'School Cleaning',
            'description' => 'Professional cleaning services for schools and educational institutions.',
            'price' => 2000,
        ]);

        Service::create([
            'category_id' => $officeCategory->id,
            'name' => 'Carpet Cleaning',
            'description' => 'Professional carpet cleaning services for offices and commercial spaces.',
            'price' => 1500,
        ]);

        Service::create([
            'category_id' => $officeCategory->id,
            'name' => 'Window Cleaning',
            'description' => 'Specialized cleaning services for windows in offices and commercial spaces.',
            'price' => 3000,
        ]);
    }
}