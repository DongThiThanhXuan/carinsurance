using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BackEnd.Models
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<Brandvehicle> Brandvehicles { get; set; } = null!;
        public virtual DbSet<Claim> Claims { get; set; } = null!;
        public virtual DbSet<Claimdetail> Claimdetails { get; set; } = null!;
        public virtual DbSet<Estimate> Estimates { get; set; } = null!;
        public virtual DbSet<Policy> Policys { get; set; } = null!;
        public virtual DbSet<Vehicle> Vehicles { get; set; } = null!;



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("account");

                entity.Property(e => e.Accountid).HasColumnName("accountid");

                entity.Property(e => e.Accountadd)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("accountadd");

                entity.Property(e => e.Accountemail)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("accountemail");

                entity.Property(e => e.Accountname)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("accountname");

                entity.Property(e => e.Accountphone)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("accountphone");

                entity.Property(e => e.Accountstatus).HasColumnName("accountstatus");

                entity.Property(e => e.Passwords)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("passwords");

                entity.Property(e => e.Personid)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("personid");

                entity.Property(e => e.Roles)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("roles");
            });

            modelBuilder.Entity<Brandvehicle>(entity =>
            {
                entity.HasKey(e => e.Brandid)
                    .HasName("PK__brandveh__06B67EB14FA6C186");

                entity.ToTable("brandvehicle");

                entity.Property(e => e.Brandid).HasColumnName("brandid");

                entity.Property(e => e.Brandname)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("brandname");
            });

            modelBuilder.Entity<Claim>(entity =>
            {
                entity.ToTable("claim");

                entity.Property(e => e.Claimid).HasColumnName("claimid");

                entity.Property(e => e.ApprovalVehiclebodymoney)
                    .HasColumnType("decimal(10, 0)")
                    .HasColumnName("approvalVehiclebodymoney");

                entity.Property(e => e.ApprovalVehiclemoney)
                    .HasColumnType("decimal(10, 0)")
                    .HasColumnName("approvalVehiclemoney");

                entity.Property(e => e.Approvalstt).HasColumnName("approvalstt");

                entity.Property(e => e.Approvalvehicleaccidentmoney)
                    .HasColumnType("decimal(10, 0)")
                    .HasColumnName("approvalvehicleaccidentmoney");

                entity.Property(e => e.Approvalvehicletheftmoney)
                    .HasColumnType("decimal(10, 0)")
                    .HasColumnName("approvalvehicletheftmoney");

                entity.Property(e => e.Claimstt).HasColumnName("claimstt");

                entity.Property(e => e.Estimateid).HasColumnName("estimateid");

                entity.Property(e => e.Reamark)
                    .IsUnicode(false)
                    .HasColumnName("reamark");

                entity.Property(e => e.Submitdate)
                    .HasColumnType("date")
                    .HasColumnName("submitdate");

                entity.Property(e => e.Vehicleaccidentmoney)
                    .HasColumnType("decimal(10, 0)")
                    .HasColumnName("vehicleaccidentmoney");

                entity.Property(e => e.Vehicleaccidentstt).HasColumnName("vehicleaccidentstt");

                entity.Property(e => e.Vehiclebodymoney).HasColumnType("decimal(10, 0)");

                entity.Property(e => e.Vehiclemoney).HasColumnType("decimal(10, 0)");

                entity.Property(e => e.Vehicletheftmoney)
                    .HasColumnType("decimal(10, 0)")
                    .HasColumnName("vehicletheftmoney");

                entity.Property(e => e.Vehicletheftstt).HasColumnName("vehicletheftstt");

                entity.HasOne(d => d.Estimate)
                    .WithMany(p => p.Claims)
                    .HasForeignKey(d => d.Estimateid)
                    .HasConstraintName("FK__claim__estimatei__31EC6D26");
            });

            modelBuilder.Entity<Claimdetail>(entity =>
            {
                entity.HasKey(e => e.Claimdetailsid)
                    .HasName("PK__claimdet__543A5A140BADD987");

                entity.ToTable("claimdetails");

                entity.Property(e => e.Claimdetailsid).HasColumnName("claimdetailsid");

                entity.Property(e => e.Claimid).HasColumnName("claimid");

                entity.Property(e => e.Filenames)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("filenames");

                entity.HasOne(d => d.Claim)
                    .WithMany(p => p.Claimdetails)
                    .HasForeignKey(d => d.Claimid)
                    .HasConstraintName("FK__claimdeta__claim__34C8D9D1");
            });

            modelBuilder.Entity<Estimate>(entity =>
            {
                entity.ToTable("estimate");

                entity.Property(e => e.Estimateid).HasColumnName("estimateid");

                entity.Property(e => e.Accountid).HasColumnName("accountid");

                entity.Property(e => e.Buyyear).HasColumnName("buyyear");

                entity.Property(e => e.Expirationdate)
                    .HasColumnType("date")
                    .HasColumnName("expirationdate");

                entity.Property(e => e.Insurancefee)
                    .HasColumnType("decimal(10, 0)")
                    .HasColumnName("insurancefee");

                entity.Property(e => e.Marketvalue)
                    .HasColumnType("decimal(10, 0)")
                    .HasColumnName("marketvalue");

                entity.Property(e => e.Numberyear).HasColumnName("numberyear");

                entity.Property(e => e.Paymentdate)
                    .HasColumnType("date")
                    .HasColumnName("paymentdate");

                entity.Property(e => e.Paypalbillno)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("paypalbillno");

                entity.Property(e => e.Policyid).HasColumnName("policyid");

                entity.Property(e => e.Remark)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("remark");

                entity.Property(e => e.Valueestimate)
                    .HasColumnType("decimal(10, 0)")
                    .HasColumnName("valueestimate");

                entity.Property(e => e.Vehiclebodynumber)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("vehiclebodynumber");

                entity.Property(e => e.Vehicleenginenumber)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("vehicleenginenumber");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Estimates)
                    .HasForeignKey(d => d.Accountid)
                    .HasConstraintName("FK__estimate__accoun__2E1BDC42");

                entity.HasOne(d => d.Policy)
                    .WithMany(p => p.Estimates)
                    .HasForeignKey(d => d.Policyid)
                    .HasConstraintName("FK__estimate__policy__2F10007B");
            });

            modelBuilder.Entity<Policy>(entity =>
            {
                entity.ToTable("policys");

                entity.Property(e => e.Policyid).HasColumnName("policyid");

                entity.Property(e => e.Flood).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.Insurancepercent)
                    .HasColumnType("decimal(5, 2)")
                    .HasColumnName("insurancepercent");

                entity.Property(e => e.Policystatus).HasColumnName("policystatus");

                entity.Property(e => e.Vehicleaccident)
                    .HasColumnType("decimal(5, 2)")
                    .HasColumnName("vehicleaccident");

                entity.Property(e => e.Vehiclebody).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.Vehicleengine).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.Vehicleid).HasColumnName("vehicleid");

                entity.Property(e => e.Vehicletheft)
                    .HasColumnType("decimal(5, 2)")
                    .HasColumnName("vehicletheft");

                entity.Property(e => e.Vehiclewarranty)
                    .HasColumnType("decimal(5, 2)")
                    .HasColumnName("vehiclewarranty");

                entity.HasOne(d => d.Vehicle)
                    .WithMany(p => p.Policies)
                    .HasForeignKey(d => d.Vehicleid)
                    .HasConstraintName("FK__policys__vehicle__2B3F6F97");
            });

            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.ToTable("vehicle");

                entity.Property(e => e.Vehicleid).HasColumnName("vehicleid");

                entity.Property(e => e.Brandid).HasColumnName("brandid");

                entity.Property(e => e.Vehiclemodel)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("vehiclemodel");

                entity.Property(e => e.Vehicleprice)
                    .HasColumnType("decimal(10, 0)")
                    .HasColumnName("vehicleprice");

                entity.Property(e => e.Vehicleversion)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("vehicleversion");

                entity.Property(e => e.Yearofmanufacture).HasColumnName("yearofmanufacture");

                entity.HasOne(d => d.Brand)
                    .WithMany(p => p.Vehicles)
                    .HasForeignKey(d => d.Brandid)
                    .HasConstraintName("FK__vehicle__brandid__286302EC");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
