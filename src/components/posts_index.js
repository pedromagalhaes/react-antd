import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {

    // "componentWillMount" is a lifecycle method
    // react calls automatically whenever the component is about to render for the first time
    // is only called once, good place to fetch our component Data
    componentWillMount(){
        this.props.fetchPosts(); // action creator
    }

    // render list posts
    renderPosts(){
        return this.props.posts.map((post) => {
            return(
                <li className="list-group-item" key={post.id}>
                    <Link to={"posts/"+post.id}>
                        <span className="pull-xs-right">{post.categories}</span>
                        <strong>{post.title}</strong>
                    </Link>
                </li>
            );
        });
    }

    render(){
        return (
            <div>
                <div className="text-xs-right">
                    <Link to="/post/new" className="btn btn-primary">Add a post</Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }

}

function mapStateToProps(state){
    return { posts: state.posts.all }
}

// null because we don't have the state yet
// gives access to this.props.fetchPosts
export default connect ( mapStateToProps, { fetchPosts }) (PostsIndex);