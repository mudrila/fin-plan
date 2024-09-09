## Getting Started

1. Clone this repository

```bash
git clone https://github.com/mudrila/fin-plan
```

2. Switch to proper `Node.js` version

```bash
nvm use
```

3. Install dependencies

```bash
npm install
```

4. Login to `Vercel CLI`

```bash
vercel login
```

5. Link `Vercel` project. Make sure to select proper team and project!

```bash
vercel link
```

6. Pull environment variables from `Vercel`

```bash
vercel env pull .env.local
```

7. Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
