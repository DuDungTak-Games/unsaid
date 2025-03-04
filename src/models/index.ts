export interface UserMT {
    collectionId: string;
    collectionName: string;
    id: string;
    created: string;
    updated: string;
    birth: string;
    gender: string;
    email: string;
    device_id: string;
}

export interface UserDT {
    collectionId: string;
    collectionName: string;
    id: string;
    created: string;
    updated: string;
    seq_no: number;
    first_name: string;
    last_name: string;
    region: string;
    region_type: string;
    school_id: string;
    job_type: string;
    company_id: string;
    user_id: string;
}
