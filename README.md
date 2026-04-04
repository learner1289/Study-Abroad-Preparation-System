StudyGlobe- Study Abroad Preparation System

Member-01: Kawshik Kumar Saha — Database Design, API Implementation, Documentation, Testing & Validation, Backend Design
**Primary Responsibilities:** Database design, API implementation, Documentation preparation, Testing and Validation, Backend Design

---

## Overview
Responsible for **database schema design** (Supabase/PostgreSQL), **API route architecture**, **project documentation**, and **testing & validation** of the StudyGlobe platform.

## Files & Features

### Database Schema (`database/`)
| File | Feature |
|------|---------|
| `setup.sql` | Complete PostgreSQL schema — all tables, relationships, RLS policies |

#### Database Tables Designed
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `users` | Custom user accounts | id (UUID), email, password_hash, full_name, role, is_verified |
| `user_profiles` | Student profile data | user_id (FK→users), date_of_birth, phone, current_education_level, field_of_interest, preferred_countries (TEXT[]), budget_range, target_intake |
| `countries` | Country reference data | id, name, code, description |
| `universities` | University listings | id, Name, country_id (FK→countries), city, type, website, description |
| `programs` | Academic programs | id, university_id (FK→universities), degree, field, duration_years, tuition_per_year |
| `intakes` | Intake schedules | id, university_id, intake_name, start_month |
| `language_requirements` | Language test requirements | id, university_id, test_name, min_score |
| `scholarship_eligibility` | Scholarship info | id, university_id, eligibility_basis, minimum_gpa, additional_notes |

#### Row Level Security (RLS) Policies
- Public read access on all lookup tables (countries, universities, programs, intakes, language_requirements, scholarship_eligibility)
- Users can only SELECT/UPDATE/INSERT their own profile
- Admin-only write policies for managing all lookup tables

### API Routes (`api_routes/`)
| File | Endpoints | Methods |
|------|-----------|---------|
| `auth.js` | `/api/auth/register`, `/api/auth/login`, `/api/auth/logout` | POST |
| `profile.js` | `/api/profile` | GET, PUT |
| `universities.js` | `/api/universities`, `/api/universities/:id`, `/api/universities/search`, `/api/universities/country/:countryId` | GET |
| `programs.js` | `/api/programs`, `/api/programs/:id`, `/api/programs/university/:universityId`, `/api/programs/field/:field` | GET |
| `countries.js` | `/api/countries`, `/api/countries/:id` | GET |

### Config (`config/`)
| File | Feature |
|------|---------|
| `supabase.js` | Supabase client initialization — service_role key for bypassing RLS on backend |

### Documentation
| File | Feature |
|------|---------|
| `README.md` | Project overview, setup instructions, architecture description |

### Testing & Validation (`testing/`)
| File | Feature |
|------|---------|
| `test_plan.md` | Comprehensive test plan covering all API endpoints and frontend flows |
| `api_test_results.md` | API endpoint testing results and validation |

## Technologies Used
- **PostgreSQL** — Relational database (via Supabase)
- **Supabase** — Backend-as-a-Service (Auth, Database, RLS)
- **REST API Design** — RESTful endpoint architecture
- **Row Level Security** — Database-level access control


Member-02: Md. Fazly Rabby — Frontend Development & UI/UX Design  
**Primary Responsibilities:** Frontend development, UI/UX design

---

## Overview
Responsible for building the entire **React.js frontend** of the StudyGlobe platform, including all user-facing pages, UI components, navigation, authentication flow, and API integration layer.

## Files & Features

### Pages (`pages/`)
| File | Feature |
|------|---------|
| `Login.js` | User login form with email/password, error handling, redirect logic |
| `Register.js` | User registration form with full name, email, password validation |
| `Dashboard.js` | Main dashboard landing page after login |
| `Profile.js` | User profile management — view/edit personal info (DOB, phone, education level, preferred countries, budget, target intake) |
| `Universities.js` | University listing page with search and country filter |
| `UniversityDetails.js` | Detailed university view with tabs: Programs, Intakes, Eligibility, Scholarships |
| `Programs.js` | Program listing with search, degree filter, and university info |
| `Countries.js` | Country listing page with search functionality |

### Components (`components/`)
| File | Feature |
|------|---------|
| `Navbar.js` | Top navigation bar with responsive links, auth-aware menu (Login/Logout) |
| `ProtectedRoute.js` | Route guard — redirects unauthenticated users to login |

### Context (`context/`)
| File | Feature |
|------|---------|
| `AuthContext.js` | Global authentication state management using React Context API — handles login, register, logout, token storage |

### Services (`services/`)
| File | Feature |
|------|---------|
| `api.js` | Axios HTTP client configuration — base URL, auth token interceptor, API endpoint methods |

### Core Files
| File | Feature |
|------|---------|
| `App.js` | Main app component — React Router setup, route definitions, layout |
| `index.js` | Application entry point — renders App with BrowserRouter |
| `index.css` | Global CSS styles and Tailwind imports |
| `package.json` | Frontend dependencies (React, React Router, Axios, Tailwind CSS) |

## Technologies Used
- **React.js** — Component-based UI framework
- **React Router DOM** — Client-side routing
- **Axios** — HTTP client for API calls
- **Tailwind CSS** — Utility-first CSS framework
- **Context API** — State management for authentication

Member-03: Md. Munjurul Islam — Backend Development & Data Integration
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
