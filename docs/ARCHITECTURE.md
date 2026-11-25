# 🏗️ Arquitetura do Projeto - Feature-Based Structure

## Visão Geral

O projeto utiliza uma **arquitetura orientada por features** (Feature-Based ou Domain-Driven) que oferece melhor escalabilidade, modularidade e manutenibilidade.

## Estrutura

```
src/
├── features/
│   └── candidates/              # Feature: Candidates
│       ├── api/
│       │   ├── candidates.ts    # API calls & mocks
│       │   └── mock-candidates.ts
│       ├── components/
│       │   ├── CandidatePage.tsx
│       │   ├── CandidateCard.tsx
│       │   ├── CandidateList.tsx
│       │   └── CandidateFilters.tsx
│       ├── hooks/
│       │   └── useCandidates.ts # Custom hooks
│       ├── types.ts             # Feature types
│       ├── tests/               # Feature tests
│       └── index.ts             # Barrel export
│
├── shared/
│   └── ui/                      # Reusable UI components
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Layout.tsx
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       ├── Icons.tsx
│       └── index.ts
│
├── types.ts                     # Global types
├── App.tsx
└── main.tsx
```

## Princípios

### 1. **Features Independentes**
Cada feature é auto-contida e pode ser desenvolvida independentemente:
- `api/`: Chamadas de API e mocks
- `components/`: Componentes específicos da feature
- `hooks/`: Lógica compartilhada da feature
- `types.ts`: Tipos específicos da feature

### 2. **Shared UI Centralizado**
Componentes genéricos reutilizáveis:
```typescript
// Reutilizável em qualquer feature
import { Button, Layout, Header } from "@/shared/ui";
```

### 3. **Barrel Exports**
Cada feature tem um `index.ts` para facilitar imports:
```typescript
// Importar tudo de uma feature
import { CandidatePage, useCandidates, candidatesApi } from "@/features/candidates";

// Em vez de:
import CandidatePage from "@/features/candidates/components/CandidatePage";
import { useCandidates } from "@/features/candidates/hooks/useCandidates";
```

## Vantagens

✅ **Escalabilidade**
- Adicionar nova feature é trivial
- Estrutura pronta para crescimento

✅ **Modularidade**
- Cada feature é independente
- Fácil remover ou reorganizar

✅ **Colaboração**
- Equipes podem trabalhar em features diferentes
- Menos conflitos de merge

✅ **Manutenibilidade**
- Código agrupado por domínio
- Fácil encontrar código relacionado

✅ **Testabilidade**
- Hooks e API isolados
- Fácil testar feature independentemente

## Como Adicionar Uma Nova Feature

### 1. Criar estrutura de diretórios
```bash
mkdir -p src/features/jobs/{api,components,hooks,tests}
```

### 2. Criar tipos (types.ts)
```typescript
// src/features/jobs/types.ts
import type { Job } from "@/types";

export type JobFilters = {
  title?: string;
  department?: string;
  status?: "open" | "closed";
};

export type JobListProps = {
  jobs: Job[];
  isLoading?: boolean;
};
```

### 3. Criar API (api/jobs.ts)
```typescript
// src/features/jobs/api/jobs.ts
import { mockJobs } from "./mock-jobs";

export const jobsApi = {
  async list(filters?: JobFilters) {
    // Implementar fetch real ou retornar mock
    return mockJobs.filter(/* ... */);
  }
};
```

### 4. Criar Hook (hooks/useJobs.ts)
```typescript
// src/features/jobs/hooks/useJobs.ts
import { useQuery } from "@tanstack/react-query";
import { jobsApi } from "../api/jobs";

export function useJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: () => jobsApi.list(),
  });
}
```

### 5. Criar Componentes
```typescript
// src/features/jobs/components/JobPage.tsx
import { Layout, Header } from "@/shared/ui";
import { useJobs } from "../hooks/useJobs";

export default function JobPage() {
  const { data: jobs } = useJobs();
  // ...
}
```

### 6. Criar index.ts
```typescript
// src/features/jobs/index.ts
export { default as JobPage } from "./components/JobPage";
export { useJobs } from "./hooks/useJobs";
export { jobsApi } from "./api/jobs";
export type { JobFilters } from "./types";
```

### 7. Usar no App
```typescript
import { JobPage } from "@/features/jobs";
```

## Convenções

| Local | Responsabilidade |
|-------|-----------------|
| `api/` | Fetch, mocks, transformações |
| `components/` | Componentes visuais da feature |
| `hooks/` | Lógica reutilizável (react-query, estado) |
| `types.ts` | Tipos específicos da feature |
| `index.ts` | Barrel export público |
| `shared/ui/` | Componentes genéricos, ícones |
| `src/types.ts` | Tipos globais |

## Exemplo de Fluxo

```
CandidatePage (components/)
  ├─ useCandidates (hooks/)
  │   └─ candidatesApi.list() (api/)
  ├─ CandidateList (components/)
  │   └─ CandidateCard (components/)
  │       └─ StatusBadge (shared/ui/)
  └─ Layout (shared/ui/)
```

## Migrando código legado

Quando encontrar código na raiz:
1. Identificar a feature que pertence
2. Mover para `src/features/<feature>/`
3. Atualizar imports
4. Remover código antigo

## Referências

- [Feature-Driven Development](https://en.wikipedia.org/wiki/Feature-driven_development)
- [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)
- [Next.js App Router Architecture](https://nextjs.org/docs/app)
