pipeline {
    agent any
    tools {
        nodejs '20.18.0'
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/JavierAVG/TINGESO_lab1_frontend']])
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install' // Installs all project dependencies
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build' // Runs the Vite build script to produce the production-ready build
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t javieravg/mortgage-frontend:latest .'
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dhpswid', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'docker login -u $DOCKER_USER -p $DOCKER_PASSWORD'
                    }
                    sh 'docker push javieravg/mortgage-frontend:latest'
                }
            }
        }
    }
}

