import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { StatCard } from "../StatCard";

describe("StatCard", () => {
	it("renders with label, count, and percentage", () => {
		render(<StatCard label="New" count={18} percentage={14} variant="new" />);

		expect(screen.getByText("New")).toBeInTheDocument();
		expect(screen.getByText("18")).toBeInTheDocument();
		expect(screen.getByText("14%")).toBeInTheDocument();
		expect(screen.getByText("of total")).toBeInTheDocument();
	});

	it("renders different variants with appropriate styling", () => {
		const { container } = render(
			<StatCard
				label="Shortlisted"
				count={5}
				percentage={20}
				variant="shortlisted"
			/>,
		);

		const card = container.querySelector("div");
		expect(card).toHaveClass("bg-green-50");
		expect(card).toHaveClass("border-green-200");
	});

	it("applies default variant when not specified", () => {
		const { container } = render(
			<StatCard label="Total" count={24} percentage={100} />,
		);

		const card = container.querySelector("div");
		expect(card).toHaveClass("bg-gray-50");
	});

	it("renders different variant styles correctly", () => {
		const variants = [
			{ variant: "new" as const, bgClass: "bg-blue-50" },
			{ variant: "shortlisted" as const, bgClass: "bg-green-50" },
			{ variant: "interview" as const, bgClass: "bg-purple-50" },
			{ variant: "rejected" as const, bgClass: "bg-red-50" },
		];

		variants.forEach(({ variant, bgClass }) => {
			const { container } = render(
				<StatCard label="Test" count={10} percentage={50} variant={variant} />,
			);

			const card = container.querySelector("div");
			expect(card).toHaveClass(bgClass);
		});
	});

	it("displays percentage correctly", () => {
		const percentages = [0, 50, 100];

		percentages.forEach((percentage) => {
			const { unmount } = render(
				<StatCard label="Test" count={10} percentage={percentage} />,
			);

			expect(screen.getByText(`${percentage}%`)).toBeInTheDocument();
			unmount();
		});
	});
});
