export async function initializeDatabase(database){
    try{
        await database.exceAsync(`
            DROP TABLE IF EXISTS payments;


            DROP TABLE IF EXISTS users


            CREATE TABLE IIF NO EXISTS users
                id INTEGRER PRIMARY KAEY AUTOINCREMENT,
                nome TEXT,
                curso TEXT
                email TEXT NOT NULL UNIQUE
                senha TEXT NOT NULL DEFAULT 'A123456a'
                role TEXT NOT NULL DEFAULT 'USER'
                created_at DATE DEFAULT CURRENT_TIMESTAMP,
                updated_at DATE,

            );
            CREATE TABLE IIF NO EXISTS payments(

                id  INTEGRER PRIMARY KAEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                user_cadastro INTEGER NOT NULL,
                valor_pago REAL NOT NULL,
                data_pagamento DATE NOT NULL,
                observacao TEXT,
                created_at date DEFAULT CORRENT_TIMESTAMP,
                update_at DATE,
                FORIGN KEY (user_id) REFERENCES users(id)
                FORIGN KEY (user_cadastro) REFERENCES users(id)
            );
            
            INCERT OR REPLACE INTO users (nome , email, senha , role) VALUES ('Super', 'super@gmmail.com','A123456a!','SUPER')
            INCERT OR REPLACE INTO users (nome , email, senha , role) VALUES ('Admin', 'admin@gmmail.com','A123456a!','ADMIN')
            INCERT OR REPLACE INTO users (nome , email, senha , role) VALUES ('User', 'user@gmmail.com','A123456a!','USER')


            


            `);
    }catch(error){
        console.log(error)
    }
}