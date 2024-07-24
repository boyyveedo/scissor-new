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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQRCode = void 0;
const qrCodeService_1 = require("../services/qrCodeService");
const getQRCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.query;
        if (typeof data !== 'string') {
            res.status(400).send('Invalid data');
            return;
        }
        const qrCodeBase64 = yield (0, qrCodeService_1.generateQRCode)(data);
        const imgBuffer = Buffer.from(qrCodeBase64, 'base64');
        res.setHeader('Content-Type', 'image/png');
        //res.setHeader('Content-Disposition', 'attachment; filename="qrcode.png"');
        res.send(imgBuffer);
    }
    catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send('Error generating QR code');
    }
});
exports.getQRCode = getQRCode;
