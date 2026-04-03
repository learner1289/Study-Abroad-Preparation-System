# Md. Munjurul Islam — Backend Development & Data Integration
**Student ID:** 0242310005341104  
**Primary Responsibilities:** Backend development, Data integration

---

## Overview
Responsible for building the entire **Node.js/Express backend** of the StudyGlobe platform, including server setup, authentication system, REST API controllers, middleware, route definitions, and Supabase data integration.

## Files & Features

### Server Entry Point
| File | Feature |
|------|---------|
| `server.js` | Express server setup — CORS, JSON parsing, route mounting, port configuration |
| `package.json` | Backend dependencies (Express, Supabase, bcrypt, jsonwebtoken, dotenv, cors, nodemon) |
| `.env.example` | Environment variable template (SUPABASE_URL, SUPABASE_SERVICE_KEY, PORT, JWT_SECRET) |

### Controllers (`controllers/`)
| File | Feature |
|------|---------|
| `authController.js` | User authentication — register (Supabase Auth + custom users table), login (JWT session), logout |
| `profileController.js` | User profile CRUD — get/update profile with ensureUserRow (auto-creates users table row for FK), TEXT[] array handling for preferred_countries |
| `universityController.js` | University data — list all (with country join), get by ID, search, filter by country |
| `programController.js` | Program data — list all (with university join), get by ID, filter by university |
| `countryController.js` | Country data — list all countries, get by ID |

### Middleware (`middleware/`)
| File | Feature |
|------|---------|
| `auth.js` | JWT authentication middleware — validates Supabase token via `getUser()`, admin role check via user_metadata |

### Routes (`routes/`)
| File | Feature |
|------|---------|
| `auth.js` | Auth endpoints: `POST /register`, `POST /login`, `POST /logout` |
| `profile.js` | Profile endpoints: `GET /` (auth required), `PUT /` (auth required) |
| `universities.js` | University endpoints: `GET /`, `GET /:id`, `GET /search`, `GET /country/:countryId` |
| `programs.js` | Program endpoints: `GET /`, `GET /:id`, `GET /university/:universityId`, `GET /field/:field` |
| `countries.js` | Country endpoints: `GET /`, `GET /:id` |

### Config (`config/`)
| File | Feature |
|------|---------|
| `supabase.js` | Supabase client initialization with service_role key for backend operations |

## Technologies Used
- **Node.js** — Server runtime
- **Express.js** — Web framework for REST APIs
- **Supabase JS SDK** — Database client & authentication
- **bcrypt** — Password hashing
- **jsonwebtoken** — JWT token management
- **dotenv** — Environment variable management
- **cors** — Cross-origin resource sharing
- **nodemon** — Development auto-restart
