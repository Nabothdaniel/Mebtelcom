from flask import Flask, render_template, request, jsonify, redirect, url_for

app = Flask(__name__)

# Mock data (In real-world scenarios, use a database)
user_data = {
    "username": "bamisco_connect",
    "package": "Smart Earner",
    "account_status": "Verified",
    "balance": 30,
    "referral_bonus": 5,
    "total_referrals": 2,
}

# Route for the main dashboard
@app.route("/")
def dashboard():
    return render_template("index.html", user=user_data)

# API endpoint to get the current balance
@app.route("/api/balance", methods=["GET"])
def get_balance():
    return jsonify({"balance": user_data["balance"]})

# API endpoint to update balance (e.g., for upgrades)
@app.route("/api/update_balance", methods=["POST"])
def update_balance():
    data = request.json
    deduction = data.get("deduction", 0)
    if user_data["balance"] >= deduction:
        user_data["balance"] -= deduction
        return jsonify({"success": True, "balance": user_data["balance"]})
    return jsonify({"success": False, "message": "Insufficient balance"})

# API endpoint to get referral data
@app.route("/api/referrals", methods=["GET"])
def get_referrals():
    return jsonify({
        "referral_bonus": user_data["referral_bonus"],
        "total_referrals": user_data["total_referrals"],
    })

# Route to handle upgrade actions
@app.route("/upgrade/<string:package>")
def upgrade_package(package):
    if package == "affiliate" and user_data["balance"] >= 10000:
        user_data["balance"] -= 10000
        return redirect(url_for("dashboard"))
    elif package == "topuser" and user_data["balance"] >= 2000:
        user_data["balance"] -= 2000
        return redirect(url_for("dashboard"))
    return "Insufficient balance for upgrade", 400

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
