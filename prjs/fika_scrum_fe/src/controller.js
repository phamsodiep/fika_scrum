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

        case "LOAD_PRJS_FAIL":
          return Object.assign(
            {},
            state,
            {
              errorMessage: "Load project failure"
            }
          );

        case "LOAD_PRJS_SUCCESS":
          return Object.assign(
            {},
            state,
            {
              projects: action.payload.data
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

    this.previousState = this.store.getState();
    this.unsubscribe = this.store.subscribe(this.onStateChange);
  }

  onStateChange = () => {
    let previousState = this.previousState;
    let state = this.store.getState();
    this.previousState = state;

    if (previousState.user !== state.user) {
      this.loadProjects();
    }
  };

  loadProjects() {
    this.store.dispatch({
      type: "LOAD_PRJS",
      payload: {
        request: {
          method: "GET",
          url: "/projects",
          data: {
            member: this.store.getState().user.id,
            order_by: "user_order",
            slight: true
          }
        }
      }
    });
  }
}

const stateManager = new StateManager();
export default stateManager;

