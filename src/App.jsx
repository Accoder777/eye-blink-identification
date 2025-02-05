import { Route, Routes } from "react-router-dom"
import FaceDetector from "./pages/FaceDetector"
import Home from "./pages/Home"
import "./css/App.css"
import MainLayout from "./layout/MainLayout"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route path="/faceDetector" element={<FaceDetector/>}/>
          <Route path="/" element={<Home/>}/>

          {/* not found pages */}
        </Route>
          <Route path="*" element={"Not Found Page"}/>
      </Routes>    
    </>
  )
}

export default App