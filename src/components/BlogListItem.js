import React from 'react';
import moment from 'moment';
import Link from 'react-router-dom/Link';
import { faHeart, faComment, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BlogListItem = ({ title, description, createdAt, userHandle, id, blogId }) => (
    <div className="list-card">
        <div class="list-card__body-date">
                <span class="day">{moment(createdAt).format("Do")}</span>
                <span class="month">{moment(createdAt).format("MM")}</span>
                <span class="year">{moment(createdAt).format("YYYY")}</span>
        </div>
        <div className="list-card__body">
            <div className="list-card__image">
                <img src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201909/liverpool-770x433.png?_k_2Z7c2OGBarV0cZqeg9HlrgrH4yjyw" alt="" />
            </div>
            <div className="list-card__content">
                <h3 className="list-card__body-author">{userHandle}</h3>
                <Link className="list-card__body-title" to={`/blog/${id || blogId}`}>
                    {title}
                </Link>
                <div>
                    <p className="card-text">{description.substring(0, 80) + '...'}</p>
                </div>
            </div>
        </div>
    </div>

);

export default BlogListItem;