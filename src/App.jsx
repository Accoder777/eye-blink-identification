import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { Camera } from "@mediapipe/camera_utils";
import {
  FACEMESH_TESSELATION,
  HAND_CONNECTIONS,
  Holistic,
} from "@mediapipe/holistic";
import "./App.css";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import _ from "lodash"; // To help with throttling

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Debounced log function to avoid overloading the console
  const logResults = useRef(
    _.throttle((results) => {
      console.log("Face Direction:", results.faceDirection); // Log face direction
      console.log("Eye Blink Status:", results.eyeBlinkStatus); // Log eye blink status
    }, 3000 / 2) // Log results every 2 seconds
  );

  const onResults = (results) => {
    if (!webcamRef.current?.video || !canvasRef.current) return;

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    if (!canvasCtx) return;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Draw the video frame over the canvas
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    // Draw face landmarks
    drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION, {
      color: "#C0C0C070",
      lineWidth: 1,
    });

    // Draw left hand landmarks
    drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
      color: "#CC0000",
      lineWidth: 5,
    });
    drawLandmarks(canvasCtx, results.leftHandLandmarks, {
      color: "#00FF00",
      lineWidth: 2,
    });

    // Draw right hand landmarks
    drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
      color: "#00CC00",
      lineWidth: 5,
    });
    drawLandmarks(canvasCtx, results.rightHandLandmarks, {
      color: "#FF0000",
      lineWidth: 2,
    });

    canvasCtx.restore();

    // Calculate face direction based on landmarks
    const faceLandmarks = results.faceLandmarks;
    if (faceLandmarks && faceLandmarks.length > 0) {
      const nose = faceLandmarks[1]; // Nose tip (index 1)
      const leftEar = faceLandmarks[234]; // Left ear landmark
      const rightEar = faceLandmarks[454]; // Right ear landmark

      const earMidpoint = {
        x: (leftEar.x + rightEar.x) / 2,
        y: (leftEar.y + rightEar.y) / 2,
      };

      const deltaX = nose.x - earMidpoint.x;
      const deltaY = nose.y - earMidpoint.y;

      let faceDirection = "";
      const straightThreshold = 0.01; // Adjust this value based on testing
      const downThreshold = 0.1; // New threshold to distinguish between straight and down

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        faceDirection = deltaX > 0 ? "Facing Right" : "Facing Left";
      } else {
        // Check vertical position for up/down/straight
        if (deltaY < -downThreshold) {
          faceDirection = "Facing Down";
        } else if (deltaY > straightThreshold) {
          faceDirection = "Facing Straight";
        } else {
          faceDirection = "Facing Up";
        }
      }

      // Eye blinking detection
      const leftEyeUpper = faceLandmarks[159]; // Correct index for left upper eyelid
      const leftEyeLower = faceLandmarks[145]; // Correct index for left lower eyelid
      const rightEyeUpper = faceLandmarks[386]; // Correct index for right upper eyelid
      const rightEyeLower = faceLandmarks[374]; // Correct index for right lower eyelid

      const leftEyeHeight = Math.abs(leftEyeUpper.y - leftEyeLower.y);
      const rightEyeHeight = Math.abs(rightEyeUpper.y - rightEyeLower.y);

      const eyeBlinkThreshold = 0.01; // Adjust this threshold based on testing

      const leftEyeBlinking = leftEyeHeight < eyeBlinkThreshold;
      const rightEyeBlinking = rightEyeHeight < eyeBlinkThreshold;

      const eyeBlinkStatus = {
        left: leftEyeBlinking,
        right: rightEyeBlinking,
      };

      // Log results with throttling
      logResults.current({ faceDirection, eyeBlinkStatus });
    }
  };

  useEffect(() => {
    const holistic = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
    });

    // Configure holistic model options
    holistic.setOptions({
      selfieMode: true,
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    holistic.onResults(onResults);

    if (webcamRef.current && webcamRef.current.video) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          if (webcamRef.current?.video) {
            await holistic.send({ image: webcamRef.current.video });
          }
        },
        width: 640,
        height: 480,
      });

      camera.start();
    }

    // Cleanup function to stop camera when component unmounts
    return () => {
      holistic.close();
    };
  }, []);

  return (
    <div className="App">
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 1200,
          height: 800,
          transform: "scaleX(-1)", // Flip the webcam feed horizontally
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 1200,
          height: 800,
        }}
      />
    </div>
  );
}

export default App;
