<?php

namespace Tests\Unit\Models;


use App\Models\Ranking;
use App\Models\User;
use Tests\TestCase;

class RankingTest extends TestCase
{
    public function testSortByPointsAndThenByNameGroupingByPoints()
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

        $user4 = new User();
        $user4->name = 'Other';
        $user4->points = 1;

        $users = collect([$user1, $user2, $user3, $user4]);

        $ranking = new Ranking($users);

        $this->assertEquals($user3, $ranking[0]->item);
        $this->assertEquals(1, $ranking[0]->position);

        $this->assertEquals($user2, $ranking[1]->item);
        $this->assertEquals(2, $ranking[1]->position);

        $this->assertEquals($user1, $ranking[2]->item);
        $this->assertEquals(2, $ranking[2]->position);

        $this->assertEquals($user4, $ranking[3]->item);
        $this->assertEquals(3, $ranking[3]->position);
    }
}
