import type { NextApiRequest, NextApiResponse } from "next";

import * as fs from "fs";

import path from "path";

import { createHash } from "crypto";

type RequestData = {
	data: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<string>
) {
	if (req.method !== "POST") {
		return res.status(405).send("GET request not supported.");
	}

	const { data }: RequestData = req.body;

	if (!data) {
		return res.status(400).send("Missing data parameter in request.");
	}

	try {
		const hash = createHash("sha256");

		const pasteBuffer = Buffer.from(data, "utf8");
		hash.update(pasteBuffer);

		const pasteHash = hash.digest("base64url");

		let stats = JSON.parse(
			fs.readFileSync(`${process.cwd()}/stats.json`).toString()
		);

		stats.pastes++;
		stats.daily++;

		const curTime = Math.floor(Date.now() / 1000);

		if (curTime - stats.reset_time > 86400) {
			stats.reset_time = Math.floor(Date.now());
			stats.daily = 0;
		}

		fs.writeFileSync(
			path.resolve(`${process.cwd()}/stats.json`),
			JSON.stringify(stats, null, 4)
		);
		fs.writeFileSync(
			path.resolve(`${process.cwd()}/pastes/${pasteHash}.txt`),
			data
		);

		return res.status(201).send(pasteHash);
	} catch (err) {
		return res.status(500);
	}
}
