# Arquitetura de Componentes

## 📋 Visão Geral

Os componentes foram organizados em uma estrutura modular e reutilizável para implementar a interface de dashboard de candidatos de forma escalável.

## 🏗️ Estrutura de Componentes

```
src/components/
├── ui/                          # Componentes de UI reutilizáveis
│   ├── Badge.tsx               # StatusBadge e ScoreBadge
│   ├── Button.tsx              # Componente Button genérico
│   ├── CandidateCard.tsx        # Card individual de candidato
│   ├── CandidateList.tsx        # Lista/tabela de candidatos
│   ├── Header.tsx              # Header com breadcrumb e search
│   ├── Layout.tsx              # Layout principal (sidebar + content)
│   ├── Sidebar.tsx             # Navegação lateral
│   └── index.ts                # Exports centralizados
└── QueryExample.tsx             # Página principal de Candidates
```

## 🔧 Componentes Criados

### 1. **Badge.tsx** (Componentes de Status e Score)
**Justificativa:**
- Reutilizável em múltiplos contextos (cards, tabelas, etc)
- Separação clara de preocupações (styling do status/score)
- Fácil manutenção de cores e estilos

**Componentes:**
- `StatusBadge`: Exibe status do candidato com cor específica
- `ScoreBadge`: Exibe score em formato de círculo colorido

### 2. **Button.tsx** (Componente de Botão Genérico)
**Justificativa:**
- Consistência de estilo em toda a aplicação
- Variantes reutilizáveis (primary, secondary, ghost, danger)
- Suporte a ícones e tamanhos customizáveis

### 3. **CandidateCard.tsx** (Card Individual)
**Justificativa:**
- Encapsula a lógica de um candidato individual
- Reutilizável em diferentes contextos (tabela, grid, etc)
- Callbacks para ações (Schedule, Edit, Delete, View)

**Props:**
```typescript
{
  candidate: CandidateRecord
  score?: number
  onSchedule?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onView?: (id: string) => void
}
```

### 4. **CandidateList.tsx** (Tabela/Lista de Candidatos)
**Justificativa:**
- Abstrai a renderização de múltiplos candidatos
- Suporta estados de loading e empty
- Passa callbacks para componentes filhos

### 5. **Header.tsx** (Cabeçalho com Navegação)
**Justificativa:**
- Reutilizável em diferentes páginas
- Suporta breadcrumbs, search e filtros
- Mantém consistência visual

### 6. **Layout.tsx** (Layout Principal)
**Justificativa:**
- Padrão de layout flex com sidebar
- Responsivo e reutilizável
- Separação clara entre navigation e content

### 7. **Sidebar.tsx** (Navegação Lateral)
**Justificativa:**
- Menu com seções (Main Menu, Manage)
- Suporta item ativo
- Exibe informações de usuário

### 8. **QueryExample.tsx** (Página Principal)
**Responsabilidades:**
- Orquestra todos os componentes
- Gerencia estado de candidatos com React Query
- Implementa lógica de busca e filtros

## 🎯 Decisões de Design

### Por que Componentes Separados?
1. **Reutilização**: Badge, Button, Card podem ser usados em múltiplas páginas
2. **Testabilidade**: Componentes pequenos são mais fáceis de testar
3. **Manutenibilidade**: Alterações localizadas não afetam outras partes
4. **Performance**: Renderização otimizada com componentes isolados

### Por que Tailwind CSS?
1. **Rapidez**: Utilitários prontos para uso
2. **Consistência**: Design system automatizado
3. **Responsividade**: Breakpoints nativos
4. **Bundle**: Apenas CSS usado é incluído na build

### Por que React Query?
1. **Cache inteligente**: Evita requisições desnecessárias
2. **Estados**: Loading, error, success gerenciados automaticamente
3. **Refetch**: Função para recarregar dados
4. **DevTools**: Debug visual de queries

## 📊 Fluxo de Dados

```
QueryExample (orquestra)
├── useQuery (fetch dados)
│   └── candidatesApi.list() (mock com filtros)
├── filteredCandidates (computed)
└── Layout
    ├── Sidebar (navItems)
    ├── Header (search, filters)
    └── CandidateList
        └── CandidateCard[] (callbacks)
```

## 🔄 Extensões Futuras

### Fáceis de Adicionar:
- **Filtros**: Adicionar estado de filtros ao QueryExample
- **Paginação**: Suporte a `page` nos filtros
- **Busca Avançada**: Expandir CandidateFilters
- **Temas**: CSS variables já suportam temas

### Componentes Adicionais:
- `Dialog/Modal`: Para ações (Schedule Interview)
- `Tooltip`: Para informações detalhadas
- `Pagination`: Para navegação entre páginas
- `FilterPanel`: Para filtros avançados

## 📝 Convenções de Código

1. **Props TypeScript**: Sempre tipadas com interfaces
2. **Componentes**: Sempre `export function` (não default)
3. **Estilos**: Tailwind utilities (sem CSS separado)
4. **Callbacks**: Sempre `on<Action>` pattern
5. **Exports**: Centralizados em `ui/index.ts`

## 🚀 Como Usar

```typescript
import { Layout, Header, Sidebar, CandidateList } from "./components/ui";

export function MyPage() {
  return (
    <Layout sidebar={<Sidebar {...props} />}>
      <Header title="Title" />
      <CandidateList candidates={data} />
    </Layout>
  );
}
```
