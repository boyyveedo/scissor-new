import { Request, Response } from 'express';
import { generateQRCode } from '../services/qrCodeService';

export const getQRCode = async (req: Request, res: Response): Promise<void> => {
    try {

        const { data } = req.query;
        if (typeof data !== 'string') {
            res.status(400).send('Invalid data');
            return;
        }

        const qrCodeBase64 = await generateQRCode(data);
        const imgBuffer = Buffer.from(qrCodeBase64, 'base64');

        res.setHeader('Content-Type', 'image/png');
        //res.setHeader('Content-Disposition', 'attachment; filename="qrcode.png"');
        res.send(imgBuffer);
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send('Error generating QR code');
    }
};
