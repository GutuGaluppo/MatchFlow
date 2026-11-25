import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { CandidateDetailModal } from "../CandidateDetailModal";
import type { CandidateRecord } from "../../../../types";

describe("CandidateDetailModal", () => {
	const mockCandidate: CandidateRecord = {
		id: "cand-001",
		name: "Alex Morgan",
		role: "Senior Frontend Engineer",
		headline: "Product-minded React engineer",
		location: "Berlin, Germany",
		experienceYears: 8,
		skills: ["React", "TypeScript", "TanStack Query"],
		status: "new",
		availability: "immediate",
		workModel: "hybrid",
		summary: "Product-minded React engineer.",
		evidence: ["evidence1"],
		appliedAt: "2024-05-20T10:00:00Z",
		updatedAt: "2024-05-20T10:00:00Z",
	};

	it("does not render when isOpen is false", () => {
		const onClose = vi.fn();
		const { container } = render(
			<CandidateDetailModal
				candidate={mockCandidate}
				isOpen={false}
				onClose={onClose}
			/>
		);

		expect(container.innerHTML).toBe("");
	});

	it("does not render when candidate is null", () => {
		const onClose = vi.fn();
		const { container } = render(
			<CandidateDetailModal
				candidate={null}
				isOpen={true}
				onClose={onClose}
			/>
		);

		expect(container.innerHTML).toBe("");
	});

	it("renders candidate details when modal is open", () => {
		const onClose = vi.fn();
		render(
			<CandidateDetailModal
				candidate={mockCandidate}
				isOpen={true}
				onClose={onClose}
			/>
		);

		expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
		expect(screen.getByText("Senior Frontend Engineer")).toBeInTheDocument();
		expect(screen.getByText("Berlin, Germany")).toBeInTheDocument();
	});

	it("displays candidate skills", () => {
		const onClose = vi.fn();
		render(
			<CandidateDetailModal
				candidate={mockCandidate}
				isOpen={true}
				onClose={onClose}
			/>
		);

		mockCandidate.skills.forEach((skill) => {
			expect(screen.getByText(skill)).toBeInTheDocument();
		});
	});

	it("displays experience years, work model, and availability", () => {
		const onClose = vi.fn();
		render(
			<CandidateDetailModal
				candidate={mockCandidate}
				isOpen={true}
				onClose={onClose}
			/>
		);

		expect(screen.getByText("8 years")).toBeInTheDocument();
		expect(screen.getByText("hybrid")).toBeInTheDocument();
		expect(screen.getByText("immediate")).toBeInTheDocument();
	});

	it("displays action buttons", () => {
		const onClose = vi.fn();
		render(
			<CandidateDetailModal
				candidate={mockCandidate}
				isOpen={true}
				onClose={onClose}
			/>
		);

		expect(screen.getByText("Review")).toBeInTheDocument();
		expect(screen.getByText("Shortlist")).toBeInTheDocument();
		expect(screen.getByText("Schedule Interview")).toBeInTheDocument();
		expect(screen.getByText("Send Offer")).toBeInTheDocument();
		expect(screen.getByText("More Actions")).toBeInTheDocument();
	});

	it("calls onClose when close button is clicked", async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();

		render(
			<CandidateDetailModal
				candidate={mockCandidate}
				isOpen={true}
				onClose={onClose}
			/>
		);

		const closeButton = screen.getByLabelText("Close candidate details");
		await user.click(closeButton);

		expect(onClose).toHaveBeenCalledOnce();
	});

	it("calls onClose when overlay is clicked", async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();

		const { container } = render(
			<CandidateDetailModal
				candidate={mockCandidate}
				isOpen={true}
				onClose={onClose}
			/>
		);

		const overlay = container.querySelector(".bg-black.bg-opacity-50");
		if (overlay) {
			await user.click(overlay);
			expect(onClose).toHaveBeenCalledOnce();
		}
	});

	it("calls onClose when Escape key is pressed", async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();

		render(
			<CandidateDetailModal
				candidate={mockCandidate}
				isOpen={true}
				onClose={onClose}
			/>
		);

		await user.keyboard("{Escape}");
		expect(onClose).toHaveBeenCalledOnce();
	});

	it("displays applied date", () => {
		const onClose = vi.fn();
		render(
			<CandidateDetailModal
				candidate={mockCandidate}
				isOpen={true}
				onClose={onClose}
			/>
		);

		expect(screen.getByText(/Applied.*2024/)).toBeInTheDocument();
	});
});
