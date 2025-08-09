# NetDev API Documentation

Complete API documentation for the NetDev developer networking platform.

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer {your_token}
```

## 📡 API Endpoints

### 🔐 Authentication Routes

#### Register User
```
POST /api/register
```
**Body (JSON):**
```json
{
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

#### Login
```
POST /api/login
```
**Body (JSON):**
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

#### Logout
```
POST /api/logout
```
**Headers:** `Authorization: Bearer {token}`

---

### 👤 User Management Routes

#### Get Current User
```
GET /api/user
```
**Headers:** `Authorization: Bearer {token}`

#### Update User
```
PUT /api/user
```
**Headers:** `Authorization: Bearer {token}`
**Body (JSON):**
```json
{
    "first_name": "John",
    "last_name": "Smith",
    "username": "johnsmith",
    "email": "john.smith@example.com"
}
```

#### Delete User
```
DELETE /api/user
```
**Headers:** `Authorization: Bearer {token}`

#### Change Password
```
POST /api/user/change-password
```
**Headers:** `Authorization: Bearer {token}`
**Body (JSON):**
```json
{
    "current_password": "password123",
    "new_password": "newpassword123",
    "new_password_confirmation": "newpassword123"
}
```

#### Upload Profile Image
```
POST /api/user/profile-image
```
**Headers:** `Authorization: Bearer {token}`
**Body (form-data):**
```
profile_image: [file upload]
```

---

### 📋 User Info Routes

#### Get User Info
```
GET /api/user/info
```
**Headers:** `Authorization: Bearer {token}`

#### Create/Update User Info
```
POST /api/user/info
```
**Headers:** `Authorization: Bearer {token}`
**Body (JSON):**
```json
{
    "profession_id": 1,
    "tagline": "Full Stack Developer",
    "description": "Passionate developer with 5 years of experience",
    "location_id": 1,
    "status": "available",
    "github_link": "https://github.com/johndoe",
    "linkedin_link": "https://linkedin.com/in/johndoe",
    "portfolio_link": "https://johndoe.dev",
    "started_date": "2020-01-01"
}
```

#### Update User Info
```
PUT /api/user/info
```
**Headers:** `Authorization: Bearer {token}`
**Body (JSON):**
```json
{
    "tagline": "Senior Full Stack Developer",
    "status": "open to work"
}
```

#### Delete User Info
```
DELETE /api/user/info
```
**Headers:** `Authorization: Bearer {token}`

---

### 📄 Resume Routes

#### Get User Resume
```
GET /api/user/resume
```
**Headers:** `Authorization: Bearer {token}`

#### Upload Resume
```
POST /api/user/resume
```
**Headers:** `Authorization: Bearer {token}`
**Body (form-data):**
```
resume: [file upload]
```

#### Delete Resume
```
DELETE /api/user/resume
```
**Headers:** `Authorization: Bearer {token}`

#### Download Resume
```
GET /api/user/resume/download
```
**Headers:** `Authorization: Bearer {token}`

---

### 🚀 Project Routes

#### Get User Projects
```
GET /api/user/projects
```
**Headers:** `Authorization: Bearer {token}`

#### Create Project
```
POST /api/user/projects
```
**Headers:** `Authorization: Bearer {token}`
**Body (JSON):**
```json
{
    "name": "E-commerce Platform",
    "description": "A full-stack e-commerce solution",
    "date": "2023-06-15",
    "link": "https://github.com/johndoe/ecommerce",
    "skill_ids": [1, 2, 3]
}
```

#### Update Project
```
PUT /api/user/projects/1
```
**Headers:** `Authorization: Bearer {token}`
**Body (JSON):**
```json
{
    "name": "E-commerce Platform v2",
    "description": "Updated e-commerce solution with new features"
}
```

#### Delete Project
```
DELETE /api/user/projects/1
```
**Headers:** `Authorization: Bearer {token}`

---

### 🛠️ Skill Management Routes

#### Get User Skills
```
GET /api/user/skills
```
**Headers:** `Authorization: Bearer {token}`

#### Attach Skill to User
```
POST /api/user/skills/attach
```
**Headers:** `Authorization: Bearer {token}`
**Body (JSON):**
```json
{
    "skill_id": 1
}
```

#### Detach Skill from User
```
POST /api/user/skills/detach
```
**Headers:** `Authorization: Bearer {token}`
**Body (JSON):**
```json
{
    "skill_id": 1
}
```

---

### 📊 Data Management Routes

#### Get All Skills
```
GET /api/skills
```

#### Create Skill
```
POST /api/skills
```
**Headers:** `Authorization: Bearer {token}`
**Body (JSON):**
```json
{
    "skill": "React"
}
```

#### Update Skill
```
PUT /api/skills/1
```
**Headers:** `Authorization: Bearer {token}`
**Body (JSON):**
```json
{
    "skill": "React.js"
}
```

#### Get All Professions
```
GET /api/professions
```

#### Create Profession
```
POST /api/professions
```
**Headers:** `Authorization: Bearer {token}`
**Body (JSON):**
```json
{
    "profession": "Frontend Developer"
}
```

#### Update Profession
```
PUT /api/professions/1
```
**Headers:** `Authorization: Bearer {token}`
**Body (JSON):**
```json
{
    "profession": "Senior Frontend Developer"
}
```

#### Get All Locations
```
GET /api/locations
```

#### Create Location
```
POST /api/locations
```
**Headers:** `Authorization: Bearer {token}`
**Body (JSON):**
```json
{
    "city": "Vienna",
    "country": "Austria"
}
```

#### Update Location
```
PUT /api/locations/1
```
**Headers:** `Authorization: Bearer {token}`
**Body (JSON):**
```json
{
    "city": "Vienna",
    "country": "Austria"
}
```

---

### 🔍 Public Search & Profile Routes

#### Search Users
```
GET /api/users/search?search=john&skills[]=1&skills[]=2&city=Vienna&profession=1
```

**Example variations:**
```
GET /api/users/search?search=john
GET /api/users/search?skills[]=1&skills[]=2
GET /api/users/search?city=Vienna&country=Austria
GET /api/users/search?profession=1&location=1
GET /api/users/search?skills[]=1&skills[]=2&city=Vienna&profession=1
```

#### Get User Profile
```
GET /api/users/1
```

#### Get User Info
```
GET /api/users/1/info
```

#### Get User Projects
```
GET /api/users/1/projects
```

---

## 📝 Postman Setup

### Environment Variables
Create a Postman environment with these variables:
- `base_url`: `http://localhost/api`
- `token`: Your authentication token

### Collection Setup
1. Create a new collection called "NetDev API"
2. Set the base URL to `{{base_url}}`
3. Add the Authorization header to collection level:
   - Type: Bearer Token
   - Token: `{{token}}`

### Testing Workflow
1. **Register/Login** to get a token
2. **Copy the token** from the response
3. **Set the token** in your environment variable
4. **Test protected endpoints** with the token

---

## 🔍 Search Parameters

### Available Search Filters
- `search` - Text search in first_name, last_name, username
- `skills[]` - Array of skill IDs (users must have ALL skills)
- `profession` - Profession ID filter
- `location` - Location ID filter
- `city` - Text search in city name
- `country` - Text search in country name

### Search Examples
```
# Find users named "John"
GET /api/users/search?search=john

# Find users with skills "React" and "PHP"
GET /api/users/search?skills[]=1&skills[]=2

# Find users from Vienna
GET /api/users/search?city=Vienna

# Find Frontend Developers from Austria
GET /api/users/search?profession=1&country=Austria

# Complex search: John with React/PHP skills from Vienna
GET /api/users/search?search=john&skills[]=1&skills[]=2&city=Vienna
```

---

## 📊 Response Formats

### Success Response
```json
{
    "message": "Operation successful",
    "data": {...}
}
```

### Error Response
```json
{
    "error": "Error description",
    "message": "Detailed error message"
}
```

### Paginated Response
```json
{
    "current_page": 1,
    "data": [...],
    "per_page": 15,
    "total": 100,
    "last_page": 7,
    "from": 1,
    "to": 15
}
```

---

## 🔐 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Server Error

---

## 🚀 Quick Start

1. **Start the server:**
   ```bash
   ./vendor/bin/sail up
   ```

2. **Register a user:**
   ```bash
   curl -X POST http://localhost/api/register \
     -H "Content-Type: application/json" \
     -d '{
       "first_name": "John",
       "last_name": "Doe",
       "username": "johndoe",
       "email": "john@example.com",
       "password": "password123",
       "password_confirmation": "password123"
     }'
   ```

3. **Login to get token:**
   ```bash
   curl -X POST http://localhost/api/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "john@example.com",
       "password": "password123"
     }'
   ```

4. **Use the token for protected routes:**
   ```bash
   curl -X GET http://localhost/api/user \
     -H "Authorization: Bearer {your_token}"
   ```

---

**API Base URL:** `http://localhost/api`  
**Total Endpoints:** 36  
**Authentication:** Laravel Sanctum  
**Documentation Version:** 1.0 