Hello and welcome to the server side of the MaintControl project :)
This file will include everything you need to know in order to develop the server.

This folder includes:
1. Server architcures
2. Installations insturctions
3. Postman Requests

------------------------ Installations ----------------------
1. run in the command line the commands:'npm init' and then 'npm install' in order to install 
all the pacakges of npm we used in the project.

2. In order to upload the docker image to GCP:
a) install google sdk on your computer
b) run the following commands:
  docker build -t maint_control_docker_image .
  docker tag maint_control_docker_image gcr.io/maintcontrol/maint_control_docker_image
  docker push gcr.io/maintcontrol/maint_control_docker_image
c) In the cloud run on the container registery run the latest image

3. In order to send requests to the gcp revision,
use the following url for production: https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app
use the following url for development: https://maint-control-docker-image-dev-2n3aq2y4ja-zf.a.run.app
for example: https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/users/login
for example: https://maint-control-docker-image-dev-2n3aq2y4ja-zf.a.run.app/users/login

4. In order to use env parameters on the GCP, you need to use secret manager on gcp

5. In order to upload files, photos and so on, you need to use buckets on gcp