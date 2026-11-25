import type { CandidateRecord } from "../../types";
import { StatusBadge, ScoreBadge } from "./Badge";
import { EditIcon, TrashIcon, ChartIcon } from "./Icons";

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
		<div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100 hover:bg-blue-50 transition-colors">
			<input type="checkbox" className="w-4 h-4 rounded border-gray-300 cursor-pointer" />

			<div className="flex items-center gap-4 flex-1">
				<div
					className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md`}
				>
					{initials}
				</div>
				<div className="min-w-0 flex-1">
					<p className="font-semibold text-gray-900 truncate">{candidate.name}</p>
					<p className="text-sm text-gray-500">{candidate.location}</p>
				</div>
			</div>

			<div className="flex-shrink-0 w-32">
				<StatusBadge status={candidate.status} />
			</div>

			<div className="flex-shrink-0 w-24 text-sm text-gray-600">
				{new Date(candidate.appliedAt).toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
					year: "numeric",
				})}
			</div>

			<div className="flex-shrink-0">
				<ScoreBadge score={score} />
			</div>

			<div className="flex-shrink-0">
				<button
					onClick={() => onSchedule?.(candidate.id)}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
				>
					Schedule
				</button>
			</div>

			<div className="flex-shrink-0 flex items-center gap-3">
				<button
					onClick={() => onEdit?.(candidate.id)}
					className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
					title="Edit"
				>
					<EditIcon className="w-5 h-5" />
				</button>
				<button
					onClick={() => onDelete?.(candidate.id)}
					className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
					title="Delete"
				>
					<TrashIcon className="w-5 h-5" />
				</button>
				<button
					onClick={() => onView?.(candidate.id)}
					className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
					title="View details"
				>
					<ChartIcon className="w-5 h-5" />
				</button>
			</div>
		</div>
	);
}
