# 🚀 GitHub Pages Deployment Setup

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

## 📋 Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under "Build and deployment", select **GitHub Actions** as the source

### 2. Add GitHub Secrets

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add the following secrets:

#### Required Secrets:

**HUGGINGFACE_API_KEY**
- Your Hugging Face API token
- Get it from: https://huggingface.co/settings/tokens

**API_URL** (Optional)
- Your backend API URL (if using the Node.js backend)
- Example: `https://your-backend-name.railway.app/api`
- If not set, defaults to the placeholder value

### 3. Push to Main

Once you push to the `main` branch, GitHub Actions will automatically:
1. Build your React app
2. Inject the secrets as environment variables
3. Deploy to GitHub Pages

## 🔧 Environment Variables

The workflow automatically creates a `.env.production` file during build:

```env
VITE_HUGGINGFACE_API_KEY=${{ secrets.HUGGINGFACE_API_KEY }}
VITE_API_URL=${{ secrets.API_URL || 'https://your-backend-name.railway.app/api' }}
```

## 📱 Access Your App

After deployment, your app will be available at:
```
https://[your-username].github.io/recipe-app/
```

## 🛠️ Local Development

For local development, create a `.env` file:

```env
VITE_HUGGINGFACE_API_KEY=your_local_api_key
VITE_API_URL=http://localhost:8080/api
```

## 🔍 Troubleshooting

### Build Fails
- Check if all required secrets are set in GitHub repository settings
- Verify your Hugging Face API key is valid

### Deployment Fails
- Ensure GitHub Pages is enabled in repository settings
- Check Actions tab for detailed error logs

### API Key Not Working
- Verify the Hugging Face API key has the correct permissions
- Check that the key is properly set in repository secrets

### CORS Issues
- If using a backend, ensure it's configured to allow requests from your GitHub Pages domain
- Update the backend CORS settings accordingly

## 🔄 Workflow Triggers

The deployment workflow runs on:
- Push to `main` branch
- Pull requests to `main` branch (for testing)

## 📊 Monitoring

Check the **Actions** tab in your GitHub repository to:
- Monitor deployment status
- View build logs
- Debug any issues

## 🔐 Security Notes

- ✅ API keys are stored securely in GitHub Secrets
- ✅ Secrets are not exposed in the built application
- ✅ Environment variables are injected during build time
- ⚠️ Never commit `.env` files to the repository
- ⚠️ Regularly rotate your API keys

## 🌐 Custom Domain (Optional)

To use a custom domain:
1. Go to **Settings** → **Pages**
2. Add your custom domain
3. Update the `base` property in `vite.config.ts` if needed
4. Update CORS settings in your backend to include the new domain
