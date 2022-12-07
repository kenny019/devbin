import type { NextPage } from 'next';

import MainInput from '../components/MainInput';
import Navbar from '../components/Navbar';
import Stats from '../components/Stats';

const Home: NextPage = () => {
  return (
	<>
	<div className='flex flex-col min-h-screen py-2 max-h-full'>
		<div className='items-center justify-center max-w-screen-xl w-10/12 mx-auto flex-1'>
			<Stats/>
			<MainInput/>
		</div>
		<Navbar/>
	</div>
	</>
  )
}

export default Home
