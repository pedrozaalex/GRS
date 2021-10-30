# GRS
Github Public Repositories Search

A graphic tool for searching public repos on the GitHub network using various criteria

## Running locally

The app can be ran locally by following these steps:
 1. Install [node.js](https://nodejs.org/en/download/) and also [yarn](https://classic.yarnpkg.com/lang/en/docs/install/) if you don't already have them
 2. Clone the project to your computer with `git clone https://github.com/pedrozaalex/GRS.git`
 3. Open the newly created folder by running `cd GRS`
 4. Install the libraries with `yarn`
 5. Create a new GitHub API access token [here](https://github.com/settings/tokens) and put the token on the .env file under the key `VITE_GITHUB_API_TOKEN`
 6. Now just `yarn dev` to start and access http://localhost:3000/ to enjoy all the GitHub repo searching you've always wanted!
