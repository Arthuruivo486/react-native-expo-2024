export async function initializeDatabase(database) {
  try {
      await database.execAsync(`
          DROP TABLE IF EXISTS payments;
          DROP TABLE IF EXISTS users;
          DROP INDEX IF EXISTS idx_users_nome;
          DROP INDEX IF EXISTS idx_payments_data_pagamento;

          CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              nome TEXT,
              email TEXT NOT NULL UNIQUE,
              senha TEXT NOT NULL DEFAULT 'A123456!',
              role TEXT NOT NULL DEFAULT 'USER',
              created_at DATE DEFAULT CURRENT_TIMESTAMP,
              updated_at DATE
          );

          CREATE TABLE IF NOT EXISTS payments (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER NOT NULL,
              user_cadastro INTEGER NOT NULL,
              valor_pago REAL NOT NULL,
              data_pagamento DATE NOT NULL,
              observacao TEXT,
              created_at DATE DEFAULT CURRENT_TIMESTAMP,
              updated_at DATE,
              FOREIGN KEY (user_id) REFERENCES users(id),
              FOREIGN KEY (user_cadastro) REFERENCES users(id)
          );

          CREATE INDEX IF NOT EXISTS idx_users_nome ON users (nome);
          CREATE INDEX IF NOT EXISTS idx_payments_data_pagamento ON payments (data_pagamento);

          INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Super', 'super@email.com', 'A123456!', 'SUPER');
          INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Admin', 'admin@email.com', 'A123456!', 'ADMIN');
          INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('User', 'user@email.com', 'A123456!', 'USER');
      `);
  } catch (error) {
      console.log(error);
  }
}
