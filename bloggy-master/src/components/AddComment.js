import React, { useState } from 'react';
import {startAddComment} from '../actions/comments';
import {connect} from 'react-redux';
export const AddComment = (props) => {

    const [toggle, setToggle] = useState(false);
    const [comment, setComment] = useState('');

    const onClick = ()=> {
        setToggle(!toggle)
    }

    const onAdd = () => {
        props.addComment(props.id,{comment} )
        onClick();
    }
    
    
    
    return(
        <div>
        <button onClick={onClick}>Add Comment</button>
        {toggle && <><input type="text" value={comment} 
        onChange={(e) => setComment(e.target.value)}
        /><button onClick={onAdd}>Add</button></>}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (id,comment) => dispatch(startAddComment(id,comment)),
})
export default connect(undefined, mapDispatchToProps)(AddComment);