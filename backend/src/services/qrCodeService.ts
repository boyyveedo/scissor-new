// src/services/qrCodeService.ts
import axios from 'axios';
import dotenv from 'dotenv';
import QRCode from '../models/qrCode.model';

dotenv.config();

export const generateQRCode = async (data: string): Promise<string> => {
    const options = {
        method: 'GET',
        url: 'https://qr-code-generator20.p.rapidapi.com/generateadvancebase64',
        params: {
            data: encodeURIComponent(data),
            size: '190',
            margin: '10',
            label: 'Scissor',
            label_size: '20',
            label_alignment: 'center',
            foreground_color: '000000',
            background_color: 'FFFFFF'
        },
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': 'qr-code-generator20.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const qrCodeBase64 = response.data;

        // Save to the database
        const newQRCode = new QRCode({
            originalUrl: data,
            qrCodeBase64
        });

        await newQRCode.save();

        return qrCodeBase64;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw new Error('Failed to generate QR code');
    }
};
