using InsuranceContracting.Controllers;
using InsuranceContracting.Helpers;
using InsuranceContracting.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NSubstitute;
using System.Threading.Tasks;

namespace InsuranceContracting.test.Controllers
{
    [TestClass]
    public class ContractControllerTest : DbTest
    {
        private readonly IShortestChain shortestChainHelper = Substitute.For<IShortestChain>();
        private ContractController controller = default!;
        
        [TestInitialize]
        public void Initialize()
        {
            controller = new ContractController(Context, shortestChainHelper);
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
