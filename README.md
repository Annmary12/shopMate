[![Netlify Status](https://api.netlify.com/api/v1/badges/0e0d4188-cf6d-4894-a453-7e7e19f5e909/deploy-status)](https://app.netlify.com/sites/shop-mate/deploys)
An E-commerce application

## Shopmate

Shopmate is an Eccomerce website that allows users to see list of products, search for an item, add items to their shopping cart, create order and checkout successfully.

## Hosted Link
[ShopMate](https://phone-number-generator.netlify.com/)

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
* React A javascript library for building user interfaces
* Redux A predictable state container for javascript apps.
* Formik Handles form state in React, it is a component that helps you in building forms.
* Yup Is a Javascript bject schema validator and object parser

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