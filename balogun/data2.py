from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/services')
def services():
    return "Services page under construction!"

@app.route('/plans')
def plans():
    return "Plans page under construction!"

@app.route('/about')
def about():
    return "About page under construction!"

@app.route('/contact')
def contact():
    return "Contact page under construction!"

if __name__ == '__main__':
    app.run(debug=True)
