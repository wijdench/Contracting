import { useEffect } from 'react';
import {Fade, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    contract: {
        textAlign: 'right',
    },
    title:{
        color:  '#3fa0cb',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '8rem',
        fontWeight: 100,
        height: '100vh',
        marginTop: -(theme.mixins.toolbar.minHeight || 0),
        paddingTop: theme.mixins.toolbar.minHeight,
    }
}));

let firstTime: true | undefined = true;
const SHORT_DURATION = 1000;
const LONG_DURATION = 2000;
const SHORT_TIME = 500;

const calculStyle = (index: number) => (firstTime && { transitionDelay: `${index * SHORT_TIME}ms`});

const HomeContainer = (): JSX.Element => {
    const classes = useStyles();

    useEffect(() => {
        firstTime = undefined;
    }, []);

    const shortTimeout = firstTime && { enter: SHORT_DURATION };
    const longTimeout = firstTime && { enter: LONG_DURATION };


    return (
        <Typography className={classes.title} variant='h1'>
            <Fade in style={calculStyle(0)} timeout={shortTimeout}><span>Welcome To</span></Fade>
            <Fade in style={calculStyle(1)} timeout={longTimeout}><span>Life and Health</span></Fade>
            <Fade in style={calculStyle(2)} timeout={longTimeout}><span className={classes.contract}>Insurance</span></Fade>
            <Fade in style={calculStyle(3)} timeout={longTimeout}><span  className={classes.contract}>Contracting Platform</span></Fade>
        </Typography>
    );
};

export default HomeContainer;