using BussinesLogic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using React.Models;


namespace UnitTestGame
{
  [TestClass]
    public class UnitTestGameController
    {
       [TestMethod]
        public void TestPlayGame()
        {
            //Arreglar
            var bl = new claseGamenBL();
           

            Assert.IsNotNull(bl.Rutina_ResuelveJuegoPorReglas(new JugadaMD()));


        }
    }
}
