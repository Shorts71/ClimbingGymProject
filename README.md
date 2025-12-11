# The Peak Climbing Gym Store

This project was made in order to emulate what a website's prototype stage might look like when it comes to merging both the sales of climbing gym memberships alongside the product line that is often displayed in a climbing gym's retail area.

# Phase 1

- Proposal drafted

# Phase 2

For this project I went with data structures for 3 different models (products, memberships, users):
Products:
name
category
rating
description
weight
price
imageUrl

Memberships:
name
duration
cost
rentalInclusion

User:
name
email
phone
password
address
createdAt
roles

Routes (using JSON) and middlewares were applied for all three models.

Application-level middlewares and route-level middlewares were implemented with the help of express-validator.

HTTP Responses were setup for each route.

Testing was conducted via Postman for CRUD operations, with successful results.

# Phase 3

## Database

Database was setup using MongoDB Atlas, connecting it to our backend using a .env file with database connection middleware in hand.

models for each category (products, memberships, users) were reworked to use Mongoose Schemas to ensure proper connection to MongoDB

CRUD operations were replaced with Mongoose CRUD operations

> **See Phase 4** for sorting

# Phase 4

Frontend was created

forms, lists, and UI was created for each respective category, with client-side validation implemented as well

Sorting was achieved through the frontend, using the some function to allow any applicable filters to handle how products/users would be displayed.

# Phase 5

Token-based Authentication and Email-based MFA were implemented
Roles were properly assigned to respective users to allow access to certain parts of the website
Backend routes had authorize middlewares applied to them to ensure that customers could not access admin-only pages

# Final Draft

Backend deployed to Render
Frontend deployed to Vercel
Testing was done to ensure all operations still performed as before.