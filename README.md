# Real-Time Facial and Hand Landmark Detection App

This web application utilizes React and the MediaPipe Holistic model to facilitate real-time detection of facial and hand landmarks using a webcam. It provides features such as head orientation analysis, eye blinking detection, and customizable visual representations of landmarks on an interactive canvas. Additionally, the app efficiently logs relevant data with a configurable delay for performance optimization.

## Features

- **Real-Time Tracking**: Detects and visualizes face and hand landmarks in real-time.
- **Face Direction Detection**: Analyzes the user's head orientation (facing left, right, up, down, or straight).
- **Eye Blink Detection**: Monitors the user's eye state to determine blinking.
- **Customizable Visualization**: Draws landmarks and connections on a canvas overlay.
- **Throttled Logging**: Efficiently logs face and hand landmark data, face direction, and eye blink status with a configurable delay.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **MediaPipe**: A framework for building multimodal applied machine learning pipelines.
- **Webcam**: For capturing real-time video input from the user's camera.
- **Lodash**: Utility library for JavaScript that provides helpful functions for data manipulation.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/repo-name.git
   Navigate to the project directory:
   ```

cd repo-name
Install dependencies:

npm install
Run the application:

bash
Copy code
npm start
Open http://localhost:3000 in your browser to view the app.

Usage
Allow the application to access your webcam.
Position your face and hands within the camera view.
Observe real-time detection of facial and hand landmarks.
Head orientation and eye blinking information will be displayed in the console.
Contributing
Contributions are welcome! If you have suggestions for improvements or find a bug, please open an issue or submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
MediaPipe
React
Lodash
