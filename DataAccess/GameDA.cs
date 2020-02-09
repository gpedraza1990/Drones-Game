using React.Models;
using System;
using System.Collections.Generic;
using System.Linq;


namespace React.DataAccess
{
    public class GameDA
    {
        GameContext db = new GameContext();

         
        public int AgregarJugada(HistoricoJugadas jugada)
        {
            try
            {
                db.HistoricoJugadas.Add(jugada);
                db.SaveChanges();
                return 1;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int PlayerStatics(string user)
        {
            return db.Juegosganados.Where(x => x.Jgnusr == user).Count();
        }

        public string PlayerWinner(Juegosganados ganador)
        {
            try
            {
                db.Juegosganados.Add(ganador);
                db.SaveChanges();
                return "OK";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
