# NetDev API - Developer Networking Platform

A comprehensive Laravel API backend for a developer networking platform with user profiles, skill matching, location-based search, and portfolio management.

## 🚀 Features

- **User Authentication** - Laravel Sanctum with registration/login
- **User Profiles** - Complete profile management with professional info
- **Skill Management** - Technical skills with user associations
- **Project Portfolios** - Project showcase with external links
- **Resume Management** - File upload and download functionality
- **Dynamic Search** - Multi-filter user search (skills, location, profession)
- **Location & Profession** - Geographic and professional categorization
- **Authorization** - User ownership validation and protected routes

## 🏗️ Database Structure

### Core Tables
- **users** - Authentication and basic profile data
- **infos** - Professional information, location, profession
- **resumes** - Resume file management
- **projects** - Portfolio projects with external links
- **skills** - Technical skills
- **professions** - Job titles/categories
- **locations** - Cities and countries

### Pivot Tables
- **user_skills** - Many-to-many user-skill relationships
- **project_skills** - Many-to-many project-skill relationships

## 📡 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout (protected)

### User Management (Protected)
- `GET /api/user` - Get current user
- `PUT /api/user` - Update user profile
- `DELETE /api/user` - Delete user account
- `POST /api/user/change-password` - Change password
- `POST /api/user/profile-image` - Upload profile image

### User Info (Protected)
- `GET /api/user/info` - Get user info
- `POST /api/user/info` - Create/update user info
- `PUT /api/user/info` - Update user info
- `DELETE /api/user/info` - Delete user info

### Resume Management (Protected)
- `GET /api/user/resume` - Get user resume
- `POST /api/user/resume` - Upload resume
- `DELETE /api/user/resume` - Delete resume
- `GET /api/user/resume/download` - Download resume

### Project Management (Protected)
- `GET /api/user/projects` - Get user projects
- `POST /api/user/projects` - Create project
- `PUT /api/user/projects/{project}` - Update project
- `DELETE /api/user/projects/{project}` - Delete project

### Skill Management (Protected)
- `GET /api/user/skills` - Get user skills
- `POST /api/user/skills/attach` - Attach skill to user
- `POST /api/user/skills/detach` - Detach skill from user

### Data Management (Protected)
- `GET /api/skills` - Get all skills (public)
- `POST /api/skills` - Create skill
- `PUT /api/skills/{skill}` - Update skill
- `GET /api/professions` - Get all professions (public)
- `POST /api/professions` - Create profession
- `PUT /api/professions/{profession}` - Update profession
- `GET /api/locations` - Get all locations (public)
- `POST /api/locations` - Create location
- `PUT /api/locations/{location}` - Update location

### Public Search & Profiles
- `GET /api/users/search` - Dynamic user search
- `GET /api/users/{user}` - Get public user profile
- `GET /api/users/{user}/projects` - Get user projects
- `GET /api/users/{user}/info` - Get user info

## 🔍 Search Functionality

The search endpoint supports multiple filters:

```
GET /api/users/search?search=john&skills[]=1&skills[]=2&city=Vienna&profession=1
```

**Available Parameters:**
- `search` - Text search in first_name, last_name, username
- `skills[]` - Array of skill IDs (users must have ALL skills)
- `profession` - Profession ID filter
- `location` - Location ID filter
- `city` - Text search in city name
- `country` - Text search in country name

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/berisha-ad/netdev-api.git
   cd netdev-api
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database setup**
   ```bash
   # Update .env with your database credentials
   php artisan migrate
   php artisan db:seed
   ```

5. **Start the server**
   ```bash
   php artisan serve
   # Or with Laravel Sail
   ./vendor/bin/sail up
   ```

## 🔧 Configuration

### Database
Update your `.env` file with database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=netdev_api
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### File Storage
For file uploads (resumes, profile images):
```bash
php artisan storage:link
```

## 📝 Usage Examples

### Register a new user
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

### Search for users
```bash
curl -X GET "http://localhost/api/users/search?search=john&skills[]=1&city=Vienna"
```

## 🔐 Security Features

- **Laravel Sanctum** for API authentication
- **User ownership validation** - Users can only edit their own content
- **Input validation** - Comprehensive validation for all endpoints
- **Protected routes** - Sensitive operations require authentication
- **File upload security** - Validated file types and sizes

## 📊 API Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
    "message": "Operation successful",
    "data": {...}
}
```

**Error Response:**
```json
{
    "error": "Error description",
    "message": "Detailed error message"
}
```

**Paginated Response:**
```json
{
    "current_page": 1,
    "data": [...],
    "per_page": 15,
    "total": 100
}
```

## 🧪 Testing

Run the test suite:
```bash
php artisan test
```

## 📈 Performance

- **Eager loading** - Optimized database queries
- **Pagination** - Efficient data loading (15 items per page)
- **Indexed relationships** - Fast search and filtering
- **Caching** - Configuration and route caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 🆘 Support

For support and questions, please open an issue on GitHub or contact the development team.

---

**Built with Laravel 11 and Laravel Sanctum** 🚀
