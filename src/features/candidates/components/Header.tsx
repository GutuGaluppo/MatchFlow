import { SearchIcon, BarsIcon, SquaresIcon, ChevronDownIcon } from "../../../shared/ui/Icons";
import type { CandidateFilters } from "../types";
import { CandidateFilters as CandidateFiltersComponent } from "./CandidateFilters";

interface HeaderProps {
	title: string;
	breadcrumbs?: { label: string; href?: string }[];
	onSearch?: (query: string) => void;
	filterCount?: number;
	filters?: CandidateFilters;
	onFilterChange?: (filters: CandidateFilters) => void;
}

export function Header({
	title,
	breadcrumbs,
	onSearch,
	filterCount,
	filters = {},
	onFilterChange = () => {},
}: HeaderProps) {
	return (
		<div className="bg-white border-b border-gray-200">
			<div className="px-8 py-6">
				{breadcrumbs && (
					<nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
						{breadcrumbs.map((crumb, i) => (
							<div key={i} className="flex items-center gap-2">
								{i > 0 && <span className="text-gray-400">/</span>}
								{crumb.href ? (
									<a href={crumb.href} className="hover:text-blue-600 transition-colors">
										{crumb.label}
									</a>
								) : (
									<span>{crumb.label}</span>
								)}
							</div>
						))}
					</nav>
				)}

				<div className="flex items-center justify-between gap-6">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">{title}</h1>
					</div>

					<div className="flex items-center gap-4 flex-1 justify-end">
						<div className="relative w-80">
							<input
								type="text"
								placeholder="Search Job..."
								onChange={(e) => onSearch?.(e.target.value)}
								className="w-full px-4 py-2.5 pl-10 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
							/>
							<div className="absolute left-3 top-3 text-gray-400">
								<SearchIcon className="w-5 h-5" />
							</div>
						</div>

						{/* Filters Popover using native <details> */}
						<details className="relative">
							<summary className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer list-none">
								<ChevronDownIcon className="w-4 h-4" />
								<span className="text-sm font-medium">Filters</span>
								{filterCount ? <span className="text-xs text-gray-600">({filterCount})</span> : null}
							</summary>

							<div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-30 max-h-96 overflow-y-auto">
								<CandidateFiltersComponent
									filters={filters}
									onFilterChange={onFilterChange}
									isPopover={true}
								/>
							</div>
						</details>

						<button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="List view">
							<BarsIcon className="w-5 h-5" />
						</button>

						<button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Grid view">
							<SquaresIcon className="w-5 h-5" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
