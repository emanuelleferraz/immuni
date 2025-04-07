# Immuni - Sistema para Gerenciamento de Vacinas - CSI606 Sistemas Web I

# Documentação
O diretório contendo os protótipos se encontram em [assets](./assets/). A [proposta final](./assets/README.md) de elaboração do trabalho prático pode ser encontrada nesse mesmo diretório.

# Sobre o sistema
Este trabalho propõe o desenvolvimento de um sistema web que funcionará como um **Gerenciador de Vacinas**, visando auxiliar no controle e no registro de vacinas tomadas por usuários. O sistema permitirá o acompanhamento das vacinas recomendadas de acordo com a idade, bem como o cadastro de usuários e de vacinas. Seu principal objetivo é oferecer uma ferramenta prática e intuitiva para o gerenciamento do histórico de vacinação, promovendo maior organização e cuidado com a saúde.  

# 🛠️ Ferramentas Necessárias para o Funcionamento do Sistema:

[![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[![Express.js](https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

[![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

[![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)

[![Bootstrap](https://img.shields.io/badge/-Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

[![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

# 🧮 Modelo Lógico

![Modelo Lógico](./assets/immune.png)

# 🖥️ Estrutura do Projeto

![Estruturação](./assets/arquitetura.png)

O projeto Immuni foi desenvolvido utilizando uma arquitetura MVC (Model-View-Controller) com Node.js como ambiente de execução, Express.js como framework web e Sequelize como ORM (Object-Relational Mapping) para conexão com o banco de dados MySQL. Essa estrutura organiza o sistema em camadas bem definidas, cada uma com responsabilidades específicas, promovendo separação de conceitos e facilitando a manutenção do código.

# Funcionalidades Implementadas

### 📊 Dashboard Interativa
- Visualização do progresso de vacinação
- Exibição de vacinas tomadas e pendentes
- Comparativo entre vacinas tomadas vs. pendentes
- Porcentagem do total de vacinas já administradas

### 📝 Registro de Vacinas
- Formulário de cadastro de vacinação
- Captura de dados da aplicação (data, vacina, dose)

### 📋 Lista de Vacinas
Catálogo completo com:
- Nome da vacina
- Descrição detalhada
- Periodicidade necessária
- Idade ideal para aplicação
- Indicador de obrigatoriedade

### 🔐 Autenticação de Usuários
- Sistema de Login
- Fluxo de Cadastro de novos usuários
- Gerenciamento de sessão

# 🚀 Executando o Immuni

## ⚙️ Instalação das Dependências e Execução

Execute os seguintes comandos em sequência no terminal:

```bash
# Inicializa o projeto Node.js (caso não tenha feito ainda)
npm init -y

# Instala as dependências principais
npm install express mysql2 sequelize bcryptjs

# Instala dependências de sessão e autenticação
npm install cookie-parser cookie-session express-session connect-flash express-flash session-file-store

# Instala o nodemon para desenvolvimento
npm install --save-dev nodemon

# Instala o express-handlebars (template engine)
npm install express-handlebars

# Cria a estrutura básica de pastas (opcional)
mkdir -p models/ controllers/ views/ routes/ config/ public/

# Executando

npm start
```
# Referências

- BRASIL. **Cartilha Vacinas**. Ministério da Saúde. Disponível em: <https://meususdigital.saude.gov.br/publico/cartilha-vacinas>. 

- **Express.js Documentation**. Disponível em: <https://expressjs.com/> 