# MatchFlow - Recruiter Decision Dashboard

A modern, type-safe candidate management dashboard built with React, TypeScript, and Tailwind CSS. Features a responsive design with candidate statistics, filtering, and detailed candidate profiles.

## ✨ Features

- **Dashboard Statistics**: Real-time candidate counts by status (New, Shortlisted, Interview, Rejected)
- **Advanced Filtering**: Filter candidates by experience level, job title, skills, location, and availability
- **Candidate Management**: View detailed candidate profiles with skills, experience, and work preferences
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Type-Safe**: Full TypeScript support with strict type checking
- **Well-Tested**: 38 comprehensive tests (100% pass rate) using Vitest + React Testing Library

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/GutuGaluppo/MatchFlow.git
cd MatchFlow

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Available Scripts

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run tests with UI
npm test -- --ui

# Type checking
tsc -b

# Linting
npm run lint

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── shared/ui/                    # Reusable UI components
│   ├── StatCard.tsx             # Statistics card component
│   ├── Button.tsx               # Button component
│   ├── Badge.tsx                # Status and score badges
│   └── ...
├── features/candidates/         # Candidate feature module
│   ├── components/
│   │   ├── CandidatePage.tsx    # Main dashboard page
│   │   ├── DashboardStats.tsx   # Statistics grid
│   │   ├── CandidateDetailModal.tsx  # Candidate detail view
│   │   ├── CandidateFilters.tsx      # Filter sidebar
│   │   └── __tests__/           # Component tests
│   ├── hooks/
│   │   ├── useCandidates.ts     # Fetch candidate data
│   │   └── useDashboardStats.ts # Calculate metrics
│   ├── api/
│   │   └── candidates.ts        # API client
│   └── types.ts                 # Type definitions
└── types.ts                     # Global types
```

## 🧪 Testing

The project uses **Vitest** for unit and integration testing with **React Testing Library** for component testing.

```bash
# Run all tests
npm test -- --run

# Run tests with watch mode
npm test

# Run tests with UI dashboard
npm test -- --ui

# Run specific test file
npm test -- StatCard.test.tsx
```

**Test Coverage:**
- StatCard: 6 tests
- DashboardStats: 8 tests
- CandidateDetailModal: 11 tests
- CandidateFilters: 9 tests
- CandidatePage Integration: 4 tests

**Total: 38/38 tests passing ✅**

## 🎨 Components

### StatCard
Display individual statistics with color-coded variants.

```tsx
<StatCard 
  label="New" 
  count={18} 
  percentage={14} 
  variant="new" 
/>
```

### DashboardStats
Responsive grid showing all candidate statistics.

```tsx
<DashboardStats metrics={dashboardMetrics} isLoading={false} />
```

### CandidateDetailModal
Side panel showing detailed candidate information and actions.

```tsx
<CandidateDetailModal 
  candidate={selectedCandidate} 
  isOpen={isOpen} 
  onClose={onClose} 
/>
```

### CandidateFilters
Collapsible filter sidebar for refining candidate searches.

```tsx
<CandidateFilters 
  filters={filters} 
  onFilterChange={setFilters} 
/>
```

## 🔧 Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript 6
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 3
- **State Management**: React Query (TanStack Query)
- **Testing**: Vitest 5 + React Testing Library
- **Icons**: React Icons (HeroIcons v2)
- **Code Quality**: ESLint

## 📋 API Data Structure

The app works with candidate records containing:
- Personal info (name, role, location, experience)
- Contact preferences (availability, work model)
- Professional details (skills, experience level)
- Application metadata (applied date, status)

Candidate statuses: `new`, `shortlisted`, `interview`, `rejected`

## 📚 Documentation

- [Architecture](docs/ARCHITECTURE.md) - Project structure and design patterns
- [Components](docs/COMPONENTS.md) - Detailed component documentation
- [Icons Guide](docs/ICONS_GUIDE.md) - Available icons and usage

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Gutu Galuppo** - [GitHub](https://github.com/GutuGaluppo)

---

Built with ❤️ for modern recruitment workflows.
