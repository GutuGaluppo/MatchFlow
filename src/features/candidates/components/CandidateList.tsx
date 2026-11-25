import type { CandidateRecord } from "../../../types";
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
		<div
			className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
			role="region"
			aria-label="Candidates table"
		>
			<div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
				<div className="flex items-center gap-4">
					<input
						type="checkbox"
						className="w-4 h-4 rounded border-gray-300 cursor-pointer"
						aria-label="Select all candidates"
					/>
					<div className="flex-1 flex items-center gap-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
						<div className="flex-1">Candidates</div>
						<div className="w-32">Status</div>
						<div className="w-24">Applied On</div>
						<div className="w-20">ATS Score</div>
					</div>
					<div className="w-32 text-xs font-semibold text-gray-600 uppercase tracking-wider">Schedule</div>
					<div className="w-24 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
						Actions
					</div>
				</div>
			</div>

			<div className="divide-y divide-gray-100" role="list">
				{candidates.map((candidate) => (
					<div key={candidate.id} role="listitem">
						<CandidateCard
							candidate={candidate}
							score={Math.floor(Math.random() * 100)}
							onSchedule={onSchedule}
							onEdit={onEdit}
							onDelete={onDelete}
							onView={onView}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
