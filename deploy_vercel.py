import os
import json
import urllib.request
import urllib.error

# Vercel Deployment Script using Vercel REST API v13
# Requires a Vercel Access Token (create one for free at https://vercel.com/account/tokens)

DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def deploy_to_vercel(token):
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }

    # Read standalone HTML file
    with open(os.path.join(DIRECTORY, 'standalone_app.html'), 'r', encoding='utf-8') as f:
        html_content = f.read()

    payload = {
        "name": "skillmatrix-hub",
        "files": [
            {
                "file": "index.html",
                "data": html_content
            }
        ],
        "projectSettings": {
            "framework": None
        }
    }

    req = urllib.request.Request(
        'https://api.vercel.com/v13/deployments',
        data=json.dumps(payload).encode('utf-8'),
        headers=headers,
        method='POST'
    )

    try:
        print("Uploading SkillMatrix to Vercel...")
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode())
            live_url = "https://" + res_data.get('url', '')
            print("=========================================================")
            print("🎉 DEPLOYMENT SUCCESSFUL!")
            print(f"👉 Live Public URL: {live_url}")
            print("=========================================================")
            return live_url
    except urllib.error.HTTPError as e:
        print(f"Deployment failed: HTTP {e.code} - {e.read().decode()}")
        return None

if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1:
        token = sys.argv[1]
    else:
        token = input("Enter your Vercel Access Token (from vercel.com/account/tokens): ").strip()
    
    if token:
        deploy_to_vercel(token)
    else:
        print("No token provided.")
