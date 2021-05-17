namespace InsuranceContracting.Models
{
    public class Contractor
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public long PhoneNumber { get; set; }
        public TypeContractor Type { get; set; }
        public HealthStatus HealthStatus { get; set; }

    }
}
