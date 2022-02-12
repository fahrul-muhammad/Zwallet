import css from "../styles/Navigasi.module.css";
import { Component } from "react";
import { Modal } from "react-bootstrap";
import Link from "next/link";
import { withRouter } from "next/router";
import { TopUp } from "../../modules/transaction/index";
import { connect } from "react-redux";
import { Logout, getUserById } from "../../modules/auth/index";
import { bindActionCreators } from "redux";
import { saveAction, logout } from "../../redux/actions/auth";

class Navigasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHide: true,
      isSuccess: true,
      isError: true,
      amount: 0,
      redirectUrl: "",
      isLogOut: false,
    };
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data);
    console.log(this.state);
  };

  userTopUp = () => {
    const body = this.state;
    const token = this.props.token;
    TopUp(body, token)
      .then((res) => {
        console.log(res.data.data.redirectUrl);
        this.setState({ redirectUrl: res.data.data.redirectUrl });
        this.setState({ isSuccess: false });
        this.setState({ isError: true });
        const id = this.props.users.id;
        getUserById(id, token)
          .then((result) => {
            const data = result.data.data;
            this.props.setUsers(data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isSuccess: true });
        this.setState({ isError: false });
      });
  };

  modalTrigger = () => {
    this.setState({ isHide: !this.state.isHide });
  };

  userLogOut = () => {
    const token = this.props.token;
    const { router } = this.props;
    Logout(token)
      .then((res) => {
        this.props.logout();
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  isLogout = () => {
    this.setState({ isLogOut: !this.state.isLogOut });
  };

  render() {
    const { router } = this.props;
    return (
      <div className={css["main"]}>
        <ul>
          <li>
            <Link href="/home">
              <a className={router.pathname == "/home" || router.pathname == "/history?" ? css.active : ""}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className={`bi bi-columns-gap ${css["icon"]} `} viewBox="0 0 16 16">
                  <path d="M6 1v3H1V1h5zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12v3h-5v-3h5zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8v7H1V8h5zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6v7h-5V1h5zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z" />
                </svg>
                Dashboard
              </a>
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/transfer" || "/trasnfer/[id]",
                query: { id: router.query.id },
              }}
            >
              <a className={router.pathname == "/transfer" || router.pathname == `/transfer/[id]` || router.pathname == `/history/[id]` || router.pathname == "/history" ? css.active : ""}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className={`bi bi-arrow-up-short ${css["icon"]} `} viewBox="0 0 16 16">
                  <path fill="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
                </svg>
                Transfer
              </a>
            </Link>
          </li>
          <li>
            <Link href={router.asPath}>
              <a onClick={this.modalTrigger}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className={`bi bi-plus ${css["icon"]} `} viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                Top Up
              </a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a
                className={
                  router.pathname == "/profile" || router.pathname == "/profile/detail" || router.pathname == "/profile/add-phone-number" || router.pathname == "/profile/edit-phone-number" || router.pathname == "/profile/change-pin"
                    ? css.active
                    : ""
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className={`bi bi-person ${css["icon"]} `} viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
                Profile
              </a>
            </Link>
          </li>
        </ul>

        <div className={css.logout} onClick={this.isLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className={`bi bi-arrow-bar-right ${css["icon"]} `} viewBox="0 0 16 16">
            <path fill="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z" />
          </svg>
          <p>Logout</p>
        </div>
        <Modal show={!this.state.isHide} centered className={`  ${css.modalContainer}`}>
          <Modal.Header>
            <h5>Top Up</h5>
            <button type="button" className={`btn-close ${css.btnClose}`} data-bs-dismiss="modal" aria-label="Close" onClick={this.modalTrigger}></button>
            <br />
          </Modal.Header>
          <Modal.Body>
            <p className={css.textModal}>
              Enter the amount of money, and click <br /> submit
            </p>
            <input className={`form-control shadow-none ${css["modal-input"]}`} type="number" placeholder="" name="amount" aria-label="default input example" onChange={this.formChange} />
            <p className={css.successTopUp} hidden={this.state.isSuccess}>
              <Link href={this.state.redirectUrl} passHref>
                <a target="_blank"> Top Up success,Please Pay Top up</a>
              </Link>
            </p>
            <p className={css.errorTopup} hidden={this.state.isError}>
              Top Up failed,try again
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button className={`btn btn-secondary ${css.submitbtn}`} onClick={this.userTopUp}>
              Submit
            </button>
          </Modal.Footer>
        </Modal>
        {/* MODAL LOG OUT */}
        <Modal show={this.state.isLogOut} centered>
          <Modal.Header>
            <button type="button" className={`btn-close ${css.btnClose}`} data-bs-dismiss="modal" aria-label="Close" onClick={this.isLogout}></button>
          </Modal.Header>
          <Modal.Body>
            <p className={css.LogoutText}>Are you sure to Log Out?</p>
          </Modal.Body>
          <Modal.Footer>
            <div className={css["log-out-btn"]}>
              <button className="btn btn-danger" onClick={this.userLogOut}>
                Yes
              </button>
              <button className="btn btn-success">No</button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToPropps = (dispacth) => {
  return {
    setUsers: bindActionCreators(saveAction, dispacth),
    logout: bindActionCreators(logout, dispacth),
  };
};

const mapStateToProps = (state) => {
  return {
    users: state.auth.userData,
    token: state.auth.token,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToPropps)(Navigasi));
