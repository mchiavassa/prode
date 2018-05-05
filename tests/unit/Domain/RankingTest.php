<?php

namespace Test\unit\Domain;

use Prode\Domain\Model\User;
use Prode\Domain\Ranking;
use Test\TestCase;

class RankingTest extends TestCase
{
    public function testSortByPointsAndThenByName()
    {
        $user1 = new User();
        $user1->name = 'Maxi Chiavassa';
        $user1->points = 2;

        $user2 = new User();
        $user2->name = 'Agu Chiavassa';
        $user2->points = 2;

        $user3 = new User();
        $user3->name = 'Gonzi Chiavassa';
        $user3->points = 3;

        $users = collect([$user1, $user2, $user3]);

        $ranking = new Ranking($users);

        foreach ($ranking as $position => $user) {
            switch ($position) {
                case 1:
                    $this->assertEquals($user3, $user);
                    break;
                case 2:
                    $this->assertEquals($user2, $user);
                    break;
                case 3:
                    $this->assertEquals($user1, $user);
                    break;
            }
        }
    }
}
