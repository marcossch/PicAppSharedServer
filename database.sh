sudo docker exec -it $(docker ps | grep sharedserverpicapp_db | awk '{ print $1 }') /bin/sh -c 'dropdb -U postgres postman_dev'
sudo docker exec -it $(docker ps | grep sharedserverpicapp_db | awk '{ print $1 }') /bin/sh -c 'createdb -U postgres postman_dev'
sudo docker exec -it $(docker ps | grep sharedserverpicapp_web | awk '{ print $1 }') /bin/sh -c 'npm run db:migrate'