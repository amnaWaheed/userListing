This repository contains the codebase for user listing .

Running the Codebase Locally
To run the codebase locally, follow these steps:

git clone [repository-url]
cd [project-directory]
npm install
 now start server 
 npm start


Structure of Components
The project follows a component-based architecture, with each major feature or UI element encapsulated within its own component. Here's an overview of the component structure:

src/components: Contains reusable UI components used throughout the application.
src/pages: Contains page-level components that represent different views/routes of the application.
src/api: Contains utility functions to fetch data from external APIs.
src/routes: Defines the application routes using React Router.
src/App.tsx: The main entry point of the application where routes are defined and global styles are applied.

Exercise Questions
Listing Component: Implemented a listing component with pagination and filtering options based on gender. Used TypeScript to define types for API responses and component props.
Search Functionality: Integrated search functionality in the listing component to filter users based on name, gender, and country.
Public Profile Page: Created a public profile page where users can view detailed information about a specific user, including their name, email, cell phone, gender, age, and country. Additionally, integrated Google Maps functionality to display the user's location and nationality flag.