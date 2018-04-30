<?php

namespace App\Http\Controllers;

use Prode\Domain\Model\GameSet;

class GameSetController extends Controller
{
    private $gameSet;

    public function __construct(GameSet $gameSet)
    {
        $this->middleware('auth');

        $this->gameSet = $gameSet;
    }

    public function list()
    {
        $gameSets = $this->gameSet->get();

        return view('set.list', ['gameSets' => $gameSets]);
    }
}
