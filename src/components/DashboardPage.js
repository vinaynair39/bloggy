import React from 'react';
import BlogList from './BlogList';
import BlogFilter from './BlogFilter';
import FamousCard from './FamousCard';
const DashboardPage = () => (

    <div>
        <BlogFilter/>
        <div className="card">
        <div className="blog-card">
            <BlogList/>
        </div>
        <div className="famous-card">
            <FamousCard/>
        </div>
        
    </div>
    </div>
    
)

export default DashboardPage;