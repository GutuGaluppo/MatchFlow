import type { CandidateRecord } from "../../types";
import { CandidateCard } from "./CandidateCard";

interface CandidateListProps {
	candidates: CandidateRecord[];
	isLoading?: boolean;
	onSchedule?: (id: string) => void;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	onView?: (id: string) => void;
}

export function CandidateList({
	candidates,
	isLoading,
	onSchedule,
	onEdit,
	onDelete,
	onView,
}: CandidateListProps) {
	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border border-gray-200">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
				<p className="text-gray-500 font-medium">Loading candidates...</p>
			</div>
		);
	}

	if (candidates.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border border-gray-200">
				<svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
				</svg>
				<p className="text-gray-500 font-medium">No candidates found</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
			<div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
				<div className="flex items-center gap-4">
					<input type="checkbox" className="w-4 h-4 rounded border-gray-300 cursor-pointer" />
					<div className="flex-1 grid grid-cols-5 gap-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
						<div className="col-span-2">Candidates</div>
						<div>Status</div>
						<div>Applied On</div>
						<div className="text-right">ATS Score</div>
					</div>
					<div className="w-32 text-xs font-semibold text-gray-600 uppercase tracking-wider">Schedule Interview</div>
					<div className="w-20 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</div>
				</div>
			</div>

			<div className="divide-y divide-gray-100">
				{candidates.map((candidate) => (
					<CandidateCard
						key={candidate.id}
						candidate={candidate}
						score={Math.floor(Math.random() * 100)}
						onSchedule={onSchedule}
						onEdit={onEdit}
						onDelete={onDelete}
						onView={onView}
					/>
				))}
			</div>
		</div>
	);
}
