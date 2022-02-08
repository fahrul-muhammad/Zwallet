import { Component } from "react";
import Navbar from "../../commons/components/Navbar";
import Navigasi from "../../commons/components/Navigasi";
import Layout from "../../commons/components/Layout";
import Footer from "../../commons/components/Footer";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import Default from "../../commons/images/dummy-profile.png";
import Image from "next/image";
import { Transfer } from "../../modules/transaction";
import { Modal } from "react-bootstrap";
import PinInput from "react-pin-input";
import { getUserById } from "../../modules/auth";
import Success from "../../commons/images/success.png";

import css from "../../commons/styles/transferId.module.css";

class TransferId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverId: this.props.router.query.id,
      amount: 0,
      notes: "",
      isShow: false,
      isInput: false,
      isSuccess: true,
      user: [],
    };
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data, () => {
      console.log(this.state);
    });
  };

  userTransfer = () => {
    const token = this.props.token;
    const body = this.state;
    Transfer(body, token)
      .then((res) => {
        console.log(res.data.data);
        this.setState({ isSuccess: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getUser = () => {
    const token = this.props.token;
    const id = this.state.receiverId;
    getUserById(id, token)
      .then((res) => {
        this.setState({ user: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onInput = () => {
    this.setState({ isInput: !this.state.isInput });
  };

  modalTriger = () => {
    this.setState({ isShow: !this.state.isShow });
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    console.log("USER DATA", this.state.user);
    const { user } = this.state;
    return (
      <Layout title="Transfer">
        <div className={css.wrapper}>
          <Navbar />
          <Navigasi />
          <div className={css.content}>
            {this.state.isSuccess == false ? (
              <>
                <p>Transfer Money</p>
                <div className={css.userCard}>
                  <div className={css.cardImage}>
                    <Image src={Default} alt="photo profile" />
                  </div>
                  <p className={css.cardName}>{user.firstName + " " + user.lastName}</p>
                  <p className={css.cardPhone}>{user.noTelp !== null ? user.noTelp : "___"}</p>
                </div>
                {this.state.isInput ? (
                  <>
                    <div className={css["inputdone-card"]}>
                      <p>Amount</p>
                      <p>Rp {this.state.amount}</p>
                    </div>
                    <div className={css["inputdone-card"]}>
                      <p>Balance left</p>
                      <p>Rp {this.props.users.balance - this.state.amount}</p>
                    </div>
                    <div className={css["inputdone-card"]}>
                      <p>Date And Time</p>
                      <p>{}</p>
                    </div>
                    <div className={css["inputdone-card"]}>
                      <p>Notes</p>
                      <p>{this.state.notes}</p>
                    </div>{" "}
                  </>
                ) : (
                  <>
                    <h6>
                      Type the amount you want to transfer and then <br /> press continue to the next steps.
                    </h6>
                    <input className={`form-control ${css.inputAmount} shadow-none`} type="number" name="amount" placeholder="Input Money" aria-label="default input example" onChange={this.formChange}></input>
                    <input className={`form-control ${css.inputText} shadow-none`} type="text" name="notes" placeholder="Add some Notes" aria-label="default input example" onChange={this.formChange}></input>
                  </>
                )}
                <button className="btn btn-light" onClick={!this.state.isInput ? this.onInput : this.modalTriger}>
                  Confirm
                </button>
                <button
                  className="btn btn-light"
                  hidden={!this.state.isInput}
                  onClick={() => {
                    this.modalTriger();
                  }}
                >
                  Confirm
                </button>
                <button className="btn btn-light" hidden={!this.state.isInput} onClick={this.onInput}>
                  Go Back
                </button>
              </>
            ) : (
              <>
                <div className={css.successImage}>
                  <Image src={Success} alt="image success" />
                </div>
                <h1 className={css.successNotif}>Your Transaction is Success</h1>
              </>
            )}
          </div>
          <Footer />
        </div>
        {/* MODAL */}
        <Modal show={this.state.isShow}>
          <Modal.Header>
            <p className={css.enterPin}>Enter Pin To Transfer</p>
            <button type="button" className={`btn-close ${css.btnClose}`} data-bs-dismiss="modal" aria-label="Close" onClick={this.modalTriger}></button>
          </Modal.Header>
          <Modal.Body>
            <p className={css.bodyText}>
              Enter your 6 digits PIN for confirmation to <br /> continue transferring money.{" "}
            </p>
            <PinInput
              length={6}
              onChange={(e) => {
                console.log("ONCHANGE", e);
              }}
              initialValue="number"
              type="numeric"
              inputMode="number"
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              autoSelect={true}
            />
          </Modal.Body>
          <Modal.Footer>
            <button className={`btn btn-light ${css["modal-btn"]}`} onClick={this.userTransfer}>
              Continue
            </button>
          </Modal.Footer>
        </Modal>
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

export default withRouter(connect(mapStateToProps)(TransferId));
