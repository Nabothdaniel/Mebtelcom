import os
import time
from datetime import datetime

# GitHub repo details
REPO_PATH = "C:/path/to/your/repo"  # Change this to your repo path
COMMIT_MESSAGE = "Automated commit: " + datetime.now().strftime("%Y-%m-%d %H:%M:%S")
BRANCH = "main"  # Change if using a different branch

def push_to_github():
    try:
        os.chdir(REPO_PATH)  # Navigate to the repo
        os.system("git add .")  # Stage all changes
        os.system(f'git commit -m "{COMMIT_MESSAGE}"')  # Commit with timestamp
        os.system(f"git push origin {BRANCH}")  # Push to GitHub
        print(f"✅ Code pushed successfully at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    while True:
        push_to_github()
        print("⏳ Waiting for 10 minutes...")
        time.sleep(600)  # Wait 600 seconds (10 minutes)
