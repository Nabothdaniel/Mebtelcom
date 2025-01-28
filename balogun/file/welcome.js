// JavaScript for Dashboard Functionality

// Mock Data (For example purposes, replace with actual API or backend logic)
let accountBalance = 30;
let referralBonus = 5;
let totalReferrals = 2;

// Function to update displayed balance
function updateBalanceDisplay() {
  const balanceDisplay = document.querySelector(".account-card .balance");
  balanceDisplay.textContent = `₦${accountBalance}`;
}

// Handle button clicks in the footer
document.querySelectorAll(".footer button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const buttonText = event.target.textContent;

    switch (buttonText) {
      case "Balance":
        alert(`Your current balance is ₦${accountBalance}`);
        break;
      case "Referral Bonus":
        alert(`You have earned ₦${referralBonus} as referral bonus.`);
        break;
      case "My Total Referral":
        alert(`You have ${totalReferrals} referrals.`);
        break;
      case "Message Us":
        alert("Redirecting to messaging support...");
        // Example: Redirect to WhatsApp or a contact page
        window.location.href = "https://wa.me/1234567890";
        break;
    }
  });
});

// Add functionality for action cards
document.querySelectorAll(".action-card").forEach((card) => {
  card.addEventListener("click", () => {
    const actionText = card.textContent.trim();

    if (actionText.includes("Transactions")) {
      alert("View your transactions here.");
    } else if (actionText.includes("Data Transactions")) {
      alert("View your data transactions here.");
    } else if (actionText.includes("Wallet Summary")) {
      alert("Your wallet summary is being loaded.");
    } else if (actionText.includes("Upgrade to Affiliate")) {
      const confirmation = confirm(
        "Upgrade to Affiliate for ₦10,000. Do you want to proceed?"
      );
      if (confirmation) {
        alert("Upgrade successful!");
        accountBalance -= 10000; // Deduct from balance
        updateBalanceDisplay();
      }
    } else if (actionText.includes("Upgrade to TopUser")) {
      const confirmation = confirm(
        "Upgrade to TopUser for ₦2,000. Do you want to proceed?"
      );
      if (confirmation) {
        alert("Upgrade successful!");
        accountBalance -= 2000; // Deduct from balance
        updateBalanceDisplay();
      }
    }
  });
});

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  updateBalanceDisplay();
});
