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
- 🏛️ **Multiple Museums**: Searches Harvard Art Museums and the Art Institute of Chicago in parallel and merges the results
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- ❤️ **Personal Collections**: Save artworks to a searchable collection, stored in your browser
- 🔗 **Direct Museum Links**: Easy access to original museum pages for each artwork
- ⚡ **Fast Performance**: Upstream museum responses cached for an hour by Next.js
- 🎯 **Persistence**: Collections are saved to localStorage and sync across tabs
- 🖼️ **IIIF Images**: Images requested at sensible sizes via the IIIF protocol

## 🏛️ Museum Partners

- **Harvard Art Museums** - Access to over 250,000 objects from Harvard's world-class collections
- **Art Institute of Chicago** - Open-access collection via the AIC public API

> **Note:** As of October 2026 the Art Institute's image server (`www.artic.edu/iiif`) answers requests with a Cloudflare bot challenge, so Chicago images may show as "Image unavailable" until AIC resolves it. Search results and metadata still load.

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
```

#### Getting API Keys

**Harvard Art Museums API (Required):**
1. Visit [Harvard Art Museums API](https://www.harvardartmuseums.org/collections/api)
2. Click "Request an API Key"
3. Fill out the registration form (free for educational and personal use)
4. Copy your API key to the `.env.local` file
5. **Important**: Wait a few minutes after registration for the API key to become active

**Art Institute of Chicago API:**
- No API key required - uses the open access API, which is rate limited

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

1. **Browse Initial Collection**: The homepage loads a selection of Harvard artworks
2. **Filter as You Type**: Typing filters the artworks on screen by title, artist, medium, or culture
3. **Search Every Museum**: Press Enter (or the search button) to search Harvard and Chicago together
4. **Presets**: Pick a preset (Paintings, Photography, …) for a quick themed search
5. **Reset**: Clear the search box to return to the initial selection

### Creating Your Exhibition

1. **Add to Favorites**: Click the favorite button (+) on any artwork
2. **View Collection**: Navigate to "Collection" to see all saved artworks
3. **Search Your Collection**: Filter saved works with the collection search bar
4. **Explore Details**: Click an artwork to open it full size, then use the arrow keys to browse
5. **Manage Collection**: Remove items with (–) or clear your entire collection

### Responsive Design

- **Desktop**: Full grid layout with detailed information
- **Tablet**: Optimized grid with touch-friendly controls
- **Mobile**: Single-column layout with swipe gestures

## 🛠️ Technology Stack

### Frontend Framework

- **Next.js 15.5** with App Router for server-side rendering
- **React 19.1** with latest hooks and features
- **TypeScript 5.x** for type safety and better development experience

### Styling & UI

- **Tailwind CSS 4.x** for utility-first styling
- **Custom Fonts**: Priori Serif and Crimson Pro
- **Responsive Design**: Mobile-first approach

### State Management

- **Zustand** (with `persist`) for favourites, saved to localStorage and synced across tabs
- **Custom Hooks** (`useApiSearch`, `useSearchFilter`) for search state

### APIs & Data Sources

- **Harvard Art Museums API** - Initial selection and search
- **Art Institute of Chicago API** - Search
- **IIIF Image Protocol** - Sized image delivery

### Performance & Optimization

- **Next.js Caching** - Upstream fetches revalidate hourly; the homepage uses ISR
- **Parallel Search** - Museums are queried concurrently; one failing doesn't block the other
- **Error Boundaries** - Graceful error handling

### Development Tools

- **Jest** - Unit testing framework
- **ESLint** - Code linting with Next.js config
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## 📁 Project Structure

```
open-curator/
├── app/                          # Next.js App Router directory
│   ├── api/
│   │   └── search/route.ts       # Merged Harvard + Chicago search endpoint
│   ├── collection/               # Saved-works page
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Layout/           # Header, Navbar
│   │   │   └── UI/               # Search, collection, modal, buttons, skeleton
│   │   ├── config/               # Search presets, app shell id
│   │   ├── hooks/                # useApiSearch, useSearchFilter
│   │   ├── services/             # HarvardMuseumService, ChicagoMuseumService
│   │   ├── stores/               # Zustand favourites store + hydrator
│   │   ├── utils/                # MuseumItem helpers, API error responses
│   │   └── types.ts              # Shared domain types
│   ├── app.css                   # Tailwind entry point and theme tokens
│   ├── layout.tsx                # Root layout, fonts, metadata
│   ├── page.tsx                  # Homepage
│   ├── global-error.tsx          # Global error boundary
│   └── not-found.tsx             # 404 page
├── public/fonts/                 # Custom font files
├── config.ts                     # Museum API configuration
├── jest.config.ts                # Jest configuration
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
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

- Tests live next to the code as `*.test.ts(x)` files under `app/`
- TypeScript support via ts-jest

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
export const config: Config = {
  harvardMuseum: {
    baseUrl: 'https://api.harvardartmuseums.org',
    apiKey: process.env.HARVARD_MUSEUM_API_KEY ?? '',
  },
  chicagoMuseum: {
    baseUrl: 'https://api.artic.edu/api/v1',
  },
};
```

### Performance Settings

- **API Caching**: Upstream museum responses are cached for 1 hour via `fetch(..., { next: { revalidate: 3600 } })`
- **Homepage**: Regenerated at most once an hour (ISR)

## 🔍 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Create production build
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run format      # Format with Prettier
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
- **Rate Limits**: Anonymous requests are throttled to 60 per minute; responses are cached for an hour by Next.js to stay well under it

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

supabase wound down 
