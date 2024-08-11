# Scissor - URL Shortening Service

Scissor is a URL shortening service that allows users to create short, customizable URLs, generate QR codes, and track the performance of their links with basic analytics.

## Features

- **URL Shortening**: Convert long URLs into short, easy-to-share links.
- **Custom URLs**: Create branded short links with custom aliases.
- **QR Code Generation**: Generate QR codes for your short links.
- **Analytics**: Track the number of clicks and referrers for your short links.
- **Link History**: View the history of your created links.

## Technologies

- **Backend**: Node.js (TypeScript) 
- **Database**: MongoDB 
- **Authentication**: Auth0
- **Cache**: Redis
- **API Documentation**: OpenAPI (swagger && stoplight)

## Setup and Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/boyyveedo/scissor-new.git
    cd scissor-new
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    # or
    pip install -r requirements.txt
    ```

3. **Environment Variables**:
   - Create a `.env` file and configure the following:
     ```env
     DATABASE_URL=your_database_url
     AUTH0_DOMAIN=your_auth0_domain
     AUTH0_CLIENT_ID=your_auth0_client_id
     AUTH0_CLIENT_SECRET=your_auth0_client_secret
     ```

4. **Run the Application**:
    ```bash
    npm run dev
    # or
      npm start
    # or
    python app.py
    ```

## API Documentation

The API is documented using OpenAPI. You can view the documentation [here](https://scissor-456p.onrender.com/api-docs/).

## Testing

Run the test suite:

```bash
npm test
# or
pytest
