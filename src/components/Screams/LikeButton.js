import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/ToolTip';
// REdux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.screamId
      )
    )
      return true;
    else return false;
  };
  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      
        <ToolTip title="Like" placement="top">
          <Link to="/login">
            <IconButton>
              <FavoriteBorder color="primary"/>
            </IconButton>
            </Link>
          </ToolTip>
     
    ) : this.likedScream() ? (
      <ToolTip title="Unike" placement="top">
      <IconButton onClick={this.unlikeScream}>
        <FavoriteIcon color="primary"/>
      </IconButton>
    </ToolTip>
    ) : (
      <ToolTip title="Like" placement="top">
      <IconButton onClick={this.likeScream}>
        <FavoriteBorder color="primary"/>
      </IconButton>
    </ToolTip>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeScream,
  unlikeScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);