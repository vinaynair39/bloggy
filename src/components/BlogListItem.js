import React from 'react';
import moment from 'moment';
import Link from 'react-router-dom/Link';
import { faHeart, faComment, faShare ,faArrowDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BlogListItem = ({ title, description, createdAt, userHandle, id, blogId, userImage }) => (
    <div className="list-card">
        <div className="list-card__body">
            <div className="list-card__image">
                <img src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201909/liverpool-770x433.png?_k_2Z7c2OGBarV0cZqeg9HlrgrH4yjyw" alt="" />
            </div>
            <div className="list-card__content">
                <Link className="list-card__body-title" to={`/blog/${id || blogId}`}>
                    {title}
                </Link>
                <div className="list-card__body-author">
                    <img src={userImage} alt=""/>
                    <h3>{userHandle}</h3>
                </div>  
                <div>
                    <p className="list-card__content-text">{description.substring(0, 350) + '...'}</p>
                </div>
            </div>
            <div class="list-card__body-date">
                <div>
                    <h5>{moment(createdAt).format("Do")}</h5>
                    <h6>{moment(createdAt).format("MMMM") + " " + moment(createdAt).format("YYYY")}</h6>
                </div>
                <ul>
                    <li><FontAwesomeIcon icon={faHeart}  size="2x"/></li>
                    <li><FontAwesomeIcon icon={faComment}  size="2x"/></li>
                    <li><FontAwesomeIcon icon={faShare} size="2x"/></li>
                </ul>
            </div>
            
            </div>
            <div className="list-card__fab">
                <Link to={`/blog/${id || blogId}`}>
                    <FontAwesomeIcon icon={faArrowDown} color="white" size="3x"/>
                </Link>
            </div>  
        </div>
);

export default BlogListItem;