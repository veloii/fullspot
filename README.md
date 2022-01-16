# Fullspot

A full-screen spotify application for non-premium users.

| Part       | Source code (Typescript) | Builds (JavaScript) |
| ---------- | ------------------------ | ------------------- |
| Next.js    | `/renderer`              | `/renderer`         |
| Electron   | `/electron-src`          | `/main`             |
| Production |                          | `/dist`             |

For development it's going to run a HTTP server and let Next.js handle routing. In production it use `next export` to pre-generate HTML static files and use them in your app instead of running an HTTP server. However, it will default to the Production HTTP server, you may want to change this in development or in the Electron Application press CTRL + SHIFT + I to open the Chrome Dev Tools and in the console type: `window.location = "http://localhost:8000"`

# Notes

There will be a guide, however this is just a open-source version to allow auto-updating to easily work.