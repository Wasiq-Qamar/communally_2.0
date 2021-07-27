import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import Scream from "../components/Screams/Scream";
import Profile from "../components/profile/Profile";
import ScreamSkeleton from '../util/ScreamSkeleton';

import {connect} from 'react-redux'
import {getScreams} from '../redux/actions/dataActions'
import PropTypes from 'prop-types';

export class home extends Component {
    state = {
        screams: null
    };

    componentDidMount(){
       this.props.getScreams()
    }

    render() {
        const {screams, loading} = this.props.data;
        let recentScreamsMarkup = !loading ? (
            screams.map((scream) => <Scream key={scream.screamId} scream={scream}/>)
        ) : (
            <ScreamSkeleton />
            );
        return (
            <Grid container spacing={10}>
                <Grid item sm={2}></Grid>
                <Grid item sm={6} xs={11}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={3} xs={11}>
                    <Profile/>
                </Grid>
            </Grid>
            
        );
    }
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getScreams})(home);
