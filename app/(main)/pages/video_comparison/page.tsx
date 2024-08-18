import React, { Suspense } from 'react';
import Splitter from '../../uikit/splitter/page';
import ViewMetadata from '../../uikit/metadata/page';

const page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="grid">
                <div className="col-12">
                    <div className="card flex justify-content-between">
                        <div>
                            <h5>Video Comparison</h5>
                            <p>Compare and contrast with the original media and processed media.</p>
                        </div>
                        <div className="align-self-center">
                            <ViewMetadata />
                        </div>
                    </div>
                </div>
                <Splitter />
            </div>
        </Suspense>
    );
};

export default page;
