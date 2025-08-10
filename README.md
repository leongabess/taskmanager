##  TaskerManager

Gerenciador de tarefas com foco em permitir que usuários criem, visualizem, atualizem e removam tarefas associadas a seus perfis. Suporta filtragem por status e operações via API.

<br><br>

##  Sobre o projeto

TaskerManager foi baseado no meu projeto [TaskManagerCLI](https://github.com/leongabess/TaskManagerCLI), um desafio do roadmap.sh. 

O projeto em CLI fazia coisas básicas como obter e salvar as tarefas em um .JSON, porém resolvi aplicar o conceito do CRUD (que passou por várias alterações) em uma aplicação backend, utilizando o Express e PostgreSQL (para substituir o .JSON). O frontend foi feito com CSS simples junto do JavaScript para a lógica.


Os testes e chamadas à API foram realizados pelo postman.

A API, backend e banco de dados (no momento) estão hospedados no [render](https://taskmanager-gb90.onrender.com), e o front-end no [vercel](https://taskmanager-topaz-six.vercel.app/login.html).

<br><br>

##  Tecnologias

- Node.js + Express  
- PostgreSQL  
- Docker (para finalidade de portabilidade)
<br><br>

##  Funcionalidades atuais

- Cadastro de usuários, com bcrypt para criptografar a senha no banco de dados
- Login utilizando JWT 
- Criação de tarefas vinculadas ao usuário  
- Listagem de tarefas, com filtro por status  
- Atualização do status da tarefa
- Remoção de tarefas
<br><br>

##  Como usar

No postman, os testes foram utilizados no body, usando tipo raw e json.
1. Clone o repositório:

```git clone https://github.com/leongabess/TaskManager.git```

    
2. Dentro da pasta, no terminal, utilize o docker compose:

```
cd TaskManager
docker compose up
``` 

3. A API estará disponível na porta 5000:

```http://localhost:5000/api/tasks```

4. Exemplos de uso via HTTP:
- Registro de usuários:
```POST http://localhost:5000/auth/register```
Utilizar {"user": exemplo,
"password": "exemplo"}

- Login
```POST http://localhost:5000/auth/login```
Também utilizar {"user": "exemplo",
"password": "exemplo"}

Para chamadas relacionadas a manipulação das tarefas, primeiro deve usar o token gerado na parte de "bearer token".

- Adicionar tarefas:
```POST http://localhost:5000/api/tasks```
Utilizar {"title": "titulo da tarefa",
"description": "descrição da tarefa",
"status": "status da tarefa"}
- Listar todas as tarefas:

```GET http://localhost:5000/api/tasks```

- Listar tarefas por status:

```GET http://localhost:5000/api/tasks?status={exemploDeStatus}```

- Atualização de status das tarefas:
``` PATCH http://localhost:5000/api/tasks/{idDaTarefaAqui}
{"status": "exemploDeStatus"}
```
- Remoção de tarefas:
``` DELETE http://localhost:5000/api/tasks/{idDaTarefaAqui}```

<br><br>

##  Planos futuros
-  Sistema de compartilhamento de grupo de tarefas entre usuários
- Melhora no frontend
- Adaptar para mobile
