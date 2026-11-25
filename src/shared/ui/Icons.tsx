import {
	HiOutlineCheck,
	HiOutlineClock,
	HiOutlineXMark,
	HiOutlineSparkles,
	HiOutlineMagnifyingGlass,
	HiOutlineChevronDown,
	HiOutlineBars3,
	HiOutlineSquares2X2,
	HiOutlinePencil,
	HiOutlineTrash,
	HiOutlineChartBar,
	HiOutlineCalendar,
	HiOutlinePhone,
	HiOutlineEnvelope,
	HiOutlineUser,
	HiOutlineUsers,
	HiOutlineBriefcase,
	HiOutlineFolderOpen,
	HiOutlineCog6Tooth,
	HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";

export const Icons = {
	// Status icons
	check: HiOutlineCheck,
	clock: HiOutlineClock,
	x: HiOutlineXMark,
	sparkles: HiOutlineSparkles,

	// Action icons
	search: HiOutlineMagnifyingGlass,
	chevronDown: HiOutlineChevronDown,
	bars: HiOutlineBars3,
	squares: HiOutlineSquares2X2,
	edit: HiOutlinePencil,
	trash: HiOutlineTrash,
	chart: HiOutlineChartBar,
	calendar: HiOutlineCalendar,
	phone: HiOutlinePhone,
	email: HiOutlineEnvelope,

	// Navigation icons
	user: HiOutlineUser,
	users: HiOutlineUsers,
	briefcase: HiOutlineBriefcase,
	folder: HiOutlineFolderOpen,
	settings: HiOutlineCog6Tooth,
	help: HiOutlineQuestionMarkCircle,
};

interface IconProps {
	className?: string;
	size?: number;
}

export function SearchIcon({ className = "w-5 h-5", size }: IconProps) {
	return <Icons.search className={className} size={size} />;
}

export function ChevronDownIcon({ className = "w-4 h-4", size }: IconProps) {
	return <Icons.chevronDown className={className} size={size} />;
}

export function BarsIcon({ className = "w-5 h-5", size }: IconProps) {
	return <Icons.bars className={className} size={size} />;
}

export function SquaresIcon({ className = "w-5 h-5", size }: IconProps) {
	return <Icons.squares className={className} size={size} />;
}

export function EditIcon({ className = "w-5 h-5", size }: IconProps) {
	return <Icons.edit className={className} size={size} />;
}

export function TrashIcon({ className = "w-5 h-5", size }: IconProps) {
	return <Icons.trash className={className} size={size} />;
}

export function ChartIcon({ className = "w-5 h-5", size }: IconProps) {
	return <Icons.chart className={className} size={size} />;
}

export function DashboardIcon({ className = "w-5 h-5", size }: IconProps) {
	return <Icons.chart className={className} size={size} />;
}

export function JobsIcon({ className = "w-5 h-5", size }: IconProps) {
	return <Icons.briefcase className={className} size={size} />;
}

export function CandidatesIcon({ className = "w-5 h-5", size }: IconProps) {
	return <Icons.users className={className} size={size} />;
}

export function GroupsIcon({ className = "w-5 h-5", size }: IconProps) {
	return <Icons.users className={className} size={size} />;
}

export function SupportIcon({ className = "w-5 h-5", size }: IconProps) {
	return <Icons.help className={className} size={size} />;
}

export function SettingsIcon({ className = "w-5 h-5", size }: IconProps) {
	return <Icons.settings className={className} size={size} />;
}

export function XIcon({ className = "w-5 h-5", size }: IconProps) {
	return <Icons.x className={className} size={size} />;
}
