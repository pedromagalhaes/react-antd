import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {

    // "componentWillMount" is a lifecycle method
    // react calls automatically whenever the component is about to render for the first time
    // is only called once, good place to fetch our component Data

    componentWillMount(){
        this.props.fetchPosts();
    }

    render(){
        return (
            <div>List of blog posts</div>
        );
    }

}

// null because we dont have the state yet
// gives access to this.props.fetchPosts
export default connect (null, { fetchPosts })(PostsIndex);