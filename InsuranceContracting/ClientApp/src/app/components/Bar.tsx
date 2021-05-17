import { AppBar, Toolbar, Link, makeStyles } from '@material-ui/core';
import Logosrc from '../images/logo.png';

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - 240px)`,
      marginLeft: 240,
  },
}));

const Bar = (): JSX.Element => {
  const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <Link href={'http://www.apexa.ca/'} rel="noreferrer" target="_blank" >
              <img alt='logo' src={Logosrc} />
            </Link>
          </Toolbar>
        </AppBar>
    );
}

export default Bar;
