import React, { Component } from "react";

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: "",
            profileImageUrl: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const authType = this.props.signUp ? "signup" : "signin";
        this.props.onAuth(authType, this.state).then(() => {
            console.log("Logged in succesfully");
        });
    }

    render() {
        const { email, password, username, profileImageUrl } = this.state;
        const { buttonText, heading, signUp, errors } = this.props;
        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {/* {errors.message && (
                                <div className="alert alert-danger">
                                    {errors.message}
                                </div>
                            )} */}
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                onChange={this.handleChange}
                                value={email}
                                className="form-control"
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={this.handleChange}
                                className="form-control"
                            />

                            {signUp && (
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        onChange={this.handleChange}
                                        value={username}
                                        className="form-control"
                                    />
                                    <label htmlFor="image-url">
                                        Image URL:{" "}
                                    </label>
                                    <input
                                        type="text"
                                        id="image-url"
                                        name="profileImageUrl"
                                        onChange={this.handleChange}
                                        value={profileImageUrl}
                                        className="form-control"
                                    />
                                </div>
                            )}
                            <button
                                type="submit"
                                className="btn btn-primary btn-block btn-lg"
                            >
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthForm;
