import React, {Component} from 'react';
export default class BlogForm extends Component {
    constructor(props){
        super(props);
        this.formData = new FormData();
        this.state = {
            title: props.blog ?  props.blog.title : '',
            description: props.blog ? props.blog.description : '',
            imageUrl: props.blog ? props.blog.imageUrl: '',
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
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageChange');
        fileInput.click();
    }
    onImageChange = (e) => {
        const image = e.target.files[0];
        this.formData.append('image', image, image.name);        
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.title || !this.state.description) {
          this.setState(() => ({ error: 'Please provide title and content.' }));
        } else {
          this.setState(() => ({ error: '' }));
          this.formData.append('title',this.state.title );
          this.formData.append('description',this.state.description)
          this.props.onSubmit(this.formData);
        }
      };
    render(){
        return(
            <div>
                {this.props.blog.imageUrl && <div className="form-image-exist"><img src={this.props.blog.imageUrl} alt='' /></div> }        
                <div className="form-image">
                    <p>{this.props.blog.imageUrl ? 'edit image': "add an image"}</p><input type="file" hidden="hidden" name="" id="imageChange" onChange={this.onImageChange}/>
                    <button className="button-secondary" onClick={this.handleEditPicture}>change</button> 
                </div>
                <form className = "form" action="" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}    
                <input type="text" 
                placeholder='Enter the title here' 
                className="form-title"
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
            </div>
            
        );
    }
}