import { useState } from "react";
import { ChevronDownIcon } from "../../../shared/ui/Icons";
import type { CandidateFilters } from "../types";

interface CandidateFiltersProps {
	filters: CandidateFilters;
	onFilterChange: (filters: CandidateFilters) => void;
	isPopover?: boolean;
}

export function CandidateFilters({
	filters,
	onFilterChange,
	isPopover = false,
}: CandidateFiltersProps) {
	const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
		experience: false,
		jobTitle: false,
		skills: false,
		location: false,
		availability: false,
		appliedDate: false,
	});

	const toggleSection = (section: string) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	const handleClearFilters = () => {
		onFilterChange({});
	};

	const handleSaveFilters = () => {
		// In a real app, this would save the search
		console.log("Filters saved:", filters);
	};

	return (
		<div
			className={`bg-white flex flex-col ${
				isPopover
					? "w-80"
					: "w-64 border-r border-gray-200 overflow-y-auto h-full"
			}`}
		>
			<div
				className={`border-b border-gray-200 ${isPopover ? "p-4" : "p-6"}`}
			>
				<h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Candidates</h2>
				<button
					onClick={handleClearFilters}
					className="text-sm text-gray-600 hover:text-gray-900 font-medium"
				>
					Clear all
				</button>
			</div>

			<div className="flex-1 overflow-y-auto">
				{/* Saved Searches */}
				<div className="border-b border-gray-100">
					<button
						onClick={() => toggleSection("saved")}
						className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
					>
						<span className="text-sm font-semibold text-gray-900">Saved Searches</span>
						<ChevronDownIcon
							className={`w-4 h-4 text-gray-600 transition-transform ${
								expandedSections.saved ? "rotate-180" : ""
							}`}
						/>
					</button>
					{expandedSections.saved && (
						<div className="px-6 py-3 bg-gray-50">
							<p className="text-xs text-gray-500">No saved searches yet.</p>
							<button className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700">
								Save this filter setup
							</button>
						</div>
					)}
				</div>

				{/* Experience Level */}
				<div className="border-b border-gray-100">
					<button
						onClick={() => toggleSection("experience")}
						className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
					>
						<span className="text-sm font-semibold text-gray-900">Experience level</span>
						<ChevronDownIcon
							className={`w-4 h-4 text-gray-600 transition-transform ${
								expandedSections.experience ? "rotate-180" : ""
							}`}
						/>
					</button>
					{expandedSections.experience && (
						<div className="px-6 py-3 space-y-2 bg-gray-50">
							{["Entry (0-2 years)", "Mid (2-5 years)", "Senior (5+ years)"].map((level) => (
								<label key={level} className="flex items-center gap-2 cursor-pointer">
									<input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
									<span className="text-sm text-gray-700">{level}</span>
								</label>
							))}
						</div>
					)}
				</div>

				{/* Job Title */}
				<div className="border-b border-gray-100">
					<button
						onClick={() => toggleSection("jobTitle")}
						className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
					>
						<span className="text-sm font-semibold text-gray-900">Job title</span>
						<ChevronDownIcon
							className={`w-4 h-4 text-gray-600 transition-transform ${
								expandedSections.jobTitle ? "rotate-180" : ""
							}`}
						/>
					</button>
					{expandedSections.jobTitle && (
						<div className="px-6 py-3 bg-gray-50">
							<input
								type="text"
								placeholder="Search job titles..."
								className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					)}
				</div>

				{/* Skills */}
				<div className="border-b border-gray-100">
					<button
						onClick={() => toggleSection("skills")}
						className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
					>
						<span className="text-sm font-semibold text-gray-900">Skills</span>
						<ChevronDownIcon
							className={`w-4 h-4 text-gray-600 transition-transform ${
								expandedSections.skills ? "rotate-180" : ""
							}`}
						/>
					</button>
					{expandedSections.skills && (
						<div className="px-6 py-3 space-y-2 bg-gray-50">
							<input
								type="text"
								placeholder="Search skills..."
								className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
							/>
							{["React", "TypeScript", "Node.js", "Python"].map((skill) => (
								<label key={skill} className="flex items-center gap-2 cursor-pointer">
									<input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
									<span className="text-sm text-gray-700">{skill}</span>
								</label>
							))}
						</div>
					)}
				</div>

				{/* Location */}
				<div className="border-b border-gray-100">
					<button
						onClick={() => toggleSection("location")}
						className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
					>
						<span className="text-sm font-semibold text-gray-900">Location</span>
						<ChevronDownIcon
							className={`w-4 h-4 text-gray-600 transition-transform ${
								expandedSections.location ? "rotate-180" : ""
							}`}
						/>
					</button>
					{expandedSections.location && (
						<div className="px-6 py-3 bg-gray-50">
							<input
								type="text"
								placeholder="Search locations..."
								className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					)}
				</div>

				{/* Availability */}
				<div className="border-b border-gray-100">
					<button
						onClick={() => toggleSection("availability")}
						className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
					>
						<span className="text-sm font-semibold text-gray-900">Availability</span>
						<ChevronDownIcon
							className={`w-4 h-4 text-gray-600 transition-transform ${
								expandedSections.availability ? "rotate-180" : ""
							}`}
						/>
					</button>
					{expandedSections.availability && (
						<div className="px-6 py-3 space-y-2 bg-gray-50">
							{["Immediate", "2 weeks", "1 month", "Negotiable"].map((avail) => (
								<label key={avail} className="flex items-center gap-2 cursor-pointer">
									<input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
									<span className="text-sm text-gray-700">{avail}</span>
								</label>
							))}
						</div>
					)}
				</div>

				{/* Applied Date */}
				<div className="border-b border-gray-100">
					<button
						onClick={() => toggleSection("appliedDate")}
						className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
					>
						<span className="text-sm font-semibold text-gray-900">Applied date</span>
						<ChevronDownIcon
							className={`w-4 h-4 text-gray-600 transition-transform ${
								expandedSections.appliedDate ? "rotate-180" : ""
							}`}
						/>
					</button>
					{expandedSections.appliedDate && (
						<div className="px-6 py-3 space-y-2 bg-gray-50">
							<input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
						</div>
					)}
				</div>
			</div>

			{/* Footer Buttons */}
			<div className="border-t border-gray-200 p-6 space-y-2 bg-gray-50">
				<button
					onClick={handleSaveFilters}
					className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
				>
					Save
				</button>
				<button
					onClick={handleSaveFilters}
					className="w-full px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors font-medium text-sm"
				>
					Update
				</button>
			</div>
		</div>
	);
}
