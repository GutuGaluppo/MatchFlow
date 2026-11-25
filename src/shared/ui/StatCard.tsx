interface StatCardProps {
	label: string;
	count: number;
	percentage: number;
	variant?: "default" | "new" | "shortlisted" | "interview" | "rejected";
}

const variantStyles: Record<string, { bg: string; border: string; labelColor: string }> = {
	default: {
		bg: "bg-gray-50",
		border: "border-gray-200",
		labelColor: "text-gray-700",
	},
	new: {
		bg: "bg-blue-50",
		border: "border-blue-200",
		labelColor: "text-blue-700",
	},
	shortlisted: {
		bg: "bg-green-50",
		border: "border-green-200",
		labelColor: "text-green-700",
	},
	interview: {
		bg: "bg-purple-50",
		border: "border-purple-200",
		labelColor: "text-purple-700",
	},
	rejected: {
		bg: "bg-red-50",
		border: "border-red-200",
		labelColor: "text-red-700",
	},
};

export function StatCard({
	label,
	count,
	percentage,
	variant = "default",
}: StatCardProps) {
	const style = variantStyles[variant];

	return (
		<div
			className={`p-6 rounded-lg border ${style.bg} ${style.border} shadow-sm transition-all hover:shadow-md`}
		>
			<div className="flex items-baseline justify-between">
				<div>
					<p className={`text-sm font-medium ${style.labelColor}`}>{label}</p>
					<p className="text-3xl font-bold text-gray-900 mt-2">{count}</p>
				</div>
				<div className={`text-right ${style.labelColor}`}>
					<p className="text-sm font-semibold">{percentage}%</p>
					<p className="text-xs mt-1 opacity-75">of total</p>
				</div>
			</div>
		</div>
	);
}
