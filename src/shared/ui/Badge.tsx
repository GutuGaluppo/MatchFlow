// Generic badge variants for reuse across domains
type BadgeVariant = "success" | "warning" | "danger" | "info" | "default";

const variantStyles: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
	success: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
	warning: { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" },
	danger: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
	info: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
	default: { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
};

interface SharedBadgeProps {
	variant: BadgeVariant;
	label: string;
	showDot?: boolean;
}

export function SharedBadge({ variant, label, showDot = true }: SharedBadgeProps) {
	const style = variantStyles[variant];

	return (
		<div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${style.bg} border border-transparent`}>
			{showDot && <div className={`w-2 h-2 rounded-full ${style.dot}`} />}
			<span className={`text-sm font-medium ${style.text}`}>{label}</span>
		</div>
	);
}

// Domain-specific badge for candidate status
import type { CandidateStatus } from "../../types";

const statusToBadgeMap: Record<CandidateStatus, { variant: BadgeVariant; label: string }> = {
	new: { variant: "info", label: "New" },
	shortlisted: { variant: "success", label: "Shortlisted" },
	interview: { variant: "default", label: "Interviewing" },
	rejected: { variant: "danger", label: "Rejected" },
};

export function StatusBadge({ status }: { status: CandidateStatus }) {
	const { variant, label } = statusToBadgeMap[status];
	return <SharedBadge variant={variant} label={label} />;
}

export function ScoreBadge({ score }: { score: number }) {
	const getVariant = (s: number): BadgeVariant => {
		if (s >= 80) return "success";
		if (s >= 60) return "warning";
		return "danger";
	};

	const getStyle = (s: number) => {
		const v = getVariant(s);
		const styles = {
			success: "bg-green-100 text-green-700 border-green-300",
			warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
			danger: "bg-red-100 text-red-700 border-red-300",
			info: "bg-blue-100 text-blue-700 border-blue-300",
			default: "bg-purple-100 text-purple-700 border-purple-300",
		};
		return styles[v];
	};

	return (
		<div
			className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-base border-2 shadow-sm ${getStyle(score)}`}
		>
			{score}
		</div>
	);
}
