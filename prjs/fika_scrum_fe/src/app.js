import React from 'react';
import { connect } from 'react-redux';
import SignIn from './pages/sign_in.js';
import HomePage from './pages/homepage.js';


const stateToPropsMap = (state) => {
   return {
      isLoggedIn: state.user !== null
   };
};

class App extends React.Component {
  render() {
    return this.props.isLoggedIn ? <HomePage /> : <SignIn />;
  }
}

export default connect(stateToPropsMap, null)(App);

