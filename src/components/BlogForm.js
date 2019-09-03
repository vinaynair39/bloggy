import React, {Component} from 'react';
export default class BlogForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: props.blog ?  props.blog.title : '',
            description: props.blog ? props.blog.description : '',
            error: ''
        }
    }

    onTitleChange = (e) =>{
        const title = e.target.value;
        this.setState(() => ({title}));
    }
    
    onDescriptionChange = (e) =>{
        const description = e.target.value;
        this.setState(() => ({description}));
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.title || !this.state.description) {
          this.setState(() => ({ error: 'Please provide title and content.' }));
        } else {
          this.setState(() => ({ error: '' }));
          this.props.onSubmit({
            title: this.state.title,
            description: this.state.description,
          });
        }
      };
    render(){
        return(
            <form className = "form" action="" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}     
                <input type="text" 
                placeholder='Enter the title here' 
                value={this.state.title}
                onChange={this.onTitleChange}
                />
                <textarea name="" id="" cols="30" rows="10" 
                placeholder='your content' 
                value={this.state.description}
                onChange={this.onDescriptionChange}
                ></textarea>
                <div>
                        <button>Post</button>
                </div>
            </form>
        );
    }
}