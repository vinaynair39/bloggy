import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {startGetComments} from '../actions/comments'
import AddComment from './AddComment'

export const Comments = ({comments,getComments, id}) => {
    const [toggle, setToggle] = useState(false);
    // const [comments, setComments] = useState(props.comments);
    useEffect(() =>{
        getComments(id);
    },[])
    const onClick = ()=> {
       setToggle(!toggle)
    }
    return(
        <div>
            <AddComment id={id}/>
            <button disabled={comments.length === 0} onClick={onClick}>{toggle ? 'close comments' : `View all ${comments.length === 0  ? '': comments.length} comments`}</button>
                
                {toggle && (
                    <ul>
                    comments:
                        {comments.map(comment => {
                        return <li>{comment.userHandle}:{comment.body}</li>
                        })}
                    </ul>
                )
                }
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getComments: (blogId) => dispatch(startGetComments(blogId)),
    
});

const mapStateToProps = (state) => ({
    comments: state.comments
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);