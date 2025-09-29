This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# About
Custom openCurator app utilising Met Museum and ... museum API archives. 

Project will pull from API starting with query A... and hydrate page data. When user searches for term other than A, will fire off a request to API and cache results to be filtered and searched.

Updated API for Met Museum, hydrating page with initial 200 requests that can be filtered and searched. Next todo: add search button for specfic requests to API
Add second API
Add catalog feature

Met museum api blocked due to bot screening after 30 requests. Put in bug request on github. Defaulting to Harvard APi to hydrate page (potential for chicago api)


