import React from 'react';
import BlogList from './BlogList';
import BlogFilter from './BlogFilter';

const DashboardPage = () => (
    <div>
        <BlogFilter/>
        <BlogList/>
    </div>
)

export default DashboardPage;