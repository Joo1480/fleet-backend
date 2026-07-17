# Fleet Monitor

Aplicação desenvolvida para o desafio técnico de monitoramento de máquinas, composta por uma API REST, uma interface web e um banco de dados PostgreSQL.

O objetivo é gerenciar o cadastro de máquinas, importar eventos operacionais e apresentar indicadores por meio de uma dashboard.

---

# Tecnologias

## Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL

## Frontend

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod

## Infraestrutura

- Docker
- Docker Compose

---

# Arquitetura

## Backend

O backend foi organizado utilizando separação por camadas.

```
Controller
    ↓
Service
    ↓
Repository
    ↓
Prisma
    ↓
PostgreSQL
```

Cada camada possui uma responsabilidade específica:

- **Controller**: recebe as requisições HTTP.
- **Service**: contém as regras de negócio.
- **Repository**: responsável pelo acesso aos dados.
- **Prisma**: comunicação com o banco de dados.

---

## Frontend

O frontend foi desenvolvido utilizando Next.js com componentes reutilizáveis e separação entre páginas, serviços e hooks.

Estrutura simplificada:

```
Pages
    ↓
Components
    ↓
Hooks
    ↓
Services
    ↓
API
```

---

# Como executar

## Pré-requisitos

- Docker
- Docker Compose

## Executando o projeto

```bash
docker compose up --build
```

Ao iniciar o ambiente, são executados automaticamente:

- criação do banco de dados;
- migrations do Prisma;
- seed das tabelas;
- inicialização da API;
- inicialização do Frontend.

---

# Acessos

Frontend

```
http://localhost:3001
```

Backend

```
http://localhost:3000
```

---

# Funcionalidades implementadas

## Máquinas

- Cadastro
- Listagem
- Alteração
- Exclusão lógica (Soft Delete)
- Busca por código e descrição
- Paginação
- Validação de código duplicado

## Eventos

- Importação via Seed
- Relacionamento com máquinas através do `machineCode`
- Validação dos dados durante a importação

## Dashboard

🚧 Em desenvolvimento.

---

# Tratamento dos dados

O arquivo `events.json` contém dados propositalmente inconsistentes. Durante a importação foi adotada a seguinte estratégia.

## Eventos em aberto

Eventos com `endTime = null` são considerados eventos ainda em andamento e são importados normalmente.

---

## Máquina inexistente

Eventos cujo `machineCode` não existe no cadastro de máquinas são ignorados.

---

## Horário inválido

Eventos cujo `startTime` seja maior que `endTime` são considerados inválidos e são ignorados.

---

## Eventos duplicados

Eventos com o mesmo identificador (`id`) são ignorados durante a importação.

---

## Eventos sobrepostos

Eventos sobrepostos foram mantidos.

Como o desafio não define uma regra de prioridade entre estados concorrentes, optou-se por preservar os dados originais e evitar decisões de negócio não especificadas.

---

# Decisões Técnicas

Durante o desenvolvimento foram adotadas as seguintes decisões:

- Utilização do `machineCode` como chave de relacionamento dos eventos, por representar o identificador de negócio da máquina.
- Exclusão lógica (`Soft Delete`) para preservar o histórico de máquinas.
- Utilização do Repository Pattern para desacoplamento do acesso aos dados.
- Docker Compose para facilitar a configuração do ambiente.
- Execução automática de migrations e seed durante a inicialização do projeto.

---

# Estrutura do Projeto

```
backend/
│
├── prisma/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── dtos/
│   ├── schemas/
│   └── shared/
│
frontend/
│
├── app/
├── components/
├── hooks/
├── services/
├── types/
└── utils/
```

---

# Melhorias futuras

- Dashboard operacional
- Indicadores de disponibilidade
- Gráficos
- Testes automatizados
- Logs estruturados
- Monitoramento
- Cache de consultas

---

# Autor

**João Elias**