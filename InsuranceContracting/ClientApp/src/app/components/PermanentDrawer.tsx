import { Link } from 'react-router-dom';
import { Drawer, Divider, List,  ListItem, ListItemText } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
  }),
);

const PermanentDrawer = (): JSX.Element => {
    const classes = useStyles();

    return (
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
            <ListItem button key='home' component={Link} to="/">
              <ListItemText primary='Home'/>
            </ListItem>
            <ListItem button key='contractor' component={Link} to="/contractor">
              <ListItemText primary='Contractor Creation'/>
            </ListItem>
            <ListItem button key='contracting' component={Link} to="/contracting">
              <ListItemText primary='Contracting'/>
            </ListItem>
            <ListItem button key='chain' component={Link} to="/contractingChain">
              <ListItemText primary='Shortest Contracting Chain'/>
            </ListItem>
        </List>
        </Drawer>
    );
};

export default PermanentDrawer;