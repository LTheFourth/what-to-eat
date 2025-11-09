# Recipe Backend API

A simple Node.js backend with SQLite database for the Recipe Planner app, optimized for Railway deployment.

## Features

- 🚀 Express.js REST API
- 💾 SQLite database (perfect for Railway)
- 🔐 JWT Authentication
- 📝 Recipe CRUD operations
- 🛡️ Security with Helmet & Rate Limiting
- ✅ Input validation with Joi
- 📱 CORS enabled for frontend

## Quick Start

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

### Railway Deployment

1. Push to GitHub
2. Connect repository to Railway
3. Set environment variables in Railway dashboard
4. Deploy! 🎉

## API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

### Weekly Plans
- `GET /api/plans` - Get all weekly plans
- `POST /api/plans` - Create new weekly plan
- `GET /api/plans/:id` - Get weekly plan by ID
- `DELETE /api/plans/:id` - Delete weekly plan

## Environment Variables

```
NODE_ENV=production
PORT=8080
JWT_SECRET=your-super-secret-jwt-key
DATABASE_URL=./database.sqlite
```

## Database Schema

### Recipes Table
- id (Primary Key)
- name (TEXT)
- ingredients (JSON)
- instructions (TEXT, optional)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Weekly Plans Table
- id (Primary Key)
- name (TEXT)
- plan_data (JSON)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

## Railway Setup

1. **Database**: SQLite file will be created automatically
2. **Environment**: Set `NODE_ENV=production` in Railway
3. **Port**: Railway automatically sets PORT
4. **Persistent Storage**: SQLite file persists across deployments

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Deploy to Railway for testing

## License

MIT License
