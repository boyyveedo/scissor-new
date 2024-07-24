"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQRCode = void 0;
// src/services/qrCodeService.ts
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const qrCode_model_1 = __importDefault(require("../models/qrCode.model"));
dotenv_1.default.config();
const generateQRCode = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'GET',
        url: 'https://qr-code-generator20.p.rapidapi.com/generateadvancebase64',
        params: {
            data: encodeURIComponent(data),
            size: '196',
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
        const response = yield axios_1.default.request(options);
        const qrCodeBase64 = response.data;
        // Save to the database
        const newQRCode = new qrCode_model_1.default({
            originalUrl: data,
            qrCodeBase64
        });
        yield newQRCode.save();
        return qrCodeBase64;
    }
    catch (error) {
        console.error('Error generating QR code:', error);
        throw new Error('Failed to generate QR code');
    }
});
exports.generateQRCode = generateQRCode;
