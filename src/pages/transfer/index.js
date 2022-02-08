import Navbar from "../../commons/components/Navbar";
import Navigasi from "../../commons/components/Navigasi";
import Layout from "../../commons/components/Layout";
import Footer from "../../commons/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { withRouter } from "next/router";
import { connect } from "react-redux";

import css from "../../commons/styles/transfer.module.css";
import Default from "../../commons/images/dummy-profile.png";
import { getContact, SearchUser } from "../../modules/auth";

import { Component } from "react";
import { icon } from "@fortawesome/fontawesome-svg-core";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      users: [],
      isSearch: false,
      search: "",
      searchResult: [],
    };
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data, () => {
      console.log(this.state);
    });
  };

  Searching = () => {
    const token = this.props.token;
    const key = this.state.search;
    const page = this.state.page;
    SearchUser(page, key, token)
      .then((res) => {
        console.log("SEARCHING USERS", res.data.data);
        this.setState({ searchResult: res.data.data });
        this.setState({ isSearch: !this.state.isSearch });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getAllUser = () => {
    const token = this.props.token;
    const page = this.state.page;
    getContact(token, page)
      .then((res) => {
        console.log(res.data.data);
        this.setState({ users: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  NextPage = () => {
    const page = this.state.page;
    if (this.state.page >= 1) {
      this.setState({ page: page + 1 }, () => {
        console.log(this.state.page);
        this.getAllUser();
      });
    } else if (this.state.isSearch == true) {
      this.Searching();
    } else {
      return;
    }
  };

  PrevPage = () => {
    const page = this.state.page;
    if (this.state.page > 1) {
      this.setState({ page: page - 1 }, () => {
        console.log(this.state.page);
        this.getAllUser();
      });
    } else if (this.state.isSearch == true) {
      this.Searching();
    } else {
      return;
    }
  };

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.Searching();
    }
  };

  componentDidMount() {
    this.getAllUser();
  }

  render() {
    console.log(this.state.searchResult);
    return (
      <Layout title="Transfer">
        <div className={css.wrapper}>
          <Navbar />
          <Navigasi />
          <div className={css.content}>
            <p className={css.title}>Search Receiver</p>
            <div className={css[`mb-3`]}>
              <input className="form-control shadow-none" type="text" placeholder="Search receiver here" aria-label="default input example" name="search" onKeyDown={this._handleKeyDown} onChange={this.formChange} />
              <i className="bi bi-search"></i>
            </div>
            {this.state.isSearch == true && this.state.searchResult.length > 0
              ? this.state.searchResult.map((val) => {
                  return (
                    <Link key={val.id} href={`/transfer/${val.id}`} passHref>
                      <div className={css.userCard}>
                        <div className={css.cardImage}>
                          <Image src={Default} alt="photo profile" />
                        </div>
                        <p className={css.cardName}>{val.firstName + " " + val.lastName}</p>
                        <p className={css.cardPhone}>{val.noTelp !== null ? val.noTelp : "____"}</p>
                      </div>
                    </Link>
                  );
                })
              : null}
            <div className={css.cardContainer}>
              {this.state.isSearch == false && this.state.users.length > 0
                ? this.state.users.map((val) => {
                    return (
                      <Link key={val.id} href={`/transfer/${val.id}`} passHref>
                        <div className={css.userCard}>
                          <div className={css.cardImage}>
                            <Image src={Default} alt="photo profile" />
                          </div>
                          <p className={css.cardName}>{val.firstName + " " + val.lastName}</p>
                          <p className={css.cardPhone}>{val.noTelp !== null ? val.noTelp : "____"}</p>
                        </div>
                      </Link>
                    );
                  })
                : null}
            </div>
            {this.state.users.length > 0 || this.state.searchResult.length > 0 ? (
              <div className={css["button-container"]}>
                <button className="btn btn-light" onClick={this.PrevPage}>
                  Prev
                </button>
                <button className="btn btn-light" onClick={this.NextPage}>
                  Next
                </button>
              </div>
            ) : null}
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
