import React, {useState} from 'react';
import {connect} from 'react-redux';
import {startAddUserDetails, startAddUserImage} from '../actions/auth';
export const EditUserDetails = ({user, addUserDetails, addUserImage}) => {

    const [bio, setBio] = useState(user.bio);
    const [website, setWebsite] = useState(user.website);
    const [imageUrl, setImageUrl] = useState(user.imageUrl)
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
        console.log(image);
        formData.append('image', image, image.name);
        addUserImage(formData).then(data => setImageUrl(data))
        
    }
    return(
        <div className="edit-user">
            <div className="edit-user__image">
                <img src={imageUrl || user.imageUrl} alt=""/>   
                <input type="file" hidden="hidden" name="" id="imageChange" onChange={onImageChange}/>
                <button className="button-secondary" onClick={handleEditPicture}>change</button>
            </div>
            <div className="edit-user__contents">
                <form onSubmit={onSubmit}>
                    <div>
                        <h2>{user.name}</h2>
                        <h3>{user.userHandle}</h3>
                    </div>
                    <div className="edit-user__contents-data">
                        <div>
                            <label>Bio:</label><textarea cols="30" rows="1" value={bio || user.bio} onChange={(e) => setBio(e.target.value)}/>
                        </div>
                        <div>
                            <label>website:</label><textarea cols="30" rows="1"  value={website || user.website} onChange={(e) => setWebsite(e.target.value)}/>
                        </div>
                    </div>
                    
                    <button type="submit">submit</button>    
                </form>
            </div>
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