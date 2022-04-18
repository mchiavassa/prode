<?php

namespace App\Console\Commands;

use App\Models\Party;
use Illuminate\Console\Command;

class CreateParty extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'party:create
                             {--name= : Name of the party}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates a user party.';


    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Creating Party...');

        $name = $this->option('name');

        $this->table(['name'], [[$name]]);

        $party = new Party();
        $party->name = $name;
        $party->save();

        $this->info('Party created successfully.');

        $this->info(print_r($party->toArray()));
    }
}
