# Simple SPA project Client with VueJS

> A Vue.js project

## Build Setup

``` bash
# clone project from my repository
    git clone https://github.com/KostiantynLogunov/app2-Client-SPA.git

# After cloning go to /src/helpers/config.js and set domain where wil be REST api on Backend. Set domain in file config.js, key - apiUrl. You have to set domain like example "http://domain.com/api". "/api" is required!

# next install dependencies
    npm install

# build for production with minification
    npm run build

# serve with hot reload at localhost:8080
    npm run dev
```

# BUT for App's work you must install REST api on Backend before.
go to REST api's repository [RESTful api Backend](https://github.com/KostiantynLogunov/app1-RESTful-api).

## Build Setup REST api on Backend

``` bash
# clone project from my repository to your folder with working domain
    git clone https://github.com/KostiantynLogunov/app1-RESTful-api.git

# next step
    composer install

# then make a file .env with settings. For Example I left file .env.example. Pay attantion to DB settings!

# then if you have good .env with correct settings, create basic tables in you DataBase
    php artisan migrate
    
#   php artisan key:generate

#  For work of front app client and rest api i used JWT. Generate a new secret of jwt:
    php artisan jwt:secret
    
# Clear cache
    php artisan config:clear
    php artisan cache:clear
```
## System is ready to work !

