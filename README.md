# PicAppSharedServer

## Travis

[![Build Status](https://travis-ci.com/marcossch/PicAppSS.svg?token=xyuaDMLzy8Dpq7quEJdd&branch=master)](https://travis-ci.com/marcossch/PicAppSS)

## CodeCov

[![codecov](https://codecov.io/gh/marcossch/PicAppSS/branch/master/graph/badge.svg?token=KRZqs2dnwH)](https://codecov.io/gh/marcossch/PicAppSS)

## Docker
In order to run the server locally via Docker, you need to install both
[docker](https://docs.docker.com/install/) and 
[docker-compose](https://docs.docker.com/compose/install/).

Once you have both of them, you can get the server running by opening a
console in the project directory and running the following commands:

    $ ./docker-run.sh
    
And this one will start listening on [localhost:3000](https://localhost:3000).
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

###### para levantar las tablas de la db:
    $ heroku run sequelize db:migrate

###### para dar de baja las tablas de la db:
    $ heroku run sequelize db:migrate:undo

###### Para correr las pruebas localmente:
    $ npm run uTest


