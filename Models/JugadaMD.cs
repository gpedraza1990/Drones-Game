

using Newtonsoft.Json;
using System;

namespace React.Models
{
    public class JugadaMD
    {
        public EnumsMD.GameTypeMovement jugadaPlayer1 { get; set; }
        public EnumsMD.GameTypeMovement jugadaPlayer2 { get; set; }

        public string user1 { get; set; }

        public string user2 { get; set; }

        public char resultado { get; set; }

        public Guid juego { get; set; }

        public JugadaMD(EnumsMD.GameTypeMovement jugadaPlayer1, EnumsMD.GameTypeMovement jugadaPlayer2)
		{
            this.jugadaPlayer1 = jugadaPlayer1;
            this.jugadaPlayer2 = jugadaPlayer2;
		}

        public JugadaMD()
        {

        }

       


        public  bool Equals(JugadaMD jugada)
        {

            return (jugadaPlayer1.Equals(jugada.jugadaPlayer1) && jugadaPlayer2.Equals(jugada.jugadaPlayer2));
        }
    }
}
