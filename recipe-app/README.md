# Recipe Planner

A PWA-enabled recipe planning application built with Vite, React, and TypeScript.

## Features

- **PWA Ready**: Works offline and can be installed as a desktop app
- **Recipe Input**: Add recipes with name and multiple ingredients
- **Weekly Meal Planning**: Generate random meal plans for 6 days (2-3 recipes per day)
- **AI Recipe Generation**: Get detailed cooking instructions via Hugging Face API
- **GitHub Pages Ready**: Configured for easy deployment
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

### Build

Build for production:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

## Deployment to GitHub Pages

1. Update the `base` path in `vite.config.ts` if your repository name is different
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy the `dist` folder to your GitHub Pages branch

## Hugging Face API Integration

To enable AI recipe generation:

1. Get a free API key from [Hugging Face](https://huggingface.co/)
2. Replace `hf_your_api_key_here` in `src/components/RecipeCard.tsx` with your actual API key
3. The app will generate detailed cooking instructions using the Mistral-7B model

## Usage

1. **Add Recipes**: Use the "Add Recipes" tab to input your recipes with ingredients
2. **Generate Weekly Plan**: Switch to "Weekly Plan" tab and click "Generate Weekly Plan"
3. **View Recipe Details**: Click on any recipe card to see detailed information and generate cooking instructions

## Technologies Used

- Vite
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Vite PWA
- Radix UI

## License

MIT
