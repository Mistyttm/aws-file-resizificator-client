# AWS File Resizificator Client
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com) 

The front end for the file resizificator application

<img src="https://github.com/Mistyttm/aws-cloud-video-converter/assets/51770769/194e62b6-7588-41a9-87b0-66ebeab01998" alt="Image of the File Resizificator home page" width="1000" height="auto">

## Installation

To install this on your AWS server, run an EC2 instance and install docker. then run

`docker create -p 80:8080 --restart always cab432team1/cloud-project:latest`

## Building
### Linux & MacOS
This application was built with the BunJS runtime in mind, but it can be easily swapped out for npm/node. To build and run the server locally follow these steps:
 1. Clone this [repo](https://github.com/Mistyttm/aws-file-resizificator-client)
 2. Clone the [server application](https://github.com/Mistyttm/aws-file-resizificator-server)
 3. Inside the server repo run `bun i`
    1. Inside the server repo run `bun compile`. A new dist folder should appear with the server compiled.
 4. Inside the client repo, run `bun i`
    1. Run `bun run build`
    2. Copy the output files into `aws-file-resizificator-server/dist/front-end/`
 5. Run `bun start`

### Windows
The Windows process requires access to a working WSL environment with bun installed. The steps are then the same as above.
