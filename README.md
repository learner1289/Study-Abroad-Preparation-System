# Study-Abroad-Preparation-System
This system is built for academic project. It's a web-based system to assist students in study abroad preparation.


# Kawshik Kumar Saha — Database Design, API Implementation, Documentation, Testing & Validation, Backend Design 
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
