import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

const MainInput = () : JSX.Element => {

    useEffect(() => {
        hljs.initHighlighting();
    }, [])

    return (
        <div className=''>

            <textarea 
            className="textarea bg-slate-100 w-full font-mono h-64" 
            placeholder="Enter code"
            >
            </textarea>
            <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
            <div className="flex">
                <button
                type="button"
                className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
                >
                <span className="text-sm italic text-gray-500 group-hover:text-gray-600">Attach a file</span>
                </button>
            </div>
            <div className="flex-shrink-0">
                <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-500"
                >
                Paste
                </button>
            </div>
            </div>
        </div>
    )
}

export default MainInput;
