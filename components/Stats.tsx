
type statsData = {
	pastes: number,
	daily: number,
	reset_time: number, 
}

const Stats = ({ stats }: {stats: statsData}) => {


	const statsContainers = [
		{ name: 'Total Pastes', stat: stats.pastes },
		{ name: 'Uptime', stat: '99.9%' },
		{ name: 'Daily Pastes', stat: stats.daily },
	];

	return (
		<div className='my-8'>
			<h3 className="text-lg font-bold leading-6 text-gray-900 dark:text-white">devBin Stats</h3>
			<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
				{statsContainers.map((item) => (
					<div key={item.name} className="overflow-hidden rounded-lg bg-white dark:bg-zinc-700 px-4 py-5 shadow sm:p-6">
						<dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-200">{item.name}</dt>
						<dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.stat}</dd>
					</div>
				))}
			</dl>
		</div>
	)
}

export default Stats;