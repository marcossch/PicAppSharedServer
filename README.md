![alt text](https://github.com/marcossch/PicAppAndroid/blob/master/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png)

# PicApp - Shared Server
## Languages and Technologies: 
NodeJS, ExpressJS, PostgreSQL, Sequelize, Heroku, Docker, Travis, CodeCov.

---
The complete project involved the end-to-end development of a social media mobile app with android support. 
The app is made up of three main parts:
* A server (Application Server), responsible for connecting the users. It can be found [here](https://github.com/RodrigoDeRosa/PicappAppServer)
* A server (Shared Server), responsible for administrating the application servers, user authentication, and files handling. It can be found [here](https://github.com/marcossch/PicAppSharedServer)
* An Android client to be used by the final users. It can be found [here](https://github.com/marcossch/PicAppAndroid)

My personal involvement in the project was on the Android Client and the Shared Server.

## Shared Server

![alt text](https://github.com/marcossch/PicAppSharedServer/blob/master/Enunciado/images/shared_server.png)

## Travis

[![Build Status](https://travis-ci.com/marcossch/PicAppSS.svg?token=xyuaDMLzy8Dpq7quEJdd&branch=master)](https://travis-ci.com/marcossch/PicAppSS)

## CodeCov

    $ npm run coverage

## Docker
In order to run the server locally via Docker, you need to install both
[docker](https://docs.docker.com/install/) and
[docker-compose](https://docs.docker.com/compose/install/).

Once you have both of them, you can get the server running by opening a
console in the project directory and running the following commands:

    $ ./docker-run.sh

Now it will start listening on [localhost:3000](https://localhost:3000).
You can stop it anytime with CTRL+C. You need to leave this terminal open.

Then open a new terminal on the same directory and run:

    $ ./database.sh

Now the tables from the database are up and running and you can continue working on
[localhost:3000](https://localhost:3000).

**NOTES:**

To run this Shell script, you will need to give it execution permission with
the command:

    $ chmod +x docker-run.sh
    $ chmod +x database.sh

Also, it runs 'sudo' commands so you will be asked for super user password.

## Heroku
[Heroku](https://picappss.herokuapp.com/)

Heroku is integrated automatically via GitHub.

## API

You can see the interface of this Application Server
[here](https://app.swaggerhub.com/apis/facuguerrero/SharedServer/1.0.0#/).

**NOTES**

###### To run the db tables:
    $ heroku run sequelize db:migrate

###### To clean the db tables:
    $ heroku run sequelize db:migrate:undo

###### To run tests locally:
    $ npm run uTest

---

#### Facultad de Ingeniería de la Universidad de Buenos Aires
#### TP TALLER DE PROGRAMACION II 75.52
