import { addDatabaseChangeListener, useSQLiteContext } from "expo-sqlite";

export function useUsersDatabase() {
    const database = useSQLiteContext();

    async function authUser({ email, password }) {
        try {
            const result = await database.getFirstAsync(`
                SELECT id, nome, email, role FROM users WHERE email='${email}' and senha='${password}'
            `);
            return result;

        } catch (error) {
            console.error("useUsersDatabase authUser error: ", error);
            throw error;
        }
    }

    async function getAllUser(){
        try{
            const result = await database.getAllAsync(`
                SELECT id, role FROM users
            `);
            return result;
        }catch(error) {
            console.error("useUserDatabase getAllUsers error: ", error)
            throw error;
        }

    }

    return {
        authUser,getAllUser,
    };
}