using AutoFixture;
using InsuranceContracting.Controllers;
using InsuranceContracting.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceContracting.test.Controllers
{
    [TestClass]
    public class ContractControllerTest : DbTest
    {
        private static readonly IFixture fixture = new Fixture();
        private ContractController controller = default!;
        
        [TestInitialize]
        public void Initialize()
        {
            controller = new ContractController(Context);
        }

        [TestMethod]
        public async Task GivenNoContractInDb_WhenAddInvalidContract_ThenReturnBadRequest()
        {
            Contract newContract = new Contract { FirstContractorId = "", SecondContractorId = "" };

            ActionResult response = await controller.AddContract(newContract);

            Assert.IsInstanceOfType(response, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public async Task GivenNoContractInDb_WhenAddSameContract_ThenReturnBadRequest()
        {
            Contract newContract = new Contract { FirstContractorId = "sameId", SecondContractorId = "sameId" };

            ActionResult response = await controller.AddContract(newContract);

            Assert.IsInstanceOfType(response, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public async Task GivenContractInDb_WhenAddContractAlreadyExist_ThenReturnBadRequest()
        {
            Contract newContract = new Contract { FirstContractorId = "firstId", SecondContractorId = "secondId" };
            Contract duplicateContract = new Contract { FirstContractorId = "secondId", SecondContractorId = "firstId" };
            Context.Contracts.Add(duplicateContract);
            Context.SaveChanges();

            ActionResult response = await controller.AddContract(newContract);

            Assert.IsInstanceOfType(response, typeof(BadRequestObjectResult));
        }
    }
}
