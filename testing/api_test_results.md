# StudyGlobe — API Test Results

**Tester:** Kawshik Kumar Saha (0242310005341289)  
**Environment:** Node.js v18+, Supabase PostgreSQL, localhost:5000

---

## Authentication Endpoints

### POST /api/auth/register
```
Request:
  POST http://localhost:5000/api/auth/register
  Body: { "email": "test@example.com", "password": "test123", "full_name": "Test User" }

Response: 201 Created
  { "message": "Registration successful. Please verify your email, then log in.", "user": { "id": "..." } }

Result:  PASS
Notes: User created in Supabase Auth, custom users table, and user_profiles table.
```

### POST /api/auth/login
```
Request:
  POST http://localhost:5000/api/auth/login
  Body: { "email": "student@studyglobe.com", "password": "student123" }

Response: 200 OK
  { "message": "Login successful", "user": { "id": "...", "email": "...", "full_name": "Student" }, "session": { "access_token": "..." } }

Result: PASS
Notes: Returns valid JWT access_token for subsequent authenticated requests.
```

### POST /api/auth/login (Invalid)
```
Request:
  POST http://localhost:5000/api/auth/login
  Body: { "email": "student@studyglobe.com", "password": "wrongpassword" }

Response: 401 Unauthorized
  { "error": "Invalid email or password" }

Result: PASS
```

---

## University Endpoints

### GET /api/universities
```
Request: GET http://localhost:5000/api/universities

Response: 200 OK
  [
    { "id": 1, "Name": "University of Toronto", "city": "Toronto", "country_name": "Canada", ... },
    { "id": 2, "Name": "MIT", "city": "Cambridge", "country_name": "United States", ... },
    ...
  ]

Result: PASS
Notes: Returns all universities with country name joined from countries table.
```

### GET /api/universities/:id
```
Request: GET http://localhost:5000/api/universities/1

Response: 200 OK
  { "id": 1, "Name": "University of Toronto", "city": "Toronto", ... }

Result: PASS
```

---

## Program Endpoints

### GET /api/programs
```
Request: GET http://localhost:5000/api/programs

Response: 200 OK
  [
    { "id": 1, "degree": "Bachelor", "field": "Computer Science", "tuition_per_year": 15000, "universities": { "Name": "University of Toronto" }, ... },
    ...
  ]

Result: PASS
Notes: Returns all programs with university Name joined.
```

---

## Profile Endpoints

### GET /api/profile (Authenticated)
```
Request:
  GET http://localhost:5000/api/profile
  Headers: { "Authorization": "Bearer <valid_token>" }

Response: 200 OK
  { "id": "...", "user_id": "...", "phone": "+880 1234-567890", "field_of_interest": "Computer Science", ... }

Result: PASS
```

### PUT /api/profile (Update)
```
Request:
  PUT http://localhost:5000/api/profile
  Headers: { "Authorization": "Bearer <valid_token>" }
  Body: { "phone": "+880 1234-567890", "field_of_interest": "Computer Science", "preferred_countries": "Canada, UK", "budget_range": "$10,000-$20,000/yr" }

Response: 200 OK
  { "message": "Profile updated successfully", "profile": { ... } }

Result: PASS
Notes: preferred_countries auto-converted from comma-separated string to PostgreSQL TEXT[] array.
```

### GET /api/profile (No Auth)
```
Request:
  GET http://localhost:5000/api/profile
  Headers: (none)

Response: 401 Unauthorized
  { "error": "Unauthorized: No token provided" }

Result: PASS
```

---

## Country Endpoints

### GET /api/countries
```
Request: GET http://localhost:5000/api/countries

Response: 200 OK
  [ { "id": 1, "name": "Canada", ... }, { "id": 2, "name": "United States", ... }, ... ]

Result: PASS
```

---

## Summary

| Category | Tests | Passed | Failed |
|----------|-------|--------|--------|
| Authentication | 4 | 4 | 0 |
| Universities | 2 | 2 | 0 |
| Programs | 1 | 1 | 0 |
| Profile | 3 | 3 | 0 |
| Countries | 1 | 1 | 0 |
| **Total** | **11** | **11** | **0** |

**Overall Result: ALL TESTS PASSED**
