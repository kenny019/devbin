import { GetServerSideProps, InferGetServerSidePropsType } from 'next';


import type { NextPage } from 'next';

import Navbar from '../../components/Navbar';
import Stats from '../../components/Stats';
import Paste from '../../components/Paste';

const Home: NextPage<{paste: string}> = ({ paste }: InferGetServerSidePropsType<typeof getServerSideProps>) : JSX.Element => {

  return (
	<>
	<div className='flex flex-col min-h-screen py-2 max-h-full'>
		<div className='items-center justify-center max-w-screen-xl w-10/12 mx-auto flex-1'>
			<Stats/>
            <Paste paste={paste} />
		</div>
		<Navbar/>
	</div>
	</>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<{paste: string}> = async (ctx) => {
    const { name } = ctx.query;

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pastes/${name}`,{
        method: 'GET',
    });

    const paste = await res.text();

    return {
        props: {
            paste,
        },
    }
}