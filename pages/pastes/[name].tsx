import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import type { NextPage } from 'next';

import Navbar from '../../components/Navbar';
import Stats from '../../components/Stats';
import Paste from '../../components/Paste';

type statsData = {
	pastes: number,
	daily: number,
	reset_time: number, 
}

const Home: NextPage<{paste: string, stats: statsData}> = ({ paste, stats }: InferGetServerSidePropsType<typeof getServerSideProps>) : JSX.Element => {

  return (
	<>
	<div className='flex flex-col min-h-screen py-2 max-h-full'>
		<div className='items-center justify-center max-w-screen-xl w-10/12 mx-auto flex-1'>
			<Stats stats={stats}/>
            <Paste paste={paste} />
		</div>
		<Navbar/>
	</div>
	</>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<{paste: string, stats: statsData}> = async (ctx) => {
    const { name } = ctx.query;

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pastes/${name}`,{
        method: 'GET',
    });

    const paste = await res.text();


    const statsRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/stats`,{
        method: 'GET',
    });

    const stats = await statsRes.json();

    return {
        props: {
            paste,
            stats: stats,
        },
    }
}