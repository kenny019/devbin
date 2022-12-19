import type { NextPage } from "next";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import MainInput from "../components/MainInput";
import Navbar from "../components/Navbar";
import Stats from "../components/Stats";

type statsData = {
	pastes: number;
	daily: number;
	reset_time: number;
};

const Home: NextPage<{ stats: statsData }> = ({ stats }) => {
	return (
		<>
			<Stats stats={stats} />
			<MainInput />
		</>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps<{
	stats: statsData;
}> = async (ctx) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/stats`, {
		method: "GET",
	});

	const stats = await res.json();

	return {
		props: {
			stats,
		},
	};
};
