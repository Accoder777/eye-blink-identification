import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import MusicPlayer from './components/MusicPlayer/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <MusicPlayer />
  </StrictMode>,
)
