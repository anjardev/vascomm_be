# BE-VASCOMM

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory with your database and server configuration.

## Database Setup

### Run Migrations

```bash
npx sequelize-cli db:migrate
```

### Seed Database

```bash
npx sequelize-cli db:seed:all
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The server will run on the configured port (default: 3000).

## API Routes

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
  - **Body:** `{ "name": "string", "email": "string", "password": "string", "role": "string" }`
- `PUT /api/users/:id` - Update user
  - **Body:** `{ "name": "string", "email": "string", "password": "string", "role": "string" }`
- `DELETE /api/users/:id` - Delete user

### Authentication
- `POST /api/auth/login` - User login
  - **Body:** `{ "email": "string", "password": "string" }`
- `POST /api/auth/refresh-token` - Refresh Token
- `POST /api/auth/register` - User registration
  - **Body:** `{ "name": "string", "email": "string", "password": "string", "role": "string" }`
- `POST /api/auth/logout` - User logout
  - **Body:** `{ "token": "string" }`

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
  - **Body:** `{ "name": "string", "description": "string", "price": "number" }`
- `PUT /api/products/:id` - Update product
  - **Body:** `{ "name": "string", "description": "string", "price": "number" }`
- `DELETE /api/products/:id` - Delete product

## Notes

Update routes and endpoints according to your actual project structure.
