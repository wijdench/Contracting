using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InsuranceContracting.Data;
using InsuranceContracting.Helpers;
using InsuranceContracting.Models;
using Microsoft.AspNetCore.Mvc;

namespace InsuranceContracting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractController : ControllerBase
    {
        private readonly InsuranceContractingContext context;
        private readonly IShortestChain shortestChainHelper;

        public ContractController(InsuranceContractingContext context, IShortestChain shortestChainHelper)
        {
            this.context = context;
            this.shortestChainHelper = shortestChainHelper;
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
        public ActionResult<List<string>> getShortestContractChain([FromQuery] string firstContractorId, [FromQuery] string secondContractorId)
        {
            List<Contract> contracts = context.Contracts.ToList();

            List<string> shortestChainIds = shortestChainHelper.FindShortestChain(contracts, firstContractorId, secondContractorId);

            return FindContractChainNames(shortestChainIds);
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
            bool contractExist = context.Contracts.Any(c => ((c.FirstContractorId == contract.FirstContractorId && c.SecondContractorId == contract.SecondContractorId)
                || (c.FirstContractorId == contract.SecondContractorId && c.SecondContractorId == contract.FirstContractorId)));

            return contractExist;
        }

        private List<string> FindContractChainNames(List<string> contractChainsIds)
        {
            List<string> contractChainNames = new List<string>();

            if (contractChainsIds.Any())
            {
                foreach (string chainId in contractChainsIds)
                {
                    contractChainNames.Add(context.Contractors.First(c => c.Id == chainId).Name);
                }
            }

            return contractChainNames;
        }
    }
}