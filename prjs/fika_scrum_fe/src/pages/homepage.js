import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import { ApplicationBar, AsideMenu } from './homepagecomponents.js';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}));

export default function HomePage(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
        <CssBaseline />
        <ApplicationBar open={open} onOpen={handleDrawerOpen} />
        <AsideMenu open={open} onClose={handleDrawerClose}>
            <Divider />
            List1

            <Divider />
            List2
        </AsideMenu>
    </div>
  );
}

