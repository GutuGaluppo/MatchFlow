import { useEffect } from "react";
import type { CandidateRecord } from "../../../types";
import { XIcon } from "../../../shared/ui/Icons";

interface CandidateDetailModalProps {
	candidate: CandidateRecord | null;
	isOpen: boolean;
	onClose: () => void;
}

function getInitials(name: string) {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

function getGradient(id: string) {
	const hashes = id.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
	const gradients = [
		"from-blue-400 to-purple-500",
		"from-purple-400 to-pink-500",
		"from-cyan-400 to-blue-500",
		"from-emerald-400 to-teal-500",
		"from-orange-400 to-red-500",
	];
	return gradients[hashes % gradients.length];
}

export function CandidateDetailModal({
	candidate,
	isOpen,
	onClose,
}: CandidateDetailModalProps) {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [isOpen, onClose]);

	if (!isOpen || !candidate) return null;

	const initials = getInitials(candidate.name);
	const gradient = getGradient(candidate.id);

	return (
		<>
			<div
				className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
				onClick={onClose}
			/>

			<div className="fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto">
				<div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
					<h2 className="text-xl font-semibold text-gray-900">Candidate Details</h2>
					<button
						onClick={onClose}
						className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
						title="Close"
					>
						<XIcon className="w-5 h-5" />
					</button>
				</div>

				<div className="p-6 space-y-6">
					{/* Avatar and Basic Info */}
					<div className="text-center">
						<div
							className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-md`}
						>
							{initials}
						</div>
						<h3 className="text-2xl font-bold text-gray-900">{candidate.name}</h3>
						<p className="text-sm text-gray-600 mt-1">{candidate.role}</p>
						<p className="text-xs text-gray-500 mt-2">{candidate.location}</p>
					</div>

					{/* Contact Info */}
					<div className="bg-gray-50 rounded-lg p-4 space-y-3">
						<div>
							<p className="text-xs font-semibold text-gray-600 uppercase">Experience</p>
							<p className="text-sm font-medium text-gray-900 mt-1">{candidate.experienceYears} years</p>
						</div>
						<div>
							<p className="text-xs font-semibold text-gray-600 uppercase">Work Model</p>
							<p className="text-sm font-medium text-gray-900 mt-1 capitalize">{candidate.workModel}</p>
						</div>
						<div>
							<p className="text-xs font-semibold text-gray-600 uppercase">Availability</p>
							<p className="text-sm font-medium text-gray-900 mt-1 capitalize">
								{candidate.availability.replace(/_/g, " ")}
							</p>
						</div>
					</div>

					{/* Skills */}
					<div>
						<p className="text-xs font-semibold text-gray-600 uppercase mb-3">Skills</p>
						<div className="flex flex-wrap gap-2">
							{candidate.skills.map((skill) => (
								<span
									key={skill}
									className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
								>
									{skill}
								</span>
							))}
						</div>
					</div>

					{/* Summary */}
					{candidate.summary && (
						<div>
							<p className="text-xs font-semibold text-gray-600 uppercase mb-2">Summary</p>
							<p className="text-sm text-gray-700 leading-relaxed">{candidate.summary}</p>
						</div>
					)}

					{/* Applied Date */}
					<div className="text-xs text-gray-500 border-t border-gray-200 pt-4">
						<p>
							Applied{" "}
							{new Date(candidate.appliedAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
					</div>

					{/* Action Buttons */}
					<div className="bg-gray-50 rounded-lg p-4 space-y-2">
						<button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
							Review
						</button>
						<button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
							Shortlist
						</button>
						<button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
							Schedule Interview
						</button>
						<button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
							Send Offer
						</button>
						<button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
							More Actions
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
