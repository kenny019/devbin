import { 
    useState,
} from "react";

import { useTheme } from 'next-themes';

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

import Link from 'next/link';

const NavItem = ({ text, url }: {text: string, url?: string}) : JSX.Element => {
    return (
        <Link href={url ? url : ""}><a className='hover:text-gray-400'>{text}</a></Link>
    )
}

const DarkModeButton = ({ theme, setTheme }: {theme: string | undefined, setTheme: (theme: string) => void}) : JSX.Element => {
    return (
    <>
        {theme === 'light' ? <MoonIcon onClick={() => setTheme('dark')} className='h-5 w-5 hover:text-gray-400'/> : <SunIcon onClick={() => setTheme('light')} className='h-5 w-5 hover:text-gray-300'/>}
    </>
    )
}

const Navbar = () : JSX.Element => {
    const { theme, setTheme } = useTheme();

    return (
        <>
        <nav className='bottom-0 w-screen py-4 z-40 absolute bg-stone-50 dark:bg-zinc-800'>
            <div className='max-w-6xl mx-auto'>
                <div className=''> {/* logo */}
                    <div className='flex items-center relative'>
                        <em className='px-2 rounded-md box-decoration-clone bg-gradient-to-r dark:from-stone-700 dark:to-stone-800 from-gray-100 to-white text-gray-600 dark:text-white text-2xl font-bold cursor-pointer select-none mr-3 hover:text-gray-200 dark:hover:text-gray-400'>devBin</em>
                        <div className='flex space-x-6 ml-auto text-sm cursor-pointer select-none font-semibold border-l border-slate-200 pl-4'>
                            <NavItem text='About'/>
                            <NavItem text='Github'/>
                            <NavItem text='API'/>
                            <DarkModeButton theme={theme} setTheme={setTheme}/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
};

export default Navbar;