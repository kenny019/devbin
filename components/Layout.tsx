import Navbar from "./Navbar";

const Layout = ({ children }: { children: JSX.Element }): JSX.Element => {
	return (
		<div className="flex flex-col min-h-screen py-2 max-h-full">
			<div className="items-center justify-center max-w-screen-xl w-10/12 mx-auto flex-1">
				{children}
			</div>
			<Navbar />
		</div>
	);
};

export default Layout;
