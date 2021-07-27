import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button'; 
import Dialog from '@material-ui/core/Dialog'; 
import DialogTitle from '@material-ui/core/DialogTitle'; 
import DialogActions from '@material-ui/core/DialogActions'; 
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import ToolTip from '@material-ui/core/ToolTip'
import IconButton from '@material-ui/core/IconButton'


import {connect} from 'react-redux'
import {deleteScream} from '../../redux/actions/dataActions';

const styles = {
    deleteButton : {
        position: 'absolute',
        left: '94%',
        top: '-1%'
    }
}

class DeleteScream extends Component {
    state = {
        open : false
    };

    handleOpen = () => {
        this.setState({open:true})
    }
    handleClose = () => {
        this.setState({open:false})
    }

    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({open:false});
    }
    render() {
        const {classes} = this.props;

        return (
           <Fragment>
               <ToolTip title="Delete Scream" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.deleteButton}>
                        <DeleteOutline color="primary"/>
                    </IconButton>
                </ToolTip>

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>
                         Sure about deleting the scream ?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">Cancel</Button>
                        <Button onClick={this.deleteScream} color="primary">Delete</Button>
                    </DialogActions>
                </Dialog>
           </Fragment>
        )
    }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired 
}

export default connect(null, {deleteScream})(withStyles(styles)(DeleteScream));
