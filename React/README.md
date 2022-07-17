This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

- This app focuses on the "happy path" ie. I assume everything works perfectly
- I don't care about feedback that much and responses are simply logged to the console
- API URL is hard coded. This should be inside env variables.
- I don't care about responsibility. API calls are put inside components. Typically I'd use a repository pattern and
  often thunks with a state management solution like Redux.
- This app doesn't follow the course contents completely, as it is too easy for an advanced used. Intead I've replaced things like Create React App and bootstrap with Next.js and Chakra UI.