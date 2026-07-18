# Fleet Monitor

Aplicação desenvolvida para o desafio técnico de monitoramento de máquinas, composta por uma API REST, uma interface web e um banco de dados PostgreSQL.

O sistema permite gerenciar máquinas, importar eventos operacionais e acompanhar indicadores através de uma dashboard.

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
- Recharts
- shadcn/ui

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

Responsabilidades:

- **Controller**: recebe e valida as requisições HTTP.
- **Service**: contém as regras de negócio.
- **Repository**: realiza o acesso aos dados.
- **Prisma**: comunicação com o banco PostgreSQL.

---

## Frontend

O frontend foi organizado por módulos para facilitar manutenção e escalabilidade.

```
Pages
    ↓
Modules
    ↓
Components
    ↓
Hooks
    ↓
Services
    ↓
API
```

Cada módulo concentra seus próprios componentes, hooks, serviços, tipos e utilitários.

---

# Como executar

## Pré-requisitos

- Docker
- Docker Compose

## Executando o projeto

```bash
docker compose up --build
```

Durante a inicialização são executados automaticamente:

- criação do banco;
- migrations do Prisma;
- seed dos dados;
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

- Importação automática via Seed
- Relacionamento utilizando o `machineCode`
- Validação durante a importação
- Tratamento de inconsistências

## Dashboard

- Cards com indicadores consolidados
- Gráfico de horas por grupo de evento
- Indicadores por máquina
- Disponibilidade operacional
- Eficiência operacional
- Consulta por período

---

# Tratamento dos dados

O arquivo `events.json` contém dados propositalmente inconsistentes.

Durante a importação foi adotada a seguinte estratégia.

## Eventos em aberto

- Eventos em aberto (`endTime = null`) não contabilizam horas.

## Máquina inexistente

Eventos cujo `machineCode` não existe no cadastro de máquinas são ignorados.

## Horário inválido

Eventos cujo `startTime` seja maior que `endTime` são considerados inválidos.

## Eventos duplicados

Eventos com o mesmo identificador (`id`) são ignorados.

## Eventos sobrepostos

Os eventos sobrepostos foram preservados.

Como o desafio não define regras de prioridade entre estados concorrentes, optou-se por manter os dados originais sem aplicar regras de negócio arbitrárias.

---

# Decisões Técnicas

Durante o desenvolvimento foram adotadas as seguintes decisões:

- Utilização do `machineCode` como identificador de negócio.
- Exclusão lógica (Soft Delete) para preservar histórico.
- Repository Pattern para desacoplamento da persistência.
- Organização do frontend em módulos.
- React Query para gerenciamento das consultas.
- Recharts para visualização dos indicadores.
- Componentes reutilizáveis utilizando shadcn/ui.
- Datas armazenadas em UTC no backend e apresentadas no fuso `America/Sao_Paulo` no frontend.
- Docker Compose para padronização do ambiente.
- Execução automática de migrations e seed durante a inicialização.

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
│   └── ui/
├── modules/
│   └── dashboard/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── utils/
└── lib/
```

---

# Testes

Os testes unitários foram implementados utilizando **Vitest**, cobrindo as principais regras de negócio responsáveis pelo cálculo dos indicadores da dashboard.

Atualmente são testados:

- Cálculo da duração dos eventos
- Tratamento de eventos em aberto (`endTime = null`)
- Tratamento de horários inválidos (`endTime < startTime`)
- Cálculo dos indicadores por máquina
- Cálculo dos indicadores da frota
- Agrupamento dos dados para o gráfico

Para executar os testes:

```bash
npm test
```

# Autor

**João Elias**