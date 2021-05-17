using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InsuranceContracting.Data;
using InsuranceContracting.Models;
using InsuranceContracting.Transfer;
using Microsoft.AspNetCore.Mvc;

namespace InsuranceContracting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractorController : ControllerBase
    {
        private readonly InsuranceContractingContext context;

        public ContractorController(InsuranceContractingContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public ActionResult<List<Contractor>> GetContractors()
        {
            return context.Contractors.ToList();
        }

        [HttpPost]
        public async Task<ActionResult> AddContractor(ContractorRequestDto contractorDto)
        { 
            if (IsContractorExist(contractorDto.Name))
            {
                return BadRequest("Contractor already exist.");
            }

            Contractor newContractor = new Contractor()
            {
                Id = Guid.NewGuid().ToString("n").Substring(0, 10),
                Name = contractorDto.Name,
                Address = contractorDto.Address,
                PhoneNumber = contractorDto.PhoneNumber,
                Type = contractorDto.Type,
                HealthStatus = contractorDto.HealthStatus
            };

            context.Contractors.Add(newContractor);

            await context.SaveChangesAsync();

            return Ok();
        }

        private bool IsContractorExist(string name)
        {
            return context.Contractors.Any(c => string.Equals(c.Name, name, StringComparison.OrdinalIgnoreCase));
        }
    }
}