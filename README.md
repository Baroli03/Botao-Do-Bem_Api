# 📚 Botão do Bem

## 🧾 Descrição

> O Botão do Bem é uma iniciativa solidária que conecta pessoas dispostas a ajudar quem precisa, promovendo pequenas ações de empatia e apoio no dia a dia.

---

## 👥 Integrantes da Dupla

- Nome Completo do Aluno 1 - [usuario Github](https://github.com/Baroli03)
- Nome Completo do Aluno 2 - [usuario Github](https://github.com/vicmg12)

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** C# (.NET 8)
- **Framework:** ASP.NET Core - Minimal API
- **ORM:** Entity Framework Core
- **Banco de Dados:** SQLite
- **Front-end:** JavaScript
- **Versionamento:** Git + GitHub

---

💡 Observação sobre o Front-end

Para que o front-end consiga se comunicar corretamente com a API do Botão do Bem, ele deve ser executado na porta 8080 no seu ambiente local.

Isso significa que, ao iniciar o servidor ou serviço que serve os arquivos do front-end (por exemplo, um servidor HTTP simples, Vite, Webpack Dev Server, Live Server, ou outro), configure para que ele fique disponível em:

http://localhost:8080

Dessa forma, o front-end e o back-end estarão corretamente configurados para troca de dados, evitando problemas de CORS e facilitando o funcionamento das requisições para o endereço da API.

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [.NET SDK 8.0+](https://dotnet.microsoft.com/en-us/download)
- [SQLite](https://www.sqlite.org/download.html)
- Git instalado

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/Baroli03/Botao-Do-Bem_Api.git

# 2. Acesse a pasta do projeto
cd Botaodobem

# 3. Restaure os pacotes
dotnet restore

# 4. Execute a aplicação
dotnet run
