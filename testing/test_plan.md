# StudyGlobe — Test Plan

## 1. Authentication Testing

### 1.1 User Registration (POST /api/auth/register)
| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| Valid registration | email, password (6+ chars), full_name | 201 Created, user created in Supabase Auth + custom users table + user_profiles |
| Missing fields | email only | 400 Bad Request — "Email, password, and full name are required" |
| Short password | password < 6 chars | 400 Bad Request — "Password must be at least 6 characters" |
| Duplicate email | existing email | 400 Bad Request — Supabase error |

### 1.2 User Login (POST /api/auth/login)
| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| Valid login | correct email + password | 200 OK — returns user object + session with access_token |
| Wrong password | correct email + wrong password | 401 Unauthorized — "Invalid email or password" |
| Missing fields | email only | 400 Bad Request — "Email and password are required" |

### 1.3 Logout (POST /api/auth/logout)
| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| Valid logout | valid session | 200 OK — "Logged out successfully" |

---

## 2. Profile Testing

### 2.1 Get Profile (GET /api/profile)
| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| Authenticated user | valid Bearer token | 200 OK — returns profile data or empty object |
| No token | no Authorization header | 401 Unauthorized |
| Invalid token | expired/malformed token | 401 Unauthorized |

### 2.2 Update Profile (PUT /api/profile)
| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| Valid update | phone, field_of_interest, etc. | 200 OK — "Profile updated successfully" |
| With preferred_countries as string | "Canada, UK" | 200 OK — auto-converted to TEXT[] array |
| With preferred_countries as array | ["Canada", "UK"] | 200 OK — saved directly |
| First-time profile (no existing row) | any fields | 200 OK — creates new profile row |
| No auth | no token | 401 Unauthorized |

---

## 3. University Testing

### 3.1 List Universities (GET /api/universities)
| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| List all | no params | 200 OK — array of universities with country name joined |
| Empty database | no data | 200 OK — empty array |

### 3.2 Get University by ID (GET /api/universities/:id)
| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| Valid ID | existing university ID | 200 OK — single university object |
| Invalid ID | non-existent ID | 404 Not Found |

### 3.3 Search Universities (GET /api/universities?search=...)
| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| Search by name | search=Harvard | 200 OK — matching universities |
| No results | search=ZZZZZ | 200 OK — empty array |

---

## 4. Program Testing

### 4.1 List Programs (GET /api/programs)
| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| List all | no params | 200 OK — array of programs with university Name joined |

### 4.2 Filter by University (GET /api/programs/university/:universityId)
| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| Valid university ID | existing ID | 200 OK — programs for that university |
| No programs | university with no programs | 200 OK — empty array |

---

## 5. Country Testing

### 5.1 List Countries (GET /api/countries)
| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| List all | no params | 200 OK — array of all countries |

### 5.2 Get Country by ID (GET /api/countries/:id)
| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| Valid ID | existing country ID | 200 OK — single country object |

---

## 6. Frontend UI Testing

| Page | Test | Expected Result |
|------|------|-----------------|
| Login | Enter valid credentials, click Sign In | Redirects to Dashboard |
| Login | Enter invalid password | Shows error message |
| Register | Fill all fields, click Register | Shows success, can login |
| Dashboard | Access without login | Redirected to Login |
| Universities | Load page | Displays university cards with Name, city, country |
| Universities | Use search | Filters universities by name |
| University Details | Click university card | Shows tabs: Programs, Intakes, Eligibility, Scholarships |
| Programs | Load page | Displays program cards with degree, field, tuition |
| Programs | Filter by degree | Shows filtered results |
| Profile | Load while logged in | Shows profile form with existing data |
| Profile | Fill and save | Shows "Profile updated successfully" |
| Countries | Load page | Displays country cards |