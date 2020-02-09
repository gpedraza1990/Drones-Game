using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BussinesLogic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using React.Models;

namespace React.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class GameController : ControllerBase
    {
        private claseGamenBL bl;

        private readonly ILogger<GameController> _logger;

        public GameController(ILogger<GameController> logger)
        {
            _logger = logger;
            bl = new claseGamenBL();
        }

        [HttpPost]
        
        public  RespuestaMD PlayGame([FromBody]JugadaMD jugada)
        {
            IDictionary<char, string> result = new Dictionary<char, string>();
            try
            {
                //resuelve juego y guarda informacion
                HistoricoJugadas respuesta = bl.Rutina_ResuelveJuegoPorReglas(jugada);
                return new RespuestaMD { Resultado = respuesta.Hjursl.ToString(), Juego = respuesta.Hjujni.ToString() };
            }
            catch(Exception ex) { 


                this._logger.LogError("Controller GameController - Metodo  PlayGame - Error: " + ex.Message);
                return new RespuestaMD { Resultado = "Error" };
            }
            finally
            {
                this._logger.LogInformation("Controller GameController - Metodo  PlayGame - EXITO");
            }
            
        }

        [HttpGet]

        public int PlayerStatics(string user)
        {
            
            try
            {
                //buscar informacion de usuario

                return bl.PlayerStatics(user);
            }
            catch (Exception ex)
            {

                this._logger.LogError("Controller GameController - Metodo  PlayerStatics - Error: " + ex.Message);
                return 0;
            }
            finally
            {
                this._logger.LogInformation("Controller GameController - Metodo  PlayerStatics - EXITO");
            }

        }

        [HttpPost]

        public string PlayerWinner([FromBody] Juegosganados ganador)
        {

            try
            {
                //buscar informacion de usuario

                return bl.PlayerWinner(ganador);
            }
            catch (Exception ex)
            {

                this._logger.LogError("Controller GameController - Metodo  PlayerWinner - Error: " + ex.Message);
                return "Error";
            }
            finally
            {
                this._logger.LogInformation("Controller GameController - Metodo  PlayerWinner - EXITO");
            }

        }
    }
}
