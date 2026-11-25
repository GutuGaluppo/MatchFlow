import type { CandidateRecord } from "../../../types";
import { StatusBadge, ScoreBadge } from "../../../shared/ui/Badge";
import { EditIcon, TrashIcon, ChartIcon } from "../../../shared/ui/Icons";

interface CandidateCardProps {
	candidate: CandidateRecord;
	onSchedule?: (id: string) => void;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	onView?: (id: string) => void;
	score?: number;
}

function getInitials(name: string) {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

function getGradient(id: string) {
	const hashes = id.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
	const gradients = [
		"from-blue-400 to-purple-500",
		"from-purple-400 to-pink-500",
		"from-cyan-400 to-blue-500",
		"from-emerald-400 to-teal-500",
		"from-orange-400 to-red-500",
	];
	return gradients[hashes % gradients.length];
}

export function CandidateCard({
	candidate,
	onSchedule,
	onEdit,
	onDelete,
	onView,
	score = 75,
}: CandidateCardProps) {
	const initials = getInitials(candidate.name);
	const gradient = getGradient(candidate.id);

	return (
		<div
			className="flex items-center gap-4 px-6 py-4 border-b border-gray-100 hover:bg-blue-50 transition-colors focus-within:bg-blue-50"
			role="row"
		>
			<input
				type="checkbox"
				className="w-4 h-4 rounded border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
				aria-label={`Select ${candidate.name}`}
			/>

			<div className="flex items-center gap-4 flex-1 min-w-0">
				<div
					className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md`}
					aria-label={`${candidate.name} avatar`}
				>
					{initials}
				</div>
				<div className="min-w-0 flex-1">
					<p className="font-semibold text-gray-900 truncate">{candidate.name}</p>
					<p className="text-sm text-gray-500 truncate">{candidate.location}</p>
				</div>
			</div>

			<div className="flex-shrink-0 w-32">
				<StatusBadge status={candidate.status} />
			</div>

			<div className="flex-shrink-0 w-24 text-sm text-gray-600">
				<time dateTime={candidate.appliedAt}>
					{new Date(candidate.appliedAt).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
						year: "numeric",
					})}
				</time>
			</div>

			<div className="flex-shrink-0">
				<ScoreBadge score={score} />
			</div>

			<div className="flex-shrink-0 w-32">
				<button
					onClick={() => onSchedule?.(candidate.id)}
					className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all disabled:opacity-50"
					aria-label={`Schedule interview with ${candidate.name}`}
				>
					Schedule
				</button>
			</div>

			<div className="flex-shrink-0 flex items-center gap-2">
				<button
					onClick={() => onEdit?.(candidate.id)}
					className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
					aria-label={`Edit ${candidate.name}`}
				>
					<EditIcon className="w-5 h-5" aria-hidden="true" />
				</button>
				<button
					onClick={() => onDelete?.(candidate.id)}
					className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
					aria-label={`Delete ${candidate.name}`}
				>
					<TrashIcon className="w-5 h-5" aria-hidden="true" />
				</button>
				<button
					onClick={() => onView?.(candidate.id)}
					className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
					aria-label={`View details for ${candidate.name}`}
					title="View candidate details"
				>
					<ChartIcon className="w-5 h-5" aria-hidden="true" />
				</button>
			</div>
		</div>
	);
}
