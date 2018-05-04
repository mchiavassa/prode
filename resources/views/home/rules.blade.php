@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>Reglas</h2>
    </div>

    <h2>Bienvenido al PRODE</h2>

    <p>Con esta app vas a poder jugar con tu grupo de amigos realizando prónosticos de juegos de una competencia deportiva.</p>

    <p>Los grupos son privados, por lo que necesitás invitación para participar. Ingresá con tu cuenta de Facebook y avisale a tu administrador para comenzar a jugar.</p>


    <h3>Reglamento</h3>
    <ul>
        <li>Los partidos a pronosticar se van a ir habilitando periódicamente por el administrador agruapdos en "fechas".</li>
        <li>Cada partido puede ser pronosticado hasta la hora que comience.</li>
        <li>Los partidos que no lleguen a pronosticarse no computarán puntos.</li>
    </ul>

    <h3>Puntajes</h3>
    <p>Por cada pronóstico enviado:</p>
    <ul>
        <li>1 punto: acertado el resultado del partido (que equipo ganó o si terminó en empate)</li>
        <li>2 puntos: acertado el marcador exacto del partido.</li>
    </ul>

    <h4>Ejemplos</h4>

    <p>
        Pronóstico: L:2 V:1
        Resultado oficial: L:3 V:0

        - <strong>En este caso acertaste el resultado por lo que estarías recibiendo 1 punto.</strong>
    </p>
   <p>
       Pronóstico: L:1 V:1
       Resultado oficial: L:1 V:1

       - <strong>En este caso acertaste el resultado y además el marcado exacto del partido, por lo que estarías recibiendo 3 puntos.</strong>
   </p>
    <p>
        Pronóstico: L:2 V:1
        Resultado oficial: L:0 V:3

        - <strong>En este caso no acertaste el resultado, por lo que no recibirás puntos por este pronóstico.</strong>
    </p>
@endsection