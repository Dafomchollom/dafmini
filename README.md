# rs2codechallengev2

## Build Setup

```bash
# install dependencies
$ yarn install or npm install

# serve with hot reload at localhost:3000
$ yarn dev or npm run dev

# build for production and launch server
$ yarn build or npm run build
$ yarn start or npm run start

# generate static project
$ yarn generate or npm run generate
```
## .ENV
```bash
$ MONGOOSE_USERNAME=dafom
$ MONGOOSE_PASSWORD=1234
$ TOKEN_KEY=RS2CODECHALLENGE
```

## Creating a user 
step one use the sign up page, or use postman post http://localhost:3000/api/user/register find attached sample data
```bash
{
    "loginName": "dafom",
    "email": "dafomtest@gmail.com",
    "password": "Dongyang"
}
```

## Creating Product Type
create product type using postman post http://localhost:3000/api/product/productType find attached sample data
```bash
{
    "name": "games",
    "description": "Games"
}
```
## Get all Product Types
create product type using postman get http://localhost:3000/api/product/productType find attached sample data

## Get all Product
create product using postman get http://localhost:3000/api/product/ find attached sample data

## Creating Product
create product using postman post http://localhost:3000/api/product/ find attached sample data
```bash
{
    "name": "harry potter",
    "description": "this is a nice book that inspired the awesome movie franchise",
    "productType": "6187e89ce03a238ba8a7144a",
    "image": "https://i.ibb.co/Ybswtgw/b57b6007-afb1-4e3c-8263-b29f6534aee8-1360x2040.jpg",
    "price": 5
}
```

## Buying Product
buy product with either the user interface or use postman post http://localhost:3000/api/product/buyproducts find attached sample data
```bash
{
    "userID": "618818afaaa2b8763287fb0e",
    "itemsBought": [
        {"productId": "61889578a2d41a8daffc875f", "quantity": "7"}
    ]
}
```

please create a .env file and pass the env configurations above

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

### `api`

The api directory contains the models and api routes for the backend.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).
More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
