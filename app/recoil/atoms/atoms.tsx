import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// Interface type set
export interface UploadedFile {
    name: string;
    url: string;
    type: string;
    date: string;
}

export interface ApiFile {
    id: string;
    code: string;
    name: string;
    description: string;
    date: string;
    url: string;
    preview: string;
    size: string;
    type: string;
    duration: string;
    format: string;
}

export interface TaskItem {
    code: number;
    process: string;
}

export interface ApiProcessFile {
    id: number;
    workflow_name: string;
    created_date: string;
    created_by: number;
    tasklist: TaskItem[];
}

export interface ApiProcess {
    id: 13;
    name: string;
    work_process: string;
    optional_flag: string;
}

export interface MediaDetails {
    id: number;
    name: string;
    type: string;
    date: string;
    url: string;
}

export interface MetadataDetails {
    audio_bitrate: string;
    audio_check: string;
    audio_codec: string;
    audio_length: string;
    channels: string;
    display_aspect_ratio: string;
    frame_height: number;
    frame_rate: string;
    frame_width: number;
    sample_rate: string;
    video_bit_rate: string;
    video_codec: string;
    video_duration: string;
}

export interface UserDetails {
    name: string;
    status: boolean;
}

export interface Metadata {
    frame_rate: string;
    video_duration: string;
    video_codec: string;
    frame_width: string;
    frame_height: string;
    display_aspect_ratio: string;
    video_bit_rate: string;
    audio_length: string;
    audio_check: string;
    audio_bitrate: string;
    audio_codec: string;
    channels: string;
    sample_rate: string;
}

export interface DialogRes {
    status: boolean;
}

// State Management

export const uploadedFilesState = atom<UploadedFile[]>({
    key: 'uploadedFilesState',
    default: []
});

export const apiFilesState = atom<{ data: ApiFile[] }>({
    key: 'apiFilesState',
    default: { data: [] }
});

export const apiProcessList = atom<{ data: ApiProcessFile[] }>({
    key: 'currentApiProcessList',
    default: { data: [] }
});

export const apiProcessState = atom<{ data: ApiProcess[] }>({
    key: 'currentApiProcess',
    default: { data: [] }
});

export const refreshWorkflowListState = atom({
    key: 'refreshWorkflowListState',
    default: false
});

export const metadataState = atom<Metadata>({
    key: 'metadataState',
    default: {
        frame_rate: '',
        video_duration: '',
        video_codec: '',
        frame_width: '',
        frame_height: '',
        display_aspect_ratio: '',
        video_bit_rate: '',
        audio_length: '',
        audio_check: '',
        audio_bitrate: '',
        audio_codec: '',
        channels: '',
        sample_rate: ''
    }
});

export const dialogResState = atom<boolean>({
    key: 'currentState',
    default: false
});

// Using Recoil-presist - Stores the value in  browser's local storage

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: typeof window !== 'undefined' ? localStorage : undefined
});

export const mediaFileState = atom<{ data: MediaDetails[] }>({
    key: 'uploadedFilesState',
    default: { data: [] },
    effects_UNSTABLE: [persistAtom]
});
