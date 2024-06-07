pipeline {
    agent any
    
    environment {
        // setting the invirmont varaiables for the docker hub credential
        DOCKERHUB_CREDENTIALS = credentials('docker-hub')
        DOCKER_IMAGE_NAME1 = 'alijaouadi120235/angular-img'
        DOCKER_IMAGE_NAME2 = 'alijaouadi120235/nodejs-img'
        IMAGE_TAG = 'latest'
    }
    
    stages {
        // this stage for pulling the code from github repository and verifying wether the docker images exist or not
        stage('Checkout') {
            steps {
                // Checkout the repository
                git branch: 'main', url: 'https://github.com/ali-jaouadi/cloud-project.git'
                
                // Change the current directory to the frontend directory
                dir('Frontend') {
                
                    script {
                        def dockerfileExists = fileExists('Dockerfile')
                        if (dockerfileExists) {
                            echo 'Dockerfile of frontend found !'
                        } else {
                            error 'Dockerfile of frontend not found!'
                        }
                    }
                }
                dir('Backend') {
                
                    script {
                        def dockerfileExists = fileExists('Dockerfile')
                        if (dockerfileExists) {
                            echo 'Dockerfile of backend found !'
                        } else {
                            error 'Dockerfile of backend not found!'
                        }
                    }
                }                
            }
        }
        // this stage is for installing dependecies for both sides
                stage('Install Dependencies') {
            steps {
                dir('Frontend') { 
                    bat 'npm install'
                }
                dir('Backend') {
                    bat 'npm install'
                }                
            }
        }
        // stage for runing the sonarqube analysis
        stage('Run Sonar') {
            steps {
                dir('Frontend') {
                    bat 'npm run sonar'
                }
                dir('Backend') { 
                    bat 'npm run sonar'
                }                
            }
        }
        // stage to build the docker images 
        stage('Build Docker Image for frontend') {
            steps {
              
                script {
                    // Build the Docker image
                    docker.build("${DOCKER_IMAGE_NAME1}:${IMAGE_TAG}", 'Frontend')
                
            }
        }
        }
       
        stage('Expose Port for frontend image') {
            steps {
                script {
                    // Expose port 4200
                    docker.image("${DOCKER_IMAGE_NAME1}:${IMAGE_TAG}").run("-p 4200:4200")
                }
            }
        }
   
        stage('Push Docker Frontend Image') {
              steps {
              // Push the Docker image to Docker Hub
               script {
             docker.withRegistry('https://index.docker.io/v1/', 'docker-hub') {
                docker.image(env.DOCKER_IMAGE_NAME1).push(IMAGE_TAG)
                             }
                }
    }
                }
                
                //  start of docker image for nodejs
                        stage('Build Docker Image for backend') {
            steps {
              
                script {
                    // Build the Docker image
                    docker.build("${DOCKER_IMAGE_NAME2}:${IMAGE_TAG}", 'Backend')
                
            }
        }
        }
       
        stage('Expose Port for backend image') {
            steps {
                script {
                    // Expose port 4200
                    docker.image("${DOCKER_IMAGE_NAME2}:${IMAGE_TAG}").run("-p 3000:3000")
                }
            }
        }
   
        stage('Push backend docker image') {
              steps {
              // Push the Docker image to Docker Hub
               script {
             docker.withRegistry('https://index.docker.io/v1/', 'docker-hub') {
                docker.image(env.DOCKER_IMAGE_NAME2).push(IMAGE_TAG)
                             }
                }
    }
                }
                // end of nodejs docker image
                
                
                


   }
    // the post section will trigger the stages result and carry out one of the following conditions
       post {
        success {
            echo 'Build and tests succeeded!'
            emailext(
                attachLog: true,
                subject: "SUCCESS: Jenkins Build ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <p>Great news! The build <b>${env.JOB_NAME}</b> #${env.BUILD_NUMBER} has succeeded.</p>
                    <p>Details: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                """,
                to: 'jawadiali97@gmail.com',
                mimeType: 'text/html'
            )
        }
        failure {
            echo 'Build failed!'
            emailext(
                attachLog: true,
                subject: "FAILURE: Jenkins Build ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <p>Unfortunately, the build <b>${env.JOB_NAME}</b> #${env.BUILD_NUMBER} has failed.</p>
                    <p>Details: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                """,
                to: 'jawadiali97@gmail.com',
                mimeType: 'text/html'
            )
        }
        unstable {
            echo 'Build is unstable!'
            emailext(
                attachLog: true,
                subject: "UNSTABLE: Jenkins Build ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <p>The build <b>${env.JOB_NAME}</b> #${env.BUILD_NUMBER} is unstable.</p>
                    <p>Details: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                """,
                to: 'jawadiali97@gmail.com',
                mimeType: 'text/html'
            )
        }
        aborted {
            echo 'Build was aborted!'
            emailext(
                attachLog: true,
                subject: "ABORTED: Jenkins Build ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <p>The build <b>${env.JOB_NAME}</b> #${env.BUILD_NUMBER} was aborted.</p>
                    <p>Details: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                """,
                to: 'jawadiali97@gmail.com',
                mimeType: 'text/html'
            )
        }
        changed {
            echo 'Build result has changed!'
            emailext(
                attachLog: true,
                subject: "CHANGED: Jenkins Build ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <p>The build result of <b>${env.JOB_NAME}</b> #${env.BUILD_NUMBER} has changed from the previous run.</p>
                    <p>Details: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                """,
                to: 'jawadiali97@gmail.com',
                mimeType: 'text/html'
            )
        }
    }
    
}
