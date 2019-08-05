import React from 'react';
import moment from 'moment'
import Link from 'react-router-dom/Link'

export const BlogListItem = ({title, content, createdAt, id}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h2>{title}</h2>
        </Link>
        <p>{content}</p>
        <p>{moment(createdAt).format("Do MMM YYYY")}</p>
    </div>
);

export default BlogListItem;