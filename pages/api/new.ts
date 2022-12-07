import type { NextApiRequest, NextApiResponse } from 'next'

import * as fs from 'fs';

import path from 'path';

import {
    createHash,
} from 'crypto';

interface RequestData {
    data: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    if (req.method !== 'POST') {
        return res.status(405).send('GET request not supported.');
    }

    const {
        data,
    } : RequestData = req.body;

    if (!data) {
        return res.status(400).send('Missing data parameter in request.');
    }

    try {
        const hash = createHash('sha256');

        const pasteBuffer = Buffer.from(data, 'utf8');
        hash.update(pasteBuffer);

        const pasteHash = hash.digest('base64url');

        fs.writeFileSync(path.resolve(`${process.cwd()}/pastes/${pasteHash}.txt`), data);

        return res.status(201).send(pasteHash);
    }
    catch (err) {
        return res.status(500);
    }
    
}
