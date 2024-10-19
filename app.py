from flask import Flask, render_template, request, redirect, url_for, flash
import sqlite3
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a random secret key

def get_db_connection():
    conn = sqlite3.connect('budget.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    transactions = conn.execute('SELECT * FROM transactions ORDER BY date DESC').fetchall()
    
    # Calculate total income and expenses
    income = conn.execute('SELECT SUM(amount) FROM transactions WHERE type = "income"').fetchone()[0] or 0
    expenses = conn.execute('SELECT SUM(amount) FROM transactions WHERE type = "expense"').fetchone()[0] or 0
    
    # Calculate balance
    balance = income - expenses
    
    # Determine message based on balance
    if balance > 0:
        message = f"You're doing great! You have a positive balance of ${balance:.2f}."
    elif balance < 0:
        message = f"Watch out! You're overspending. Your balance is ${balance:.2f}."
    else:
        message = "Your income and expenses are balanced."
    
    conn.close()
    return render_template('index.html', transactions=transactions, balance=balance, message=message)

@app.route('/add', methods=['GET', 'POST'])
def add_transaction():
    if request.method == 'POST':
        amount = float(request.form['amount'])
        type = request.form['type']
        category = request.form['category']
        description = request.form['description']
        date = datetime.strptime(request.form['date'], '%Y-%m-%d')
        
        conn = get_db_connection()
        conn.execute('INSERT INTO transactions (amount, type, category, description, date) VALUES (?, ?, ?, ?, ?)',
                     (amount, type, category, description, date))
        conn.commit()
        conn.close()
        flash('Transaction added successfully!')
        return redirect(url_for('index'))
    
    return render_template('add_transaction.html')

@app.route('/reports')
def reports():
    conn = get_db_connection()
    category_totals = conn.execute('''
        SELECT category, SUM(amount) as total
        FROM transactions
        GROUP BY category
        ORDER BY total DESC
    ''').fetchall()
    conn.close()
    return render_template('reports.html', category_totals=category_totals)

if __name__ == '__main__':
    app.run(debug=True)