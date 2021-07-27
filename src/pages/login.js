import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import AppIcon from '../icon.png';

import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import themeObject from '../util/theme';


import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

const styles = (themeObject);


class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password:'',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }       
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const {classes, UI: {loading}} =this.props;
        const {errors} =this.state;
        return (
            <div className={classes.mainContainer}>
                <Grid className={classes.loginContainer}>
                <Grid item sm>
                    <img src={AppIcon} alt="App-Logo" className={classes.image} />
                    <Typography variant="h4" className={classes.pageTitle} color="secondary">
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField} variant="outlined" 
                        value={this.state.email} onChange={this.handleChange} fullWidth helperText={errors.email} error={errors.email ? true : false} />
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField} variant="outlined"
                        value={this.state.password} onChange={this.handleChange} fullWidth helperText={errors.password} error={errors.password ? true : false}/>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>{errors.general}</Typography> 
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Login
                            {loading && (
                                <CircularProgress className={classes.progress} size={30} />
                            )}
                        </Button>
                        <br />
                        <small>Don't have an account? <Link to="/singup">Sign Up</Link></small>
                    </form>
                </Grid>
            </Grid>
            </div>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.ui
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
