import dotenv from 'dotenv'
dotenv.config()

export const Port = process.env.Port
export const MongoURI = process.env.MongoURI
export const corsOrigin = process.env.corsOrigin
    ; 