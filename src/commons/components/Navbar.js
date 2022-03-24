import { Component } from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";

import { connect } from "react-redux";

import Default from "../images/dummy-profile.png";
import bell from "../images/bell.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      error: false,
      loaded: false,
    };
    this.onError = this.onError.bind(this);
  }

  onError() {
    this.setState({
      isError: !this.state.isError,
    });
  }

  onImageError = () => {
    this.setState({ error: true });
  };

  onImageLoaded = () => {
    this.setState({ loaded: true });
  };

  render() {
    const imgSrc = !this.state.error ? `${process.env.NEXT_PUBLIC_IMAGE}${this.props.users.image}` : Default;
    return (
      <nav className={styles.nav}>
        <p className={styles["title"]}>Zwallet</p>
        <div className={styles["profile"]}>
          <Link href="/profile" passHref>
            <div className="photo">
              <Image
                src={this.props.users.image !== null ? imgSrc : Default}
                onLoad={() => {
                  this.onImageLoaded();
                }}
                onError={() => {
                  this.onImageError();
                }}
                width={52}
                height={52}
                alt="foto profile"
              />
            </div>
          </Link>

          <p className={styles.name}>{`${this.props.users.firstName} ${this.props.users.lastName}`}</p>
          <p className={styles["phone"]}>{this.props.users.noTelp !== null ? this.props.users.noTelp : "---"}</p>
          <div className={styles["icon"]}>
            <Image src={bell} alt="bell" />
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.auth.userData,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Navbar);
