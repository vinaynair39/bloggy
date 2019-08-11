import React from 'react';
import moment from 'moment'
import Link from 'react-router-dom/Link'

export const BlogListItem = ({title, description, createdAt,userHandle, id}) => (
    <div>
        <Link to={`/blog/${id}`}>
            <h2>{title}</h2>
        </Link>
        <p>{description.substring(0,80) + '...'}</p>
        <p>By: {userHandle}</p>
        <p>{moment(createdAt).format("Do MMM YYYY")}</p>
    </div>
);

export default BlogListItem;