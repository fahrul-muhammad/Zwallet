import { Component } from "react";
import css from "../../../commons/styles/addPhoneNumber.module.css";
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
import { userPhoneNumber } from "../../../modules/Update/Users";
import { getUserById } from "../../../modules/auth/index";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noTelp: "",
      isInput: false,
    };
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data);
    console.log(data);
    this.setState({ isInput: true });
    if (data.noTelp == "") {
      this.setState({ isInput: false });
    }
  };

  AddPhoneNumber = () => {
    const body = {
      noTelp: this.state.noTelp,
    };
    const token = this.props.token;
    const id = this.props.users.id;
    userPhoneNumber(id, body, token)
      .then((res) => {
        console.log("CHANGE PHONE NUMBER", res.data.data);
        getUserById(id, token)
          .then((result) => {
            const data = result.data.data;
            this.props.setUsers(data);
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
      <Layout title="Profile | Manage Phone Number">
        <div className={css.wrapper}>
          <Navbar />
          <Navigasi />
          <div className={css.content}>
            <h1>Add Phone Number</h1>
            <p className={css.text}>
              Add at least one phone number for the transfer <br /> ID so you can start transfering your money to <br /> another user.
            </p>
            <div className={css.input}>
              <i className="bi bi-telephone"></i>
              <input className="form-control shadow-none" type="text" placeholder="+62 Enter your phone number" name="noTelp" onChange={this.formChange}></input>
            </div>
            <div className={css.button}>
              <button disabled={!this.state.isInput} className="btn btn-light" onClick={this.AddPhoneNumber}>
                Add phone number
              </button>
            </div>
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
