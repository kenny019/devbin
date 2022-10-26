import type { NextApiRequest, NextApiResponse } from 'next'

import * as fs from 'fs';

import path from 'path';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    if (req.method !== 'GET') {
        return res.status(405).send('POST request not supported.');
    }

    const {
        file,
    } = req.query;

    if (!file) {
        return res.status(400).send('Missing paste parameter in request.');
    }

    const pasteDirectory = path.resolve(`${process.cwd()}/pastes/${file}.txt`)

    try {
        const pasteExists = fs.existsSync(pasteDirectory);

        if (!pasteExists) {
            return res.status(404).send('Paste not found.');
        }
    
        const pasteData = fs.readFileSync(pasteDirectory).toString(); 
    
        return res.status(200).send(pasteData);
    }
    catch(err) {
        // todo implement error logging
        console.error(err);
        return res.status(500);
    }
}
