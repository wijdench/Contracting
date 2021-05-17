using InsuranceContracting.Models;
namespace InsuranceContracting.Transfer
{
    public class ContractorRequestDto
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public long PhoneNumber { get; set; }
        public TypeContractor Type { get; set; }
        public HealthStatus HealthStatus { get; set; }
    }
}
