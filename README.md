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
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Notes

Update routes and endpoints according to your actual project structure.
