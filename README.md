# Open Curator

> A digital platform for creating personalized virtual art exhibitions from world-renowned museum collections

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)

## 🎨 About

Open Curator is a web application that allows users to search, discover, and curate personalized virtual art exhibitions using artworks from multiple prestigious museum APIs. Built for art lovers, researchers, and students, this platform makes it easy to create and share custom collections of historical and contemporary artworks.

### Key Features

- 🔍 **Smart Search**: Search across multiple museum collections simultaneously
- 🏛️ **Multiple Museums**: Integrates with Harvard Art Museums, Metropolitan Museum of Art, and Australian Museum APIs
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices  
- ❤️ **Personal Collections**: Save artworks to create personalized exhibitions using React Context
- 🔗 **Direct Museum Links**: Easy access to original museum pages for each artwork
- ⚡ **Fast Performance**: Cached results and optimized loading with Next.js
- 🎯 **Session Persistence**: Collections persist throughout your browsing session
- 🖼️ **Image Optimization**: IIIF image optimization for fast loading

## 🏛️ Museum Partners

- **Harvard Art Museums** - Access to over 250,000 objects from Harvard's world-class collections
- **Metropolitan Museum of Art** - Explore artworks from one of the world's largest and most prestigious art museums  
- **Australian Museum** - National Museum of Australia collections

