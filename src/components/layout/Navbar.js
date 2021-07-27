import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AppIcon from '../../images/icon.png';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from './Notifications';
import PostScream from '../Screams/PostScream';

const styles = {
    Header : {
        fontWeight: 'bold',
        marginRight: 30
    },
    image : {
        width : '60px',
        padding: 0,
        marginRight: -18
    },
    toolbar : {
        minHeight: 50,
        '& svg':{
            color: '#fff'
        }
    }
}

class Navbar extends Component {
    render() {
        const {classes, authenticated} = this.props;
        return (
            <div>
                <AppBar>
                    <Toolbar className={classes.toolbar}>
                        <img src={AppIcon} alt="App-Logo" className={classes.image} />
                        <Typography variant="h5" color="inherit" className={classes.Header}>ommunally</Typography>
                        {authenticated ? (
                            <Fragment>
                                <PostScream/>
                                <Link to="/"><Tooltip title="Home" placement="top">
                                    <IconButton className="button">
                                        <HomeIcon color="primary"/>
                                    </IconButton>
                                </Tooltip></Link>
                                <Notifications/>
                            </Fragment>
                        ) : (
                            <Fragment>
                                 <Button color="inherit" component={Link} to="/">Home</Button>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                            </Fragment>
                        )}   
                    </Toolbar>
                </AppBar>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
