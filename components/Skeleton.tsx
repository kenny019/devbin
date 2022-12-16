const Skeleton = ({ ...props }): JSX.Element => {
	const skeletonClass = `${props.className} bg-slate-200 dark:bg-zinc-700 rounded-md flex animate-pulse`;

	return <div className={skeletonClass}></div>;
};

export default Skeleton;
