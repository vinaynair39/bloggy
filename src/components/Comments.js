import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {startGetComments} from '../actions/comments'

export const Comments = (props) => {
    const [toggle, setToggle] = useState(false)
    useEffect(() =>{
        props.getComments(props.id);
    },[])
    const onClick = ()=> {
       setToggle(!toggle)
    }
    return(
        <div>
            <button disabled={props.commentCount === 0} onClick={onClick}>{toggle ? 'close comments' : `View all ${props.commentCount === 0  ? '': props.commentCount} comments`}</button>
                {toggle && (
                    <ul>
                    comments:
                        {props.comments.map(comment => {
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

const mapStateToProps = (state, props) => ({
    comments: state.comments
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);