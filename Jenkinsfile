pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "gonjeshops"
        APP_NAME = "vendor-frontend" 
        IMAGE_TAG = "${BUILD_NUMBER}"
        IMAGE_NAME = "${DOCKERHUB_USERNAME}/${APP_NAME}"
        REGISTRY_CREDS = 'dockerhub'
    }

    tools {

        nodejs "nodejs" // name in "" should be similar to the name used for installer in the global tool configuration.

    }  

    stages {
        stage('Clean up workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout SCM') {
            steps {
                git credentialsId: 'github', url: 'https://github.com/gonjeshops/vendor-frontend.git', branch: 'cicd'
            }
        }


        // stage('Build App') {
        //     steps {
        //         script {
        //             // Change directory to your Node.js application's directory
        //             dir('./') {
        //                 // Install dependencies and build the application
        //                 sh 'yarn'  
        //                 // Add any additional build steps if necessary
        //             }
        //         }
        //     }
        // }

        stage('Build Image') {
            steps {
                script {
                    // Build Docker image
                    dockerImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    // Push Docker image to the registry
                    docker.withRegistry('', REGISTRY_CREDS) {
                        dockerImage.push("${IMAGE_TAG}")
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Remove Images') {
            steps {
                // Remove local Docker images
                sh "docker rmi ${IMAGE_NAME}:${IMAGE_TAG}"
                sh "docker rmi ${IMAGE_NAME}:latest"
            }
        }

        stage('Cleanup github repo on Jenkins Server') {
            steps {
                // Clean up files on the Jenkins server
                sh 'rm -rf ./*'
            }
        }
    }
}
