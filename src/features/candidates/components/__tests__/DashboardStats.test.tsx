import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { DashboardStats } from "../DashboardStats";
import type { DashboardMetrics } from "../../types";

describe("DashboardStats", () => {
	const mockMetrics: DashboardMetrics = {
		total: 24,
		stats: [
			{
				label: "Total Applicants",
				count: 24,
				percentage: 100,
				variant: "default",
			},
			{
				label: "New",
				count: 13,
				percentage: 54,
				variant: "new",
			},
			{
				label: "Shortlisted",
				count: 5,
				percentage: 21,
				variant: "shortlisted",
			},
			{
				label: "Interview",
				count: 4,
				percentage: 17,
				variant: "interview",
			},
			{
				label: "Rejected",
				count: 2,
				percentage: 8,
				variant: "rejected",
			},
		],
	};

	it("renders all stat cards", () => {
		render(<DashboardStats metrics={mockMetrics} />);

		expect(screen.getByText("Total Applicants")).toBeInTheDocument();
		expect(screen.getByText("New")).toBeInTheDocument();
		expect(screen.getByText("Shortlisted")).toBeInTheDocument();
		expect(screen.getByText("Interview")).toBeInTheDocument();
		expect(screen.getByText("Rejected")).toBeInTheDocument();
	});

	it("displays correct counts for each status", () => {
		render(<DashboardStats metrics={mockMetrics} />);

		expect(screen.getByText("24")).toBeInTheDocument(); // Total
		expect(screen.getAllByText("13")[0]).toBeInTheDocument(); // New count
		expect(screen.getByText("5")).toBeInTheDocument(); // Shortlisted
		expect(screen.getByText("4")).toBeInTheDocument(); // Interview
		expect(screen.getByText("2")).toBeInTheDocument(); // Rejected
	});

	it("displays correct percentages", () => {
		render(<DashboardStats metrics={mockMetrics} />);

		expect(screen.getByText("100%")).toBeInTheDocument();
		expect(screen.getByText("54%")).toBeInTheDocument();
		expect(screen.getByText("21%")).toBeInTheDocument();
		expect(screen.getByText("17%")).toBeInTheDocument();
		expect(screen.getByText("8%")).toBeInTheDocument();
	});

	it("shows loading state when isLoading is true", () => {
		const { container } = render(
			<DashboardStats metrics={mockMetrics} isLoading={true} />
		);

		const skeletons = container.querySelectorAll(".animate-pulse");
		expect(skeletons.length).toBeGreaterThan(0);
	});

	it("renders grid layout with responsive columns", () => {
		const { container } = render(<DashboardStats metrics={mockMetrics} />);

		const grid = container.querySelector(".grid");
		expect(grid).toHaveClass("grid-cols-1");
		expect(grid).toHaveClass("md:grid-cols-2");
		expect(grid).toHaveClass("lg:grid-cols-5");
	});

	it("shows 'of total' text for all cards", () => {
		render(<DashboardStats metrics={mockMetrics} />);

		const ofTotalElements = screen.getAllByText("of total");
		expect(ofTotalElements.length).toBe(mockMetrics.stats.length);
	});
});
