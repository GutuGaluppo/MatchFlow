import type { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
	sidebar?: ReactNode;
}

export function Layout({ children, sidebar }: LayoutProps) {
	return (
		<div className="flex h-screen bg-gray-50">
			{sidebar && (
				<aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto shadow-sm">
					{sidebar}
				</aside>
			)}
			<main className="flex-1 overflow-y-auto flex flex-col">{children}</main>
		</div>
	);
}
