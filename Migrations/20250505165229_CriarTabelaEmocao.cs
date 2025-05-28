using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Botaodobem.Migrations
{
    /// <inheritdoc />
    public partial class CriarTabelaEmocao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Emocoes",
                table: "Emocoes");

            migrationBuilder.RenameTable(
                name: "Emocoes",
                newName: "Emocao");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Emocao",
                table: "Emocao",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Emocao",
                table: "Emocao");

            migrationBuilder.RenameTable(
                name: "Emocao",
                newName: "Emocoes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Emocoes",
                table: "Emocoes",
                column: "Id");
        }
    }
}
