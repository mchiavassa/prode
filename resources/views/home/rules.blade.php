@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>Reglas</h2>
    </div>

    <h2>Bienvenido al PRODE</h2>
    <div class="text-justify">
        <p>Con esta app vas a poder jugar con tus amigos realizando prónosticos de partidos de una competencia deportiva.</p>
        <p>Comenzá <a href="{{route('party.create')}}">creando tu grupo</a>, compartile el link a tus amigos para que se sumen y comenzá a pronosticar.</p>
        <p>Cada vez que finalice un partido computaremos todos los pronósticos recibidos, sumando puntos correspondientes a cada usuario.</p>

        <hr>
        <h3>Reglamento</h3>
        <ul>
            <li>Los partidos a pronosticar irán habilitando periódicamente agruapdos en "fechas".</li>
            <li>Cada partido podrá ser pronosticado hasta la hora de su comienzo.</li>
            <li>Los partidos que no lleguen a pronosticarse no computarán puntos.</li>
        </ul>
        <hr>
        <h3>Puntajes</h3>
        <p>Por cada pronóstico enviado recibirás:</p>
        <ul>
            <li><strong>{{config('domain.points.result')}} puntos</strong>, acertando el resultado del partido (que equipo ganó o si terminó en empate),</li>
            <li>y otros <strong>{{config('domain.points.score')}} puntos</strong> extra, acertando el marcador exacto del partido.</li>
        </ul>

        <h5>Por ejemplo:</h5>

        <p>
            Pronóstico: L:2 V:1
            Resultado oficial: L:3 V:0

            - <strong>En este caso acertaste el resultado por lo que estarías recibiendo {{config('domain.points.result')}} puntos.</strong>
        </p>
        <p>
            Pronóstico: L:1 V:1
            Resultado oficial: L:1 V:1

            - <strong>En este caso acertaste el resultado y además el marcado exacto del partido, por lo que estarías recibiendo {{config('domain.points.result') + config('domain.points.score')}} puntos.</strong>
        </p>
        <p>
            Pronóstico: L:2 V:1
            Resultado oficial: L:0 V:3

            - <strong>En este caso no acertaste el resultado, por lo que no recibirás puntos por este pronóstico.</strong>
        </p>

        <h4>Penales</h4>
        <div class="row mb-4">
            <div class="col-md-4 offset-md-4">
                <img src="https://i.imgur.com/lrEshg0.png" class="img-fluid">
            </div>
        </div>
        <p>
            Para los partidos que no puedan terminar en empate vas a tener la posibilidad de pronosticar penales, aumentando las chances de sumar puntos de la siguiente forma:
        </p>
        <ul>
            <li><strong>{{config('domain.points.result')}} puntos</strong>, acertando el resultado del partido (equipo que ganó)</li>
            <li><strong>{{config('domain.points.score')}} puntos</strong>, acertando el marcador exacto del partido dentro de los 120 minutos de juego.</li>
            <li><strong>{{config('domain.points.tiebreak_existence')}} puntos</strong>, si acertaste que el partido iba a ir a penales.</li>
            <li><strong>{{config('domain.points.tiebreak_score')}} puntos</strong>, acertando la cantidad exacta de penales para cada uno de los equipos.</li>
        </ul>
        <h5>Por ejemplo:</h5>

        <p>
            Pronóstico: L:1(5) V:1(3)
            Resultado oficial: L:1(5) V:1(3)

            - <strong>En este caso acertaste: resultado, marcador exacto en los 120 minutos, existencia de penales y cantidad exacta de penales, por lo que estarías recibiendo {{config('domain.points.result') + config('domain.points.tiebreak_existence') + config('domain.points.score') + config('domain.points.tiebreak_score')}} puntos.</strong>
        </p>
        <p>
            Pronóstico: L:1(5) V:1(3)
            Resultado oficial: L:1(7) V:1(4)

            - <strong>En este caso acertaste el resultado, marcador exacto en los 120 minutos y que el partido iba a ir a penales por lo que estarías recibiendo {{config('domain.points.result') + config('domain.points.score') + config('domain.points.tiebreak_existence')}} puntos.</strong>
        </p>
        <p>
            Pronóstico: L:1(5) V:1(3)
            Resultado oficial: L:2(5) V:2(3)

            - <strong>En este caso acertaste el resultado, cantidad exacta de penales y que el partido iba a ir a penales por lo que estarías recibiendo {{config('domain.points.result') + config('domain.points.tiebreak_score') + config('domain.points.tiebreak_existence')}} puntos.</strong>
        </p>
        <p>
            Pronóstico: L:1(5) V:1(3)
            Resultado oficial: L:2(7) V:2(4)

            - <strong>En este caso acertaste el resultado, y que el partido iba a ir a penales por lo que estarías recibiendo {{config('domain.points.result') + config('domain.points.tiebreak_existence')}} puntos.</strong>
        </p>
        <p>
            Pronóstico: L:1(5) V:1(3)
            Resultado oficial: L:2(3) V:2(5)

            - <strong>En este caso sólo acertaste que el partido iba a ir a penales por lo que estarías recibiendo {{config('domain.points.tiebreak_existence')}} puntos.</strong>
        </p>

        <hr />
        <h3>Prevención de fraude</h3>
        <p>
            Con el objetivo de fomentar la transparecia en el juego, una vez comenzado cada partido dejaremos a tu disposición
            <strong>el listado de pronósticos de todos los participantes de cada uno de tus grupos</strong> para el mismo.
            Para acceder a ellos, vas a encontrar un ícono en la parte superior izquierda de cada partido:
        </p>

        <div class="row mb-4">
            <div class="col-md-4 offset-md-4">
                <img src="https://i.imgur.com/5c5EIYn.png" class="img-fluid">
            </div>
        </div>

        <p>Estos pronósticos están representados en un formato estándar de texto plano. Para garantizar que ningún pronóstico sea alterado una vez computado el partido, te recomendamos que <strong>guardes una copia de ellos</strong>, para luego validar en cualquier momento posterior al partido.</p>
        <p>Ayudanos a promover un juego limpio y prevenir cualquier tipo de fraude!</p>
    </div>

@endsection
