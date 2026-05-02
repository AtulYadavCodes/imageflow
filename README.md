# ImageFlow (ImageKit/Cloudinary-like Media pipeline Platform)

> **Note:** For the latest updates, guides, and the full platform experience, visit the website linked in the GitHub description.

---

![Node.js](https://img.shields.io/badge/Node.js-22%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-111111?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Rate%20Limit-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS%20S3-Avatar%20%2B%20File%20Storage-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Sharp](https://img.shields.io/badge/Sharp-Image%20Transform-99CC00?style=for-the-badge&logo=sharp&logoColor=white)
![Auth](https://img.shields.io/badge/Auth-JWT%20%2B%20API%20Key-F59E0B?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.11%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)
![OpenRouter](https://img.shields.io/badge/OpenRouter-000000?style=for-the-badge&logo=openrouter&logoColor=white)
![OpenAI API](https://img.shields.io/badge/OpenAI_API-412991?style=for-the-badge&logo=openai&logoColor=white)

ImageFlow is a Developer first modern, media pipeline inspired by ImageKit. It provides secure file management, real-time image transformation, and developer-friendly APIs with Api Key Management and Sdks for both web and backend integrations.

---

## Features

- End-to-end media pipeline: Secure upload, storage, transformation, and delivery of images and files.
- User authentication: Robust JWT-based authentication and refresh token flow.
- Developer API key management: Secure, hashed API keys with self-service creation and revocation.
- Folder and file management: Hierarchical folder structure, CRUD operations, and metadata tracking.
- AWS S3 integration: Scalable, reliable storage for avatars and files with signed URL upload flow.
- Real-time image transformation: On-the-fly resizing, format conversion, rotation, blur, grayscale, and background removal via Sharp streaming pipeline.
- Public, URL-based image transformation API: No need for signed GET URLs; supports direct access and CDN integration.
- Rate limiting and caching: Redis-backed rate limiting for authentication and API endpoints.
- Centralized error handling: Consistent, structured API responses for success and error cases.
- Frontend web app: User-friendly UI for non-developers to upload, manage, and transform files.
- AI-assisted query handling: Users can describe what they want in plain English, and the AI interprets the request and returns the right output when the required parameters are available.
- Developer SDKs: Official browser and Node.js SDKs for seamless integration ([SDK repo](https://github.com/AtulYadavCodes/imageflowsdk)).
- Secure by design: Passwords and API keys are always hashed; CORS and cookie security best practices.
- Extensible architecture: Modular Express.js backend, ready for new features and integrations.

# Who This Is For

- End users: use the ImageFlow website UI to upload and manage files and transform without writing code.
- Developers: integrate with ImageFlow APIs directly or use the provided SDKs similar to how they use any other media pipeline like cloudinary or imagekit.

# Authentication

Protected endpoints are validated by a shared auth middleware.

Supported auth methods:

- JWT cookie: accessToken
- JWT header: Authorization: Bearer <jwt>
- API key header: Authorization: Bearer sk_xxxxxx

Important:

- API key management endpoints under /api/v1/apikey are JWT-only.
- API keys are stored hashed (not in raw form).

# API Reference

### Users

| Method | Route                             | Secured | Payload                                                      | Notes                        |
| ------ | --------------------------------- | ------- | ------------------------------------------------------------ | ---------------------------- |
| POST   | /api/v1/users/register            | No      | multipart: fullname, username, email, password, avatar(file) | Create account               |
| POST   | /api/v1/users/login               | No      | email, password                                              | Login rate-limited by Redis  |
| POST   | /api/v1/users/logout              | Yes     | none                                                         | Clears auth cookies          |
| POST   | /api/v1/users/refreshAccessToken  | No\*    | refreshToken cookie                                          | Requires valid refresh token |
| GET    | /api/v1/users/profile             | Yes     | none                                                         | Current user profile         |
| PATCH  | /api/v1/users/updateprofileavatar | Yes     | multipart: avatar(file)                                      | Upload avatar (AWS S3)       |
| POST   | /api/v1/users/updatepassword      | Yes     | oldpassword, newpassword                                     | Change password              |
| PATCH  | /api/v1/users/updateemail         | Yes     | newemail                                                     | Change email                 |

### Folders

| Method | Route                                           | Secured | Payload          | Notes                          |
| ------ | ----------------------------------------------- | ------- | ---------------- | ------------------------------ |
| GET    | /api/v1/folders/getalluserfolders               | Yes     | none             | List current user folders      |
| DELETE | /api/v1/folders/deletefolder/:foldername        | Yes     | foldername param | Delete folder and linked files |
| GET    | /api/v1/folders/getallfilesinfolder/:foldername | Yes     | foldername param | List files for folder          |

### Files

| Method | Route                                | Secured | Payload                              | Notes                                      |
| ------ | ------------------------------------ | ------- | ------------------------------------ | ------------------------------------------ |
| GET    | /api/v1/files/getalluserfiles        | Yes     | query: page, limit, sortby, sorttype | Paginated user files                       |
| POST   | /api/v1/files/uploadfile             | Yes     | JSON: originalname, contentType      | Step 1: create signed S3 upload URL        |
| POST   | /api/v1/files/uploadfile/:foldername | Yes     | JSON: key, originalname, bytes       | Step 2: save file metadata after S3 upload |

### API Keys

| Method | Route                     | Secured   | Payload  | Notes                                 |
| ------ | ------------------------- | --------- | -------- | ------------------------------------- |
| POST   | /api/v1/apikey/create     | Yes (JWT) | name?    | Create API key, raw key returned once |
| GET    | /api/v1/apikey/list       | Yes (JWT) | none     | List keys (without hash)              |
| DELETE | /api/v1/apikey/revoke/:id | Yes (JWT) | id param | Revoke API key                        |

### Image Transform

| Method | Route              | Secured | Payload                                 | Query Params                                                | Notes                                                                               |
| ------ | ------------------ | ------- | --------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| GET    | /images/path/\*key | No      | key in URL param (supports nested path) | width, height, rotate, blur, gray, format, removebg         | Real-time stream transform with Sharp; optional grayscale and remove.bg steps       |
| GET    | /images/path/\*key | No      | key in URL param (supports nested path) | preset, width, height, rotate, blur, gray, format, removebg | Real-time stream transform with Sharp; preset overrides all other transform queries |

# Sharp Real-Time Stream Pipeline

ImageFlow transform endpoint uses stream-based processing for lower memory footprint and faster response under load.

Signed URL behavior in this project:

The signed URL is only used during upload (client -> S3 PUT) and it is expected to expire. For image viewing, clients do not need a long-lived S3 signed GET URL. Instead, clients request the stable app route `/images/path/*key` using the key received at upload time.

When this route is called, the backend uses server-side AWS credentials to fetch raw object data from S3 for that key (`GetObjectCommand`), then streams it through Sharp and returns the response. Because the client URL is your app route (not an exposed S3 signed GET URL), it does not carry an S3 expiration timestamp.

This route is also stored in the database as the user file link, so clients can directly use the saved `filelink` for image access.

- Input is read as stream from AWS S3 object body.
- Stream is piped through Sharp transformation pipeline.
- Output is streamed directly to client response.
- No full-file blob or buffer is loaded for transformation output.
- Transform route is public so it can be used from anywhere.
- The image pipeline is URL-based, so you can use it directly by calling the transform URL.
- If `gray=true`, output is converted to grayscale.
- If `removebg=true`, the image is first processed by remove.bg, then transformed and streamed.

Transform query parameter reference:

- `ai`: Add a natural-language request with `?ai=<your request>` and the AI will interpret it using the available image parameters.
- `gray`: Set to `true` to convert output to grayscale.
- `width`: Target width in pixels (number).
- `height`: Target height in pixels (number).
- `preset`: Shortcut transform profile. Supported values: `thumbnail`, `profile`, `banner`. When present, all other transform query params are ignored.
- `fit`: Resize behavior when both width and height are provided. Supported values:
  - `cover` (default): Crop to fill dimensions
  - `contain`: Fit inside without cropping (may add padding)
  - `fill`: Stretch to exact size (may distort image)
  - `inside`: Fit within box without upscaling
  - `outside`: Cover box without cropping
- `rotate`: Rotation in degrees (number).
- `blur`: Blur intensity value for Sharp (number).
- `format`: Output format. Supported values: `jpeg`, `png`, `webp`, `tiff`, `avif`.
- `removebg`: Set to `true` to remove image background before other transforms.

Parameter behavior notes:

- If both `width` and `height` are provided, image is resized to both dimensions.
- If only one of `width` or `height` is provided, the other dimension is auto-scaled.
- `gray` and `removebg` are optional flags and must be sent as string `true` in query.

Transform examples:

```bash
# AI-assisted request
curl "http://localhost:3000/images/path/<key-received-on-upload>?ai=make height 100 and width 200"

# Resize + format convert
curl "http://localhost:3000/images/path/<key-received-on-upload>?width=900&format=webp" --output transformed.webp

# Remove background + rotate
curl "http://localhost:3000/images/path/<key-received-on-upload>?removebg=true&rotate=90&format=png" --output no-bg.png

# Grayscale + resize
curl "http://localhost:3000/images/path/<key-received-on-upload>?gray=true&width=800&format=jpeg" --output gray.jpg
```

#

```mermaid
flowchart LR
  C[Client Request]
  CDN[CDN Cache]
  A[Image Transform API]
  S3[AWS S3 Object Stream]
  SH[Sharp Pipeline\nresize/quality/format]
  R[HTTP Response Stream]

  %% Flow
  C --> CDN
  CDN -->|Cache Miss| A
  CDN -->|Cache Hit| C

  A --> S3
  S3 --> SH
  SH --> R
  R --> CDN

  %% Styles
  style C fill:#E8F1FF,stroke:#3B82F6,color:#0F172A
  style CDN fill:#EEF2FF,stroke:#6366F1,color:#0F172A
  style A fill:#ECFDF5,stroke:#10B981,color:#0F172A
  style S3 fill:#FFF7ED,stroke:#F97316,color:#0F172A
  style SH fill:#F0FDF4,stroke:#84CC16,color:#0F172A
  style R fill:#F8FAFC,stroke:#334155,color:#0F172A
```

No\* = endpoint is public but requires a valid refresh token cookie.

# Developer Integration Options

## File Upload Using API

Use your own HTTP client (fetch, axios, postman, backend service).

Typical file upload sequence:

1. Call POST /api/v1/files/uploadfile with metadata (originalname, contentType).
2. Receive signed S3 upload URL and key.
3. Upload binary file to S3 using PUT on signed URL.
4. Call POST /api/v1/files/uploadfile/:foldername with key, originalname, bytes.
5. Persisted file record stores `filelink` as the app image route built from the uploaded key (for example: `/images/path/<key-received-on-upload>`).

```mermaid
sequenceDiagram
  participant Client as Web App / SDK
  participant API as ImageFlow API
  participant S3 as AWS S3
  participant DB as MongoDB

  Client->>API: POST /api/v1/files/uploadfile\n(originalname, contentType)
  API-->>Client: uploadurl + key
  Client->>S3: PUT file binary to signed uploadurl
  S3-->>Client: 200 OK
  Client->>API: POST /api/v1/files/uploadfile/:foldername\n(key, originalname, bytes)
  API->>DB: Save metadata + filelink (key returned during upload)
  API-->>Client: Saved file response
```

## File Upload Using SDK

Two SDK packages are included in this repository.
SDK repository: [imageflowsdk](https://github.com/AtulYadavCodes/imageflowsdk)

#### Browser SDK

- Package folder: imageflowsdk-browser
- Entry file: imageflowuploadfunction.js
- Export: imageflowuploadfunction(file, apikey, foldername)

Example:

```js
import { imageflowuploadfunction } from "./imageflowuploadfunction.js";

const file = document.querySelector("#file-input").files[0];
const apiKey = "sk_xxxxxxxxxx";

const result = await imageflowuploadfunction(file, apiKey, "documents");
console.log(result);
```

#### Backend SDK (Node.js)

- Package folder: imageflowsdk-backend
- Entry file: imageflowuploadfunction.js
- Export: imageflowuploadfunction(filepath, apikey, foldername)

Example:

```js
import { imageflowuploadfunction } from "./imageflowuploadfunction.js";

const apiKey = "sk_xxxxxxxxxx";
const result = await imageflowuploadfunction(
  "./docs/report.pdf",
  apiKey,
  "reports",
);
console.log(result);
```

SDK behavior notes:

- If foldername is empty, SDK defaults to default.
- SDK sends Authorization: Bearer <apikey>.
- SDK currently uses relative API paths (/api/v1/...), so use same-origin hosting or a proxy strategy.

# Common APIs (Non-Upload)

Use JWT or API key for these protected read endpoints.

Set token once:

```bash
TOKEN="your_jwt_or_api_key"
BASE="http://localhost:3000/api/v1"
```

Get all user files (paginated):

```bash
curl -X GET "$BASE/files/getalluserfiles?page=1&limit=10&sortby=createdAt&sorttype=desc" \
  -H "Authorization: Bearer $TOKEN"
```

Get all folders for current user:

```bash
curl -X GET "$BASE/folders/getalluserfolders" \
  -H "Authorization: Bearer $TOKEN"
```

Get all files inside a folder:

```bash
curl -X GET "$BASE/folders/getallfilesinfolder/documents" \
  -H "Authorization: Bearer $TOKEN"
```

Quick notes:

- `getalluserfiles` supports `page`, `limit`, `sortby`, and `sorttype` query params.
- `getallfilesinfolder/:foldername` uses the folder name in the URL path.
- `/apikey/list` requires JWT auth (API key does not work for this route).

# Website (No API Code)

If you are not building an integration, use the ImageFlow website/client UI.

- Sign up or log in
- Upload and organize files through UI
- Manage profile and credentials visually

This path is intended for users who do not want to call APIs directly.

# Environment Variables

Use backend/.env.example as your template.

Required backend variables:

- PORT
- CORS_ORIGIN
- MONGODB_URI
- JWT_SECRET
- JWT_EXPIRES_IN
- JWT_REFRESH_SECRET
- JWT_REFRESH_EXPIRES_IN
- REDIS_HOST
- REDIS_PORT
- REDIS_PASSWORD
- AWS_REGION
- AWS_BUCKET_NAME
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- REMOVEBG_API_KEY

# Local Setup

1. Install backend dependencies

- cd backend
- npm install

2. Install AWS SDK dependencies if missing

- npm i @aws-sdk/client-s3 @aws-sdk/s3-request-presigner

3. Start Redis

- Local Redis, or
- docker compose up -d (from backend folder)

4. Start backend

- npm start

# Response Format

Successful responses use:

- statusCode
- message
- data

Error responses use:

- statusCode
- message
- errors

## Security

- Passwords/API keys hashed
- JWT with refresh token flow
- Centralized error handling
- API key revoke support
