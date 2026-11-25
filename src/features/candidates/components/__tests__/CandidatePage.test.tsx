import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CandidatePage from "../CandidatePage";

// Mock the candidates API
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
				],
				meta: {
					page: 1,
					limit: 12,
					total: 1,
					totalPages: 1,
					statusCounts: {
						new: 1,
						shortlisted: 0,
						interview: 0,
						rejected: 0,
					},
				},
			})
		),
	},
}));

describe("CandidatePage Integration", () => {
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

	it("renders page with header and main sections", async () => {
		renderWithQueryClient(<CandidatePage />);

		expect(await screen.findByRole("heading", { name: "Candidates" })).toBeInTheDocument();
		expect(screen.getByText("Filter Candidates")).toBeInTheDocument();
	});

	it("displays dashboard stats", async () => {
		renderWithQueryClient(<CandidatePage />);

		expect(await screen.findByText("Total Applicants")).toBeInTheDocument();
	});

	it("displays candidate list", async () => {
		renderWithQueryClient(<CandidatePage />);

		expect(await screen.findByText("Alex Morgan")).toBeInTheDocument();
	});

	it("opens detail modal when candidate is clicked", async () => {
		const user = userEvent.setup();
		renderWithQueryClient(<CandidatePage />);

		await waitFor(() => {
			expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
		});

		// Find and click the candidate row
		const candidateName = screen.getByText("Alex Morgan");
		const candidateRow = candidateName.closest("tr");
		expect(candidateRow).toBeInTheDocument();

		await user.click(candidateRow!);

		// Modal should now be visible with candidate details
		await waitFor(() => {
			expect(screen.getByText("Candidate Details")).toBeInTheDocument();
		});
	});

	it("closes modal when close button is clicked", async () => {
		const user = userEvent.setup();
		renderWithQueryClient(<CandidatePage />);

		await waitFor(() => {
			expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
		});

		// Open modal by clicking candidate row
		const candidateName = screen.getByText("Alex Morgan");
		const candidateRow = candidateName.closest("tr");
		expect(candidateRow).toBeInTheDocument();

		await user.click(candidateRow!);

		await waitFor(() => {
			expect(screen.getByText("Candidate Details")).toBeInTheDocument();
		});

		// Close modal
		const closeButton = screen.getByLabelText("Close candidate details");
		await user.click(closeButton);

		await waitFor(() => {
			expect(screen.queryByText("Candidate Details")).not.toBeInTheDocument();
		});
	});

	it("displays breadcrumbs", async () => {
		renderWithQueryClient(<CandidatePage />);

		expect(await screen.findByText("Home")).toBeInTheDocument();
	});

	it("renders sidebar navigation", async () => {
		renderWithQueryClient(<CandidatePage />);

		expect(screen.getByText("SkillSync")).toBeInTheDocument();
	});
});
