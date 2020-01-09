using Microsoft.EntityFrameworkCore.Migrations;

namespace PlatformManagementConsole.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Resolvers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Guid = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    DeviceType = table.Column<string>(nullable: true),
                    Platform = table.Column<string>(nullable: true),
                    OsVersion = table.Column<string>(nullable: true),
                    OEM = table.Column<string>(nullable: true),
                    Model = table.Column<string>(nullable: true),
                    IsOnline = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resolvers", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Resolvers");
        }
    }
}
