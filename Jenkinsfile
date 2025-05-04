pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/yourusername/your-repo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install -g @angular/cli'
                sh 'npm install'
            }
        }

        stage('Build Angular') {
            steps {
                sh 'ng build --configuration=production'
            }
        }

        stage('Docker Build & Deploy') {
            steps {
                sh 'docker-compose -f ${DOCKER_COMPOSE} down --remove-orphans || true'
                sh 'docker-compose -f ${DOCKER_COMPOSE} build --no-cache'
                sh 'docker-compose -f ${DOCKER_COMPOSE} up -d'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            slackSend(color: 'good', message: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        failure {
            slackSend(color: 'danger', message: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
    }
}