import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {

    // "componentWillMount" is a lifecycle method
    // react calls automatically whenever the component is about to render for the first time
    // is only called once, good place to fetch our component Data

    componentWillMount(){
        this.props.fetchPosts();
    }

    render(){
        return (
            <div>
                <div className="text-xs-right">
                    <Link to="/post/new" className="btn btn-primary">
                        Add a post
                    </Link>
                </div>
                List of blog posts
            </div>
        );
    }

}

// null because we dont have the state yet
// gives access to this.props.fetchPosts
export default connect ( null, { fetchPosts }) (PostsIndex);