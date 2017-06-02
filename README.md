# Health Nuts
*envision nutrition*

Welcome to the HealthNuts Project Repository.

This website is not deployed on the web due to possible security issues and no budget to pay for API plans.
Instead, you can see a demo of the current version of this product at:
youtube.com

## List of Contents
1. Overview
2. Necessary Technology Needs
3. Current Resources to Meet Those Needs
4. 
9. Stack

## 1. Overview
(Cory do overview of project here)

## 2. Necessary Technology Needs
To complete this project, we need the following things:
1. A way to deploy the application

--The website must be able to be run somehow and eventually be hosted on a public web server
2. A simple database and file storage system

##9. Stack
Our stack is one that is not really commonly defined but technically it would be: FERN.

The "F" stands for Firebase, that is our client-side database. It doesn't need to be server side, because it can query the database and return json, and google handles all of the user/password authentication.

The "E" stands for ExpressJs/ES6, which is pretty much just necessary for React. See documentation for ES6 here: https://github.com/developit/express-es6-rest-api 

The "R" stands for React, which is a powerful js framework that helps create robust web applications and keep the code managable.

The "N" stands for Node.js which is JavaScript runtime to allow web apps to be deployed easily. See documentation for Node here: https://nodejs.org/en/ 

This stack allows us to be really light-weight and dynamic by not having to worry about
having a backend. The React framework allows us to do really powerful things like
easily load modules to solvw a lot of common problems, such as connecting to 
firebase, etc. It also was created by Facebook and therefore is very very fast
as it caches components which are the rendered dynamically to the page. We do
not need to have a complicated, highly structured backend to accompolish this
project, we really only need users, photos, and some information about the
photos users upload, and a bit more but not much.
