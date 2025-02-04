import { Route, Routes } from "react-router-dom"
// import MusicPlayer from "./components/MusicPlayer"
import FaceDetector from "./pages/FaceDetector"

const App = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/musicPlayer" element={<MusicPlayer/>}/> */}
        <Route path="/faceDetector" element={<FaceDetector/>}/>

        {/* not found pages */}
        <Route path="*" index={"Not Found Page"}/>
      </Routes>    
    </>
  )
}

export default App