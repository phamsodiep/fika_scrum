import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


const drawerWidth = 240;

const useAppBarStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingRight: 24,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  }
}));

const useAsideMenuStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  }
}));

const stateToPropsMap = (state) => {
  let prjName = "";
  if (typeof state.projectId !== "number") {
    return {projectName: prjName};
  }
  for (let i = 0; i < state.projects.length; i++) {
    let prj = state.projects[i];
    if (prj.id === state.projectId) {
      prjName = prj.name;
    }
  }
  return {
    projectName: prjName
  };
};

export const ApplicationBar = connect(stateToPropsMap, null)(
  function (props) {
    const classes = useAppBarStyles();
    return (
        <AppBar position="absolute" className={clsx(classes.appBar, props.open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={props.onOpen}
                  className={clsx(classes.menuButton, props.open && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <div>
                    {props.projectName}
                </div>
            </Toolbar>
        </AppBar>
    );
  }
);

export function AsideMenu(props) {
  const classes = useAsideMenuStyles();
  return (
      <aside>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
            }}
            open={props.open}
          >            
              <div className={classes.toolbarIcon}>
                <IconButton onClick={props.onClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              {props.children}
          </Drawer>
      </aside>
  );
}

