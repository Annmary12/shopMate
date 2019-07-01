[![Netlify Status](https://api.netlify.com/api/v1/badges/13ac0515-d700-4deb-87d3-4bdfaaba1598/deploy-status)](https://app.netlify.com/sites/shop-mate/deploys)

## Shopmate

Shopmate is an Eccomerce website that allows users to see list of products, search for an item, add items to their shopping cart, create order and checkout successfully.

## Hosted Link
[ShopMate](https://shop-mate.netlify.com/)

## Features
* Users can signin and register
* Users can see all products
* Users can filter the products based on categories
* Users can search for a product
* Users can see item details by selecting a specific item
* Users can add product to their shopping cart
* Users can checkout using third party payment gateway(Stripe)
* It supports pagination
* Users can update personal profiles with shipping addresses and other info

## Technology Stack Used
* React a javascript library for building user interfaces
* Redux a predictable state container for javascript apps.
* Formik handles form state in React, it is a component that helps you in building forms.
* Yup is a Javascript bject schema validator and object parser

## Project Structure

```
├── src/
    ├── assets
    |   └── font
    |   └── images
    |   └── scss
    ├── components
    │   └── AuthForm
    |       └── AuthForm.scss
    |       └── index.jsx
    |   └── Button
    |       └── Button.scss
    |       └── index.jsx
    ├── pages
    │   └── Account
    |       └── Account.scss
    |       └── index.jsx
    |   └── Checkout
    |       └── Checkout.scss
    |       └── index.jsx
    |  └── ...
    ├── routes
    |   └── index.js
    ├── store
    │   └── modules
    |       └── auth
    |           └── index.js
    |           └── types.js
    |       └── cart
    |           └── index.js
    |           └── types.js
    |       └── ...
    |   └── index.js
    |   └── rootReducer.js
    ├── utils
    │   └── authorization
    |   └── helpers
    |   └── validationSchemas
    ├── App.js
    ├── App.test.js
    ├── index.js
```


## Setup

* Clone the repo

```sh
> $ git clone https://github.com/Annmary12/shopMate.git
```

* Install dependencies by running

```sh
> $ npm install
```

## Running the app

To get the app up and running (and really see if it worked), run:

```sh
> $ npm start
```

## Running the tests

* To run the tests

```sh
> $ npm test
```