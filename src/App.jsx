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
import _ from "lodash"; // For throttling

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Debounced log function to avoid overloading the console
  const logResults = useRef(
    _.throttle((results) => {
      console.log("Face Direction:", results.faceDirection); // Log face direction
      console.log("Eye Blink Status:", results.eyeBlinkStatus); // Log eye blink status
    }, 1000) // Log results every second
  );

  // Face direction detection logic with improved tilted differentiation
  const detectFaceDirection = (faceLandmarks) => {
    const nose = faceLandmarks[1]; // Nose tip
    const leftEar = faceLandmarks[234]; // Left ear
    const rightEar = faceLandmarks[454]; // Right ear

    const earMidpoint = {
      x: (leftEar.x + rightEar.x) / 2,
      y: (leftEar.y + rightEar.y) / 2,
    };

    const deltaX = nose.x - earMidpoint.x; // Horizontal difference
    const deltaY = nose.y - earMidpoint.y; // Vertical difference

    let faceDirection = "";

    const horizontalThreshold = 0.04; // More sensitive for horizontal direction
    const verticalThreshold = 0.06; // Slightly less sensitive for vertical direction
    const tiltThreshold = 0.03; // Least sensitive for detecting head tilt

    if (Math.abs(leftEar.y - rightEar.y) > tiltThreshold) {
      // Head is tilted
      faceDirection = leftEar.y > rightEar.y ? "Tilted Left" : "Tilted Right";
    } else {
      // Determine horizontal direction
      if (deltaX > horizontalThreshold) {
        faceDirection = "Facing Right";
      } else if (deltaX < -horizontalThreshold) {
        faceDirection = "Facing Left";
      } else {
        faceDirection = "Facing Straight";
      }

      // Add vertical differentiation
      if (deltaY > verticalThreshold) {
        faceDirection = "Facing Down";
      } else if (deltaY < -verticalThreshold) {
        faceDirection = "Facing Up";
      }
    }

    return faceDirection;
  };

  // Eye blink detection logic
  const detectEyeBlink = (faceLandmarks) => {
    const leftEyeUpper = faceLandmarks[159]; // Left upper eyelid
    const leftEyeLower = faceLandmarks[145]; // Left lower eyelid
    const rightEyeUpper = faceLandmarks[386]; // Right upper eyelid
    const rightEyeLower = faceLandmarks[374]; // Right lower eyelid

    const leftEyeHeight = Math.abs(leftEyeUpper.y - leftEyeLower.y);
    const rightEyeHeight = Math.abs(rightEyeUpper.y - rightEyeLower.y);

    const eyeBlinkThreshold = 0.015; // Adjust based on testing

    const leftEyeBlinking = leftEyeHeight < eyeBlinkThreshold;
    const rightEyeBlinking = rightEyeHeight < eyeBlinkThreshold;

    return {
      left: leftEyeBlinking,
      right: rightEyeBlinking,
    };
  };

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

    // Calculate face direction, eye blink, and eyes direction
    const faceLandmarks = results.faceLandmarks;
    if (faceLandmarks && faceLandmarks.length > 0) {
      const faceDirection = detectFaceDirection(faceLandmarks);
      const eyeBlinkStatus = detectEyeBlink(faceLandmarks);

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
