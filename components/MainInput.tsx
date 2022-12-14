import { ChangeEvent, useEffect, useState, useRef } from 'react';
import crypto from 'crypto';
import { useRouter } from 'next/router';

const handleFileRead = (inputFile: File) : Promise<string> => {
    return new Promise((res, rej) => {
        const fileReader = new FileReader();
        
        fileReader.readAsText(inputFile);
        fileReader.onload = () => {
            let output = fileReader.result;
            if (typeof output !== 'string') {
                rej('');
                return;
            }

            res(output);
        }

        fileReader.onerror = () => {
            rej('')
        }

    })
}

const MainInput = () : JSX.Element => {

    const [codeInput, setCodeInput] = useState<string>('');
    const [inputFile, setInputFile] = useState<File>();


    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const router = useRouter();

    return (
        <div className=''>
            <textarea 
            className="textarea bg-slate-100 dark:bg-zinc-700 w-full font-mono sm:h-48 h-32 lg:h-64 max-h-full dark:placeholder-slate-200"
            placeholder="Enter code"
            onChange={(event) => {
                setCodeInput(event.target.value);
            }}
            >
            </textarea>
            <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
            <div className="flex">
                <button
                type="button"
                className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
                onClick={async (event) => {
                    fileInputRef.current?.click();
                }}
                >
                <span className="text-sm italic text-gray-500 group-hover:text-gray-600 dark:text-white dark:group-hover:text-zinc-300">{inputFile ? inputFile.name : 'Attach a file'}</span>
                </button>

                <input
                type='file'
                className='hidden'
                ref={fileInputRef}
                onChange={(event) => {
                    if (!event.target.files) {
                        return;
                    }

                    setInputFile(event.target.files[0]); 
                }}
                />
            </div>
            <div className="flex-shrink-0">
                <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-gray-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-500"
                onClick={async (event) => {
                    event.preventDefault();

                    // encrypt via aes-256
                    // redirect to the page with key in the link

                    let submitData = codeInput;

                    if (inputFile) {
                        const fileData = await handleFileRead(inputFile);

                        if (fileData.length > 1) submitData = fileData;
                    }

                    const initVector = crypto.randomBytes(16);
                    const secretKey = crypto.randomBytes(32);

                    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, initVector);
                    let encrypted = cipher.update(submitData, 'utf8', 'base64');
                    encrypted += cipher.final('base64');

                    const res = await fetch('/api/new', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            data: encrypted,
                        })
                    });

                    const pasteLink = await res.text();

                    router.push(`${process.env.NEXT_PUBLIC_URL}/pastes/${pasteLink}#${initVector.toString('hex')}#${secretKey.toString('hex')}`);
                }}
                >
                Paste
                </button>
            </div>
            </div>
        </div>
    )
}

export default MainInput;
