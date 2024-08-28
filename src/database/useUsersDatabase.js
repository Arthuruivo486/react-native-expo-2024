import { useSQLiteContext } from "expo-sqlite";

export function useUsersDatabase(){
    const database = useSQLiteContext();

    async function authUser({email,password}) {

        console.log("aythUser email: ", email, "-password");
        try {
            const result =await database.fetFirstAsync(`
                SELECT id, nome, email, role FROM users where email = '$(email)' and senha= '$(password)'
                `)
            return result;
            
        }catch (error){
            console.error("useUsersDatabase authUser error: ", error);
            throw error;
        }
        
    }
    return{
        authUser,
    };
    
    
}