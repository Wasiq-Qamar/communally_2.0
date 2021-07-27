import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import DeleteScream from './DeleteScream'
import LikeButton from './LikeButton'
import ScreamDialog from './ScreamDialog'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/ToolTip';
import ChatIcon from '@material-ui/icons/Chat';



const style = {
    card : {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image : {
        minWidth: 200,
    },
    content : {
        padding: 25,
        objectFit: 'cover',
    }
}

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime);
        const {classes, scream: {screamId, userHandle, body, userImage, likeCount, commentCount, createdAt}, user:{authenticated, credentials: {handle}}} = this.props;
        
        

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}/>
        ) : null

        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile Image" className={classes.image}  />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary"> {dayjs(createdAt).fromNow()} </Typography>
                    <Typography variant="body1"> {body} </Typography>

                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} Likes</span>
                    <ToolTip title="Comments" placement="top">
                        <IconButton >
                            <ChatIcon color="primary"/>
                        </IconButton>
                    </ToolTip>
                    <span>{commentCount} comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} /> 
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user,
})


export default connect(mapStateToProps)(withStyles(style)(Scream));
