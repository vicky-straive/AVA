import React, { Suspense } from 'react';

function DisplayScreen() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="grid">
                <div className="col-12">
                    <div className="card"></div>
                </div>
            </div>
        </Suspense>
    );
}

export default DisplayScreen;
