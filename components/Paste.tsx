import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import {
    createDecipheriv
} from 'crypto';

import Highlight from 'react-highlight';
import { useTheme } from 'next-themes';

import Head from 'next/head';


const Paste = ({ paste }: { paste: string}) : JSX.Element => {
    const { asPath } = useRouter();

    const { theme, setTheme } = useTheme();

    const [pasteData, setPasteData] = useState<string>('')

    useEffect(() => {

        try {
            const [_, iv, pkey] = asPath.split('#');
            const ivBuffer = Buffer.from(iv, 'hex');
            const pkeyBuffer = Buffer.from(pkey, 'hex');

            const decrypt = createDecipheriv('aes-256-cbc', pkeyBuffer, ivBuffer);
            let decrypted = decrypt.update(paste, 'base64', 'utf8');
            decrypted += decrypt.final('utf8');
            setPasteData(decrypted);
        }
        catch(err) {
            setPasteData('Decryption failed');
        }

    }, [])

    return (
        <>
            <Head>
                {
                    theme === 'light'
                    ?
                    <link rel="stylesheet" href="/styles/github.css"></link>
                    :
                    <link rel="stylesheet" href="/styles/github-dark.css"></link>
                }
            </Head>
            <div>
                <Highlight className="font-mono dark:bg-zinc-700 dark:text-slate-200 bg-slate-100 rounded-md max-h-full min-h-full">
                    {pasteData}
                </Highlight>
            </div>
        </>
    )
}


export default Paste