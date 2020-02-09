using React.DataAccess;
using React.Models;
using System;
using System.Collections.Generic;
using System.Linq;


namespace BussinesLogic
{
    ///<sumary>
    ///Clase encargada de la lógica en la prueba del servicio
    ///</sumary>
    public class claseGamenBL
    {
        ///<sumary>
        ///Propiedad encargada de almarcenar una instancia de claseTestConnectionDA
        ///</sumary>
        private GameDA gameDA;


        ///<sumary>
        ///Propiedad encargada de almacenar posibles jugadas
        ///</sumary>
        private readonly Dictionary<JugadaMD, EnumsMD.GameResult> _listaJugadas;

       

        ///<sumary>
        ///Constructor del Juego BL
        ///</sumary>
        public claseGamenBL()
        {

            _listaJugadas = new Dictionary<JugadaMD, EnumsMD.GameResult>
			{
				{new JugadaMD(EnumsMD.GameTypeMovement.Piedra, EnumsMD.GameTypeMovement.Piedra), EnumsMD.GameResult.Empate},
				{new JugadaMD(EnumsMD.GameTypeMovement.Piedra, EnumsMD.GameTypeMovement.Papel), EnumsMD.GameResult.JugadorDosGana},
				{new JugadaMD(EnumsMD.GameTypeMovement.Piedra, EnumsMD.GameTypeMovement.Tijera), EnumsMD.GameResult.JugadorUnoGana},

				{new JugadaMD(EnumsMD.GameTypeMovement.Papel, EnumsMD.GameTypeMovement.Piedra), EnumsMD.GameResult.JugadorUnoGana},
				{new JugadaMD(EnumsMD.GameTypeMovement.Papel, EnumsMD.GameTypeMovement.Papel), EnumsMD.GameResult.Empate},
				{new JugadaMD(EnumsMD.GameTypeMovement.Papel, EnumsMD.GameTypeMovement.Tijera), EnumsMD.GameResult.JugadorDosGana},

				{new JugadaMD(EnumsMD.GameTypeMovement.Tijera, EnumsMD.GameTypeMovement.Piedra), EnumsMD.GameResult.JugadorDosGana},
				{new JugadaMD(EnumsMD.GameTypeMovement.Tijera, EnumsMD.GameTypeMovement.Papel), EnumsMD.GameResult.JugadorUnoGana},
				{new JugadaMD(EnumsMD.GameTypeMovement.Tijera, EnumsMD.GameTypeMovement.Tijera), EnumsMD.GameResult.Empate}
			};
            gameDA = new GameDA();


        }

        public HistoricoJugadas Rutina_ResuelveJuegoPorReglas(JugadaMD jugada)
        {
            var jug = BuildHistoricoJugadaModel(jugada);
            foreach (var regla in _listaJugadas.Where(regla => regla.Key.Equals(jugada)))
                jug.Hjursl =  (char)regla.Value;

            gameDA.AgregarJugada(jug);

            return jug;
        }

        private HistoricoJugadas BuildHistoricoJugadaModel(JugadaMD jugada) 
        {
            HistoricoJugadas hist = new HistoricoJugadas();
            hist.Hjujuc = (char)jugada.jugadaPlayer2;
            hist.Hjujuh = (char)jugada.jugadaPlayer1;
            hist.Hjursl = jugada.resultado;
            hist.Hjuusp = jugada.user1;
            hist.Hjuuss = jugada.user2;
            hist.Hjujni = jugada.juego == Guid.Empty ? Guid.NewGuid(): jugada.juego;

            return hist;
        }

        public int PlayerStatics(string user)
        {
            return gameDA.PlayerStatics(user);
        }

        public string PlayerWinner(Juegosganados ganador)
        {
            return gameDA.PlayerWinner(ganador);
        }





    }
}
