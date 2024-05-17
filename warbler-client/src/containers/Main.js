import { Routes, Route, redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    }

    return ComponentWithRouterProp;
}

const Main = (props) => {
    const { authUser, errors, removeError } = props;
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Homepage {...props} />} />
                <Route
                    path="/signin"
                    element={
                        <AuthForm
                            errors={errors}
                            removeError={removeError}
                            onAuth={authUser}
                            buttonText="Log in"
                            heading="Welcome back"
                            {...props}
                        />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <AuthForm
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}
                            signUp
                            buttonText="Sign me up"
                            heading="Join Warbler today"
                            {...props}
                        />
                    }
                />
            </Routes>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors,
    };
}

export default withRouter(
    connect(mapStateToProps, { authUser, removeError })(Main)
);
