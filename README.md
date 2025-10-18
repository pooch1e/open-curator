# Open Curator

> A digital platform for creating personalized virtual art exhibitions from world-renowned museum collections

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)

## 🎨 About

Open Curator is a web application that allows users to search, discover, and curate personalized virtual art exhibitions using artworks from multiple prestigious museum APIs. Built for art lovers, researchers, and students, this platform makes it easy to create and share custom collections of historical and contemporary artworks.

## HOSTED
Hosted on Vercel
https://open-curator-kappa.vercel.app/
or live at 
https://www.opencurator.xyz/

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
- **Chicago Museum** - Chicago Museum collection
- **Metropolitan Museum of Art** - Explore artworks from one of the world's largest and most prestigious art museums

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

````env
# Harvard Art Museums API (Required)
HARVARD_MUSEUM_API_KEY=your_harvard_api_key_here


#### Getting API Keys

**Harvard Art Museums API (Required):**
1. Visit [Harvard Art Museums API](https://www.harvardartmuseums.org/collections/api)
2. Click "Request an API Key"
3. Fill out the registration form (free for educational and personal use)
4. Copy your API key to the `.env.local` file
5. **Important**: Wait a few minutes after registration for the API key to become active

**Metropolitan Museum API:**
- No API key required - uses open access API

**Chicago Museum :**
- No API key required - uses open access API, however it is rate limited

**Australian Museum API (Optional):**
- Contact the museum directly for API access if needed

### Step 4: Verify Configuration

Check that your configuration is correct:

```bash
# Verify your .env.local file
cat .env.local

# Should show your API keys (keep these secret!)
````

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

1. **Add to Favorites**: Click the favorite button (+) on any artwork
2. **View Collection**: Navigate to "My Collection" to see all saved artworks
3. **Manage Collection**: Remove items or clear your entire collection
4. **Explore Details**: Click on artwork titles to visit the original museum page

### Responsive Design

- **Desktop**: Full grid layout with detailed information
- **Tablet**: Optimized grid with touch-friendly controls
- **Mobile**: Single-column layout with swipe gestures

## 🛠️ Technology Stack

### Frontend Framework

- **Next.js 15.5.3** with App Router for server-side rendering
- **React 19.1.0** with latest hooks and features
- **TypeScript 5.x** for type safety and better development experience

### Styling & UI

- **Tailwind CSS 4.x** for utility-first styling
- **Custom Fonts**: Priori Serif and Crimson Pro
- **Responsive Design**: Mobile-first approach
- **Loading Indicators**: React Loading Indicators

### State Management

- **React Context API** for favorites management
- **Custom Hooks** (`useFavourites`) for state logic
- **Session Storage** for persistence

### APIs & Data Sources

- **Harvard Art Museums API** - Primary data source with advanced search
- **Metropolitan Museum API** - Secondary collection access
- **Australian Museum API** - Additional cultural artifacts
- **IIIF Image Protocol** - Optimized image delivery

### Performance & Optimization

- **Next.js Caching** - Built-in ISR (Incremental Static Regeneration)
- **Image Optimization** - WebP/AVIF formats, multiple sizes
- **Rate Limiting** - Respectful API usage with delays
- **Error Boundaries** - Graceful error handling

### Development Tools

- **Jest** - Unit testing framework
- **ESLint** - Code linting with Next.js config
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## 📁 Project Structure

```
open-curator/
├── app/                        # Next.js 13+ App Directory
│   ├── api/                    # API Routes
│   │   ├── cache/              # Cache management
│   │   ├── harvard/search/     # Harvard Museum search endpoint
│   │   └── met/search/         # Met Museum search endpoint
│   ├── lib/                    # Shared utilities and components
│   │   ├── components/         # React components
│   │   │   ├── Layout/         # Header, navigation
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Navbar.tsx
│   │   │   ├── UI/             # User interface components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── FavouriteButton.tsx
│   │   │   │   └── ClearAllFavouritesButton.tsx
│   │   │   └── Errors/         # Error handling components
│   │   ├── contexts/           # React Context providers
│   │   │   └── FavouritesContext.tsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── useFavourites.tsx
│   │   ├── services/           # API service classes
│   │   │   ├── HarvardMusemService.ts
│   │   │   ├── MetMuseumService.ts
│   │   │   └── ChicagoMuseumService.ts
│   │   ├── utils/              # Utility functions
│   │   │   ├── apiErrors.ts
│   │   │   ├── delay.ts
│   │   │   └── processBatches.ts
│   │   └── config/             # Configuration files
│   ├── layout.tsx              # Root layout with fonts and providers
│   ├── page.tsx                # Homepage component
│   ├── global-error.tsx        # Global error boundary
│   └── not-found.tsx           # 404 page
├── __tests__/                  # Test files
│   └── extractData.test.ts
├── public/                     # Static assets
│   └── fonts/                  # Custom font files
├── config.ts                   # API configuration
├── jest.config.ts              # Jest testing configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── pnpm-lock.yaml             # Package lock file
```

## 🧪 Testing

The application includes Jest for unit testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test -- --coverage
```

### Test Structure

- Unit tests in `__tests__/` directory
- Service layer testing for API integrations
- Component testing with React Testing Library
- TypeScript support in tests

## 🚀 Deployment Options

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on git push

### Netlify

1. Connect repository and configure build settings
2. Add environment variables in site settings
3. Deploy with build command: `npm run build`

### Self-Hosted Server

```bash
# Production build
npm run build
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm -- start
pm2 startup
pm2 save
```

### Docker Deployment

```bash
# Build Docker image
docker build -t open-curator .

# Run container
docker run -p 3000:3000 -e HARVARD_MUSEUM_API_KEY=your_key open-curator
```

## 🔧 Configuration

### API Configuration

Edit `config.ts` to modify API endpoints and settings:

```typescript
export const config = {
  harvardMuseum: {
    baseUrl: 'https://api.harvardartmuseums.org',
    urlEndsInObject: 'https://api.harvardartmuseums.org/object',
    apiKey: process.env.HARVARD_MUSEUM_API_KEY || '',
  },
  metMuseum: {
    baseUrl: 'https://collectionapi.metmuseum.org/public/collection/v1',
    searchUrl:
      'https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=',
  },
  ausMuseum: {
    baseUrl: 'https://data.nma.gov.au/',
    objectEndpointStart: '/object?offset=0&limit=50',
    imageEndpoint: '/media?id=*',
    objectAndMediaEndpoint: 'object?media=*&offset=0&limit=50',
    apiKey: process.env.MUSEUM_API_KEY ?? '',
  },
};
```

### Performance Settings

- **Image Caching**: 1 hour (3600s) for museum images with ISR
- **API Caching**: 1 hour for search results with ISR
- **Rate Limiting**: Implemented to respect museum API guidelines
- **Concurrent Requests**: Limited to prevent API throttling

### Image Optimization

Next.js image optimization is configured for museum domains:

```typescript
// next.config.ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'nrs.harvard.edu' },
    { protocol: 'https', hostname: 'hvrd.art' },
    { protocol: 'https', hostname: 'images.metmuseum.org' },
    { protocol: 'https', hostname: 'www.artic.edu' },
    { protocol: 'https', hostname: 'data.nma.gov.au' },
  ],
  formats: ['image/webp', 'image/avif'],
}
```

## 🔍 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Create production build
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run test        # Run Jest tests

# Debugging
npm run inspect     # Start with Node.js inspector
```

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

### Chicago Museum API

- **Documentation**: [Chicago Museum Api](https://www.artic.edu/open-access/public-api)
- **Rate Limits**: No official rate limits, however, I employ rate limiting of 30 requests a second max and caching frequent requests via a proxy layer

### Metropolitan Museum of Art API

- **Documentation**: [Met Museum API](https://metmuseum.github.io/)
- **Rate Limits**: No official limits, but respectful usage required
- **Features**: Open access collection, high-resolution images

## ❓ Troubleshooting

### Common Issues

**1. API Key Not Working**

```bash
# Check your .env.local file exists and has correct format
cat .env.local

# Verify the key is active (Harvard keys need activation time)
# Restart the development server
npm run dev
```

**2. Build Errors**

```bash
# Clear Next.js cache and reinstall
npx next clean
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

**3. Images Not Loading**

- Verify internet connection for external images
- Check museum API status pages
- Review browser console for CORS or loading errors
- Ensure image domains are configured in `next.config.ts`

**4. TypeScript Errors**

```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update type definitions
npm update @types/node @types/react @types/react-dom
```

**5. Port Already in Use**

```bash
# Use different port
npm run dev -- --port 3001

# Or kill existing process
lsof -ti:3000 | xargs kill
```

**6. Environment Variables Not Loading**

- Ensure `.env.local` is in the project root
- Restart the development server after changes
- Check that variable names match exactly (case-sensitive)
- Verify no trailing spaces in the `.env.local` file

### Debug Mode

Enable debug logging:

```bash
# Set debug environment
DEBUG=* npm run dev

# Or specific debug categories
DEBUG=api:* npm run dev
```

## 📄 License

This project is licensed under the MIT License

## 🙏 Acknowledgments

- **Harvard Art Museums** for providing free access to their collection API
- **Chicago Museum** for providing free access to their collection API
- **Metropolitan Museum of Art** for their open access program
- **Counter** For the opportunity and review

## 🔄 Version History

- **v0.1.0** - Initial release with Harvard and Met Museum APIs
- Modern React 19.1.0 and Next.js 15.5.3
- TypeScript 5.x for enhanced development experience
- Tailwind CSS 4.x for styling

---
