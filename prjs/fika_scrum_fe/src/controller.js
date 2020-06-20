import {createStore, applyMiddleware} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import API_ENDPOINT from './common/conf.js'


class StateManager {
  constructor() {
    const client = axios.create({
      baseURL: API_ENDPOINT,
      responseType: 'json'
    });

    const reducer = (state=0, action) => {
      switch (action.type) {
        case "LOGIN_FAIL":
          return Object.assign(
            {},
            state,
            {
              errorMessage: "Login failure"
            }
          );

        case "LOGIN_SUCCESS":
          return Object.assign(
            {},
            state,
            {
              user: action.payload.data
            }
          );
        default:
          return state;
      }
    };

    this.store = createStore(
      reducer,
      {
        user: null,
        errorMessage: null
      },
      applyMiddleware(
        axiosMiddleware(client)
      )
    );
  }
}

const stateManager = new StateManager();
export default stateManager;

