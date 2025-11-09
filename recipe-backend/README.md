# 🚀 Recipe Backend - Serverless API

A serverless Node.js backend with SQLite database optimized for Railway deployment.

## ✨ Features

- 🌐 **Serverless Functions**: Individual API functions for better performance
- 💾 **SQLite Database**: File-based database perfect for Railway
- 🔐 **Security**: Helmet, rate limiting, input validation
- 📝 **REST API**: Full CRUD for recipes and weekly plans
- ✅ **Input Validation**: Joi schema validation
- 🌍 **CORS Enabled**: Configured for GitHub Pages
- 🏥 **Health Check**: `/health` endpoint for monitoring

## 🏗️ Serverless Architecture

```
recipe-backend/
├── index.js              # Main serverless entry point
├── api/
│   ├── recipes.js        # Recipe CRUD functions
│   └── plans.js          # Weekly plan CRUD functions
├── database/
│   └── init.js           # Database initialization
├── scripts/
│   └── migrate.js        # Migration script
├── railway.toml          # Railway serverless config
└── package.json          # Dependencies
```

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### Railway Serverless Deployment

1. **Push to GitHub**
2. **Connect to Railway**
3. **Deploy!** 🎉

## 📡 API Endpoints

### Recipes
```
GET    /api/recipes          # Get all recipes
GET    /api/recipes/:id      # Get recipe by ID
POST   /api/recipes          # Create recipe
PUT    /api/recipes/:id      # Update recipe
DELETE /api/recipes/:id      # Delete recipe
```

### Weekly Plans
```
GET    /api/plans            # Get all weekly plans
GET    /api/plans/:id        # Get plan by ID
POST   /api/plans            # Create plan
PUT    /api/plans/:id        # Update plan
DELETE /api/plans/:id        # Delete plan
```

### Health Check
```
GET    /health               # Service health status
```

## 🔧 Environment Variables

```env
NODE_ENV=production
PORT=8080
DATABASE_URL=./database.sqlite
CORS_ORIGIN=https://your-username.github.io/recipe-app
```

## 🏭 Railway Serverless Features

### ✅ Automatic Scaling
- Functions scale based on demand
- No server management required
- Pay-per-use pricing

### ✅ Cold Start Optimization
- Database initialization on first request
- Lazy loading for better performance
- Connection pooling

### ✅ Health Monitoring
- Automatic health checks
- Error tracking
- Performance metrics

### ✅ Zero Configuration
- No build step required
- Automatic dependency resolution
- Built-in SSL certificates

## 📊 Database Schema

### Recipes Table
```sql
CREATE TABLE recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  ingredients TEXT NOT NULL,  -- JSON array
  instructions TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Weekly Plans Table
```sql
CREATE TABLE weekly_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  plan_data TEXT NOT NULL,    -- JSON object
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Security Features

- **Helmet**: Security headers
- **Rate Limiting**: 100 requests per 15 minutes
- **CORS**: Configured for frontend domain
- **Input Validation**: Joi schema validation
- **Error Handling**: Sanitized error responses

## 🧪 Testing API Endpoints

```bash
# Health check
curl https://your-app.railway.app/health

# Get all recipes
curl https://your-app.railway.app/api/recipes

# Create recipe
curl -X POST https://your-app.railway.app/api/recipes \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Recipe","ingredients":["ingredient1","ingredient2"]}'
```

## 🔍 Monitoring & Debugging

### Railway Dashboard
- **Logs**: Real-time function logs
- **Metrics**: Performance monitoring
- **Errors**: Automatic error tracking
- **Health**: Service health status

### Local Debugging
```bash
# Enable debug logs
DEBUG=* npm run dev

# View database
sqlite3 database.sqlite ".tables"
```

## 🚀 Production Best Practices

### ✅ Environment Setup
- Set `NODE_ENV=production`
- Configure proper CORS origin
- Use Railway's persistent storage

### ✅ Performance
- Enable Railway's Edge locations
- Use proper indexing
- Monitor cold start times

### ✅ Security
- Railway handles DDoS protection
- Built-in SSL certificates
- Environment variable encryption

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Railway
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: railway-app/railway-action@v1
        with:
          api-token: ${{ secrets.RAILWAY_TOKEN }}
```

## 🌐 Frontend Integration

Update your frontend `.env`:
```env
VITE_API_URL=https://your-backend.railway.app/api
```

## 📈 Scaling

### Automatic Scaling
- Railway handles scaling automatically
- Functions scale based on request volume
- No manual intervention required

### Database Scaling
- SQLite for small to medium apps
- Easy migration to PostgreSQL if needed
- Railway handles database backups

## 🆘 Troubleshooting

### Common Issues
1. **Cold Start Delays**: Normal for serverless, improves with usage
2. **Database Connection**: Check file permissions
3. **CORS Errors**: Verify `CORS_ORIGIN` setting
4. **Memory Limits**: Monitor Railway dashboard

### Debug Mode
```bash
# Enable verbose logging
DEBUG=recipe:* npm run dev
```

## 🎯 Next Steps

1. **Deploy to Railway**: Push and connect repository
2. **Configure Environment**: Set Railway environment variables
3. **Test Endpoints**: Verify API functionality
4. **Connect Frontend**: Update frontend API URL
5. **Monitor Performance**: Use Railway dashboard

## 📄 License

MIT License - feel free to use in your projects!
