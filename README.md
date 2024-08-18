# TaskPro - A Kanban Board Application

**TaskPro** is a powerful, feature-rich Kanban board application designed to help users manage tasks efficiently, collaborate with team members, and enhance productivity. With features like board creation, task management, and real-time collaboration, TaskPro provides an intuitive and flexible workspace for both individuals and teams.

---

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Technologies](#technologies)
5. [Design](#design)
6. [License](#license)

## Features

- **User Registration & Authentication**

  - Users can register and log in using email and password or Google OAuth.
  - Backend handles authentication, with secure validation for email and password.

- **Board Management**

  - Create, edit, and delete Kanban boards.
  - Add custom icons and background images to boards.
  - Invite collaborators to work on boards with in-app notifications.

- **Task Management**

  - Add columns to organize tasks on each board.
  - Create and manage individual tasks (cards) within columns.
  - Drag and drop tasks between columns for easy workflow management.

- **Collaborator Management**

  - Invite collaborators to work on specific boards.
  - Collaborators can add, edit, or move tasks across the board.

- **User Profile Management**
  - Update email and password securely.
  - Upload and change profile pictures at any time.

## Installation

To set up and run TaskPro locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/NituAlexandru/TaskPro.git
   cd TaskPro
   ```

2. **Install Dependencies**
   npm install

3. **Set up the Environment**
   Update the API_BASE_URL in your environment configuration to point to your local backend.

4. **Start the Development Server**
   npm run dev

5. **Access the Application**
   Open your browser and go to http://localhost:4500.

## Usage

- **Once the application is running:**
  - Sign Up / Log In: Register with your email or log in using Google.
  - Create Boards: Set up a new board, customize it with icons and backgrounds, and invite team members.
  - Manage Tasks: Create columns and tasks, then organize them by dragging and dropping tasks across columns.
  - Collaborate: Work with team members in real-time, and see updates instantly.

## Technologies

- **Frontend:**

  - React
  - React Router
  - Styled Components
  - Formik & Yup for form handling and validation
  - React Beautiful DnD for drag-and-drop functionality
  - React Toastify for notifications
  - Material UI (MUI) for UI components
  - Axios for HTTP requests

- **Backend:**

  - Node.js: JavaScript runtime environment.
  - Express.js: Web framework for building RESTful APIs.
  - MongoDB: NoSQL database for storing data, using Mongoose for ORM.
  - JWT: JSON Web Tokens for secure authentication.
  - Google OAuth 2.0: Authentication using Google accounts.
  - Cloudinary: Cloud service for managing user profile images and board backgrounds.
  - Swagger: Documentation for API endpoints.
  - Nodemailer: Sending emails for support and notifications.
  - dotenv for environment variables

- **Deployment:**
  - Vite for development and build
  - Render.com for hosting

## Design

TaskPro was designed with a clean and modern user interface, ensuring an optimal user experience across devices.

- **Design Tool:**

  - [Figma](<https://www.figma.com/design/DU5uKhz7Ldq8vTf5ciCYNV/TaskPro-(Copy)?node-id=0-1&t=ipsiRUj1WekNcHvj-0>)

- **Design Highlights:**
  - Responsive Layout: Optimized for mobile, tablet, and desktop.
  - Icon & Image Management: Efficient loading of SVGs and optimized images for Retina displays.
  - Semantic HTML: Ensures accessibility and validation against W3C standards.

## License

TaskPro is open-source and available under the MIT License.

---

# TaskPro Backend

This is the backend server for the TaskPro project, a task management application that includes features such as user authentication, board management, and collaboration.

---

## Getting Started

Follow these steps to set up and run the TaskPro backend locally.

1. **Clone the Repository**

```bash
git clone https://github.com/NituAlexandru/TaskPro-Backend.git
cd TaskPro-Backend
```

2. **Install Dependencies**
   npm install

3. **Set up the Environment**
   - PORT=4500
   - DB_URI=<your_mongodb_connection_string>
   - SECRET_KEY=<your_secret_key>
   - BACKEND_URL=http://localhost:4500
   - FRONT_URL=http://localhost:5173
   - JWT_SECRET=<your_jwt_secret>
   - CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
   - CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   - CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   - GOOGLE_CLIENT_ID=<your_google_client_id>
   - GOOGLE_CLIENT_SECRET=<your_google_client_secret>
   - EMAIL_HOST=<your_email_host>
   - EMAIL_PORT=465
   - EMAIL_USER=<your_email_user>
   - EMAIL_PASS=<your_email_pass>

Make sure to replace the placeholder values with your actual configuration details.

4. **Start the Development Server**
   node src/server.js

5. **Access the Application**
   The backend server will be running on http://localhost:4500. You can use tools like Postman to interact with the API.

## Features

- **User Registration & Authentication**

  - Register and login users with JWT authentication.
  - Google OAuth 2.0 integration for Google login.
  - Token-based authorization for protected routes.
  - Edit user profiles, including changing passwords and updating profile pictures.

- **Board Management**

  - Create, read, update, and delete boards.
  - Customize boards with background images and icons.
  - Manage columns and cards within each board.
  - Invite collaborators to work on boards.
  - Assign cards to specific collaborators.

- **Theme Management**

  - Users can switch between Light, Violet, and Dark themes.
  - The selected theme is saved in the user's profile for a consistent experience across sessions.

- **Error Handling & Validation**

  - Comprehensive error handling with descriptive messages.
  - Data validation using Joi.

- **Email Support**

  - Users can request help by sending an email to <your_email>
  - The email includes the user's comment and contact email for follow-up.

## Technologies

- **Backend:**

  - Node.js: JavaScript runtime environment.
  - Express.js: Web framework for building RESTful APIs.
  - MongoDB: NoSQL database for storing data, using Mongoose for ORM.
  - JWT: JSON Web Tokens for secure authentication.
  - Google OAuth 2.0: Authentication using Google accounts.
  - Cloudinary: Cloud service for managing user profile images and board backgrounds.
  - Swagger: Documentation for API endpoints.
  - Nodemailer: Sending emails for support and notifications.
  - dotenv for environment variables

- **Dev Tools:**

  - Nodemon: Automatically restart the server during development.

- **API Documentation**
  - API documentation is available and automatically generated with Swagger. To access the API documentation, navigate to: http://localhost:4500/api-docs

## License

TaskPro is open-source and available under the MIT License.
