using System.ComponentModel;

namespace InsuranceContracting.Models
{
    public enum HealthStatus
    {
        Green,
        Yellow,
        Red
    }

    public static class HealthStatusProbability
    {
        public static string Probability(this HealthStatus healthStatus)
        {
            switch (healthStatus)
            {
                case HealthStatus.Green:
                    return "60%";
                case HealthStatus.Yellow:
                    return "20%";
                case HealthStatus.Red:
                    return "20%";
                default:
                    throw new InvalidEnumArgumentException();
            }
        }
    }
}
