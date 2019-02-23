
import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles }from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'

const styles = {
    root: {
        flexGrow: 1,
    },
};

function Header(props) {
    const { classes, title } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        {title}
                        {/*<Button><Link to="/" style={{color:"white"}}>Run</Link></Button>*/}
                        {/*<Button><Link to="/history" style={{color:"white"}}>History</Link></Button>*/}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
