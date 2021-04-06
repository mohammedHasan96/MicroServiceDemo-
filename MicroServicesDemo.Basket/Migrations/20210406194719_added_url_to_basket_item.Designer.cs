﻿// <auto-generated />
using MicroServicesDemo.Basket.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace MicroServicesDemo.Basket.Migrations
{
    [DbContext(typeof(BasketDbContext))]
    [Migration("20210406194719_added_url_to_basket_item")]
    partial class added_url_to_basket_item
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.4")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("MicroServicesDemo.Basket.Models.BasketEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("PictureUrl")
                        .HasColumnType("text");

                    b.Property<int>("ProductId")
                        .HasColumnType("integer");

                    b.Property<string>("ProductName")
                        .HasColumnType("text");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer");

                    b.Property<float>("UnitPrice")
                        .HasColumnType("real");

                    b.Property<string>("UserName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Baskets");
                });
#pragma warning restore 612, 618
        }
    }
}
