# Kuprik

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

For running this application you need to have [NodeJs](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/).
We recommend to use [NVM](https://github.com/creationix/nvm) for managing NodeJs versions
For NVM installation please refer to [manual](https://github.com/creationix/nvm#install--update-script)

## Branching strategy

### 1. Creating a new release branch

For a new feature create a branch based on the latest release point of the master branch (tagged with "release/\*"), and name it after the ID of the related Trello card, like this: `feature/TR-[CardId]` eg. `feature/TR-WZRRpWpf` where the related Trello card's URL is https://trello.com/c/WZRRpWpf

### 2. Deploying the new feature to staging

Once you're done with the development, create a PR against the `dev` branch.

Make sure you check _Delete source branch when merge request is accepted._ and _Squash commits when merge request is accepted._ options.

After it's merged, the current state of the `dev` branch will be deployed to the staging site automatically.

### 3. Making a production release

After a number of tasks are verified and they need to be deployed to production, you need to:

- create a new release branch from the latest release point of the master branch (tagged with "release/\*"), name it in the format of `release/[date]` eg. `release/20200219` if the date is 2020.02.19.
- replay the verified features' commits onto this new release branch with `git cherry-pick [CommitHash]` eg. `git cherry-pick 1234567`
- create a PR against the master branch and merge it
- make a manual production deployment through the AWS dashboard AWS login as you can see it in this video: https://share.getcloudapp.com/v1ub1kyr

AWS console: https://kuprik.signin.aws.amazon.com/console

## Installing the project - Frontend

Clone the project to your machine

```
git@gitlab.com:kuprik/kuprik-front-end.git
```

Go into project directory

```
cd kuprik-front-end
```

Install dependencies

```
npm install
```

### Run application on port 3000

```
npm run start
```

If you need to compile application for deployment

```
npm run build
```

## Installing the project - Backend

Clone the project to your machine

```
git@gitlab.com:kuprik/mvp.git
```

Go into project directory

```
cd mvp
```

### Running backend with Docker

Declare environment variables. You can find this information in **ENVIRONMENT VARIABLES** section.

Start services

```
docker-compose up --build
```

Server is up and running on port 5000

### If you are using docker to start the server, then you need to execute these commands

```
docker exec -it kuprik_postgres sh
```

inside docker terminal

```commandline
python manage.py createsuperuser
```

create super admin
