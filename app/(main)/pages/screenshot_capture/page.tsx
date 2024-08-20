import React from 'react';
import Splitter from '../../uikit/splitter/page';
import ViewMetadata from '../../uikit/metadata/page';
import CaptureScreen from '../../uikit/capture_screen/page';

const page = () => {
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card flex justify-content-between">
                    <div>
                        <h5>Screen Capture</h5>
                        <p>Select parts of the video to screenshot and process.</p>
                    </div>
                </div>
            </div>
            <CaptureScreen />
        </div>
    );
};

export default page;
