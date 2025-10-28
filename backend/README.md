# Khadak Ozar Grampanchayat - Backend API

This is the backend API for the Khadak Ozar Grampanchayat website, handling form submissions and providing an admin panel for managing applications.

## Features

- **Form Submission API**: Handle all types of form submissions from the frontend
- **File Upload**: Support for document uploads with validation
- **Admin Panel**: Web-based admin interface to view and manage submissions
- **Authentication**: JWT-based authentication for admin access
- **Database**: MongoDB for storing form submissions and user data
- **Statistics**: Dashboard with submission statistics

## Prerequisites

Before running the backend, make sure you have:

1. **Node.js** (v14 or higher)
2. **MongoDB** (running locally or MongoDB Atlas)
3. **npm** or **yarn**

## Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `config.env` and update the values:
   ```bash
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/grampanchayat_khadak_ozar
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
   JWT_EXPIRE=7d
   
   # Admin Credentials (Change these in production)
   ADMIN_EMAIL=admin@khadakozar.com
   ADMIN_PASSWORD=admin123
   
   # File Upload Configuration
   MAX_FILE_SIZE=10485760
   UPLOAD_PATH=./uploads
   ```

4. **Start MongoDB:**
   - If using local MongoDB, make sure it's running
   - If using MongoDB Atlas, update the `MONGODB_URI` in your config

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get current user profile

### Form Submissions
- `POST /api/forms/submit` - Submit form with file uploads

### Admin Panel
- `GET /api/admin/submissions` - Get all submissions (with pagination and filters)
- `GET /api/admin/submissions/:id` - Get single submission details
- `PATCH /api/admin/submissions/:id/status` - Update submission status
- `GET /api/admin/stats` - Get submission statistics

## Admin Panel

Access the admin panel at: `http://localhost:5000/admin-panel/index.html`

**Default Admin Credentials:**
- Email: `admin@khadakozar.com`
- Password: `admin123`

**Features:**
- View all form submissions
- Filter by form type, status, and search
- Update submission status
- View detailed submission information
- Download uploaded documents
- View submission statistics

## Form Types Supported

1. **Building Permission** (`bandhkam-parvangi`)
2. **Birth Certificate** (`janm-nond-dakhla`)
3. **Death Certificate** (`mrutyu-nond-dakhla`)
4. **Marriage Certificate** (`vivah-nondani-dakhla`)
5. **Form No. 08** (`namuna-no08`)
6. **Mutation Registration** (`ferfar-nondani`)
7. **Work Request** (`namuna-no04-kam`)
8. **Business NOC** (`vyavasay-naharakat-dakhla`)
9. **Poverty Line Certificate** (`daridrya-resha-dakhla`)
10. **Residence Certificate** (`rahivashi-dakhla`)
11. **Complaint/Suggestion** (`takrar-suchana`)

## File Upload

- **Supported formats**: JPEG, PNG, GIF, PDF, DOC, DOCX
- **Maximum file size**: 10MB per file
- **Maximum files**: 10 files per submission
- **Storage**: Files are stored in `./uploads/` directory organized by form type

## Database Schema

### FormSubmission Model
```javascript
{
  formType: String,           // Type of form
  applicantName: String,      // Applicant's name
  contactNumber: String,      // Contact number
  email: String,              // Email address
  address: String,            // Address
  formData: Mixed,            // Form-specific data
  documents: [Object],        // Uploaded files
  status: String,             // Submission status
  adminNotes: String,         // Admin notes
  processedBy: ObjectId,      // Admin who processed
  processedAt: Date,          // Processing date
  submittedAt: Date,          // Submission date
  submittedFrom: Object       // IP and user agent
}
```

### User Model
```javascript
{
  email: String,              // User email
  password: String,           // Hashed password
  role: String,               // User role (admin/user)
  isActive: Boolean           // Account status
}
```

## Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **JWT**: Secure authentication tokens
- **Password hashing**: bcrypt for password security
- **File validation**: File type and size validation
- **Input validation**: Request data validation

## Production Deployment

1. **Update environment variables** for production
2. **Change default admin credentials**
3. **Use a strong JWT secret**
4. **Set up proper MongoDB connection**
5. **Configure CORS for your domain**
6. **Set up file storage** (consider cloud storage for production)
7. **Enable HTTPS**
8. **Set up monitoring and logging**

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in config.env

2. **File Upload Issues**
   - Check upload directory permissions
   - Verify file size limits

3. **Authentication Issues**
   - Verify JWT secret is set
   - Check token expiration

4. **CORS Issues**
   - Update CORS configuration for your frontend domain

## Support

For issues or questions, please check the logs and ensure all prerequisites are met.










