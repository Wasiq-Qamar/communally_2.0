import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import theme from '../../util/theme';
import {logoutUser, uploadImage} from '../../redux/actions/userActions';
import ProfileSkeleton from '../../util/ProfileSkeleton';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ToolTip from '@material-ui/core/ToolTip';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import EditDetails from './EditDetails';

// import styled from 'styled-components';
// const StyledPaper = styled(Paper)`
//     background-color: #dd2c00;
//     color: #fff;
// `;

const styles = {
    paper: {
        padding: 20,
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image' : {
            width: 150,
            height: 150,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span svg': {
                verticalAlign: 'middle',
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer',
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
};

class Profile extends Component {
    handleImageChange = (e) => {
        const image = e.target.files[0];
        const formData =new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const {
            classes, 
            user: {
                credentials: {handle, createdAt, imageUrl, bio, website,location}, 
                loading, 
                authenticated
            }
        } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper} elevation={3}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
                        <ToolTip title="Edit Profile Picture" placement="top">
                            <IconButton onClick={this.handleEditPicture} className="button">
                                <EditIcon color="primary"/>
                            </IconButton>
                        </ToolTip>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="textSecondary" variant="h5" >
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        {location && (
                            <Fragment>
                                <span><LocationOn color="primary" /></span> <span>{location}</span>
                                <hr/>
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <span><LinkIcon color="primary"/></span>
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr/>
                            </Fragment>
                        )}
                        <span><CalendarToday color="primary"/></span> {' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <ToolTip title="Logout" placement="top">
                        <IconButton onClick={this.handleLogout} className={classes.button}>
                            <KeyboardReturn color="primary"/>
                        </IconButton>
                    </ToolTip>
                    <EditDetails/>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please Login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/login">
                        Signup
                    </Button>
                </div>
            </Paper>
        )) : (<ProfileSkeleton/>);


        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionToProps = {
    logoutUser, uploadImage
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired

}

export default connect(mapStateToProps,  mapActionToProps )(withStyles(styles)(Profile));
