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
exports.createShortUrlService = createShortUrlService;
exports.getShortUrlByShortId = getShortUrlByShortId;
const shortUrl_model_1 = require("../models/shortUrl.model");
const nanoid_1 = require("nanoid");
function createShortUrlService(destination, customAlias) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if a custom alias is provided and if it's valid
        if (customAlias) {
            // Check if the custom url already exists in the database
            const existingUrl = yield shortUrl_model_1.shortUrl.findOne({ shortId: customAlias });
            if (existingUrl) {
                throw new Error('Custom URL already in use');
            }
        }
        // Determine the short ID to use
        const shortId = customAlias || (0, nanoid_1.nanoid)(6);
        // Create a new URL document
        const newUrlData = { shortId, destination };
        const newUrl = new shortUrl_model_1.shortUrl(newUrlData);
        yield newUrl.save();
        return newUrl;
    });
}
function getShortUrlByShortId(shortId) {
    return __awaiter(this, void 0, void 0, function* () {
        const short = yield shortUrl_model_1.shortUrl.findOne({ shortId });
        if (!short) {
            throw new Error('URL not found');
        }
        short.clicks++;
        yield short.save();
        return short;
    });
}
