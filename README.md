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
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create new user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh-token` - Refresh Token
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/logout` - User logout

### Authentication (Google OAuth)
> Redirect-based OAuth flow (browser only).
- `GET /api/v1/auth/google` - Login with Google
- `GET /api/v1/auth/google/callback` - Google OAuth callback

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get product by ID
- `POST /api/v1/products` - Create product
- `PUT /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product

## Notes

Update routes and endpoints according to your actual project structure.
