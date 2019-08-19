import React, {useState} from 'react';
import {connect} from 'react-redux';
import {startAddUserDetails, startAddUserImage} from '../actions/auth';
export const EditUserDetails = ({user, addUserDetails, addUserImage}) => {

    const [bio, setBio] = useState(user.bio);
    const [website, setWebsite] = useState(user.website);
    const onSubmit = (e) => {
        e.preventDefault();
        const details ={
            bio,
            website
        }
        addUserDetails(details);
    }
    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageChange');
        fileInput.click();
    }

    const onImageChange = (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        console.log(formData);
        formData.append('image', image, image.name);
        addUserImage(formData)
        
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="file" hidden="hidden" name="" id="imageChange" onChange={onImageChange}/>
                <button onClick={handleEditPicture}>change</button>
                <img src={user.imageUrl} alt=""/>
                <h2>{user.name}</h2>
                <h3>{user.userHandle}</h3>
                <label>Bio:</label><textarea  value={bio} onChange={(e) => setBio(e.target.value)}/>
                <label>website:</label><textarea  value={website} onChange={(e) => setWebsite(e.target.value)}/>
                <button>submit</button>    
            </form>
        </div>
    );
}
const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
    addUserDetails: (details) => dispatch(startAddUserDetails(details)),
    addUserImage: (formData) => dispatch(startAddUserImage(formData))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditUserDetails);