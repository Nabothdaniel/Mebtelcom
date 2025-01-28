from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
db = SQLAlchemy(app)

class User(db.Model):
id = db.Column(db.Integer, primary_key=True)
username = db.Column(db.String(80), unique=True, nullable=False)
email = db.Column(db.String(120), unique=True, nullable=False)
data = db.relationship("Data", backref="owner", lazy=True)

class Data(db.Model):
id = db.Column(db.Integer, primary_key=True)
name = db.Column(db.String(120), nullable=False)
description = db.Column(db.Text, nullable=False)
price = db.Column(db.Float, nullable=False)
user_id = db.Column(db.Integer, db.ForeignKey("(link unavailable)"), nullable=False)

@app.route("/")
def index():
data = Data.query.all()
return render_template("index.html", data=data)

@app.route("/buy/<int:data_id>")
def buy(data_id):
data = Data.query.get_or_404(data_id)
# Add payment processing logic here
return render_template("buy.html", data=data)

@app.route("/sell", methods=["GET", "POST"])
def sell():
if request.method == "POST":
data = Data(
name=request.form["name"],
description=request.form["description"],
price=request.form["price"],
user_id=1, # Replace with current user's ID
)
db.session.add(data)
db.session.commit()
return redirect(url_for("index"))
return render_template("sell.html")

if __name__ == "__main__":
app.run(debug=True)

