import { Component } from "react";
import css from "../../../commons/styles/personal.module.css";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import Link from "next/link";

// COMPONENTS
import Navbar from "../../../commons/components/Navbar";
import Navigasi from "../../../commons/components/Navigasi";
import Footer from "../../../commons/components/Footer";
import Layout from "../../../commons/components/Layout";

class index extends Component {
  render() {
    return (
      <Layout title="Profile | Detail">
        <div className={css.wrapper}>
          <Navbar />
          <Navigasi />
          <div className={css.content}>
            <h1>Personal Information</h1>
            <p className={css.text}>
              We got your personal information from the sign <br /> up proccess. If you want to make changes on <br /> your information, contact our support.
            </p>
            <div className={css.cardContainer}>
              <div className={css.card}>
                <p>First Name</p>
                <p>{this.props.users.firstName}</p>
              </div>
              <div className={css.card}>
                <p>Last Name</p>
                <p>{this.props.users.lastName}</p>
              </div>
              <div className={css.card}>
                <p>Verified Email</p>
                <p>{this.props.users.email}</p>
              </div>
              <div className={css.card}>
                <p>Phone Number</p>
                <p>{this.props.users.noTelp !== null ? this.props.users.noTelp : "___"}</p>
                <Link href={this.props.users.noTelp == "" || this.props.users.noTelp == null ? "/profile/add-phone-number" : "/profile/edit-phone-number"}>
                  <a>Manage </a>
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.auth.userData,
    token: state.auth.token,
  };
};

export default withRouter(connect(mapStateToProps)(index));
