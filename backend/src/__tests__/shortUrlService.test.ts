import { createShortUrlService } from '../services/shortUrlService';
import { shortUrl } from '../models/shortUrl.model';
import mongoose from 'mongoose';

// Mock the Mongoose model
jest.mock('../models/shortUrl.model');

describe('createShortUrlService', () => {
    it('should create a short URL with custom alias', async () => {
        const destination = 'http://example.com';
        const auth0Id = 'test-auth0Id';
        const customAlias = 'customAlias';

        const mockSave = jest.fn();
        // Mock the constructor to return an object with a save method
        (shortUrl as unknown as jest.Mock).mockImplementation(() => ({
            save: mockSave,
        }));

        await createShortUrlService(destination, auth0Id, customAlias);

        expect(mockSave).toHaveBeenCalled();
    });

    it('should throw an error if destination is not provided', async () => {
        await expect(createShortUrlService('', 'auth0Id')).rejects.toThrow(
            'Destination required'
        );
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
