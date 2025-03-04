import { UserDT } from '../models/index';
import client from './pocketbase';

export async function getUserDTById(userId: string): Promise<UserDT[]> {
    try {
        const records = await client.collection('user_dt').getFullList({ filter: `user_id = "${userId}"` });
        if (records && records.length > 0) {
            return records.map(record => ({
                collectionId: record.collectionId,
                collectionName: record.collectionName,
                id: record.id,
                created: record.created,
                updated: record.updated,
                seq_no: record.seq_no,
                first_name: record.first_name,
                last_name: record.last_name,
                region: record.region,
                region_type: record.region_type,
                school_id: record.school_id,
                job_type: record.job_type,
                company_id: record.company_id,
                user_id: record.user_id,
            })) as UserDT[];
        }
        return [];
    } catch (error) {
        console.error('Error fetching user:', error);
        return [];
    }
}