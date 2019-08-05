import React from 'react';
import BlogForm from './BlogForm'
import {connect} from 'react-redux';
import {startEditBlog} from '../actions/blogs'
import {startRemoveBlog} from '../actions/blogs';


export class EditBlogPage extends React.Component {

    onSubmit = (blog) => {
        this.props.editBlog(this.props.blog.id, blog);
    }

    removeBlog = () => {
        this.props.removeBlog(this.props.blog.id);
    }
    render(){
        return(
            <div>
                <button onClick={this.removeBlog}>Remove</button>
                <BlogForm onSubmit = {this.onSubmit}
                blog={this.props.blog}/>
                
            </div>
        )
    }
}



const mapStateToProps = (state, props) => {
    return {
        blog: state.blogs.find((blog) => blog.id === props.match.params.id)
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        editBlog: (id,blog) => dispatch(startEditBlog(id ,blog)),
        removeBlog: (id) => dispatch(startRemoveBlog(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditBlogPage);