using InsuranceContracting.Models;
using System.Collections.Generic;

namespace InsuranceContracting.Helpers
{
    public interface IShortestChain
    {
        List<string> FindShortestChain(List<Contract> contracts, string source, string destination);
    }
}
