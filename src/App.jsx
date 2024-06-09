import Navbar from "./components/Navbar";
import Homepage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound";
import Authentication from "./pages/Authentication";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase/firebaseUtil";
import { setCurrentUser } from "./redux/user/user.actions.js";
import { connect } from "react-redux";
import React from "react";

class App extends React.Component {
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <Router>
        <div className="flex flex-col">
          <Navbar />
          <div className="h-[92vh] overflow-hidden">
            <Routes>
              <Route path={"/"} element={<Homepage />} />
              <Route path={"/signIn"} element={<Authentication />} />
              <Route path={"/not-found"} element={<NotFound />} />
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
