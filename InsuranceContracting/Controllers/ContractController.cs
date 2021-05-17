using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InsuranceContracting.Data;
using InsuranceContracting.Models;
using Microsoft.AspNetCore.Mvc;
namespace InsuranceContracting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractController : ControllerBase
    {
        private readonly InsuranceContractingContext context;

        public ContractController(InsuranceContractingContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public ActionResult<List<Contract>> GetContracts()
        {
            return context.Contracts.ToList();
        }

        [HttpPost]
        public async Task<ActionResult> AddContract(Contract contract)
        {
            if (IsEmpty(contract))
            {
                return BadRequest("Contractors are invalid.");
            }

            if (IsSameContract(contract))
            {
                return BadRequest("Contract between contract with self is invalid.");
            }

            if (IsDuplicateContract(contract))
            {
                return BadRequest("Contract already exist.");
            }

            context.Contracts.Add(contract);

            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("shortestContractChain")]
        public ActionResult<List<Contract>> getShortestContractChain([FromQuery] string firstContractorId, [FromQuery] string secondContractorId)
        {
            return new List<Contract>();
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteContract(string firstContractorId, string secondContractorId)
        {
            Contract contract = new Contract { FirstContractorId = firstContractorId, SecondContractorId = secondContractorId };

            context.Contracts.Remove(contract);

            await context.SaveChangesAsync();

            return Ok();

        }

        private bool IsEmpty(Contract contract)
        {
            return string.IsNullOrWhiteSpace(contract.FirstContractorId) || string.IsNullOrWhiteSpace(contract.SecondContractorId);
        }

        private bool IsSameContract(Contract contract)
        {
            bool sameContract = contract.FirstContractorId == contract.SecondContractorId;

            return sameContract;
        }

        private bool IsDuplicateContract(Contract contract)
        {
            bool contractExist = context.Contracts.Any(c => new string[] { contract.FirstContractorId, contract.SecondContractorId }.Contains(c.FirstContractorId));

            return contractExist;
        }
    }
}