import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ProjectsDashboard(props) {
  const onSelect = (e, prj) => {
    props.onSelect(prj.id);
  };

  const projs = Array.isArray(props.projects) ? (
    <div>
        {props.projects.map((prj) => (
            <ListItem button onClick={(e) => onSelect(e, prj)}>
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

function selectProject(prjId) {
  return {
    type: "SELECT_PRJ",
    value: prjId
  };
}

const stateToPropsMap = (state) => {
  return {
    projects: state.projects
  };
};

const dispatchToPropsMap = dispatch => {
  return {
    onSelect: (prjId) => {
      dispatch(selectProject(prjId))
    }
  }
};

export default connect(stateToPropsMap, dispatchToPropsMap)(ProjectsDashboard);

