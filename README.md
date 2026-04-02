# Study-Abroad-Preparation-System
This system is built for academic project. It's a web-based system to assist students in study abroad preparation.


# Md. Fazly Rabby — Frontend Development & UI/UX Design
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