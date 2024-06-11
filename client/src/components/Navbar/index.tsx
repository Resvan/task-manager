import {
	ChevronDown,
	PersonCircle,
} from "react-ionicons";

const Navbar = () => {
	return (
		<div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-slate-300 bg-[#fff]">
			<div className="flex items-center gap-3 cursor-pointer">
				<PersonCircle
					color="#fb923c"
					width={"28px"}
					height={"28px"}
				/>
				<span className="text-orange-400 font-semibold md:text-lg text-sm whitespace-nowrap">
					Task Manager
				</span>
				<ChevronDown
					color="#fb923c"
					width={"16px"}
					height={"16px"}
				/>
			</div>
		</div>
	);
};

export default Navbar;
