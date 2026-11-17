# Rythmic backend

The backend is an Express API using MongoDB/Mongoose, JWT authentication,
bcrypt password hashing, and Cloudinary media uploads. It provides account,
audio-catalog, and playlist endpoints.

## Requirements

- Node.js 18 or newer
- MongoDB
- Cloudinary credentials (for profile and audio uploads)

## Setup

Run these commands from `server/`:

```bash
npm install
npm run dev
```

For a regular Node process, use `npm start`. The server defaults to port 8000.

Create `server/.env` with:

```env
PORT=8000
NODE_ENV=development
DATABASE_URL=mongodb://127.0.0.1:27017
DB_NAME=rythmic
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=replace-with-a-long-random-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

`MONGODB_URI` is also accepted instead of `DATABASE_URL`. The legacy
`CORS_ORIGEN` spelling and `FRONTEND_URL` are accepted if `CORS_ORIGIN` is not
set. Use a comma-separated list for multiple exact browser origins.

The server derives distinct access and refresh signing keys from `JWT_SECRET`
when dedicated secrets are not set. For deployments, set
`ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` explicitly. Token lifetimes
default to 15 minutes and 7 days; configure them with `ACCESS_TOKEN_EXPIRY` and
`REFRESH_TOKEN_EXPIRY`.

## API

All routes are prefixed with `/api/v1`. Successful responses contain
`statusCode`, `data`, `message`, and `success`; errors are returned as JSON.

### Health

| Method | Path           | Auth | Description        |
| ------ | -------------- | ---- | ------------------ |
| GET    | `/healthcheck` | No   | API process health |

### Audio

| Method | Path                                  | Auth       | Description                                                           |
| ------ | ------------------------------------- | ---------- | --------------------------------------------------------------------- |
| GET    | `/audios?page=1&limit=20&search=term` | No         | List published audio; paginated search across titles and descriptions |
| POST   | `/audios`                             | Yes        | Upload and publish an audio track                                     |
| GET    | `/audios/:audioId`                    | No         | Fetch a published track                                               |
| POST   | `/audios/:audioId/play`               | Yes        | Increment play count and add the track to listening history           |
| PATCH  | `/audios/:audioId`                    | Yes, owner | Update title/description and optionally replace the artwork           |
| DELETE | `/audios/:audioId`                    | Yes, owner | Delete an audio record                                                |
| PATCH  | `/audios/toggle/publish/:audioId`     | Yes, owner | Toggle publication status                                             |

Audio creation uses `multipart/form-data` fields `title`, `description`,
`duration`, `audioFile`, and `artwork`. Audio files are limited to 100 MB;
profile images and artwork replacements are limited to 5 MB.

### Users

| Method | Path                       | Auth          | Description                                                                                         |
| ------ | -------------------------- | ------------- | --------------------------------------------------------------------------------------------------- |
| POST   | `/users/register`          | No            | Register with `fullName`, `email`, `username`, `password`, required `avatar`, optional `coverImage` |
| POST   | `/users/login`             | No            | Sign in with `username` or `email` and `password`                                                   |
| POST   | `/users/refresh-token`     | Refresh token | Rotate the refresh token                                                                            |
| POST   | `/users/logout`            | Yes           | Revoke refresh token and clear cookies                                                              |
| POST   | `/users/change-password`   | Yes           | Change password with `oldPassword` and `newPassword`                                                |
| GET    | `/users/current-user`      | Yes           | Fetch current user                                                                                  |
| PATCH  | `/users/update-account`    | Yes           | Update `fullName` and `email`                                                                       |
| PATCH  | `/users/avatar`            | Yes           | Replace avatar image                                                                                |
| PATCH  | `/users/cover-image`       | Yes           | Replace cover image                                                                                 |
| GET    | `/users/c/:username`       | Yes           | Fetch channel profile                                                                               |
| GET    | `/users/listening-history` | Yes           | Fetch listening history                                                                             |

Authenticated routes accept the HTTP-only `accessToken` cookie or an
`Authorization: Bearer <token>` header. Cookie `Secure` is enabled in production.

### Playlists

All playlist routes require authentication. Mutations require ownership.

| Method | Path                                     | Description                                      |
| ------ | ---------------------------------------- | ------------------------------------------------ |
| POST   | `/playlists`                             | Create `{ "name": "...", "description": "..." }` |
| GET    | `/playlists/:playlistId`                 | Fetch a playlist                                 |
| PATCH  | `/playlists/:playlistId`                 | Update its name and/or description               |
| DELETE | `/playlists/:playlistId`                 | Delete an owned playlist                         |
| PATCH  | `/playlists/add/:audioId/:playlistId`    | Add a published audio track to an owned playlist |
| PATCH  | `/playlists/remove/:audioId/:playlistId` | Remove an audio track from an owned playlist     |
| GET    | `/playlists/user/:userId`                | List a user's playlists                          |

## Validation and known scope

Run backend smoke tests with `npm test`. Request bodies are limited to 16 KB.
Uploads use temporary files outside the public directory and validate the
declared MIME type and size.

This backend is a learning project. It does not yet include subscriptions,
comments, or likes. The React Explore page currently uses the public audio
catalog endpoint; account and playlist routes are not wired to frontend screens.
Deleting an audio record does not delete the associated Cloudinary assets.
