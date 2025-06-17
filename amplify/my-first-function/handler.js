import { v4 as uuidv4 } from 'uuid';

export const handler = async () => {
    const id = uuidv4();
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Generated UUID: ${id}` }),
    };
};
