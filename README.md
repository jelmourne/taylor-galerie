# Taylor Galerie Application Documentation

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Routes](#routes)
  - [Product Routes](#product-routes)
  - [Checkout Routes](#checkout-routes)
  - [Email Routes](#email-routes)
  - [Contact Routes](#contact-routes)
  - [Error Handling Routes](#error-handling-routes)
- [Views](#views)
- [Dependencies](#dependencies)
- [Docker Setup](#docker-setup)
- [Helper Functions](#helper-functions)

## Introduction

Taylor Galerie is an Express.js application that serves an e-commerce furnature website, featuring products, checkout, and email functionalities. The application includes backend logic and frontend views using EJS templates.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/jelmourne/taylor-galerie
   cd taylor-galerie
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm start
   ```

## Routes

### Product Routes

Defined in `product.cjs`, these routes handle product-related requests.

- `GET /products` - Fetch all products
- `GET /product/:id` - Fetch details of a single product
- `POST /product` - Add a new product
- `PUT /product/:id` - Update an existing product
- `DELETE /product/:id` - Delete a product

### Checkout Routes

Defined in `checkout.cjs`, these routes manage checkout processes.

- `POST /checkout` - Process checkout

### Email Routes

Defined in `email.cjs`, these routes handle email communications.

- `POST /send-email` - Send an email notification

### Contact Routes

Defined in `contact.ejs`, these routes handle contact form submissions.

- `GET /contact` - Render the contact page
- `POST /contact` - Submit a contact form

### Error Handling Routes

Defined in `error.ejs`, these routes manage error responses.

- `GET /error` - Render error page

## Views

The application uses EJS for rendering dynamic HTML pages:

- `index.ejs` - Homepage
- `products.ejs` - Product listing page
- `product.ejs` - Individual product details
- `contact.ejs` - Contact page
- `error.ejs` - Error page

## Helper Functions

The `helpers.cjs` file contains utility functions that support various parts of the application.

- **Database Queries**: Functions to interact with the database.
- **Validation**: Utility methods for data validation.
- **Email Handling**: Functions for sending emails efficiently.
- **Formatting**: Helpers for formatting product prices and descriptions.

## Dependencies

This project relies on the following key dependencies:

- `express` - Web framework
- `ejs` - Templating engine
- `supabase-js` - Supabase client for database and realtime

For a complete list, check `package.json`.

## Docker Setup

This project includes a `dockerfile` for containerization.

### Building the Docker Image

```sh
   docker build -t express-app .
```

### Running the Container

```sh
   docker run -p 3000:3000 express-app
```

Ensure Docker is installed before executing these commands.

---

For further assistance, refer to the project's README or contact the developer team.
