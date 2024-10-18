# Face and Eye Tracker App

This web application leverages React and the MediaPipe Holistic model to provide real-time facial direction and eye blink detection using a webcam. The app offers interactive features, such as analyzing head orientation, detecting eye blinks, and visualizing facial landmarks on an adjustable canvas overlay. It also includes optimized logging of detected data with a configurable delay for performance enhancement.

## Features

- **Real-Time Tracking**: Detects and visualizes face landmarks in real-time.
- **Face Direction Detection**: Analyzes the user's head orientation (facing left, right, up, down, or straight).
- **Eye Blink Detection**: Monitors the user's eye state to detect blinking.
- **Customizable Visualization**: Displays landmarks and connections on a canvas overlay.
- **Throttled Logging**: Efficiently logs face landmark data, head direction, and eye blink status with a configurable delay for optimized performance.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **MediaPipe**: A framework for building multimodal applied machine learning pipelines.
- **Webcam**: For capturing real-time video input from the user's camera.
- **Lodash**: Utility library for data manipulation and throttling.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/Facial-ID-App.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd Facial-ID-App
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Run the application**:

   ```bash
   npm start
   ```

5. **Open the app**:

   Visit [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

1. Allow the application to access your webcam.
2. Ensure your face is visible in the camera view.
3. Observe real-time detection of facial landmarks.
4. Head orientation and eye blinking data will be displayed in the console.

## Contributing

Contributions are welcome! If you have suggestions for improvements or find a bug, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- **MediaPipe**
- **React**
- **Lodash**
