# Management System – Frontend

A modern, scalable management system frontend built with **React 19**, featuring role-based access control, secure authentication, and a clean UI powered by the latest frontend technologies.

---

## 🚀 Tech Stack

- **React 19** – Leveraging concurrent features and latest improvements
- **TypeScript** – Strongly typed codebase
- **shadcn/ui** – Accessible, stylish components built with Radix + Tailwind
- **Tailwind CSS** – Utility-first styling framework
- **TanStack Query** – API fetching, caching, and synchronization (formerly react-query)
- **Zod** – Schema-based form validation and error handling
- **React Router** – Declarative route management with route guards

---

## 🔐 Key Features

### ✅ Authentication & Authorization

- Login & logout flow with session/token storage
- Protected routes based on user authentication
- Role-based access control to restrict views and actions

### 🧩 Modular Architecture

- Feature-based folder structure
- Reusable, composable components
- Clean and maintainable code separation

### 📝 Form Handling

- Form validation using **Zod**
- Real-time inline error feedback
- Integrated with shadcn’s accessible components

### 🌐 API Management

- Declarative API queries and mutations using **TanStack Query**
- Built-in support for caching, loading states, and retries
- Centralized API service logic

### 🎨 UI/UX

- Modern, responsive design with **Tailwind CSS**
- Pre-built, customizable components with **shadcn/ui**
- Dark mode and accessibility support out-of-the-box

---

## 📁 Project Structure
src/
├── components/ # Reusable shared UI (buttons, modals, inputs)
├── features/ # Domain modules (auth, users, dashboard, etc.)
├── pages/ # Route-level pages
├── hooks/ # Custom React hooks (e.g., useAuth, usePermission)
├── lib/ # Zod schemas, API services, utilities
├── router/ # App routes, route guards
└── styles/ # Tailwind config and global styles


