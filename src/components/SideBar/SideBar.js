import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import cruiseIcon from '../assets/cruise.png';
import portIcon from '../assets/port.png';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';

const harborIconMap = {
  cruise: cruiseIcon,
  port: portIcon
}

const drawerWidth = '25%';

const useStyles = (theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  harborTypeIcon: {
    height: 25,
    width: 25
  },
  harborRow: {
    width: 'inherit',
    margin: 5,
    border: '1px solid #ccc',
    borderRadius: 4
  }
});

class SideBar extends PureComponent {

  render() {
    const { classes, harbors } = this.props;
    const { cruise, port } = harbors;
    const combined = [...(cruise || []), ...(port || [])]
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <FormControl component="fieldset">
            <FormGroup>
              {['Cruise', 'Port'].map(type =>
                <FormControlLabel
                  control={<Switch name={type} color="primary"/>}
                  label={type}
                />
              )}
            </FormGroup>
          </FormControl>
          <Divider />
          <List>
            {combined.map((harbor, index) => (
              <ListItem button key={index} className={classes.harborRow}>
                <ListItemIcon>
                  <img alt="harbor type" className={classes.harborTypeIcon} src={harborIconMap[harbor.type]} />
                </ListItemIcon>
                <ListItemText primary={harbor.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    )
  }
};

SideBar.propTypes = {
  className: PropTypes.string,
};

export default withStyles(useStyles)(SideBar);
