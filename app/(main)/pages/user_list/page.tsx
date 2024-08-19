import React from 'react';
import UserManagementTable from '../../uikit/user_mgmt/page';
import AddUser from '../../uikit/add_user/page';

const EmptyPage = () => {
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card flex justify-content-between upload-header-container">
                    <div>
                        <h5>Process Config</h5>
                        <p>View list of created process with their details.</p>
                    </div>
                    <div className="align-self-center">
                        <AddUser />
                    </div>
                </div>
                <div>
                    <UserManagementTable />
                </div>
            </div>
        </div>
    );
};

export default EmptyPage;
