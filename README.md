# 🚀 AWS CI/CD Pipeline -- Dockerized Flask App Deployment

## 📌 Project Overview

This project demonstrates a complete end‑to‑end CI/CD pipeline using AWS
services to automatically build and deploy a Dockerized Flask
application to an EC2 instance.

The pipeline performs:

-   Continuous Integration using AWS CodeBuild
-   Continuous Deployment using AWS CodeDeploy
-   Orchestration using AWS CodePipeline
-   Docker image hosting via Docker Hub
-   Deployment target: Amazon EC2

------------------------------------------------------------------------

## 🏗️ Architecture Flow

GitHub → CodePipeline → CodeBuild → Docker Hub → CodeDeploy → EC2 →
Running Container

------------------------------------------------------------------------

## 🛠️ Tech Stack

-   AWS CodePipeline
-   AWS CodeBuild
-   AWS CodeDeploy
-   Amazon EC2
-   Docker
-   GitHub
-   Flask (Python)

------------------------------------------------------------------------

## 🔁 CI/CD Workflow Explanation

### 1️⃣ Source Stage (GitHub)

-   Code changes pushed to GitHub trigger the pipeline automatically.

### 2️⃣ Build Stage (AWS CodeBuild)

-   Installs dependencies
-   Builds Docker image
-   Logs in to Docker Hub
-   Pushes image to Docker Hub

### 3️⃣ Deployment Stage (AWS CodeDeploy)

-   Downloads source artifact
-   Runs lifecycle hooks:
    -   ApplicationStop
    -   BeforeInstall (Stops existing container)
    -   AfterInstall (Pulls latest image)
    -   ApplicationStart (Runs new container)
-   Application becomes live on EC2

------------------------------------------------------------------------

## 📂 Repository Structure

    .
    ├── appspec.yml
    ├── buildspec.yml
    ├── Dockerfile
    ├── app.py
    ├── requirements.txt
    └── scripts/
        ├── start_container.sh
        └── stop_container.sh

------------------------------------------------------------------------

## 🧠 Key DevOps Concepts Implemented

-   Infrastructure as Code mindset
-   Automated Docker image builds
-   Container lifecycle management
-   IAM role-based permissions
-   Handling deployment failures & debugging
-   Health constraint troubleshooting
-   Port management & container naming best practices

------------------------------------------------------------------------

## 🔐 IAM & Permissions Handling

Pipeline service role was configured with required permissions: -
codedeploy:CreateDeployment - CodeBuild permissions - S3 artifact access

This ensured secure inter-service communication.

------------------------------------------------------------------------

## 🐳 Container Deployment Strategy

Deployment uses: - Fixed container name - Automatic container stop &
removal - Fresh image pull on every deployment - Port 5000 exposure for
Flask app

------------------------------------------------------------------------

## 📺 Live Project Demonstration

A full step-by-step live implementation video is available here:

🔗 **YouTube Demo:**  https://youtu.be/8CYbndwSgUc

This video demonstrates: - Complete setup from scratch - IAM
configuration - Pipeline debugging - Container deployment - Live
application verification

------------------------------------------------------------------------

## 🌍 Live Application Access

After successful deployment:

    http://<EC2-PUBLIC-IP>:5000

------------------------------------------------------------------------

## 🎯 Learning Outcomes

-   Built production-style CI/CD pipeline
-   Debugged real-world IAM and lifecycle errors
-   Understood difference between manual & automated deployments
-   Implemented Docker-based deployment automation
-   Gained hands-on AWS DevOps experience

------------------------------------------------------------------------

## 📬 Author

**Dharanikumar N K**\
Cloud & DevOps Enthusiast

------------------------------------------------------------------------

## ⭐ If You Found This Useful

Feel free to fork, star, or connect!
