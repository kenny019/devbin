import { ChangeEvent, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { createDecipheriv } from "crypto";

import Highlight from "react-highlight";
import { useTheme } from "next-themes";

import Head from "next/head";

import Skeleton from "./Skeleton";

const Paste = ({ paste }: { paste: string }): JSX.Element => {
	const { asPath } = useRouter();

	const { theme, setTheme } = useTheme();

	const [pasteData, setPasteData] = useState<string>("");

	const [fadeToast, setFadeToast] = useState<boolean>(false);

	useEffect(() => {
		try {
			const [_, iv, pkey] = asPath.split("#");
			const ivBuffer = Buffer.from(iv, "hex");
			const pkeyBuffer = Buffer.from(pkey, "hex");

			const decrypt = createDecipheriv(
				"aes-256-cbc",
				pkeyBuffer,
				ivBuffer
			);

			let decrypted = decrypt.update(paste, "base64", "utf8");
			decrypted += decrypt.final("utf8");
			setPasteData(decrypted);
		} catch (err) {
			setPasteData("Decryption failed");
		}
	}, []);

	return (
		<>
			<Head>
				{theme === "light" ? (
					<link rel="stylesheet" href="/styles/github.css"></link>
				) : (
					<link
						rel="stylesheet"
						href="/styles/github-dark.css"
					></link>
				)}
			</Head>
			{pasteData ? (
				<div>
					<button
						type="button"
						title="Copy to Clipboard"
						className="mb-2 inline-flex items-center rounded-md border border-transparent bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-400"
						onClick={(e) => {
							e.preventDefault();

							navigator.clipboard.writeText(pasteData);

							setFadeToast(true);

							setTimeout(() => {
								setFadeToast(false);
							}, 2000);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
							/>
						</svg>
					</button>

					<Highlight className="font-mono dark:bg-zinc-700 dark:text-slate-200 bg-slate-100 rounded-md max-h-full min-h-full">
						{pasteData}
					</Highlight>
				</div>
			) : (
				<div>
					<Skeleton className={"w-[58px] h-[42px] mb-2"} />
					<Skeleton className={"w-full h-[1080px]"} />
				</div>
			)}
			<div
				className={`transition-all duration-200 ${
					fadeToast ? "opacity-100" : "opacity-0"
				}`}
			>
				<div className="toast toast-end z-50">
					<div className="alert bg-slate-200 dark:bg-zinc-700 text-gray-500 dark:text-white">
						<div>
							<span>Copied to Clipboard</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Paste;
