import { Component } from "react";
import css from "../../../commons/styles/changepin.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "next/router";
import { saveAction } from "../../../redux/actions/auth";
import PinInput from "react-pin-input";
import { CreatePin } from "../../../modules/Update/Users";

// COMPONENTS
import Navbar from "../../../commons/components/Navbar";
import Navigasi from "../../../commons/components/Navigasi";
import Footer from "../../../commons/components/Footer";
import Layout from "../../../commons/components/Layout";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: 0,
      isInput: false,
      isSuccess: false,
    };
  }

  formChange = (e) => {
    const data = { ...this.state };
    this.setState({ pin: e });
    console.log("LENGTH", e.length);
    this.setState({ isInput: true });
    if (e.length >= 1) {
      this.setState({ isInput: true });
      console.log(this.state.isInput);
    } else {
      this.setState({ isInput: false });
    }
  };

  editPin = () => {
    const token = this.props.token;
    const id = this.props.users.id;
    const pin = this.state;
    CreatePin(pin, id, token)
      .then((res) => {
        console.log(res.data);
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
            <h1>Change PIN</h1>
            <p className={css.text}>
              Enter your current 6 digits Zwallet PIN below to <br />
              continue to the next steps.
            </p>
            <div className={css.inputField}>
              <PinInput length={6} onChange={this.formChange} secret type="numeric" initialValue="" inputMode="number" regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/} autoSelect={true} />
            </div>
            <div className={css.button}>
              <button className="btn btn-light" disabled={!this.state.isInput} onClick={this.editPin}>
                Continue
              </button>
            </div>
          </div>
          <div className={css.toast} hidden={!this.state.isSuccess}>
            <p className={css.toastText}>Change Pin Success</p>
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
