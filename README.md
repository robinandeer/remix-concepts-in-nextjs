# Remix Concepts in Next.js

This is an exploration in implementing various Remix concepts in Next.js. It uses the official Remix getting started guide as a starting point.

There are two branches in this repo:

- `remix`: the original Remix implementation
- `main`: the "remixed" Next.js implementation

You are currently viewing the `remix` implementation.

## Deployment

## Fly Setup

1. [Install Fly](https://fly.io/docs/getting-started/installing-flyctl/)

2. Sign up and log in to Fly

   ```sh
   flyctl auth signup
   ```

3. Setup Fly. It might ask if you want to deploy, say no since you haven't built the app yet.

   ```sh
   flyctl launch
   ```

If you've followed the setup instructions already, all you need to do is run this:

```sh
yarn deploy
```

You can run `flyctl info` to get the url and ip address of your server.

Check out the [fly docs](https://fly.io/docs/getting-started/node/) for more information.

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
yarn
```

Afterwards, start the Remix development server like so:

```sh
yarn dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!
