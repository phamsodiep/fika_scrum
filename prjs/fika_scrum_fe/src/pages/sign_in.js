import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import Copyright from '../common/copyright.js';
import { useStateForInput, inputOnChange } from '../common/utils.js';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function SignIn(props) {
  const classes = useStyles();
  let setters = {};
  let form = {};
  useStateForInput(form, setters, "username", "");
  useStateForInput(form, setters, "password", "");
  useStateForInput(form, setters, "rememberme", "");

  const loginError = props.errorMessage === null ? "" :
    (<Alert severity="warning">{props.errorMessage}</Alert>)

  const onSubmit = function(e) {
    e.preventDefault();
    if (typeof props.onSubmit === "function") {
      delete form["rememberme"];
      form["type"] = "normal";
      props.onSubmit(form);
    }
  };

  const onInput = function(e) {
    inputOnChange(setters, e);
  };

  const isEmptyInput =
    form["username"].length === 0 || form["password"].length === 0;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            value={form.username}
            onChange={onInput}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User name"
            name="username"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={form.password}
            onChange={onInput}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {loginError}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isEmptyInput}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}


const stateToPropsMap = (state) => {
   return {
      errorMessage: state.errorMessage
   };
};

const dispatchToPropsMap = dispatch => {
  return {
    onSubmit: (form) => {
      dispatch({
        type: "LOGIN",
        payload: {
          request: {
            method: "POST",
            url: "/auth",
            data: form
          }
        }
      })
    }
  }
}

export default connect(stateToPropsMap, dispatchToPropsMap)(SignIn);

