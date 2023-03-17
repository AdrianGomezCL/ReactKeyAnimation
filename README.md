![image](https://user-images.githubusercontent.com/2865577/225799210-58d20371-1a79-4391-9c90-30f033cfd242.png)

# React Key Animation

This project is a React application that displays animated keys on the screen whenever a key is pressed on the keyboard.

## Prerequisites

- Node.js
- npm or yarn package manager

## Installation

1. Clone this repository.
2. Navigate to the project directory in your terminal.
3. Run `npm install` or `yarn install` to install the required dependencies.
4. Run `npm start` or `yarn start` to start the development server.

## Usage

1. Open the application in your web browser.
2. Press any letter key on your keyboard to see an animated key appear on the screen at a random position.
3. Press additional keys to see more animated keys appear.

## Technologies Used

- React
- Emotion
- React Spring

## Components

### `App`

The main component that displays the animated keys. It uses the `useState` hook to keep track of an array of `pressedKeys` that have been pressed on the keyboard. The `handleKeyPress` function adds a new `pressedKey` object to the array whenever a letter key is pressed, with a random position on the screen. The `useEffect` hook adds and removes an event listener to listen for key presses and call the `handleKeyPress` function. The component then maps over the `pressedKeys` array to render each `AnimatedKey` component.

### `AnimatedKey`

A component that displays an individual animated key. It receives a `keyObj` prop that contains the letter key and its position on the screen, as well as an `index` prop and the `totalKeys` length prop to calculate the key's opacity. It uses the `useSpring` hook from React Spring to animate the key's position and scale, and renders a `KeyDisplay` component with the animated style props.

### `KeyDisplay`

A component that displays the letter key with an animated style. It receives a `style` prop with the animated style props from `AnimatedKey`, as well as an `opacity` prop to set the key's opacity. It uses the `animated` component from React Spring to animate the style props of the key's container `div`. The key's style is defined with Emotion CSS.

### `withReactFC`

A higher-order component that takes a styled component and returns a new functional component that can receive props. Used to pass props to styled components in `Container`.

### `Container`

A styled component that acts as a container for the entire application. It uses Emotion CSS to set its style props. The component is passed to `withReactFC` to make it a functional component that can receive props.

## License

This project is licensed under the MIT License.
