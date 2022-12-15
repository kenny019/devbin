import type { NextPage } from 'next';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import MainInput from '../components/MainInput';
import Navbar from '../components/Navbar';
import Stats from '../components/Stats';

type statsData = {
	pastes: number,
	daily: number,
	reset_time: number, 
}

const Home: NextPage<{stats: statsData}>= ({ stats }) => {
  return (
	<>
	<div className='flex flex-col min-h-screen py-2 max-h-full'>
		<div className='items-center justify-center max-w-screen-xl w-10/12 mx-auto flex-1'>
			<Stats stats={stats}/>
			<MainInput/>
		</div>
		<Navbar/>
	</div>
	</>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<{stats: statsData}> = async (ctx) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/stats`,{
        method: 'GET',
    });

    const stats = await res.json();

    return {
        props: {
            stats,
        },
    }
}
