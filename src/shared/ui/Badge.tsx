import type { CandidateStatus } from "../../types";

const statusStyles: Record<
	CandidateStatus,
	{ bg: string; text: string; dot: string; displayText: string }
> = {
	new: {
		bg: "bg-blue-50",
		text: "text-blue-700",
		dot: "bg-blue-500",
		displayText: "New",
	},
	shortlisted: {
		bg: "bg-green-50",
		text: "text-green-700",
		dot: "bg-green-500",
		displayText: "Shortlisted",
	},
	interview: {
		bg: "bg-purple-50",
		text: "text-purple-700",
		dot: "bg-purple-500",
		displayText: "Interviewing",
	},
	rejected: {
		bg: "bg-red-50",
		text: "text-red-700",
		dot: "bg-red-500",
		displayText: "Rejected",
	},
};

export function StatusBadge({ status }: { status: CandidateStatus }) {
	const style = statusStyles[status];

	return (
		<div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${style.bg} border border-transparent`}>
			<div className={`w-2 h-2 rounded-full ${style.dot}`} />
			<span className={`text-sm font-medium ${style.text}`}>{style.displayText}</span>
		</div>
	);
}

export function ScoreBadge({ score }: { score: number }) {
	const getStyle = (s: number) => {
		if (s >= 80) return "bg-green-100 text-green-700 border-green-300";
		if (s >= 60) return "bg-yellow-100 text-yellow-700 border-yellow-300";
		return "bg-red-100 text-red-700 border-red-300";
	};

	return (
		<div
			className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-base border-2 shadow-sm ${getStyle(score)}`}
		>
			{score}
		</div>
	);
}
