import { StatCard } from "../../../shared/ui/StatCard";
import type { DashboardMetrics } from "../types";

interface DashboardStatsProps {
	metrics: DashboardMetrics;
	isLoading?: boolean;
}

export function DashboardStats({ metrics, isLoading }: DashboardStatsProps) {
	if (isLoading) {
		return (
			<div className="grid grid-cols-5 gap-4">
				{[...Array(5)].map((_, i) => (
					<div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
			{metrics.stats.map((stat) => (
				<StatCard
					key={stat.label}
					label={stat.label}
					count={stat.count}
					percentage={stat.percentage}
					variant={stat.variant}
				/>
			))}
		</div>
	);
}
