import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ProjectsDashboard(props) {
  const projs = Array.isArray(props.projects) ? (
    <div>
        {props.projects.map((prj) => (
            <ListItem button>
                <ListItemText primary={prj.name} />
            </ListItem>
        ))}
    </div>
  ) : null;

  return (
    <React.Fragment>
        <List>{projs}</List>
    </React.Fragment>
  );
}

const stateToPropsMap = (state) => {
   return {
      projects: state.projects
   };
};

export default connect(stateToPropsMap, null)(ProjectsDashboard);

