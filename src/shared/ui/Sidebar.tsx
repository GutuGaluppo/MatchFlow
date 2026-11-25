import type { ReactNode } from "react";

interface NavItem {
	icon: ReactNode;
	label: string;
	active?: boolean;
	onClick?: () => void;
}

interface SidebarProps {
	items: NavItem[];
	title?: string;
	user?: { name: string; email: string };
}

export function Sidebar({ items, title = "SkillSync", user }: SidebarProps) {
	return (
		<div className="flex flex-col h-full bg-white">
			<div className="px-6 py-5 border-b border-gray-200">
				<div className="flex items-center gap-2.5">
					<div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
						S
					</div>
					<span className="font-bold text-gray-900 text-lg">{title}</span>
				</div>
			</div>

			<nav className="flex-1 px-3 py-6 overflow-y-auto">
				<div className="mb-8">
					<h3 className="px-3 text-xs font-semibold text-gray-500 uppercase mb-4 tracking-wide">
						Main Menu
					</h3>
					<div className="space-y-1">
						{items.slice(0, 4).map((item) => (
							<button
								key={item.label}
								onClick={item.onClick}
								className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
									item.active
										? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
										: "text-gray-700 hover:bg-gray-100"
								}`}
							>
								<span className="flex-shrink-0 text-current">{item.icon}</span>
								<span className="text-sm">{item.label}</span>
							</button>
						))}
					</div>
				</div>

				<div>
					<h3 className="px-3 text-xs font-semibold text-gray-500 uppercase mb-4 tracking-wide">
						Manage
					</h3>
					<div className="space-y-1">
						{items.slice(4).map((item) => (
							<button
								key={item.label}
								onClick={item.onClick}
								className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
									item.active
										? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
										: "text-gray-700 hover:bg-gray-100"
								}`}
							>
								<span className="flex-shrink-0 text-current">{item.icon}</span>
								<span className="text-sm">{item.label}</span>
							</button>
						))}
					</div>
				</div>
			</nav>

			{user && (
				<div className="px-3 py-4 border-t border-gray-200">
					<button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors group">
						<div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
							{user.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</div>
						<div className="text-left min-w-0 flex-1">
							<p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
							<p className="text-xs text-gray-500 truncate">{user.email}</p>
						</div>
						<svg
							className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
				</div>
			)}
		</div>
	);
}
