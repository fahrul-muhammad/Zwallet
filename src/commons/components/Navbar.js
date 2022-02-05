import { Component } from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";

import Default from "../images/dummy-profile.png";
import bell from "../images/bell.png";

export default class Navbar extends Component {
  render() {
    return (
      <nav className={styles.nav}>
        <p className={styles["title"]}>Zwallet</p>
        <div className={styles["profile"]}>
          <Link href="/profile" passHref>
            <div className="photo">
              <Image src={Default} width="52" height="52" alt="foto profile" />
            </div>
          </Link>

          <p className={styles.name}>Fahrul Muhammad</p>
          <p className={styles["phone"]}>+62 8139 3877 7946</p>
          <div className={styles["icon"]}>
            <Image src={bell} alt="bell" />
          </div>
        </div>
      </nav>
    );
  }
}
