import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getFamousUsers} from '../actions/blogs';
import FamousCardItem from './FamousCardItem'

export const FamousCard = ({getFamousUser}) => {
    const [users, setUsers] = useState([]);
    useEffect(() =>{
        getFamousUser().then((users)=>{
            setUsers(users)
        })
    },[])
    return(
        <div className="famous-card__body">
            <div className="famous-card__body-heading">Top Bloggers</div>
            {users.length === 0 ? (<p>loading</p>) : (users.map((user) => {
            return <FamousCardItem  key={user.userId} {...user}/>
        }))}
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    getFamousUser: () => dispatch(getFamousUsers())
})
export default connect(undefined, mapDispatchToProps)(FamousCard);