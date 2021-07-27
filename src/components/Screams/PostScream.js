import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import themeObject from '../../util/theme';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ToolTip from '@material-ui/core/ToolTip'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import {postScream, clearErrors} from '../../redux/actions/dataActions';

const styles = (themeObject) ;

class PostScream extends Component {
    state = {
        open:false,
        body: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps){
        if (nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        };
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body:''});
            this.setState({open:false, errors:{}})
        }
    }

    handleOpen = () => {
        this.setState({open:true})
    }
    handleClose = () => {
        this.props.clearErrors();
        this.setState({open:false, errors:{}})
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.postScream({body: this.state.body});
    }

    render() {
        const {errors} = this.state;
        const {classes, UI: {loading}} = this.props;
        return (
            <Fragment>
                <ToolTip title="Post a Scream!" placement="top">
                    <IconButton onClick={this.handleOpen}>
                        <AddIcon color="primary"/>
                    </IconButton>
                </ToolTip>
                
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <ToolTip title="Close" placement="top">
                        <IconButton onClick={this.handleClose} className={classes.closeButton}>
                            <CloseIcon />
                        </IconButton>
                    </ToolTip>
                    <DialogTitle> Post a Scream </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField 
                                name="body"
                                type="text"
                                label="Scream!"
                                multiline
                                rows="3"
                                placeholder="Let's Scream! It's theraputic"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary" 
                                className={classes.submitButton} disabled={loading} >
                                    Submit
                                    {loading && (
                                        <CircularProgress size={30} className={classes.progressSpinner}/>
                                    )}
                            </Button>

                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.ui
})

export default connect(mapStateToProps, {postScream, clearErrors})(withStyles(styles)(PostScream));
