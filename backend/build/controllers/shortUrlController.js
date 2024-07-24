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
exports.createShortUrl = createShortUrl;
exports.handleRedirect = handleRedirect;
exports.getAnalytics = getAnalytics;
const shortUrlService_1 = require("../services/shortUrlService");
const analytic_model_1 = require("../models/analytic.model");
function isErrorWithMessage(error) {
    return typeof error === 'object' && error !== null && 'message' in error;
}
function createShortUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { destination, customAlias } = req.body;
            const newUrl = yield (0, shortUrlService_1.createShortUrlService)(destination, customAlias);
            return res.status(201).json({ newUrl });
        }
        catch (error) {
            console.error("Error creating short URL:", error);
            if (isErrorWithMessage(error) && error.message === 'Custom URL already in use') {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
function handleRedirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { shortId } = req.params;
            const short = yield (0, shortUrlService_1.getShortUrlByShortId)(shortId);
            analytic_model_1.analytics.create({ shortId: short._id });
            return res.redirect(short.destination);
        }
        catch (error) {
            console.error("Error handling redirect:", error);
            if (isErrorWithMessage(error) && error.message === 'URL not found') {
                return res.sendStatus(404);
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
function getAnalytics(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield analytic_model_1.analytics.find({}).lean();
            return res.status(200).json(data);
        }
        catch (error) {
            console.error('Error fetching analytics:', error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
