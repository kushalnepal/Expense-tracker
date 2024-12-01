
# Expense Tracker with Node.js API and Next.js

This is a Next.js-based Expense Tracker application with CRUD functionality for managing expenses. The app includes an informative landing page, a login system with a signup option, and a dashboard for recording and analyzing expenses. The backend is powered by a Node.js API.

---

## Features

- **Landing Page**:  
  A user-friendly, informative landing page with a **Login button** in the top-right corner.

- **User Authentication**:  
  - Login and Signup functionality.
  - Seamless navigation from the landing page to the dashboard upon successful login.

- **Expense Dashboard**:  
  - Manage expenses with CRUD operations (Create, Read, Update, Delete).  
  - Record incomes and expenses, and view a **profit/loss summary**.

---
## Screenshots

### Landing Page  
![Screenshot 2024-08-26 081812](https://github.com/user-attachments/assets/cdfea07b-6cfe-48fe-a068-9a176f685dc0)

### Login Page  
![sad2 login page](https://github.com/user-attachments/assets/550ecb50-8263-45e6-b6cb-21f11bdf2ecd)

### Dashboard  
![Screenshot 2024-08-26 081156](https://github.com/user-attachments/assets/a8bd042f-d4b6-491b-b264-87a56e7618f9)


## Project Structure

```
/app
├── /auth          # Authentication pages
│   ├── /login     # Login page
│   ├── /signup    # Signup page
├── /api           # API routes for backend integration
├── /dashboard     # Dashboard page for expense tracking

```

---

## Getting Started

### Prerequisites

- **Node.js**: v16 or later  
- **npm**: v8 or later  
- **MongoDB**: For data storage

### Installation

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/yourusername/Expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies**:  
   ```bash
   npm install
   ```



4. **Start the application**:  
   Run both the frontend and backend servers.  
   - Frontend:  
     ```bash
     npm run dev
     ```
 

   The app will be available at `https://expense-tracker-29e8jeyz4-kushalnepals-projects.vercel.app/`.

---

## Usage

### Landing Page  
Explore the landing page and click the **Login** button in the top-right corner.

### Authentication  
- **Sign Up**: Create a new account.  
- **Login**: Use your credentials to access the dashboard.  

### Dashboard  
- Add, edit, and delete expense records.  
- Track income and expenses, and view profit/loss summaries.

---

## Tech Stack

### Frontend
- **Framework**: Next.js  
- **Styling**: Tailwind CSS  

### Backend
- **Runtime**: Node.js  
- **Database**: MongoDB  
- **Authentication**: JWT  

---

