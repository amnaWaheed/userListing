import axios from 'axios';
import { User } from './pages/Listing';

interface Props {
    page_number: number
}

export const fetchUsers = async ({ page_number }: Props): Promise<User[]> => {
    try {
        const response = await axios.get(`https://randomuser.me/api/?results=${10}`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
