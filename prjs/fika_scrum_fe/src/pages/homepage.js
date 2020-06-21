import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ProjectsDashboard from './projects_dashboard.js';
import UserStoriesPage from './user_stories_page.js';
import { ApplicationBar, AsideMenu } from './homepagecomponents.js';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}));

export default function HomePage(props) {
  const mainContainerStyle = {
    paddingTop: "70px"
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
        <div className={classes.root}>
            <CssBaseline />
            <ApplicationBar open={open} onOpen={handleDrawerOpen} />
            <AsideMenu open={open} onClose={handleDrawerClose}>
                <Divider />
                <Link to="/">Projects</Link> <br />
                <Link to="/uss">User stories</Link>

                <Divider />
                List2
            </AsideMenu>
            <main>
                <div style={mainContainerStyle}>
                    <Switch>
                        <Route path="/uss" component={UserStoriesPage} />
                        <Route path="/" component={ProjectsDashboard} />
                    </Switch>
                </div>
            </main>
        </div>
    </Router>
  );
}

