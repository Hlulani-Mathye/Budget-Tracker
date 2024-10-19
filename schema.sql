DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    type TEXT NOT NULL,  -- Added this line
    category TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL
);