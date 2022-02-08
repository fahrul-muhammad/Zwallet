import Navbar from "../../commons/components/Navbar";
import Navigasi from "../../commons/components/Navigasi";
import Footer from "../../commons/components/Footer";
import Layout from "../../commons/components/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction, saveAction } from "../../Redux/actions/auth";
import { withRouter } from "next/router";

import css from "../../commons/styles/profile.module.css";
import Image from "next/image";
import ProfilePic from "../../commons/images/dummy-profile.png";

import React, { Component } from "react";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
    };
    this.inputFile = React.createRef();
  }

  fileChange = (event) => {
    const file = event.target.files[0];
    const data = { ...this.state };
    if (file) {
      data.image = file;
      this.setState(data);
    }
    event.preventDefault();
  };

  _setData = () => {
    const forms = new FormData();
    if (this.state.image !== "") {
      forms.append("image", this.state.image);
    }
    return forms;
  };

  render() {
    const profilepic = `${process.env.NEXT_PUBLIC_HOST}/uploads/${this.props.users.image}`;
    const { router } = this.props;
    return (
      <Layout title="Profile">
        <div className={css["wrapper"]}>
          <Navbar />
          <Navigasi />
          <div className={css.content}>
            <div className={css.profilepic}>
              <input type="file" hidden />
              <Image src={ProfilePic} alt="profile picture" />
            </div>
            <div className={css.button}>
              <button className={`btn btn-light `}>
                <i className="bi bi-pencil-fill" />
                Edit
              </button>
            </div>
            <p className={css.name}>{`${this.props.users.firstName} ${this.props.users.lastName}`}</p>
            <p className={css.phone}>{this.props.users.noTelp !== null ? this.props.users.noTelp : "---"}</p>
            <div className={css.cardDetail}>
              <p>Personal Information</p>
              <i className="bi bi-arrow-right-short" />
            </div>
            <div className={css.cardDetail}>
              <p>Change Password</p>
              <i className="bi bi-arrow-right-short" />
            </div>
            <div
              className={css.cardDetail}
              onClick={() => {
                router.push("/createpin");
              }}
            >
              <p>Change Pin</p>
              <i className="bi bi-arrow-right-short" />
            </div>
            <div className={css.cardDetail}>
              <p>Logout</p>
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
