import React, { Suspense } from 'react';
// import PickList from '../../uikit/pickList//page';
import RowGroup from '../../uikit/row_group/page';
import { AddWorkflow } from '../../uikit/add_workflow/pages';

const EmptyPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="grid ">
                <div className="col-12">
                    <div className="card flex justify-content-between upload-header-container">
                        <div>
                            <h5>Process Config</h5>
                            <p>View list of created process with their details.</p>
                        </div>
                        <div className="align-self-center">
                            <AddWorkflow />
                        </div>
                    </div>

                    <div className="uploaded-files-container">
                        <RowGroup />
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default EmptyPage;
