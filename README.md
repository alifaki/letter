docker-compose down
docker-compose build --no-cache frontend
docker-compose up -d

sudo cat /var/lib/jenkins/secrets/initialAdminPassword
171cd0c310024c13a51ff0606193232b->d
http://zictia.kist.ac.tz:9080/
1. Install Required Plugins
Go to Dashboard → Manage Jenkins → Manage Plugins → Available Plugins.

Search and install:

Git

Docker

Docker Pipeline

NodeJS (for Angular CLI)

GitHub Integration (if using GitHub)

Click Install without restart.
2. Configure Global Tools
   Go to Dashboard → Manage Jenkins → Tools.

NodeJS Installation:

Name: NodeJS-latest

Check Install automatically

Version: 20.x (or your Angular 17+ compatible version)
3.  Create a New Pipeline Job
    New Item → Enter name (e.g., angular-auto-deploy) → Select Pipeline → OK.

Pipeline Configuration:

Definition: Pipeline script from SCM

SCM: Git

Repository URL: https://github.com/yourusername/your-repo.git

Credentials: Add if private repo

Branches: */main (or your branch)

Script Path: Jenkinsfile (create this file in your repo root)

4.Create Jenkinsfile in Your Repo
5. Set Up GitHub Webhook (Auto-Trigger)
   Go to your GitHub repo → Settings → Webhooks → Add webhook.

Configure:

Payload URL: http://<jenkins-ip>:8080/github-webhook/

Content type: application/json

Events: Just the push event

Click Add webhook.
6. Configure Jenkins Security
   Go to Dashboard → Manage Jenkins → Security.

Under GitHub Webhooks, check:

Anonymous read access

Allow POST requests from hooks

7. Grant Docker Permissions to Jenkins
   sudo usermod -aG docker jenkins
   sudo systemctl restart jenkins
8. Test the Pipeline
   git add .
   git commit -m "Trigger Jenkins build"
   git push origin main