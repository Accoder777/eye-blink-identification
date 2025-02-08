import { Route, Routes } from "react-router-dom"
import FaceDetector from "./pages/FaceDetector"
import Home from "./pages/Home"
import "./css/App.css"
import MainLayout from "./layout/MainLayout"
import WakeOnProjectInfo from "./pages/WakeOnProjectInfo"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route path="/faceDetector" element={<FaceDetector/>}/>
          <Route path="/about" element={<WakeOnProjectInfo/>}/>
          <Route path="/" element={<Home/>}/>

          {/* not found pages */}
        </Route>
          <Route path="*" element={"Not Found Page"}/>
      </Routes>    
    </>
  )
}

export default App