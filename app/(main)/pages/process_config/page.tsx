import React from 'react';
import RowGroup from '../../uikit/row_group/RowGroup';
import { AddWorkflow } from '../../uikit/add_workflow/AddWorkflow';

const EmptyPage = () => {
    return (
        <div className="grid ">
            <div className="col-12">
                <div className="card flex justify-content-between upload-header-container">
                    <div>
                        <h5>Process Config</h5>
                        <p>View list of created process with their details.</p>
                    </div>
                    <div className="align-self-center">{/* <AddWorkflow /> */}</div>
                </div>

                <div className="uploaded-files-container">{/* <RowGroup /> */}</div>
            </div>
        </div>
    );
};

export default EmptyPage;
