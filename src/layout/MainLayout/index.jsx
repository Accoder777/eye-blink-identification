import { Outlet } from "react-router-dom"
import { Suspense } from "react"

const MainLayout = () => {
  return (
    <>
      <Suspense fallback="Loading">
        <Outlet/>
      </Suspense>
    </>
  )
}

export default MainLayout