using InsuranceContracting.Models;
using Microsoft.EntityFrameworkCore;

namespace InsuranceContracting.Data
{
    public class InsuranceContractingContext : DbContext
    {
        public InsuranceContractingContext(DbContextOptions<InsuranceContractingContext> options) : base(options)
        {
        }

        public DbSet<Contractor> Contractors => Set<Contractor>();
        public DbSet<Contract> Contracts => Set<Contract>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contractor>().HasKey(contractor => contractor.Id);

            modelBuilder.Entity<Contract>().HasKey(contract => new { contract.FirstContractorId, contract.SecondContractorId });

            modelBuilder.Entity<Contract>()
                .HasOne<Contractor>()
                .WithOne()
                .HasForeignKey<Contract>(contract => contract.FirstContractorId);

            modelBuilder.Entity<Contract>()
                .HasOne<Contractor>()
                .WithOne()
                .HasForeignKey<Contract>(contract => contract.SecondContractorId);
        }
    }
}
