import { Outlet } from "react-router-dom"
import styles from "./style.module.css"

const MainLayout = () => {
  return (
    <>
        <div className={styles.layoutContainer}>
            MainLayout
        </div>
        <Outlet/>
    </>
  )
}

export default MainLayout