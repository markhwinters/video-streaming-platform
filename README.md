# Streamlab

Streamlab is a local streaming-site demo built with React, Tailwind CSS, Video.js, Nginx, and Varnish.

## Features

- HLS video playback with Video.js controls and audio
- Nginx delivery of `.m3u8` playlists and `.ts` segments
- Varnish cache HIT/MISS status, download speed, and buffer diagnostics
- Responsive streaming-style React interface with Tailwind CSS

## Start the project

Requirements: Docker Desktop and FFmpeg.

Before the first start, copy `.env.example` to `.env` and replace the Clerk
placeholders with keys from your Clerk dashboard. If `.env` already exists, add
the MongoDB settings from the example rather than overwriting your Clerk keys.
`.env` is ignored by Git. The example MongoDB credentials are for local
development only and should not be used outside this machine.

From the project root, start the services:

```powershell
docker compose up -d --build
```

Open [https://localhost](https://localhost). To stop the services:

```powershell
docker compose down
```

## API data model

The API connects to the `streaming` MongoDB database before it starts listening.
Compose waits for MongoDB's authenticated health check before starting the API.
Clerk handles authentication; the Mongoose models in `api\schemas` cover:

- Accounts linked to a Clerk user ID
- Profiles owned by an account
- Published or draft movie catalog entries and media URLs
- Playlists owned by profiles, with movie entries stored separately
- Per-profile movie watch progress for continue-watching behavior

Video files remain in the media service; MongoDB stores catalog metadata and
references, not the video files. The database port is bound to this computer
only. From a local tool such as the VS Code MongoDB extension, use
`mongodb://<MONGO_INITDB_ROOT_USERNAME>:<MONGO_INITDB_ROOT_PASSWORD>@localhost:27017/streaming?authSource=admin`,
substituting the values from your `.env` file. The API gets its MongoDB
credentials from the same ignored `.env` file and connects to the `mongo`
service over the Compose network. These root credentials are for local
development only; production should use a dedicated database user with only
the permissions the API needs. MongoDB applies the root credentials only when
it first initializes its data volume. If you already have data, keep the
credentials that were used to initialize that volume; changing `.env` alone
does not change a MongoDB user's password.

### Clerk authentication

Create a Clerk application, copy the root `.env.example` to `.env`, and set
`CLERK_SECRET_KEY` and `VITE_CLERK_PUBLISHABLE_KEY` from the Clerk dashboard.
Compose sends the secret key to the API and the publishable key to both the API
and frontend. Keep the secret key private; the publishable key is safe to use
in the frontend. Restart the stack after setting keys:

```powershell
docker compose up -d --build
```

The frontend uses Clerk's React SDK for sign-in and sign-up. When calling
`GET /api/auth/me`, it obtains the current session JWT with `getToken()` and
sends it as `Authorization: Bearer <token>`. Express verifies the token using
Clerk middleware. The route creates the MongoDB account record on first use,
keyed by Clerk's stable user ID. The JWT is not persisted by the app.

At this stage, `/api/auth/me` is the only account endpoint. The profile,
playlist, movie, and watch-progress files define data shapes; they do not yet
provide create, edit, or delete routes. When those routes are added, each
request must verify that the signed-in account owns the profile or playlist it
is trying to access.

### Frontend styles

The React app uses Tailwind CSS utility classes. Vite loads Tailwind through
`@tailwindcss/vite`; `frontend/src/index.css` contains only Tailwind's import.
Add page UI in React components and style elements with Tailwind classes rather
than creating custom CSS files.

The frontend container runs Vite's development server for this local project.
It is not a production web-server configuration.

Run the API's schema validation tests from the `api` folder with
`npm test`. Run the frontend checks from the `frontend` folder with
`npm run build` and `npm run lint`.

## Create a browser-compatible HLS stream

Put your source video in a local working folder and run FFmpeg there. Replace `input.mp4` with its filename. This creates an H.264/AAC-LC stream with four-second MPEG-TS segments in the current folder:

```powershell
ffmpeg -i "input.mp4" -c:v libx264 -profile:v baseline -pix_fmt yuv420p -c:a aac -profile:a aac_low -b:a 160k -ar 48000 -ac 2 -f hls -hls_time 4 -hls_playlist_type vod -hls_segment_filename "segment_%03d.ts" "output.m3u8"
```

When FFmpeg finishes, manually copy `output.m3u8` and all generated `segment_*.ts` files into the project’s `media\movie001` folder, replacing the existing stream files. Restart Varnish to clear cached media:

```powershell
docker compose restart varnish
```

## Roadmap

- Replace the single-video test page with a streaming-platform UI and a browsable video catalog.
- Let users create and manage personal playlists.
- Support profiles linked to a primary account, with separate profile experiences.
