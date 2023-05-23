# React Template

This is a web application for sharing React components. Users can upload their components, view previews of uploaded components, and download the component along with associated CSS styles. The project is built using Next.js, Sequelize, and Puppeteer.

## Features

- User registration and authentication
- Upload and share React components
- Preview uploaded components
- Download components and associated CSS styles
- Like and comment on component posts

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/react-component-sharing.git
   ```

2. Install dependencies:

   ```bash
   cd react-component-sharing
   npm install
   ```

3. Set up the database:

   - Create a [PostgreSQL database](https://customer.elephantsql.com/instance/create).
   - Configure the database connection in `database/connect.js`.
   - Add .env.local file and add NEXT_PUBLIC_DATABASE_URL which is a [PostgreSQL database connection string](https://stackoverflow.com/questions/3582552/what-is-the-format-for-the-postgresql-connection-string-url).

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser:

   ```
   http://localhost:3000
   ```

## API Routes

- `/api/component/top`: Get the latest components.
- `/api/component/:id`: Get a specific component by ID.
- `/api/component/:id/like`: Like a component. - to be added 
- `/api/component/:id/comment`: Add a comment to a component. - to be added

## Directory Structure

```
├── components        # React components
├── database          # Sequelize models and database configuration
├── pages             # Next.js pages
├── public            # Public files (e.g., images, CSS)
└── styles            # CSS styles
```

## Dependencies

- Next.js: Framework for server-rendered React applications
- Sequelize: ORM for database management
- Puppeteer: Headless browser for capturing component screenshots
- Axios: HTTP client for making API requests
- React Icons: Icon library for React components
