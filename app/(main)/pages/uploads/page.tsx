import React, { Suspense } from 'react';
import FileListCards from '../../uikit/cards/page';
import UploadFiles from '../../uikit/uploadFiles/page';

const Uploads = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            ß
            <div className="grid ">
                <div className="col-12">
                    <div className="card flex justify-content-between">
                        <div>
                            <h5>Uploads</h5>
                            <p>List of all files uploaded</p>
                        </div>
                        <div className="align-self-center">
                            <UploadFiles />
                        </div>
                    </div>
                </div>

                <div className="col-12 uploaded-files-container">
                    <FileListCards />
                </div>
            </div>
        </Suspense>
    );
};

export default Uploads;
