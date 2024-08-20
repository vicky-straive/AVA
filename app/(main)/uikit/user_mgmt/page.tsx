'use client';

import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { InputSwitch } from 'primereact/inputswitch';
import axios from 'axios';
import URLLinks  from '@/app/api/links';


import { CustomerService } from '../../../../demo/service/CustomerService';

const UserManagementTable = () => {
    const { SER_BASE_CONNECTION } = URLLinks;

    const [visible, setVisible] = useState(false);
    const [checked, setChecked] = useState(true);
    const [selectedRowData, setSelectedRowData] = useState<any>(null);
    console.log('selectedRowData', selectedRowData);

    const [customers, setCustomers] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);

    const [selectedCustomers, setSelectedCustomers] = useState<any[]>([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const getSeverity = (status: string) => {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
    };

    const getUserList = async () => {
        try {
            const response = await axios.get(`${SER_BASE_CONNECTION}/getUserList`);
            const userData = response.data;
            console.log('response.data', response.data.data);
            setCustomers(response.data.data);
            // setCustomers(response.data)
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };
    console.log('customers', customers);

    useEffect(() => {
        getUserList();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     CustomerService.getCustomersLarge().then((data) => setCustomers(getCustomers(data)));
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getCustomers = (data: any[]) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);

            return d;
        });
    };

    // const formatDate = (value: Date) => {
    //     return value.toLocaleDateString('en-US', {
    //         day: '2-digit',
    //         month: '2-digit',
    //         year: 'numeric'
    //     });
    // };

    const onGlobalFilterChange = (e: { target: { value: any } }) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
                <h5 className="m-0">Users</h5>
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };

    const representativesItemTemplate = (option: { name: string; image: string }) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" />
                <span>{option.name}</span>
            </div>
        );
    };

    // const dateBodyTemplate = (rowData) => {
    //     return formatDate(rowData.date);
    // };

    // const dateFilterTemplate = (options) => {
    //     return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    // };

    const statusBodyTemplate = (rowData: { status: string }) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    // const statusFilterTemplate = (options) => {
    //     return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
    // };

    const statusItemTemplate = (option: string) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };

    const actionBodyTemplate = (rowData: any) => {
        return <Button icon="pi pi-user-edit" rounded text raised className=" " onClick={() => setSelectedRowData(rowData)} />;
    };

    const header = renderHeader();

    const footerContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Create" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    return (
        <div className="card">
            <DataTable
                value={customers}
                paginator
                header={header}
                rows={10}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]}
                dataKey="id"
                selectionMode="checkbox"
                selection={selectedCustomers}
                onSelectionChange={(e) => setSelectedCustomers(e.value)}
                filters={filters}
                filterDisplay="menu"
                globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
                emptyMessage="No customers found."
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column
                    header="Username"
                    sortable
                    sortField="representative.name"
                    filterField="representative"
                    showFilterMatchModes={false}
                    filterMenuStyle={{ width: '14rem' }}
                    style={{ minWidth: '14rem' }}
                    // body={representativeBodyTemplate}
                    filter
                    field="name"
                    // filterElement={representativeFilterTemplate}
                />
                <Column field="email" header="Email" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                {/* <Column field="status" header="Status" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} /> */}
                {/* <Column field="date" header="Created Date" sortable filterField="date" dataType="date" style={{ minWidth: '12rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} /> */}
                <Column header="Edit" headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
            </DataTable>

            <Dialog header="Edit User" visible={selectedRowData !== null} style={{ width: '50vw' }} onHide={() => setSelectedRowData(null)} footer={footerContent} className="">
                {selectedRowData && (
                    <div className="card flex justify-content-between">
                        <div className="flex flex-column gap-2 w-6 mr-3">
                            <div className="flex flex-column gap-2 mb-2">
                                <label htmlFor="username">Username</label>
                                <InputText value={selectedRowData?.name} id="username" aria-describedby="username-help" />
                            </div>
                            <div className="flex justify-content-start mt-6">
                                <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
                                <p className="ml-4">Is {checked ? 'Active' : 'Inactive'}</p>
                            </div>
                        </div>
                        <div className="flex flex-column gap-2 w-6 ml-3">
                            <div className="flex flex-column gap-2 mb-2">
                                <label htmlFor="username">Email Id</label>
                                <InputText id="username" value={selectedRowData?.email} aria-describedby="username-help" />
                            </div>
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default UserManagementTable;
