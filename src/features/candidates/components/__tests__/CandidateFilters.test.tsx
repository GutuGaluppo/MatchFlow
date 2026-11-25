import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { CandidateFilters } from "../CandidateFilters";
import type { CandidateFilters as CandidateFiltersType } from "../../types";

describe("CandidateFilters", () => {
	const mockFilters: CandidateFiltersType = {};
	const mockOnFilterChange = vi.fn();

	it("renders filter sections", () => {
		render(
			<CandidateFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />
		);

		expect(screen.getByText("Filter Candidates")).toBeInTheDocument();
		expect(screen.getByText("Saved Searches")).toBeInTheDocument();
		expect(screen.getByText("Experience level")).toBeInTheDocument();
		expect(screen.getByText("Job title")).toBeInTheDocument();
		expect(screen.getByText("Skills")).toBeInTheDocument();
		expect(screen.getByText("Location")).toBeInTheDocument();
		expect(screen.getByText("Availability")).toBeInTheDocument();
		expect(screen.getByText("Applied date")).toBeInTheDocument();
	});

	it("renders Save and Update buttons", () => {
		render(
			<CandidateFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />
		);

		expect(screen.getByText("Save")).toBeInTheDocument();
		expect(screen.getByText("Update")).toBeInTheDocument();
	});

	it("renders Clear all button", () => {
		render(
			<CandidateFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />
		);

		expect(screen.getByText("Clear all")).toBeInTheDocument();
	});

	it("expands sections when clicked", async () => {
		const user = userEvent.setup();
		render(
			<CandidateFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />
		);

		const experienceButton = screen.getByText("Experience level").closest("button");
		if (experienceButton) {
			await user.click(experienceButton);
			expect(screen.getByText("Entry (0-2 years)")).toBeInTheDocument();
		}
	});

	it("calls onFilterChange when Clear all is clicked", async () => {
		const user = userEvent.setup();
		const onFilterChange = vi.fn();

		render(
			<CandidateFilters filters={mockFilters} onFilterChange={onFilterChange} />
		);

		const clearButton = screen.getByText("Clear all");
		await user.click(clearButton);

		expect(onFilterChange).toHaveBeenCalledWith({});
	});

	it("displays experience level options when expanded", async () => {
		const user = userEvent.setup();
		render(
			<CandidateFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />
		);

		const experienceButton = screen.getByText("Experience level").closest("button");
		if (experienceButton) {
			await user.click(experienceButton);

			expect(screen.getByText("Entry (0-2 years)")).toBeInTheDocument();
			expect(screen.getByText("Mid (2-5 years)")).toBeInTheDocument();
			expect(screen.getByText("Senior (5+ years)")).toBeInTheDocument();
		}
	});

	it("displays skill options when expanded", async () => {
		const user = userEvent.setup();
		render(
			<CandidateFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />
		);

		const skillsButton = screen.getByText("Skills").closest("button");
		if (skillsButton) {
			await user.click(skillsButton);

			expect(screen.getByText("React")).toBeInTheDocument();
			expect(screen.getByText("TypeScript")).toBeInTheDocument();
			expect(screen.getByText("Node.js")).toBeInTheDocument();
		}
	});

	it("displays availability options when expanded", async () => {
		const user = userEvent.setup();
		render(
			<CandidateFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />
		);

		const availabilityButton = screen.getByText("Availability").closest("button");
		if (availabilityButton) {
			await user.click(availabilityButton);

			expect(screen.getByText("Immediate")).toBeInTheDocument();
			expect(screen.getByText("2 weeks")).toBeInTheDocument();
			expect(screen.getByText("1 month")).toBeInTheDocument();
		}
	});

	it("displays search inputs for text-based filters", async () => {
		const user = userEvent.setup();
		render(
			<CandidateFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />
		);

		// Expand Job Title section
		const jobTitleButton = screen.getByText("Job title").closest("button");
		if (jobTitleButton) {
			await user.click(jobTitleButton);

			const inputs = screen.getAllByPlaceholderText(/search/i);
			expect(inputs.length).toBeGreaterThan(0);
		}
	});

	it("renders with sidebar styling", () => {
		const { container } = render(
			<CandidateFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />
		);

		const sidebar = container.querySelector(".w-64");
		expect(sidebar).toHaveClass("bg-white");
		expect(sidebar).toHaveClass("border-r");
		expect(sidebar).toHaveClass("border-gray-200");
	});
});
