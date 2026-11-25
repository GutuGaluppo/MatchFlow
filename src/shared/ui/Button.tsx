import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	icon?: ReactNode;
	children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
	primary: "bg-blue-600 text-white hover:bg-blue-700",
	secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
	ghost: "text-gray-600 hover:bg-gray-100",
	danger: "text-red-600 hover:bg-red-50",
};

const sizes: Record<ButtonSize, string> = {
	sm: "px-3 py-1 text-sm",
	md: "px-4 py-2 text-base",
	lg: "px-6 py-3 text-lg",
};

export function Button({
	variant = "primary",
	size = "md",
	icon,
	children,
	className,
	...props
}: ButtonProps) {
	return (
		<button
			className={`inline-flex items-center gap-2 rounded-lg font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className || ""}`}
			{...props}
		>
			{icon}
			{children}
		</button>
	);
}
