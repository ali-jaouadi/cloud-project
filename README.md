### Overview of the application

Our web application offers a seamless platform for football stadium reservations, combining the power of Angular and Node.js. Users can effortlessly create accounts, search for available stadiums, and book reservations. This streamlined process ensures a hassle-free experience for football enthusiasts and stadium managers alike

### Problem Statement
Project cycle times, delivery dates, and code quality are important factors for every company. In some companies, there are difficulties in team management, particularly in the relationship between application development teams (Dev) and IT operations teams (Ops). The primary objective of the administration team is to ensure system stability. The best way to achieve this is by strictly controlling the quality of changes made to the systems they maintain. On the other hand, the development team aims to implement necessary changes at the lowest cost and as quickly as possible. As a result, this separation of tasks between the two types of teams has quickly led to ongoing conflict due to the incompatibility of their respective objectives. This can be illustrated by considering the three constraints of project management: cost, quality, and time

### Proposed Solutions

Our primary objective for this project was to adopt a DevOps culture by applying the best practices of this new software development approach to  projects.This new approach, which seeks to accelerate and automate the various stages of the software lifecycle to ensure software quality and thus increase end-user satisfaction. Additionally, we aim to achieve a better version of the  project by implementing a deployment system. This project encompasses three major areas:

— Continuous Integration.
— Continuous Deployment.
— Notification and Reporting.

### Presentation of tools 

For the setup of different environments and the configuration of CI/CD, we will describe each tool utilized and used in our solution.

##### 1) Git

Git is an open-source version control system. Essentially, it is a tool that allows you to track all the files in your project. Each file modification is detected by Git and versioned into a snapshot. A modification history is available for the project, enabling you to review and even revert changes.
<div style="text-align: center;">
<img src="/pictures/gitgot.png" alt="Description" width="300" height="100">
</div>

##### 2) Jenkins

Jenkins is an open-source continuous integration server based on Java that interfaces with version control systems to execute projects. It is capable of:

— Creating new builds.
— Verifying the proper functioning of the obtained results.
— Automating the evolution process to improve productivity.
— Controlling the execution of tasks and scripts.
— Serving as a dashboard to manage your various automations.
<div style="text-align: center;">
<img src="/pictures/janjoun.png" alt="Description" width="300" height="200">
</div>

##### 3)Docker 

Docker is an opensource software that easily allows you to:

Package an application and its dependencies into an isolated container.
— Run on any server. To understand Docker's internal components, we need to understand the following concepts:
— A Docker image represents the file system, without the processes. It contains everything (Java, a database, a script you will launch, etc. . .).
— Images are created from configuration files named "Dockerfile".
— Dockerfiles are files that allow us to build a Docker tailored to our needs, step by step.
— A container is the execution of an image: it has a copy of the image's file system, as well as the ability to run processes.
— In this container, you can therefore interact with the applications installed in the image, run scripts, and run a server, etc.
<div style="text-align: center;">
<img src="/pictures/dakdouk.png" alt="Description" width="300" height="200">
</div>

##### 4)SonarCloude

SonarCloud is a cloud-based platform that offers static code analysis to identify bugs, vulnerabilities, and code smells in your projects. It provides detailed reports on code quality metrics and integrates seamlessly with your CI/CD pipelines. SonarCloud helps ensure code quality and security throughout the development lifecycle, enabling teams to deliver better software faster.

Using SonarCloud instead of hosting SonarQube locally or in a container provides a managed service with automatic scalability and seamless integration with cloud platforms, simplifying setup and ensuring continuous updates and maintenance.
<div style="text-align: center;">
<img src="/pictures/sonarcloud-1.png" alt="Description" width="300" height="200">
</div>

###  Development environment
##### dockercompose
  In order to test the project, Docker Compose allows running multiple containers as separate services, facilitating integration testing and ensuring seamless communication between components.
  In our project, we have a complete application that includes MongoDB, Angular, and NodeJS. MongoDB handles the backend database, and Nodejs are for server-side rendering, and Angular is for the frontend. Since there are three components, we need to run containers for each of them. We need to run the containers as follows:
— Container 1 — Angular
— Container 2 — NodeJS 
— Container 3 — MongoDB


