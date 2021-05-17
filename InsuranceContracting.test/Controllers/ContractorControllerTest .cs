using AutoFixture;
using InsuranceContracting.Controllers;
using InsuranceContracting.Models;
using InsuranceContracting.Transfer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InsuranceContracting.test.Controllers
{
    [TestClass]
    public class ContractorControllerTest : DbTest
    {
        private static readonly IFixture fixture = new Fixture();
        private ContractorController controller = default!;

        [TestInitialize]
        public void Initialize()
        {
            controller = new ContractorController(Context);
        }

        [TestMethod]
        public void GivenContractorsInDb_WhenGetContractors_ThenReturnContractors()
        {
            Contractor[] expectedContractors = new[] { new Contractor { Id = "firstId" }, new Contractor { Id = "secondId" } };
            Context.Contractors.AddRange(expectedContractors);
            Context.SaveChanges();

            ActionResult<List<Contractor>> responseContractors = controller.GetContractors();

            CollectionAssert.AreEquivalent(expectedContractors, responseContractors.Value.ToArray());
        }

        [TestMethod]
        public async Task GivenNoContractorInDb_WhenAddContractors_ThenContractorSaved()
        {
            ContractorRequestDto newContractor = new ContractorRequestDto();

            await controller.AddContractor(newContractor);

            Assert.IsTrue(Context.Contractors.Count() > 0);
        }
    }
}
