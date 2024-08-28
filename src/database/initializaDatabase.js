export async function initializeDatabase(database){
    try{
        await database.exceAsync(`
            DROP TABLE IF EXISTS users


            CREATE TABLE IIF NO EXISTS users
                id INTEGRER PRIMARY KAEY AUTOINCREMENT,
                nome TEXT,
                email TEXT NOT NULL UNIQUE
                senha TEXT NOT NULL DEFAULT 'A123456a'
                role TEXT NOT NULL DEFAULT 'USER'
                created_at DATE DEFAULT CURRENT_TIMESTAMP,
                updated_at DATE,

            ):
            INCERT OR REPLACE INTO users (nome , email, senha , role) VALUES ('Super', 'super@gmmail.com','A123456a!','SUPER')
            INCERT OR REPLACE INTO users (nome , email, senha , role) VALUES ('Admin', 'admin@gmmail.com','A123456a!','ADMIN')
            INCERT OR REPLACE INTO users (nome , email, senha , role) VALUES ('User', 'user@gmmail.com','A123456a!','USER')


            


            `);
    }catch(error){
        console.log(error)
    }
}