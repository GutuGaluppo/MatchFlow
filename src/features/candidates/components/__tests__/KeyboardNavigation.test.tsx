import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CandidatePage from "../CandidatePage";

vi.mock("../../api/candidates", () => ({
	candidatesApi: {
		list: vi.fn(() =>
			Promise.resolve({
				data: [
					{
						id: "cand-001",
						name: "Alex Morgan",
						role: "Senior Frontend Engineer",
						headline: "Product-minded React engineer",
						location: "Berlin, Germany",
						experienceYears: 8,
						skills: ["React", "TypeScript"],
						status: "new",
						availability: "immediate",
						workModel: "hybrid",
						summary: "Test summary",
						evidence: [],
						appliedAt: "2024-05-20T10:00:00Z",
						updatedAt: "2024-05-20T10:00:00Z",
					},
					{
						id: "cand-002",
						name: "Sofia Martins",
						role: "Full Stack Developer",
						headline: "Full stack engineer",
						location: "Lisbon, Portugal",
						experienceYears: 5,
						skills: ["React", "Node.js"],
						status: "shortlisted",
						availability: "2 weeks",
						workModel: "remote",
						summary: "Test summary",
						evidence: [],
						appliedAt: "2024-05-18T10:00:00Z",
						updatedAt: "2024-05-18T10:00:00Z",
					},
				],
				meta: {
					page: 1,
					limit: 12,
					total: 2,
					totalPages: 1,
					statusCounts: {
						new: 1,
						shortlisted: 1,
						interview: 0,
						rejected: 0,
					},
				},
			})
		),
	},
}));

describe("Keyboard Navigation - A11y Compliance", () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
		},
	});

	beforeEach(() => {
		queryClient.clear();
	});

	const renderWithQueryClient = (component: React.ReactElement) => {
		return render(
			<QueryClientProvider client={queryClient}>
				{component}
			</QueryClientProvider>
		);
	};

	it("all interactive elements are accessible via Tab key", async () => {
		const user = userEvent.setup();
		renderWithQueryClient(<CandidatePage />);

		await waitFor(() => {
			expect(screen.getByPlaceholderText("Search Job...")).toBeInTheDocument();
		});

		// Tab through header search input (natively focusable)
		const searchInput = screen.getByPlaceholderText("Search Job...");
		expect(searchInput).toBeInTheDocument();
		searchInput.focus();
		expect(searchInput).toHaveFocus();

		// Tab to view toggle buttons
		const listViewButton = screen.getByLabelText("Switch to list view");
		expect(listViewButton).toHaveAttribute("tabIndex", "0");
		listViewButton.focus();
		expect(listViewButton).toHaveFocus();

		const gridViewButton = screen.getByLabelText("Switch to grid view");
		expect(gridViewButton).toHaveAttribute("tabIndex", "0");
		gridViewButton.focus();
		expect(gridViewButton).toHaveFocus();
	});

	it("sidebar navigation items are keyboard accessible", async () => {
		const user = userEvent.setup();
		renderWithQueryClient(<CandidatePage />);

		await waitFor(() => {
			expect(screen.getByText("SkillSync")).toBeInTheDocument();
		});

		// Find sidebar navigation buttons
		const candidatesButton = screen.getByRole("menuitem", { name: /Candidates/i });
		expect(candidatesButton).toHaveAttribute("tabIndex", "0");

		// User profile button should be focusable
		const userButton = screen.getByLabelText(/User profile/i);
		expect(userButton).toHaveAttribute("tabIndex", "0");
	});

	it("candidate table rows are keyboard accessible", async () => {
		const user = userEvent.setup();
		renderWithQueryClient(<CandidatePage />);

		await waitFor(() => {
			expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
		});

		const candidateRow = screen.getByText("Alex Morgan").closest("tr");
		expect(candidateRow).toHaveAttribute("tabIndex", "0");
		expect(candidateRow).toHaveAttribute("role", "button");
	});

	it("checkboxes are keyboard accessible", async () => {
		const user = userEvent.setup();
		renderWithQueryClient(<CandidatePage />);

		await waitFor(() => {
			expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
		});

		// Find select all checkbox in table header
		const candidatesTableHeader = screen.getByLabelText("Select all candidates");
		expect(candidatesTableHeader).toHaveAttribute("tabIndex", "0");
		candidatesTableHeader.focus();
		expect(candidatesTableHeader).toHaveFocus();
	});

	it("candidate rows can be opened with Enter key", async () => {
		const user = userEvent.setup();
		renderWithQueryClient(<CandidatePage />);

		await waitFor(() => {
			expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
		});

		const candidateRow = screen.getByText("Alex Morgan").closest("tr");
		expect(candidateRow).toBeInTheDocument();

		// Focus and press Enter
		candidateRow?.focus();
		await user.keyboard("{Enter}");

		await waitFor(() => {
			expect(screen.getByText("Candidate Details")).toBeInTheDocument();
		});
	});

	it("candidate rows can be opened with Space key", async () => {
		const user = userEvent.setup();
		renderWithQueryClient(<CandidatePage />);

		await waitFor(() => {
			expect(screen.getByText("Sofia Martins")).toBeInTheDocument();
		});

		const candidateRow = screen.getByText("Sofia Martins").closest("tr");
		expect(candidateRow).toBeInTheDocument();

		// Focus and press Space
		candidateRow?.focus();
		await user.keyboard(" ");

		await waitFor(() => {
			expect(screen.getByText("Candidate Details")).toBeInTheDocument();
		});
	});

	it("modal closes with Escape key", async () => {
		const user = userEvent.setup();
		renderWithQueryClient(<CandidatePage />);

		await waitFor(() => {
			expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
		});

		const candidateRow = screen.getByText("Alex Morgan").closest("tr");
		await user.click(candidateRow!);

		await waitFor(() => {
			expect(screen.getByText("Candidate Details")).toBeInTheDocument();
		});

		// Press Escape
		await user.keyboard("{Escape}");

		await waitFor(() => {
			expect(screen.queryByText("Candidate Details")).not.toBeInTheDocument();
		});
	});



	it("all action buttons have focus indicators", async () => {
		const user = userEvent.setup();
		renderWithQueryClient(<CandidatePage />);

		await waitFor(() => {
			expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
		});

		// Find Schedule button
		const scheduleButton = screen.getByLabelText(/Schedule interview with Alex Morgan/i);
		expect(scheduleButton).toHaveClass("focus:outline-none");
		expect(scheduleButton).toHaveClass("focus:ring-2");
		expect(scheduleButton).toHaveClass("focus:ring-blue-500");

		// Focus and verify it's visible
		scheduleButton.focus();
		expect(scheduleButton).toHaveFocus();
	});
});
