# 🏥 NGO Management System

**NGO Management System** is a web-based full-stack application built to manage and organize patient records for NGOs. It supports secure user authentication, structured patient data entry, and powerful CRUD functionalities. Users can upload documents, browse, search, edit, and print patient details through a clean and responsive interface.

---


## 🚀 Table of Contents

- [🧠 Introduction](#-introduction)
- [⚙️ Tech Stack](#-tech-stack)
- [📑 Functionalities](#-functionalities)
- [💡 Component-wise Explanation](#-component-wise-explanation)
  - [1. Authentication](#1-authentication)
  - [2. Patient Registration](#2-patient-registration)
  - [3. Browse Patients](#3-browse-patients)
  - [4. Upload Documents](#4-upload-documents)
  - [5. Edit/Delete/Print](#5-editdeleteprint)
  - [6. Logout](#6-logout)
- [📦 Folder Setup](#-folder-setup)

---

## 🧠 Introduction

The NGO Management System aims to:
- Maintain and manage patient records
- Store personal and medical documentations
- Offer seamless CRUD operations
- Enable secure, real-time access through authentication
- Streamline NGO health data workflows

---


## ⚙️ Tech Stack 

### 🔧 Frontend
- **React.js**
- **React Router**
- **CSS**
- **Axios**

### 🛠 Backend
- **Node.js**
- **Express.js**
- **MongoDB (with Mongoose)**

### 🔐 Authentication
- **Firebase Authentication**

---


## 📑 Functionalities

- 👤 Secure login & signup for NGO users
- 🏥 Add patients with structured form data
- 🗃 Upload supporting documents
- 🔍 Browse, search, and filter patient entries
- ✏️ Edit and delete patient records
- 🖨 Print records
- 🚪 Logout with session cleanup

---
## 💡 Component-wise Explanation

### 1. 🔐 Authentication

- Authentication via **Firebase**
- Allows secure **login/signup**
- Only authenticated users can access the system

![Home Page](Screenshots/homePage1.png)  
![Login](Screenshots/homePage2.png)

---

### 2. 🏥 Patient Registration

- Form split into **three sections**:
  1. **Personal Details**: Name, Age, Gender, Mobile, etc.
  2. **NGO Details**: Registration Date, Inmate Number, OPD Number
  3. **Upload Section**: Aadhar, Reports, etc.

![Personal](Screenshots/personalDetails1.png)  
![NGO Info](Screenshots/personalDetails2.png)  
![Upload Docs](Screenshots/personalDetails3.png)

---
### 3. 📋 Browse Patients

- View all records in a responsive **tabular format**
- Includes:
  - Pagination
  - Search bar
  - Filters

![Browse Table](Screenshots/browserDetails1.png)  
![Search](Screenshots/filterDetails.png)

- Edit patient details inline
- Delete records with confirmation prompt
- Print details directly from browser
![Patients Personal Details](Screenshots/printDetails.png) 
![Patients Personal Details](Screenshots/deleteDetail.png)


---

### 6. 🚪 Logout

- Clears session and cached tokens
- Redirects user to Login page

![Logout](Screenshots/logout.png)

---

### Starting the Client

## 📦 Folder Setup

### Starting the Client
```bash
# Navigate to client folder
cd ngo_portal/client

# Install dependencies
npm install

# Start React frontend
npm run dev
```
---

## Started the Server

```bash
# Navigate to server folder
cd ngo_portal/server

# Install backend dependencies
npm install

# Start the backend server
node index.js

# Start the server
node index.js
```