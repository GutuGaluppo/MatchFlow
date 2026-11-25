# 🎨 Guia de Ícones - React Icons + Heroicons

## Instalação

**Biblioteca:** `react-icons`
```bash
npm install react-icons
```

**Por que React Icons?**
- ✅ Suporta múltiplas bibliotecas de ícones (Heroicons, FontAwesome, Material, etc)
- ✅ Tree-shakeable: apenas ícones usados são incluídos no bundle
- ✅ Sem dependências externas
- ✅ Totalmente tipado em TypeScript
- ✅ Compatível com React e Tailwind

## Ícones Usados (Heroicons v2)

Importamos do `react-icons/hi2` (Heroicons outline):

| Ícone | Componente | Uso |
|-------|-----------|-----|
| 🔍 | `HiOutlineSearch` | Busca na barra de ferramentas |
| ✓ | `HiOutlineCheckCircle` | Status "Shortlisted" |
| ⏱ | `HiOutlineClock` | Status "New" |
| ✕ | `HiOutlineXCircle` | Status "Rejected" |
| ⚡ | `HiOutlineSparkles` | Status "Interview" |
| ✎ | `HiOutlinePencil` | Editar candidato |
| 🗑 | `HiOutlineTrash` | Deletar candidato |
| 📊 | `HiOutlineChartBar` | Ver detalhes |
| 📅 | `HiOutlineCalendarDays` | Data de aplicação |
| 👥 | `HiOutlineUsers` | Candidatos/Grupos |
| 💼 | `HiOutlineBriefcase` | Jobs |
| ≡ | `HiOutlineBars3` | Vista de lista |
| ⊞ | `HiOutlineSquares2X2` | Vista de grid |
| ⚙️ | `HiOutlineCog6Tooth` | Configurações |
| ❓ | `HiOutlineQuestionMarkCircle` | Suporte |

## Uso nos Componentes

### 1. Importar ícones centralizados (`Icons.tsx`)
```typescript
import { SearchIcon, EditIcon, TrashIcon } from "./ui/Icons";
```

### 2. Usar em componentes
```typescript
<button>
  <EditIcon className="w-5 h-5" />
</button>
```

### 3. Com tamanhos customizados
```typescript
<SearchIcon className="w-6 h-6" /> // Maior
<TrashIcon className="w-4 h-4" /> // Menor
```

## Estrutura

```typescript
// src/components/ui/Icons.tsx
export const Icons = {
  search: HiOutlineSearch,
  edit: HiOutlinePencil,
  // ...
};

export function SearchIcon({ className = "w-5 h-5" }: IconProps) {
  return <Icons.search className={className} />;
}
```

**Vantagens dessa abordagem:**
- ✅ Centralizado e fácil de manter
- ✅ Wrapper com defaults para className
- ✅ Fácil trocar ícones globalmente
- ✅ Typeface consistente

## Adicionar Novo Ícone

### Passo 1: Importar no Icons.tsx
```typescript
import { HiOutlineXxx } from "react-icons/hi2";
```

### Passo 2: Adicionar ao objeto Icons
```typescript
export const Icons = {
  // ...
  xxx: HiOutlineXxx,
};
```

### Passo 3: Criar componente wrapper
```typescript
export function XxxIcon({ className = "w-5 h-5", size }: IconProps) {
  return <Icons.xxx className={className} size={size} />;
}
```

### Passo 4: Exportar em index.ts
```typescript
export { XxxIcon } from "./Icons";
```

## Buscando Mais Ícones

Visite [react-icons.github.io/react-icons](https://react-icons.github.io/react-icons/) para explorar:
- **Heroicons** (hi/hi2) - Design do Tailwind Labs
- **Font Awesome** (fa) - Mais de 7000 ícones
- **Material Design** (md) - Ícones do Google
- **Feather** (fi) - Simples e elegante

## Cores e Estilos

Os ícones herdam cores via Tailwind:
```typescript
<EditIcon className="w-5 h-5 text-gray-600 hover:text-blue-600" />
```

## Performance

React Icons é otimizado para performance:
- **Tree-shaking**: Remove ícones não usados
- **Sem SVG inline**: Reduz tamanho do bundle
- **On-demand**: Importa apenas o que precisa

Tamanho típico: ~15-20KB (gzip) para 50+ ícones

## Compatibilidade

- ✅ React 16.8+
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Todos os navegadores modernos

## Referência Completa

Veja [Icons.tsx](src/components/ui/Icons.tsx) para todos os ícones implementados e seus componentes wrapper.
