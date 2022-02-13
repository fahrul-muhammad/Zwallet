import { Component } from "react";
import css from "../../../commons/styles/editPhone.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "next/router";
import { saveAction } from "../../../redux/actions/auth";
import { userPhoneNumber } from "../../../modules/Update/Users";
import { getUserById } from "../../../modules/auth/index";

// COMPONENTS
import Navbar from "../../../commons/components/Navbar";
import Navigasi from "../../../commons/components/Navigasi";
import Footer from "../../../commons/components/Footer";
import Layout from "../../../commons/components/Layout";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccess: false,
    };
  }

  deletPhoneNumber = () => {
    const token = this.props.token;
    const id = this.props.users.id;
    const body = {
      noTelp: "",
    };
    userPhoneNumber(id, body, token)
      .then((res) => {
        console.log(res.data);
        getUserById(id, token)
          .then((result) => {
            console.log(result.data);
            const data = result.data.data;
            this.props.setUsers(data);
            setTimeout(() => {
              this.setState({ isSuccess: !this.state.isSuccess });
              console.log(this.state.isSuccess);
            }, 500);
            setTimeout(() => {
              this.setState({ isSuccess: !this.state.isSuccess });
              console.log(this.state.isSuccess);
              this.props.router.push("/profile");
            }, 3500);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Layout title="Profile | Change pin">
        <div className={css.wrapper}>
          <Navbar />
          <Navigasi />
          <div className={css.content}>
            <h1>Manage Phone Number</h1>
            <p className={css.text}>
              You can only delete the phone number and then <br /> you must add another phone number.
            </p>
            <div className={css.cardContainer}>
              <div className={css.card}>
                <p>Primary</p>
                <p>{this.props.users.noTelp == null ? "___" : `+62 ${this.props.users.noTelp}`}</p>
                <i className="bi bi-trash" onClick={this.deletPhoneNumber}></i>
              </div>
            </div>
          </div>
          <Footer />
        </div>
        <div className={css.toast} hidden={!this.state.isSuccess}>
          <p className={css.toastText}>Delet Phone Number Success</p>
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
