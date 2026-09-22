import camelcaseKeys from 'camelcase-keys';

import { User } from '@types';

/** Async function that fetches a list of mock registered users from the json file
 */
export const fetchRegisteredUsers = async () => {
    try {
        const response = await fetch('/mock/users.json');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = (await response.json()) as User[];
        const camelCaseData: User[] = camelcaseKeys(data, {
            deep: true,
        });

        return camelCaseData;
    } catch {}
};
