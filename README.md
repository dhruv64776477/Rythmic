# Rythmic

Rythmic is a music-player UI built with React. Browse sample music pages and
play bundled audio in a persistent, draggable player.

> The catalog and most page content are currently demo data. Playback uses
> audio files in `public/audio`; the React app is not yet connected to the
> separate Express server in `server/`.

## Features

- Explore page with sample charts, artists, and genres.
- Albums, artists, genres, radio, recently played, favourites, and local-library
  pages.
- Audio controls for play/pause, next/previous, seeking, and playback progress.
- A draggable player that remembers the queue, selected track, volume, and
  playback state in browser `localStorage`.
- Responsive styling with Tailwind CSS, animations with Framer Motion, and
  icons from Lucide.

Some screens are prototypes rather than complete workflows: local-file import
and playlist creation are not wired up, and favourites/recent items use
hard-coded sample data.

## Run locally

### Requirements

- Node.js and npm

### Start the app

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). The development server
reloads when source files change.

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the development server |
| `npm test -- --watchAll=false` | Run the Jest/React Testing Library tests once |
| `npm run build` | Create an optimized production build in `build/` |

The current test file is still the Create React App starter test and should be
updated to cover the Rythmic interface.

## Project layout

```text
src/
  App.js                    App shell and page routes
  App/Component/            Header, sidebar, and audio player
  App/Context/              Shared playback state and track components
  App/Pages/                Explore and library pages
  CSS/                      Page and component styles
public/
  audio/                    Bundled sample MP3 files
  image.png                 Shared sample artwork
server/                     Separate Express/MongoDB server project
```

## Adding sample tracks

Place audio files in `public/audio/` and reference them with a URL such as
`/audio/1.mp3`. Track objects used by the player should include:

```js
{
  id: "unique-track-id",
  title: "Track title",
  artist: "Artist name",
  path: "/audio/1.mp3",
  image: "/image.png",
  duration: 180
}
```

## Backend

The `server/` directory contains a separate Express/MongoDB application with
account, audio-catalog, and playlist APIs. The Explore page loads published
audio from the server when available and falls back to sample tracks if it is
offline. Set `REACT_APP_API_URL` to change the API origin; it defaults to
`http://localhost:8000`. See
[`server/Readme.md`](server/Readme.md) for its setup notes.
