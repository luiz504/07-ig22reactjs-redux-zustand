# Data Flow Comparison: Redux vs Zustand

## Overview

This repository contains a study project aimed at comparing the data flow of two popular global state management libraries in JavaScript: Redux (Toolkit + Thunk) and Zustand. The project was built using the Vite CLI, integrated with TypeScript, and includes unit tests using Vitest.

The main objective of this project is to provide developers with insights into the similarities and differences between Redux and Zustand when it comes to managing global state in JavaScript applications. By examining their data flow patterns, developers can make informed decisions about which library best suits their project requirements.

## Project Features

- Load course data
- Display the selected module and lesson name in the header
- Render modules as accordions
- Show module lessons within the accordion body
- Clicking the lesson button plays the corresponding video
- Display the current lesson video on the left section
- Automatically play the next lesson video when the current video ends
- These features enable a seamless course experience, allowing users to navigate through modules, access lesson videos, and progress through the course effortlessly.

## Installation

To get started with this project, follow the steps below:

1. Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/your-repo.git
```

2. Navigate to the project's directory:

```bash
cd your-repo
```

3. Install the dependencies:

```bash
npm install
```

## Usage

To explore the different global state management implementations using Redux and Zustand, follow the steps below:

1. Run the JSON server to provide the necessary data for the application by using the following command:

```bash
npm run server
```

This will start the JSON server, and you can access it in your web browser at [http://localhost:3000].

2. Run the application using the following command:

```bash

npm run dev
```

This will launch the application, and you can access it in your web browser at [http://localhost:5173].

3. Inside the app.tsx file located in the project's source code, you will find a variable named mode. This variable determines the state manager mode and can be changed to either 'redux' or 'zustand'.

4. Depending on the selected mode, the application will render the respective page component and utilize the corresponding state manager.

5. Explore the different pages located inside the pages folder to see how the state is consumed and the actions are triggered based on the selected state manager.

6. The storeRedux and storeZustand folders contain the respective state managers and their associated tests. You can review these folders to understand the implementation details of each state manager.

By following these steps, you can switch between Redux and Zustand state management implementations, observe how the state is consumed and actions are triggered in different pages, and review the implementation details of each state manager.

## Testing

Unit tests have been provided for the global state stores implemented in both Redux and Zustand. These tests ensure the correctness and reliability of the state management implementations.

To run the tests, use the following command:

```bash
npm run test
```

This will execute the unit tests using Vitest and display the test results in the console.

### License

This project is licensed under the MIT License. Feel free to use and modify the code according to the terms of the license.

Happy coding!