## 🚀 Running the Application Offline

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** 18.x or higher ([Download here](https://nodejs.org/))
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Harvard Art Museums API Key** (free registration required)

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/open-curator.git
cd open-curator
```

### Step 2: Install Dependencies

Choose one of the following package managers:

```bash
# Using npm (most common)
npm install

# Using yarn
yarn install

# Using pnpm (faster)
pnpm install

# Using bun (fastest)
bun install
```

### Step 3: Environment Configuration

The application requires API keys to access museum collections. Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add the following environment variables to `.env.local`:

```env
# Harvard Art Museums API (Required)
HARVARD_MUSEUM_API_KEY=your_harvard_api_key_here

# Optional: Australian Museum API Key
MUSEUM_API_KEY=your_museum_api_key_here
```

#### Getting API Keys

**Harvard Art Museums API (Required):**
1. Visit [Harvard Art Museums API](https://www.harvardartmuseums.org/collections/api)
2. Click "Request an API Key"  
3. Fill out the registration form (free for educational and personal use)
4. Copy your API key to the `.env.local` file
5. **Important**: Wait a few minutes after registration for the API key to become active

**Metropolitan Museum API:**
- No API key required - uses open access API

**Australian Museum API (Optional):**
- Contact the museum directly for API access if needed

### Step 4: Verify Configuration

Check that your configuration is correct:

```bash
# Verify your .env.local file
cat .env.local

# Should show your API keys (keep these secret!)
```

### Step 5: Run the Development Server

Start the application in development mode:

```bash
# Using npm
npm run dev

# Using yarn  
yarn dev

# Using pnpm
pnpm dev

# Using bun
bun dev
```

The application will be available at:
- **Primary URL**: [http://localhost:3000](http://localhost:3000)
- **Network Access**: The app will also display your local network IP for testing on mobile devices

### Step 6: Build for Production (Offline Deployment)

To create an optimized production build:

```bash
# Create production build
npm run build

# Start production server
npm start
```

The production server will run on [http://localhost:3000](http://localhost:3000)

### Step 7: Advanced Offline Configuration

#### Static Export (Optional)
For completely offline deployment without a server:

```bash
# Add to next.config.ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

# Then build
npm run build
```

#### Docker Deployment (Optional)
Create a `Dockerfile` for containerized deployment:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📱 How to Use

### Searching for Artworks
1. **Browse Initial Collection**: The homepage loads with a curated selection of artworks
2. **Search by Keywords**: Use the search bar to find specific artworks, artists, or themes
3. **Filter Results**: Results are automatically filtered as you type
4. **API Search**: Click the search button to query external museum APIs for more results

### Creating Your Exhibition
1. **Add to Favorites**: Click the favorite button (❤️) on any artwork
2. **View Collection**: Navigate to "My Collection" to see all saved artworks
3. **Manage Collection**: Remove items or clear your entire collection
4. **Explore Details**: Click on artwork titles to visit the original museum page

### Responsive Design
- **Desktop**: Full grid layout with detailed information
- **Tablet**: Optimized grid with touch-friendly controls
- **Mobile**: Single-column layout with swipe gestures

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **State Management**: React Context API
- **Hooks**: Custom hooks for favorites management

### APIs & Data
- **Harvard Art Museums API**: Primary museum data source
- **Metropolitan Museum of Art API**: Secondary museum data source
- **Caching**: Next.js built-in caching with revalidation
- **Rate Limiting**: Implemented to respect API guidelines

### Development Tools
- **Testing**: Jest with React Testing Library
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript strict mode
- **Build Tool**: Next.js built-in bundling

## 📁 Project Structure

```
exhibition-curator/
├── app/
│   ├── api/                    # API routes
│   │   ├── harvard/search/     # Harvard Museum API endpoint
│   │   └── met/search/         # Met Museum API endpoint
│   ├── collection/             # Collection page
│   ├── lib/
│   │   ├── components/         # Reusable React components
│   │   │   ├── Layout/         # Header, navigation components
│   │   │   └── UI/             # Search, grid, collection components
│   │   ├── contexts/           # React Context providers
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API service classes
│   │   └── utils/              # Utility functions
│   ├── layout.tsx              # Root layout component
│   └── page.tsx                # Homepage
├── __tests__/                  # Test files
├── config.ts                   # API configuration
├── jest.config.ts              # Jest testing configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Environment Variables**:
   - Add `HARVARD_MUSEUM_API_KEY` in Vercel dashboard
   - Add any other required environment variables

3. **Deploy**:
   - Vercel automatically deploys on every push to main branch
   - Production URL will be provided

### Other Platforms

The application can also be deployed on:
- **Netlify**: Connect GitHub repo and add environment variables
- **Railway**: Deploy with automatic HTTPS and custom domains
- **Render**: Free static site hosting with easy setup

## 🔧 Configuration

### API Configuration

Edit `config.ts` to modify API endpoints:

```typescript
export const config = {
  harvardMuseum: {
    baseUrl: 'https://api.harvardartmuseums.org',
    apiKey: process.env.HARVARD_MUSEUM_API_KEY || '',
  },
  metMuseum: {
    baseUrl: 'https://collectionapi.metmuseum.org/public/collection/v1',
  },
};
```

### Performance Settings

- **Image Caching**: 1 hour (3600s) for museum images
- **API Caching**: 1 hour for search results
- **Rate Limiting**: Respects museum API guidelines

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. **Code Style**: Follow existing TypeScript and React patterns
2. **Testing**: Add tests for new features
3. **Documentation**: Update README for significant changes
4. **API Usage**: Respect museum API rate limits and terms of service

### Adding New Museum APIs

1. Create a new service class in `app/lib/services/`
2. Add API configuration to `config.ts`
3. Create API route in `app/api/`
4. Update search integration in components

## 📚 API Documentation

### Harvard Art Museums API
- **Documentation**: [Harvard Art Museums API Docs](https://github.com/harvardartmuseums/api-docs)
- **Rate Limits**: 2,500 requests per day (free tier)
- **Features**: Advanced search, high-quality images, detailed metadata

### Metropolitan Museum of Art API
- **Documentation**: [Met Museum API](https://metmuseum.github.io/)
- **Rate Limits**: No official limits, but respectful usage required
- **Features**: Open access collection, high-resolution images

## ❓ Troubleshooting

### Common Issues

**API Key Not Working**
```bash
# Check your .env.local file
cat .env.local

# Restart development server
npm run dev
```

**Build Errors**
```bash
# Clear Next.js cache
npx next clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Images Not Loading**
- Check internet connection
- Verify museum API status
- Check browser console for CORS errors

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Harvard Art Museums** for providing free access to their collection API
- **Metropolitan Museum of Art** for their open access program
- **Next.js Team** for the excellent React framework
- **Vercel** for free hosting and deployment platform

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/exhibition-curator/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

---

**Built with ❤️ for art lovers, researchers, and curious minds everywhere.**




