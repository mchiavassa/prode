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

        $ranking = Ranking::ofItems($users);

        $this->assertEquals($user3, $ranking[0]->item);
        $this->assertEquals(1, $ranking[0]->position);

        $this->assertEquals($user2, $ranking[1]->item);
        $this->assertEquals(2, $ranking[1]->position);

        $this->assertEquals($user1, $ranking[2]->item);
        $this->assertEquals(2, $ranking[2]->position);

        $this->assertEquals($user4, $ranking[3]->item);
        $this->assertEquals(3, $ranking[3]->position);
    }

    public function testShowUpToPositionWithHighlightInsideRanking()
    {
        $user1 = new User();
        $user1->name = 'Maxi Chiavassa';
        $user1->points = 20;

        $user2 = new User();
        $user2->name = 'Agu Chiavassa';
        $user2->points = 20;

        $user3 = new User();
        $user3->name = 'Gonzi Chiavassa';
        $user3->points = 30;

        $user4 = new User();
        $user4->name = 'Other';
        $user4->points = 10;

        $user5 = new User();
        $user5->name = 'Other 2';
        $user5->points = 9;

        $user6 = new User();
        $user6->name = 'Other 3';
        $user6->points = 8;

        $user7 = new User();
        $user7->name = 'Other 4';
        $user7->points = 7;

        $user8 = new User();
        $user8->name = 'Other 5';
        $user8->points = 6;

        $users = collect([$user1, $user2, $user3, $user4, $user5, $user6, $user7, $user8]);

        $ranking = Ranking::ofItemsWithPositionsAndIncludeItem(
            $users, 4, $user1, function($u, $u2) { return $u->name == $u2->name; });

        $this->assertEquals($user3, $ranking[0]->item);
        $this->assertEquals(1, $ranking[0]->position);

        $this->assertEquals($user2, $ranking[1]->item);
        $this->assertEquals(2, $ranking[1]->position);

        $this->assertEquals($user1, $ranking[2]->item);
        $this->assertEquals(2, $ranking[2]->position);

        $this->assertEquals($user4, $ranking[3]->item);
        $this->assertEquals(3, $ranking[3]->position);

        $this->assertEquals($user5, $ranking[4]->item);
        $this->assertEquals(4, $ranking[4]->position);
    }

    public function testShowUpToPositionWithHighlightOutsideRanking()
    {
        $user1 = new User();
        $user1->name = 'Maxi Chiavassa';
        $user1->points = 20;

        $user2 = new User();
        $user2->name = 'Agu Chiavassa';
        $user2->points = 20;

        $user3 = new User();
        $user3->name = 'Gonzi Chiavassa';
        $user3->points = 30;

        $user4 = new User();
        $user4->name = 'Other';
        $user4->points = 10;

        $user5 = new User();
        $user5->name = 'Other 2';
        $user5->points = 9;

        $user6 = new User();
        $user6->name = 'Other 3';
        $user6->points = 8;

        $user7 = new User();
        $user7->name = 'Other 4';
        $user7->points = 7;

        $user8 = new User();
        $user8->name = 'Other 5';
        $user8->points = 6;

        $users = collect([$user1, $user2, $user3, $user4, $user5, $user6, $user7, $user8]);

        $ranking = Ranking::ofItemsWithPositionsAndIncludeItem(
            $users, 4, $user7, function($u, $u2) { return $u->name == $u2->name; });

        $this->assertEquals($user3, $ranking[0]->item);
        $this->assertEquals(1, $ranking[0]->position);

        $this->assertEquals($user2, $ranking[1]->item);
        $this->assertEquals(2, $ranking[1]->position);

        $this->assertEquals($user1, $ranking[2]->item);
        $this->assertEquals(2, $ranking[2]->position);

        $this->assertEquals($user4, $ranking[3]->item);
        $this->assertEquals(3, $ranking[3]->position);

        $this->assertEquals($user5, $ranking[4]->item);
        $this->assertEquals(4, $ranking[4]->position);

        $this->assertEquals($user7, $ranking[5]->item);
        $this->assertEquals(6, $ranking[5]->position);
    }
}
