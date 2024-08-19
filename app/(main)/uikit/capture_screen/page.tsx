'use client';

import React, { useRef } from 'react';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import axios from 'axios';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { ApiFile, apiFilesState, mediaFileState, dialogResState } from '../../../recoil/atoms/atoms';
import URLLinks from '../../../api/links';

const CaptureScreen = () => {
    const { SER_BASE_CONNECTION } = URLLinks;
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const mediaDetails = useRecoilValue(mediaFileState);
    const toast = useRef(null);
    console.log('testingnow', mediaDetails.data[0]);

    const confirm = (event: React.MouseEvent<HTMLElement>) => {
        if (videoRef.current) {
            videoRef.current.pause();
            confirmPopup({
                target: event.currentTarget,
                message: 'Are you sure you want to proceed?',
                icon: 'pi pi-exclamation-triangle',
                defaultFocus: 'accept',
                accept,
                reject
            });
        }
    };
    const accept = () => {
        if (videoRef.current) {
            const currentTimeInSeconds = videoRef.current.currentTime;
            const minutes = Math.floor(currentTimeInSeconds / 60);
            const seconds = Math.floor(currentTimeInSeconds % 60);
            const milliseconds = Math.floor((currentTimeInSeconds % 1) * 1000);
            const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;

            console.log(formattedTime);
            saveTimestamp(formattedTime);
            // toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'Screenshot saved', life: 3000 });
            videoRef.current.play();
        }
    };

    const reject = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const saveTimestamp = async (formattedTime: string) => {
        try {
            const response = await axios.post(`${SER_BASE_CONNECTION}/addTimestamp`, {
                media_id: mediaDetails.data[0].id,
                timestamp: formattedTime,
                created_by: 1
            });

            console.log('Timestamp saved successfully:', response.data);

            if (toast.current && 'show' in toast.current) {
                (toast.current as { show: (options: any) => void }).show({ severity: 'success', summary: 'Success', detail: 'Timestamp saved', life: 3000 });
            }
        } catch (error) {
            console.error('Error saving timestamp:', error);

            if (toast.current && 'show' in toast.current) {
                (toast.current as { show: (options: any) => void }).show({ severity: 'error', summary: 'Error', detail: 'Failed to save timestamp', life: 3000 });
            }
        }
    };

    return (
        <div className="col-12">
            <Toast ref={toast} />
            <ConfirmPopup />
            <div className="card">
                <div className="grid">
                    <div className="col">
                        <div>
                            <h5>Preview</h5>
                        </div>
                        <div>
                            <video ref={videoRef} height={'auto'} width={'100%'} onMouseEnter={(e) => e.currentTarget.setAttribute('controls', 'controls')} onMouseLeave={(e) => e.currentTarget.removeAttribute('controls')}>
                                <source src={mediaDetails.data[0].url} type={`video/${mediaDetails.data[0].type}`} />
                            </video>
                        </div>
                    </div>
                    <Divider layout="vertical" />
                    <div className="col-4 ">
                        <h5>Choose Workflow</h5>
                        <div className="flex flex-column flex-nowrap gap-8">
                            <div>
                                <div className="flex flex-wrap mt-5 justify-content-center gap-3">
                                    <Button label="Take Screenshot" icon="pi pi-camera" onClick={confirm} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaptureScreen;
