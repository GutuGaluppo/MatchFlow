import { useState, useCallback } from "react";
import { Layout } from "../../../shared/ui";
import {
	DashboardIcon,
	JobsIcon,
	CandidatesIcon,
	GroupsIcon,
	SupportIcon,
	SettingsIcon,
} from "../../../shared/ui/Icons";
import { Header, Sidebar, CandidateList } from "./index";
import type { CandidateFilters } from "../types";
import { useCandidates } from "../hooks/useCandidates";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { DashboardStats } from "./DashboardStats";
import { CandidateDetailModal } from "./CandidateDetailModal";
import { CandidateFilters as CandidateFiltersComponent } from "./CandidateFilters";

export default function CandidatePage() {
	const [filters, setFilters] = useState<CandidateFilters>({});
	const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
	const { candidates, isLoading, isFetching, error } = useCandidates(filters);

	const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId) || null;

	const metrics = useDashboardStats(candidates);

	const handleSearchChange = useCallback((query: string) => {
		setFilters((prev) => ({
			...prev,
			q: query || undefined,
			page: 1,
		}));
	}, []);

	const navItems = [
		{ icon: <DashboardIcon className="w-5 h-5" />, label: "Dashboard" },
		{ icon: <JobsIcon className="w-5 h-5" />, label: "Jobs" },
		{ icon: <CandidatesIcon className="w-5 h-5" />, label: "Candidates", active: true },
		{ icon: <GroupsIcon className="w-5 h-5" />, label: "Groups" },
		{ icon: <SupportIcon className="w-5 h-5" />, label: "Support" },
		{ icon: <SettingsIcon className="w-5 h-5" />, label: "Settings" },
	];

	const handleSchedule = (id: string) => {
		console.log("Schedule interview for:", id);
	};

	const handleEdit = (id: string) => {
		console.log("Edit candidate:", id);
	};

	const handleDelete = (id: string) => {
		console.log("Delete candidate:", id);
	};

	const handleView = (id: string) => {
		setSelectedCandidateId(id);
	};

	const handleFilterChange = (newFilters: CandidateFilters) => {
		setFilters(newFilters);
	};

	if (error) return <div className="p-6 text-red-600">Error: {error.message}</div>;

	const isRefetching = isFetching && !isLoading;
	const filterCount = Object.values(filters).filter(Boolean).length;

	return (
		<Layout
			sidebar={
				<Sidebar
					title="SkillSync"
					items={navItems}
					user={{ name: "Jon Snow", email: "jonsnow@gmail.com" }}
				/>
			}
		>
			<div className="flex flex-1 overflow-hidden">
				{/* Filter Sidebar */}
				<CandidateFiltersComponent filters={filters} onFilterChange={handleFilterChange} />

				{/* Main Content */}
				<div className="flex-1 flex flex-col overflow-hidden">
					<Header
						title="Candidates"
						breadcrumbs={[{ label: "Home" }, { label: "Candidates" }]}
						onSearch={handleSearchChange}
						filterCount={filterCount}
					/>
					<div className="flex-1 overflow-y-auto">
						<div className="p-8">
							{/* Dashboard Stats */}
							<DashboardStats metrics={metrics} isLoading={isLoading} />

							{/* Candidates Count */}
							<div className="mb-6 flex items-center justify-between">
								<div className="flex items-baseline gap-3">
									<h2 className="text-lg font-semibold text-gray-700">
										{candidates.length}
										<span className="text-sm text-gray-500 font-normal ml-2">
											{candidates.length === 1 ? "candidate" : "candidates"}
											{filterCount > 0 ? " found" : " applied"}
										</span>
									</h2>
									{isRefetching && (
										<span className="text-xs text-gray-400 animate-pulse">Updating...</span>
									)}
								</div>
							</div>

							{/* Candidate List */}
							<div className={isRefetching ? "opacity-60" : ""}>
								<CandidateList
									candidates={candidates}
									isLoading={isLoading}
									onSchedule={handleSchedule}
									onEdit={handleEdit}
									onDelete={handleDelete}
									onView={handleView}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Detail Modal */}
			<CandidateDetailModal
				candidate={selectedCandidate}
				isOpen={!!selectedCandidateId}
				onClose={() => setSelectedCandidateId(null)}
			/>
		</Layout>
	);
}
