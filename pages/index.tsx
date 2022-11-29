import type { NextPage } from 'next';
import Head from 'next/head';

import MainInput from '../components/MainInput';
import Navbar from '../components/Navbar';
import Stats from '../components/Stats';

const Home: NextPage = () => {
  return (
	<>
	<Navbar/>
	<div className='min-h-screen items-center justify-center py-2 max-w-lg mx-auto'>
		<Stats/>
		<MainInput/> 
	  </div>
	</>
  )
}

export default Home
