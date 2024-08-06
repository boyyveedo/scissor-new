import { jest } from '@jest/globals';

// Mock implementation of the shortUrl model
export const shortUrl = jest.fn().mockImplementation(() => ({
    save: jest.fn(),
}));
