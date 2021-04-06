using Microsoft.EntityFrameworkCore.Migrations;

namespace MicroServicesDemo.Basket.Migrations
{
    public partial class added_url_to_basket_item : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PictureUrl",
                table: "Baskets",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PictureUrl",
                table: "Baskets");
        }
    }
}
