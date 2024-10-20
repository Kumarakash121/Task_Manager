# Task Manager

A simple task management application built with React, allowing users to add, edit, delete, and manage tasks. The app persists data using local storage, ensuring that tasks are saved between page reloads.

## Features

- Add new tasks with a title, description, and priority (high, medium, low).
- Edit existing tasks.
- Delete tasks.
- Mark tasks as completed or pending.
- Search functionality to filter tasks.
- Task prioritization and sorting:
The task management application sorts tasks based on their priority levels: high, medium, and low.
High Priority tasks are displayed first, followed by Medium, and then Low.
A custom sorting function maps each priority to a numeric value, allowing for straightforward comparisons and efficient ordering.
This ensures that users can quickly identify and focus on the most critical tasks, enhancing productivity and organization.

sorting code:
const priorityOrder = { high: 1, medium: 2, low: 3 };

const sortTasksByPriority = (tasks) => {
  return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};


## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Local Storage

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)

### Installation

1. **Clone the Repository**:
   
   git clone https://github.com/Kumarakash121/Task_Manager.git
   cd task-manager
   
2. Install Dependencies:
    npm install
   
3. Start the Development Server:
   npm start


   Open your browser and navigate to http://localhost:3000 to see the application in action.
