import React, { Suspense } from 'react';
import ListDemo from '../../uikit/project_list/ProjectList';

const ProjectPage = () => {
    return (
        // <Suspense fallback={<div>Loading...</div>}>
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Projects</h5>
                    <p>List of all project details will be listed here</p>
                </div>
                {/* <ListDemo /> */}
            </div>
        </div>
        // </Suspense>
    );
};

export default ProjectPage;
