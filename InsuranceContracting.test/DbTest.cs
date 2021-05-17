using InsuranceContracting.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Data.Common;

namespace InsuranceContracting.test
{
    [TestClass]
    public abstract class DbTest : IDisposable
    {
        private DbConnection connection = default!;

        protected InsuranceContractingContext Context { get; private set; } = default!;

        [TestInitialize]
        public void initialize()
        {
            DbContextOptions<InsuranceContractingContext> optionsContext = new DbContextOptionsBuilder<InsuranceContractingContext>()
                .UseInMemoryDatabase("DbTest")
                .Options;

            Context = new InsuranceContractingContext(optionsContext);

            Context.Database.EnsureCreated();

        }

        [TestCleanup]
        public void Remove()
        {
            connection?.Dispose();
            Context?.Dispose();
        }

        public void Dispose()
        {
            connection?.Dispose();
            Context?.Dispose();
        }
    }
}
