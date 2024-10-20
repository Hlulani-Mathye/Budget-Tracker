# Personal Budget Tracker

This is a simple web-based personal budget tracking application built with Flask and SQLite.

## Setup and Running the Application

1. Clone the repository:
   ```
   git clone <repository-url>
   cd personal-budget-tracker
   ```

2. Create and activate a virtual environment:
   ```
   Windows use `venv\Scripts\activate`
   ```

3. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Initialize the database:
   ```
   python -c "import sqlite3; sqlite3.connect('budget.db').executescript(open('schema.sql').read())"
   ```

5. Run the Flask application:
   ```
   python app.py
   ```

6. Open a web browser and navigate to `http://127.0.0.1:5000` to use the application.

## Why use Python to initialize the database?

We use the Python command to initialize the database instead of directly using the `sqlite3` command for several reasons:

1. **Cross-platform compatibility**: The Python command works on all operating systems where Python is installed, while the `sqlite3` command might not be available or might require additional setup on some systems.

2. **Consistency**: By using Python, we ensure that the same Python environment that runs our application is used to create the database, avoiding potential version mismatches.

3. **Simplicity**: This method doesn't require users to have SQLite installed separately or added to their system PATH.

4. **Error handling**: Python can provide more informative error messages if something goes wrong during database initialization.

The command works as follows:
- It imports the `sqlite3` module
- Creates a connection to 'budget.db' (or creates the file if it doesn't exist)
- Reads the contents of 'schema.sql'
- Executes the SQL commands in 'schema.sql' to set up the database structure

This approach ensures that your database is set up correctly and consistently across different environments.

## Usage

- Use the "Add Transaction" page to record your income and expenses.
- View your recent transactions and current balance on the home page.
- Check the "Reports" page for a summary of your spending by category.

Remember to stop the application by pressing CTRL+C in the terminal when you're done.
