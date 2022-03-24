import Navbar from "../../commons/components/Navbar";
import Navigasi from "../../commons/components/Navigasi";
import Footer from "../../commons/components/Footer";
import Layout from "../../commons/components/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { loginAction, saveAction } from "../../Redux/actions/auth";
import { loginAction, saveAction } from "../../redux/actions/auth";
import { withRouter } from "next/router";

import css from "../../commons/styles/profile.module.css";
import Image from "next/image";
// import Default from "../../commons/images/dummy-profile.png";
import Default from "../../commons/images/dummy-profile.png";
import { updateUserProfileImage } from "../../modules/Update/Users";
import { getUserById } from "../../modules/auth";

import React, { Component } from "react";
import Loading from "../../commons/components/Loading";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      isError: false,
      error: false,
      loaded: false,
      image_src: null,
      use_src: false,
      isSuccess: false,
      loading: false,
    };
    this.inputFile = React.createRef();
    this.onError = this.onError.bind(this);
  }

  onError() {
    this.setState({
      isError: true,
    });
  }

  handleFile = (event) => {
    this.inputFile.current.click();
    event.preventDefault();
  };

  fileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const data = { ...this.state };
    if (file) {
      data.image = file;
      this.setState(data);
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({ image_src: reader.result, use_src: true }, () => {
          console.log(this.state);
        });
      };

      reader.readAsDataURL(file);
    }
  };

  _setData = () => {
    const forms = new FormData();
    if (this.state.image !== "") {
      forms.append("image", this.state.image);
    }
    return forms;
  };

  onImageError = () => {
    this.setState({ error: true });
  };

  onImageLoaded = () => {
    this.setState({ loaded: true });
  };

  updateImageUser = async () => {
    try {
      const forms = this._setData();
      this.setState({ loading: true });
      console.log("FORMS", forms);
      const result = await updateUserProfileImage(this.props.users.id, forms, this.props.token);
      const userData = await getUserById(this.props.users.id, this.props.token);
      this.props.setUsers(userData.data.data);
      console.log("USER DATA COMPLETE", userData);
      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({ isSuccess: !this.state.isSuccess });
      }, 500);
      setTimeout(() => {
        this.setState({ isSuccess: !this.state.isSuccess });
      }, 3500);
      console.log(result.data);
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  };

  render() {
    const myImage = `${process.env.NEXT_PUBLIC_IMAGE}${this.props.users.image}`;
    const imgSrc = !this.state.error ? `${process.env.NEXT_PUBLIC_IMAGE}${this.props.users.image}` : Default;
    const { router } = this.props;
    return (
      <>
        {this.state.loading ? (
          <Loading />
        ) : (
          <Layout title="Profile">
            <div className={css["wrapper"]}>
              <Navbar />
              <Navigasi />
              <div className={css.content}>
                <div className={css.profilepic}>
                  <input type="file" hidden ref={this.inputFile} onChange={this.fileChange} />
                  <Image
                    src={this.props.users.image !== null ? (this.state.image_src !== null ? this.state.image_src : imgSrc) : Default}
                    height={80}
                    onError={this.onImageError}
                    onLoad={this.onImageLoaded}
                    blurDataURL={Default}
                    onClick={this.handleFile}
                    width={80}
                    alt="profile picture"
                  />
                </div>
                <div className={css.button}>
                  <button
                    onClick={() => {
                      this.updateImageUser();
                    }}
                    className={`btn btn-light `}
                  >
                    <i className="bi bi-pencil-fill" />
                    Edit
                  </button>
                </div>
                <p className={css.name}>{`${this.props.users.firstName} ${this.props.users.lastName}`}</p>
                <p className={css.phone}>{this.props.users.noTelp !== null ? this.props.users.noTelp : "---"}</p>
                <div
                  className={css.cardDetail}
                  onClick={() => {
                    this.props.router.push("/profile/detail");
                  }}
                >
                  <p>Personal Information</p>
                  <i className="bi bi-arrow-right-short" />
                </div>
                <div
                  className={css.cardDetail}
                  onClick={() => {
                    router.push("/profile/change-password");
                  }}
                >
                  <p>Change Password</p>
                  <i className="bi bi-arrow-right-short" />
                </div>
                <div
                  className={css.cardDetail}
                  onClick={() => {
                    router.push("/profile/change-pin");
                  }}
                >
                  <p>Change Pin</p>
                  <i className="bi bi-arrow-right-short" />
                </div>
                <div className={css.cardDetail}>
                  <p>Logout</p>
                </div>
              </div>
              {/* TOAST */}
              <div className={css.toast} hidden={!this.state.isSuccess}>
                <p className={css.toastText}>Update Profile Picture Success</p>
              </div>
              <Footer />
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
