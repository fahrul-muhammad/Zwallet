import { Component } from "react";
import css from "../../../commons/styles/changePass.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "next/router";
import { saveAction } from "../../../redux/actions/auth";

// COMPONENTS
import Navbar from "../../../commons/components/Navbar";
import Navigasi from "../../../commons/components/Navigasi";
import Footer from "../../../commons/components/Footer";
import Layout from "../../../commons/components/Layout";

// MODULES
import { changePassword } from "../../../modules/Update/Users";
import { getUserById } from "../../../modules/auth/index";
import { faChessKnight } from "@fortawesome/free-solid-svg-icons";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      isInput: false,
      isSuccess: false,
    };
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data);
    if (data.oldPassword == "") {
      this.setState({ isInput: false });
    } else {
      this.setState({ isInput: true });
    }
  };

  editPassword = () => {
    const token = this.props.token;
    const id = this.props.users.id;
    const body = this.state;
    changePassword(id, body, token)
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          this.setState({ isSuccess: !this.state.isSuccess });
          console.log(this.state.isSuccess);
        }, 500);
        setTimeout(() => {
          this.setState({ isSuccess: !this.state.isSuccess });
          console.log(this.state.isSuccess);
        }, 3500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Layout title="Profile | Change Password">
        <div className={css.wrapper}>
          <Navbar />
          <Navigasi />
          <div className={css.content}>
            <h1>Change Password</h1>
            <p className={css.text}>
              You must enter your current password and then <br /> type your new password twice.
            </p>
            <div className={css.forms}>
              <div className={`mb-3 ${css["mb-3"]}`}>
                <input className="form-control shadow-none" type="password" placeholder="Current Password" aria-label="default input example" onChange={this.formChange} name="oldPassword" />
                <i className="bi bi-lock"></i>
              </div>
              <div className={`mb-3 ${css["mb-3"]}`}>
                <input className="form-control shadow-none" type="password" placeholder="New Password" aria-label="default input example" onChange={this.formChange} name="newPassword" />
                <i className="bi bi-lock"></i>
              </div>
              <div className={`mb-3 ${css["mb-3"]}`}>
                <input className="form-control shadow-none" type="password" placeholder="Repeat New Password" aria-label="default input example" onChange={this.formChange} name="confirmPassword" />
                <i className="bi bi-lock"></i>
              </div>
            </div>
            <div className={css.button}>
              <button onClick={this.editPassword} className="btn btn-light" disabled={!this.state.isInput}>
                Change Password
              </button>
            </div>
          </div>
          {/* TOAST */}
          <div className={css.toast} hidden={!this.state.isSuccess}>
            <p className={css.toastText}>Update Password Done</p>
          </div>
          <Footer />
        </div>
      </Layout>
    );
  }
}

const mapDispatchToPropps = (dispacth) => {
  return {
    setUsers: bindActionCreators(saveAction, dispacth),
  };
};

const mapStateToProps = (state) => {
  return {
    users: state.auth.userData,
    token: state.auth.token,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToPropps)(index));
