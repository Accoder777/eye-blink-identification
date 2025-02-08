import { Link } from "react-router-dom"
import styles from "./style.module.css"

const Header = () => {
  return (
    <div className={styles.headerContainer}>
        {/* <ul className={styles.headerList}> */}
            <Link className={styles.logo} to={"/"}>
                LOGOTYPE
            </Link>
            <li className={styles.routeList}>
                <Link to={"/"}><span>Home</span></Link>
                <Link to={"/about"}><span>About</span></Link>
                <Link to={"/faceDetector"}><span>Project</span></Link>
                <Link to={"/contact"}><span>Contact</span></Link>
            </li>
            <Link className={styles.otherPage}>
                
            </Link>
            <li className={styles.otherPage}>
                
            </li>
        {/* </ul> */}
    </div>
  )
}

export default Header