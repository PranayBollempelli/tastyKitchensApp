# Tasty Kitchens App

## Overview

The **Tasty Kitchens App** is a React-based application that allows users to explore various restaurants, view details of specific restaurants, add food items to their cart, and manage their orders. The app is designed to showcase your understanding of React concepts such as component lifecycle methods, routing, authentication, and authorization, along with responsive design principles.

## Features

- **User Authentication:** Users can log in with valid credentials to access the app's features.
- **Responsive Design:** The app is fully responsive and works seamlessly across desktop, tablet, and mobile devices.
- **Home Page:**
  - Displays a carousel of offers.
  - Lists popular restaurants with sorting and pagination options.
  - Allows users to navigate to the restaurant details page by clicking on a restaurant.
- **Restaurant Details:**
  - Displays detailed information about the selected restaurant.
  - Lists food items available in the restaurant.
  - Allows users to add food items to their cart.
- **Cart Management:**
  - Users can view and manage their cart items.
  - Items in the cart persist even after the app is refreshed, using local storage.
- **Logout:** Users can securely log out of the app.
- **Page Not Found:** Displays a custom 404 page for invalid routes.

## Getting Started

### Prerequisites

- Node.js installed on your local machine.
- A code editor, such as VSCode.

### Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/tasty-kitchens-app.git
    cd tasty-kitchens-app
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the application:

    ```bash
    npm start
    ```

4. Open the app in your browser:

    ```bash
    http://localhost:3000
    ```

## Project Structure

- `src/components/`: Contains all the React components used in the app.
- `src/assets/`: Contains static assets like images.
- `src/services/`: Contains utility functions for making API calls.
- `src/App.js`: The main entry point of the application.
- `src/index.js`: The file where the React app is rendered.

## API Endpoints

- **Login:** `https://apis.ccbp.in/login`
- **Get Carousel Images:** `https://apis.ccbp.in/restaurants-list/offers`
- **Get Restaurants List:** `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9`
- **Get Specific Restaurant Details:** `https://apis.ccbp.in/restaurants-list/${restaurantId}`

## Testing

Ensure that the application meets the provided test case requirements. Key points include:

- Correct use of `testid` attributes.
- Accurate pathnames for routes.
- Proper alt text for images.

## Important Notes

- Use standard HTML elements for styling React components. Avoid using `styled-components` as it is not supported in this project.
- Store cart data in local storage using the key `cartData`.
- Follow the test cases and functional requirements strictly to ensure the app behaves as expected.

## Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- Figma Design Files
- [React Slick Documentation](https://react-slick.neostack.com/)

## Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are welcome.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
