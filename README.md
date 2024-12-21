Project Summary
The project involves building a blogging platform backend using TypeScript, Node.js, Express.js, and MongoDB. The system supports two roles: Admin and User, with distinct permissions. It implements secure authentication, role-based access control, and public APIs with enhanced functionalities like searching, sorting, and filtering.

Key Features
User Roles
Admin:

Manages users (block/unblock users).
Deletes any blog.
Cannot update blogs.
User:

Can register, log in, create, update, and delete their own blogs.
Cannot access admin functionalities.
Authentication & Authorization
JWT-based authentication.
Role-based access control differentiating Admin and User capabilities.
Blog API
CRUD operations for blogs.
Public API to view blogs with:
Search: Search blogs by title or content.
Sort: Sort blogs by fields like title or createdAt.
Filter: Filter blogs by author.
Models
User Model:
Contains user details like name, email, password, role, and block status.
Blog Model:
Holds blog data like title, content, author reference, and publication status.
Admin Features
Block/unblock users.
Delete any blog.
Error Handling
Centralized error handling using standardized error response formats for:
Validation errors.
Authentication/authorization issues.
Resource not found.
Internal server errors.


# Blogging Platform Backend

This is a backend API for a blogging platform that supports user authentication, role-based access control, and CRUD operations for blogs.

---

## **Features**

### **User Roles**
- **Admin:**
  - Block/unblock users.
  - Delete any blog.
- **User:**
  - Register, log in, and manage their own blogs.

### **Authentication**
- JWT-based authentication for secure access.
- Role-based access control to enforce permissions.

### **Blog Management**
- Public API for viewing blogs with:
  - **Search** by title or content.
  - **Sort** by `title` or `createdAt`.
  - **Filter** by author ID.

---

## **Technologies**
- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose)

---

## **API Endpoints**

### **Authentication**
1. **Register User**
   - **POST** `/api/auth/register`
   - Allows new users to register.

2. **Login User**
   - **POST** `/api/auth/login`
   - Authenticates users and returns a JWT token.

### **Blog Management**
1. **Create Blog**
   - **POST** `/api/blogs`
   - Logged-in users can create blogs.

2. **Update Blog**
   - **PATCH** `/api/blogs/:id`
   - Logged-in users can update their own blogs.

3. **Delete Blog**
   - **DELETE** `/api/blogs/:id`
   - Logged-in users can delete their own blogs.

4. **View Blogs (Public)**
   - **GET** `/api/blogs`
   - Public API to view blogs with search, sorting, and filtering.

### **Admin Actions**
1. **Block User**
   - **PATCH** `/api/admin/users/:userId/block`
   - Admins can block users.

2. **Delete Blog**
   - **DELETE** `/api/admin/blogs/:id`
   - Admins can delete any blog.

---

## **Setup Instructions**

1. **Clone Repository:**
   ```bash
   git clone <repository-url>
   cd blogging-platform-backend
