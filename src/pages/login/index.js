import styles from "../../commons/styles/login.module.css";
import Image from "next/image";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../commons/components/Layout";
import { Login, GetUser } from "../../modules/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction, saveAction } from "../../redux/actions/auth";
import Loading from "../../commons/components/Loading";

import Image2 from "../../commons/images/png-phone2.png";
import Image1 from "../../commons/images/png-phone.png";

import { Component } from "react";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isSuccess: false,
      isInput: false,
      loading: false,
    };
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data);
    console.log(this.state);
    if (data.email == "" || data.password == "") {
      this.setState({ isInput: false });
    } else {
      this.setState({ isInput: true });
    }
  };

  login = () => {
    const body = this.state;
    this.setState({ loading: true });
    Login(body)
      .then((res) => {
        console.log(res.data);
        const id = res.data.data.id;
        const token = res.data.data.token;
        this.props.setAuth(token);
        GetUser(token, id)
          .then((result) => {
            this.setState({ loading: false });
            const data = result.data.data;
            this.props.setUsers(data);
            document.getElementById("success").style.display = "block";
            setTimeout(() => {
              this.setState({ isSuccess: !this.state.isSuccess });
              console.log(this.state.isSuccess);
            }, 500);
            setTimeout(() => {
              this.setState({ isSuccess: !this.state.isSuccess });
              console.log(this.state.isSuccess);
              if (res.data.data.pin == null) {
                this.props.router.push("/createpin");
              } else {
                return this.props.router.push("/home");
              }
            }, 3500);
          })
          .catch((err) => {
            this.setState({ loading: false });
            console.log(err);
          });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
        document.getElementById("email").style.borderBottomColor = "#FF5B37";
        document.getElementById("password").style.borderBottomColor = "#FF5B37";
        document.getElementById("error").style.display = "block";
      });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <Loading />
        ) : (
          <Layout title="Login">
            <div className={styles.main}>
              <div className={styles.left}>
                <p className={styles.title}>Zwallet</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" width="100%" className={styles.waves}>
                  <path
                    fill="#5a6fe9"
                    fillOpacity="1"
                    d="M0,224L34.3,202.7C68.6,181,137,139,206,106.7C274.3,75,343,53,411,48C480,43,549,53,617,80C685.7,107,754,149,823,186.7C891.4,224,960,256,1029,229.3C1097.1,203,1166,117,1234,101.3C1302.9,85,1371,139,1406,165.3L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                  ></path>
                </svg>
                <div className={styles["image-container"]}>
                  <div className={styles.phone2}>
                    <Image alt="phone2" src={Image2} />
                  </div>
                  <div className={styles.phone1}>
                    <Image alt="phone1" src={Image1} />
                  </div>
                </div>
                <div className={styles.wrapper}>
                  <p className={styles.discover}>App that Covering Banking Needs.</p>
                  <p className={styles.description}>
                    Zwallet is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in Zwallet everyday with worldwide users coverage.
                  </p>
                </div>
              </div>
              <div className={styles.right}>
                <h2 className={styles.desc}>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h2>
                <p className={styles.text}>Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
                <form>
                  <div className={`${styles["mb-3"]}`}>
                    <input type="email" className={`form-control shadow-none  ${styles["forms"]}`} id="email" aria-describedby="emailHelp" placeholder={`Enter your email`} name="email" onChange={this.formChange} />
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div className={styles["mb-3"]}>
                    <input type="password" className={`form-control shadow-none ${styles["forms"]}`} id="password" placeholder="Enter your password" name="password" onChange={this.formChange} />
                    <i className="bi bi-lock"></i>
                    <div className={styles.link}>
                      <Link href="/forgot_password">Forgot your password?</Link>
                    </div>
                  </div>
                </form>
                <p className={styles.errorMsg} id="error">
                  Email Or Password Invalid, Or Maybe Your account not verify
                </p>
                <p className={styles.successMsg} id="success">
                  Login Success
                </p>
                <button className={`btn btn-secondary ${styles.button}`} onClick={this.login} disabled={!this.state.isInput}>
                  Login
                </button>
                <div className={styles.signup}>
                  <p>
                    Don{"`"}t have an account? Let{"`"}s
                  </p>
                  <Link href="/signup"> sign Up</Link>
                </div>
              </div>
              <div className={styles.toast} hidden={!this.state.isSuccess}>
                <p className={styles.toastText}>Login Success</p>
              </div>
            </div>
          </Layout>
        )}
      </>
    );
  }
}

const mapDispatchToPropps = (dispacth) => {
  return {
    setUsers: bindActionCreators(saveAction, dispacth),
    setAuth: bindActionCreators(loginAction, dispacth),
  };
};

const mapStateToProps = (state) => {
  return {
    users: state.auth.userData,
    token: state.auth.token,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToPropps)(index));
