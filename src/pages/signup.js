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
import {signupUser} from '../redux/actions/userActions';

const styles = (themeObject);

class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password:'',
            confirmPassword: '',
            userHandle: '',
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
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signupUser(newUserData, this.props.history);

    };

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const {classes, UI: {loading}} =this.props;
        const {errors} =this.state;
        return (
            <div className={classes.mainContainer}>
                <Grid className={classes.loginContainer}>
                <Grid item sm>
                    <img src={AppIcon} alt="App-Logo" className={classes.sImage} />
                    <Typography variant="h4" className={classes.sPageTitle} color="secondary">
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField} variant="outlined" 
                        value={this.state.email} onChange={this.handleChange} fullWidth helperText={errors.email} error={errors.email ? true : false} />
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField} variant="outlined"
                        value={this.state.password} onChange={this.handleChange} fullWidth helperText={errors.password} error={errors.password ? true : false}/>
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" className={classes.textField} variant="outlined"
                        value={this.state.confirmPassword} onChange={this.handleChange} fullWidth helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false}/>
                        <TextField id="handle" name="handle" type="text" label="Handle" className={classes.textField} variant="outlined"
                        value={this.state.handle} onChange={this.handleChange} fullWidth helperText={errors.handle} error={errors.handle ? true : false}/>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>{errors.general}</Typography> 
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.sButton} disabled={loading}>
                            Signup
                            {loading && (
                                <CircularProgress className={classes.progress} size={30} />
                            )}
                        </Button>
                        <br />
                        <small>Already have an account? <Link to="/login">Login</Link></small>
                    </form>
                </Grid>
            </Grid>
            </div>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.ui
});

export default connect(mapStateToProps, {signupUser})(withStyles(styles)(signup));