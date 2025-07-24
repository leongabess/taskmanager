## 🚀 TaskerManager

Gerenciador de tarefas com foco em permitir que usuários criem, visualizem, atualizem e removam tarefas associadas a suas contas. Suporta filtragem por status e operações específicas via API REST.

<br><br>

## 📋 Sobre o projeto

TaskerManager é uma evolução do meu projeto [TaskManagerCLI](https://github.com/leongabess/TaskManagerCLI), um desafio do roadmap.sh. 

Enquanto o CLI atendia às funcionalidades básicas via linha de comando, aqui a proposta é oferecer um backend completo com lógica para gerenciar tarefas de múltiplos usuários, utilizando uma API REST em JavaScript com Express e banco de dados PostgreSQL (substituindo o armazenamento em arquivos JSON). 

Os testes e chamadas à API são realizados por ferramentas como Postman e Insomnia.

Posteriormente será implementada a parte do frontend, onde essas etapas serão feitas pelo usuário através da interface.

<br><br>

## 🛠️ Tecnologias

- Node.js + Express  
- PostgreSQL  
- Docker (para facilitar execução)
<br><br>

## ⚙️ Funcionalidades atuais

- Cadastro de usuários (planejado, ainda em desenvolvimento)  
- Criação de tarefas vinculadas ao usuário  
- Listagem de tarefas, com filtro por status  
- Atualização do status de uma tarefa pelo título  
- Remoção de tarefas pelo título ou remoção de todas as tarefas que atendam um status
<br><br>

## 🚀 Como usar

1. Clone o repositório:

```git clone https://github.com/leongabess/TaskManager.git```

    
2. Entre na pasta e rode o docker:

```
cd TaskManager
docker compose up
``` 

3. A API estará disponível na porta 5000:

```http://localhost:5000/api/tasks```

4. Exemplos de uso via HTTP:

- Listar todas as tarefas:

```GET http://localhost:5000/api/tasks```

- Listar tarefas por status:

```GET http://localhost:5000/api/tasks?status=done```

<br><br>
## 👣 Próximos passos

- Desenvolvimento do front-end para interação do usuário

- Tela inicial com descrição e instruções

- Páginas para criação, atualização e remoção de tarefas via interface gráfica

- Sistema de autenticação e gerenciamento de usuários
