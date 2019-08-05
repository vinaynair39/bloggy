import React, {Component} from 'react';
import moment from 'moment';
import uuid from 'uuid';
export default class BlogForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: props.blog ?  props.blog.title : '',
            content: props.blog ? props.blog.content : '',
            createdAt: props.blog ? props.blog.createdAt:  moment(),
            error: ''
        }
    }

    onTitleChange = (e) =>{
        const title = e.target.value;
        this.setState(() => ({title}));
    }

    
    onContentChange = (e) =>{
        const content = e.target.value;
        this.setState(() => ({content}));
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.title || !this.state.content) {
          this.setState(() => ({ error: 'Please provide title and content.' }));
        } else {
          this.setState(() => ({ error: '' }));
          this.props.onSubmit({
            title: this.state.title,
            content: this.state.content,
            createdAt: this.state.createdAt.valueOf(),
          });
        }
      };
    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form action="" onSubmit={this.onSubmit}>
                    <input type="text" 
                    placeholder='Enter the title here' 
                    value={this.state.title}
                    onChange={this.onTitleChange}
                    />
                    <textarea name="" id="" cols="30" rows="10" 
                    placeholder='your content' 
                    value={this.state.content}
                    onChange={this.onContentChange}
                    ></textarea>
                    <button>Post</button>
                </form>
            </div>
        );
    }
}