As the first step to dockerize the  application, we write the Dockerfile to build each of the components.
— Choose the base image.
— Specify the working directory.
— Copy all files into this directory.
— Run the npm command.
— Allocate access to the port (3000 for the backend and 4200 for the frontend).
— Finally, start the application.
please have a look at the dockerfile of [frontend](https://github.com/ali-jaouadi/cloud-project/blob/main/Frontend/Dockerfile) and [backend](https://github.com/ali-jaouadi/cloud-project/blob/main/Backend/Dockerfile) 
With docker-compose, each container will run as a standalone application and can communicate with other containers on the same host, as shown in the figure 

<div style="text-align: center;">
<img src="/pictures/compose.png" alt="Description" width="300" height="200">
</div>

Before running Docker Compose, we need to make some changes to the database connection settings and environment variables for the backend, and ensure that the Angular application is accessible from external hosts.
please have a look at [dbconnection.js](https://github.com/ali-jaouadi/cloud-project/blob/main/Backend/Config/dbConnect.js#L7-L23)  ,  [envirment_variables](https://github.com/ali-jaouadi/cloud-project/blob/main/Backend/.env#L4)    and     [Angular_package.json](https://github.com/ali-jaouadi/cloud-project/blob/main/Frontend/package.json#L6)

 after configuring the application application, now we can create our docker-compose     [    file](https://github.com/ali-jaouadi/cloud-project/blob/main/dockercompose.yml)

- container name: The name of the container that will appear in the list (rather than generating a random name).
- environment: Environment variables to pass to the container.
- ports: Port mapping; it is recommended to enclose them in quotes " to avoid misinterpretation of their value.
- restart: Automatically restart container services.
- volumes: Volumes to create between the host machine and the container.
- build: Whether the image should be built from a Dockerfile.
- depends on: If the container depends on another for its execution.
- networks: Add each container for a service to the default network.

##### SonarCloud
In order to integrate the sonarQube analysis  we have to install the required packages for both side Frontend and Backend, tacking into account that the hole project was created with Nodejs version 14 , by specifying the sonarqube suitble version the analysis should work without issues 
```
npm install sonarqube-scanner@"^3.5.0" --save-dev

```
In sonarCloud we must create an [organization](https://sonarcloud.io/organizations/ali-jaouadi/projects) to host the code and the analysation with a dashbord, also a token must be generated in order to access to the organization 

<div style="text-align: center;">
<img src="/pictures/token.png" alt="Description" width="300" height="200">
</div>

A properties file has been created for both sides 

Please have a look at [properties1](https://github.com/ali-jaouadi/cloud-project/blob/main/Backend/sonar-project.properties) and [properties2](https://github.com/ali-jaouadi/cloud-project/blob/main/Frontend/sonar-project.js)

- sonar.projectKey : Unique identifier for your project in SonarQube.
- sonar.projectName: The name of the project in the SonarQube interface.
- sonar.projectVersion : The version of your project.
- sonar.sources : Directories containing the source code to be analyze
- sonar.sourceEncoding : The encoding of the source files
- sonar.host.url : URL of the SonarQube server.
- sonar.login : Authentication token or login name for the server.
- sonar.organization : Key of the organization in SonarCloud. 

##### Jenkins

- After installing jenkins and its required plugins such as docker and sonar-sanner and extantion mail ..ect, adding credentials for tools like DockerHub, SonarCloud, and the mail extension is essential for authenticating with these external services securely and efficiently 

<img src="/pictures/credentials.png" alt="Description" >


- The suggested Jenkins pipeline script checks out a GitHub repository, verifies the presence of Dockerfiles for frontend and backend, installs dependencies, and runs Sonar analysis. It builds, tags, and pushes Docker images for both frontend and backend to Docker Hub, while exposing the respective ports. Post-build notifications are sent via email based on the build status. The pipeline handles success, failure, unstable, and aborted states, providing detailed logs and build URLs in the email notifications.

Please have a look at the jenkinsFile [here](https://github.com/ali-jaouadi/cloud-project/blob/main/Jenkinsfile)

In bellow the result of exuting the pipeline on jenkins in local machine

<div style="text-align: center;">
<img src="/pictures/jenkinresult.png" alt="Description" width="500" height="400">
</div>


As is clear in the picture, the pipeline was completed successfully. As a result:

- The containers should be running on Docker.
<div style="text-align: center;">
<img src="/pictures/docker-locally.png" alt="Description" width="700" height="400">
</div>

- The images should be sent to Docker Hub.
<div style="text-align: center;">
<img src="/pictures/deply-hub.png" alt="Description" width="800" height="400">
</div>

- A Sonar test should be fulfilled on SonarCloud.
  - the results of backend and frontend are here [(1)](https://sonarcloud.io/project/issues?resolved=false&id=backend_nodejd) [(2)](https://sonarcloud.io/project/issues?resolved=false&id=frontend-side-angular)

<div style="text-align: center;">
<img src="/pictures/sonar-result.png" alt="Description" width="700" height="400">
</div>

- An email should be sent to the specified destination in advance.
<div style="text-align: center;">
<img src="/pictures/mailresult.png" alt="Description" width="700" height="400">
</div>

### Improvements to be made

- Deployment on web server 
- Using Kubernetes for orchestration of containers
- Using tools for monotoring like GRAFANA
- Adding stages for code linting 


