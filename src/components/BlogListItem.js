import React from 'react';
import moment from 'moment';
import Link from 'react-router-dom/Link';

export const BlogListItem = ({title, description, createdAt,userHandle, id, blogId}) => (
    <div className="list-body">
    <div className="list-item">
        <Link to={`/blog/${id||blogId}`}>
        <div>
            <h5 className="card-title">
                {title}
            </h5>
            <p className="card-text">{description.substring(0,80) + '...'}</p>
            <p className="card-text">By: {userHandle}</p>
            <p><small class="text-muted">{moment(createdAt).format("Do MMM YYYY")}</small></p>
        </div> 
        </Link>    
        
        
    </div>
    </div>
);

export default BlogListItem;