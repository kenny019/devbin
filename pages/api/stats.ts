
import type { NextApiRequest, NextApiResponse } from 'next'

import * as fs from 'fs';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    if (req.method !== 'GET') {
        return res.status(405).send('Only GET request is supported.');
    }

    try {
        let stats = JSON.parse(fs.readFileSync(`${process.cwd()}/stats.json`).toString());
        return res.status(200).json(stats);
    }
    catch(err) {
        // todo implement error logging
        console.error(err);
        return res.status(500);
    }
}
