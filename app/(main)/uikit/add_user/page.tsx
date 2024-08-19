'use client';

import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';

export default function ResponsiveDemo() {
    const [visible, setVisible] = useState(false);
    const [checked, setChecked] = useState(true);

    const toast = useRef<Toast>(null);

    const footerContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Add" icon="pi pi-plus" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    return (
        <div className="flex justify-content-center">
            <Button label="Add User" icon="pi pi-user-plus" onClick={() => setVisible(true)} />
            <Toast ref={toast} />
            <Dialog
                header="Add User"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}
                footer={footerContent}
                className=''
            >
                <div className="card flex justify-content-between">
                    <div className="flex flex-column gap-2 w-5">
                        <div className="flex flex-column gap-2 mb-2">
                            <label htmlFor="username">Username</label>
                            <InputText id="username" aria-describedby="username-help" />
                        </div>
                        <div className="flex justify-content-start mt-6">
                            <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
                            <p className="ml-4">Is { checked ? "Active" : "Inactive" }</p>
                        </div>
                    </div>
                    <div className="flex flex-column gap-2 w-5">
                        <div className="flex flex-column gap-2 mb-2">
                            <label htmlFor="username">Email Id</label>
                            <InputText id="username" aria-describedby="username-help" />
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
