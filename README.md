# PicAppSharedServer

## Travis

[![Build Status](https://travis-ci.com/marcossch/PicAppSS.svg?token=xyuaDMLzy8Dpq7quEJdd&branch=master)](https://travis-ci.com/marcossch/PicAppSS)

## CodeCov

[![codecov](https://codecov.io/gh/marcossch/PicAppSS/branch/master/graph/badge.svg?token=KRZqs2dnwH)](https://codecov.io/gh/marcossch/PicAppSS)

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



