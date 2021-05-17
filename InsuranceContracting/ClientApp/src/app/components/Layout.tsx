import { ReactNode } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Bar from './Bar';
import PermanentDrawer from './PermanentDrawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  }),
);


interface LayoutProps {
  children: NonNullable<ReactNode>,
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }: LayoutProps): JSX.Element => {
  const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Bar />
        <PermanentDrawer />
        <main className={classes.content}>
        <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }

export default Layout;
