import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {loginGoogleUser, loginUser} from '../../actions/authActions'
import 'react-dates/lib/css/_datepicker.css'
import TextFieldGroup from "../common/TextFieldGroup";
import {Link} from "react-router-dom";
import Modal from "react-modal";
import GoogleLogin from 'react-google-login';
import {convertGoogleToken} from "../../actions/googleAuthActions";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '0',
        transform: 'translate(-50%, -50%)'
    }
};

class Landing extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            modalIsOpen: false,
            errors: {}
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this)
        this.googleLogin = this.googleLogin.bind(this)
    }

    changeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps.errors);
        console.log(this.props.auth);
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
        if (nextProps) {
            this.setState({errors: nextProps.errors})
        }
    }


    openModal() {
        this.setState({modalIsOpen: true})
    }

    googleLogin(data) {
        this.props.loginGoogleUser(data);
    }
    afterOpenModal() {

    }

    closeModal() {
        this.setState({modalIsOpen: false});
        window.location.href = '/dashboard'
    }


    onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log({data:userData});
        this.props.loginUser(userData);
    }

    isOutsideRange = () => false;

    render() {
         const responseGoogleSuccess = response => {
    console.log(response);
            if (response.profileObj) {
              localStorage.setItem("google_avatar_url", response.profileObj.imageUrl);
              localStorage.setItem("google_name", response.profileObj.name);
              localStorage.setItem("email", response.profileObj.email);
            }
            console.log({ursl: response.profileObj.imageUrl})
            this.props.convertGoogleToken(response.Zi.access_token,  response.profileObj.imageUrl);
          };
          const responseGoogleFailure = response => {
            console.log(response);
            alert('This error might occur if you are not logged in from your bits account, ' +
              'please recheck that you are logged in to bits account')
          };

        const {errors} = this.state;
        return (
            <div className="login landing " style={{maxHeight: '100%'}}>
                <div className="dark-overlay">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-light">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4" style={{color: 'white'}}>Department of CSIS</h1>
                                <p className="lead" style={{color: 'white'}}>
                                    {' '}
                                    Sign in to access account
                                </p>
                                <hr/>
                            </div>
                            <div className="col-md-6 text-center">

                                <form noValidate onSubmit={this.onSubmit}>
                                    <TextFieldGroup placeholder="Email Address" error={errors.email}
                                                    type="text" onChange={this.changeHandler} value={this.state.email}
                                                    name="email"
                                    />
                                    <TextFieldGroup placeholder="Password" error={errors.password}
                                                    type="password" onChange={this.changeHandler}
                                                    value={this.state.password} name="password"
                                    />
                                    <div className="col-md-12 d-flex justify-content-center text-center">
                                        <div className='col-md-6'>
                                            <input style={{maxWidth: '250px'}} value='Login' type="submit"
                                                   className="btn btn-info btn-block mt-4"/>
                                        </div>
                                        <div className='col-md-6'>
                                            <button onClick={this.openModal}
                                                  className='btn btn-info btn-block mt-4'>
                                                Register</button>
                                        </  div>
                                    </div>
                                    <hr/>
                                </form>
                                <hr/>
                                <GoogleLogin
                                    clientId="373821760819-n464h5ipe9u121o98tqbd5973q4m1djg.apps.googleusercontent.com"
                                    buttonText="LOGIN WITH GOOGLE"
                                    onSuccess={responseGoogleSuccess}
                                    onFailure={responseGoogleFailure}
                                  />

                            </div>
                        </div>
                        {/*<button onClick={this.googleLogin}>Log In with Gmail</button>*/}
                        {/*<a href={`http://127.0.0.1:8000/accounts/google/login`}>Log In with Gmail</a>*/}

                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Register"

                    shouldCloseOnEsc={false}
                    ariaHideApp={false}
                >{<div className='d-flex justify-content-center'>
                    {/*<ForgotPassword/>*/}
                    <div>
                        <button onClick={this.closeModal} className='btn btn-sm'
                                style={{color: 'white', background: 'red'}}>
                            <i className="fas fa-times"/></button>
                        <p>Don't have an account yet?,
                                        create one by selecting your quota</p>
                        <div className="col-md-12 d-flex justify-content-center text-center">
                                        <Link to="/registerFaculty" className="btn btn-lg btn-info mr-2"
                                              style={{marginRight:'10px'}}>
                                            <img src={require("../../img/landingIcons/professor.png")} alt=""/>
                                            <h6 style={{fontStyle: 'inherit'}}>Faculty</h6>
                                        </Link>
                                        <Link to="/registerHod" className="btn btn-lg btn-info mr-2"
                                             style={{marginRight:'10px', marginLeft:'10px'}}>
                                            <img src={require("../../img/landingIcons/hod.png")} alt=""/>
                                            <h6 style={{fontStyle: 'inherit'}}>HOD</h6>
                                        </Link>
                                        <Link to="/registerAdmin" className="btn btn-lg btn-info mr-2"
                                             style={{marginLeft:'10px'}}>
                                            <img src={require("../../img/landingIcons/admin.png")} alt=""/>
                                            <h6 style={{fontStyle: 'inherit'}}>Admin</h6>
                                        </Link>
                        </div>
                    </div>
                </div>}</Modal>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    loginGoogleUser: PropTypes.func.isRequired,
    convertGoogleToken: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser, loginGoogleUser, convertGoogleToken})(Landing);
