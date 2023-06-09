# Getting Started

This project is an inventory management system for a school project in the class Obj-Oriented Design and Programming. The goal is to design and implement an inventory subsystem that automates numerous procedures, offers a better workflow, lowers the cost of keeping inventory on hand, and boosts operational effectiveness.

The project uses NestJS for API creation to interact with the MySQL database and ReactJS for web design, providing a user interface.

## Folder Structure

The workspace contains two main folders:

- `api`: Contains the NestJS backend code for API creation and interaction with the MySQL database.
- `web-react`: Contains the ReactJS frontend code for the user interface.

## Features

The current project implementation allows the inventory manager to:

- Create, update, and delete product categories and products.
- Check all orders or orders related to each product or product category.

## Goals

The main goals for this project are to achieve:

- Automated inventory tracking.
- Automatic update of inventory levels with goods received and goods delivered.
- Control over purchase orders and notifications of low inventory levels.
- Real-time inventory tracking and reporting.

## Dependencies

The project uses the following main dependencies:

- NestJS: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- ReactJS: A JavaScript library for building user interfaces.
- TypeORM: An Object Relational Mapper (ORM) for TypeScript and JavaScript that works with MySQL and other databases.

## Setup

### API (NestJS)

1. Navigate to the `api` folder.
2. Run `npm install` to install the required dependencies.
3. Create a `.env` file in the root of the `api` folder with your MySQL database credentials and other environment variables.
```
# Server Settings
PORT=3001

# Session/Cookie Settings
COOKIE_SECRET=asdasdasdasd

MYSQL_DB_HOST=localhost
MYSQL_DB_USERNAME=your_mysql_username
MYSQL_DB_PASSWORD=your_mysql_password
MYSQL_DB_DATABASE=your_mysql_database
```

4. Run `npm run start:dev` to start the development server.

A good Youtube video about NestJS that we all learned from: [NestJS Crash Course](https://www.youtube.com/watch?v=xzu3QXwo1BU)

### Web (ReactJS)

1. Navigate to the `web-react` folder.
2. Run `npm install` to install the required dependencies.
3. Run `npm start` to start the development server.

Open your browser and navigate to `http://localhost:3000` to view the user interface.

## To get started

**First, create dummy Manufacturers data with POST request**
```
http://localhost:3001/api/manufacturers/create/dummies
```

**Then, create your product types**

**To create mock products with POST request**
```
http://localhost:3001/api/products/create/dummies/{your desired  number of products}
```

**Create mock orders with POST request**
```
http://localhost:3001/api/orders/create/dummies/{your desired  number of orders}
```


## Contributors

- Nick Triance - [@NickTriance](https://github.com/NickTriance)
- Phuoc Khai (Jack) Nguyen - [@bluesimp1102](https://github.com/bluesimp1102)
- Justin Nguyen - [@gary2245](https://github.com/gary2245)
- Hoang Tu Huynh - [@hoangtuhuynh](https://github.com/hoangtuhuynh)
- Otto Del Cid - [@OttoDel](https://github.com/OttoDel)
