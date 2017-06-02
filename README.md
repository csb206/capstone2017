# Health Nuts
*envision nutrition*

Welcome to the HealthNuts Project Repository.

This website is not deployed on the web due to possible security issues and no budget to pay for API plans.
Instead, you can see a demo of the current version of this product at:
(youtube video)

## List of Contents
1. Overview
2. Necessary Technology Needs
3. Currently Chosen Resources to Meet Those Needs
4. Firebase
5. React
6. Clarifai
7. Nutritionix
8. Stack
9. Contact Information

## 1. Overview
(Cory do overview of project here)

## 2. Necessary Technology Needs
To complete this project, we need the following things:
1. A way to deploy the application

   The website must be able to be run somehow and eventually be hosted on a public web server
   
2. A simple database and file storage system

   We just need to be able to have users, upload photos, and store some information about the photos users upload, a couple other small things.
   
3. A JavaScript Framework to handle the complexity and nuiance of the functionality that we require.

   Single there will be multiple, connected pages with all sorts of things happening on the front end, we need a framework that can not make our normal js code look like soup.
   
4. A way to detect what sorts of foods are in an image

   Since once of our project aims is to make the food journaling process more efficient, we need a way to not make users have to write down all the specific food items but rather the technology should just know by now whats in the photo, it's 2017.
   
5. A way to determine what sort of nutritional substance makes up a given food item

   We don't just want to know what foods you ate, we also want to know what the nutritional value of the food you just ate is!
   
## 3. Currently Chosen Resources to Meet Those Needs
To accomodate our project needs, we chose the following resources:
1. Node.js

   We chose to use Node.js since we also chose to use React, and React deploys with Node. See Node documentation here: https://nodejs.org/en/ 
   
2. Firebase

   Google's popular client-side Firebase actually perfectly accomodates all of our needs. Firebase takes care of user information, including email handling, password managing, persistent log in, file storage system, and a NoSQL database which we can model in such a way that we can store information about users, their photos, and the information about those photos.
   
3. React

   Facebook also released a very well made product that makes websites very, very fast. It also uses components to make code more reusable. We can also dynamically render views, save, change, and pass states between pages, and more! This makes for a very useful framework for us to use.
   
4. Clarifai

   Clarifai's magic API allows us to send it an image, and get back results of all the items it thinks it sees in the food. They allow for a free version which is extremely limited in requests, but will allow for testing purposes, and can always be upgraded.
   
5. Nutritionix

   Nutritionix is a relatively simple API that allows you to send it a query of a food item, and it returns like-name based results and some nutrient values. We are considering changing this, but for now it works relatively well, but there are limitations.

## 4. Firebase
Firebase is a product of Google.

See documentation here: https://firebase.google.com/

When we use Firebase, we are really only accessing three different parts of it, but there are more. The three we use are: 

1. Authentication

   This part of Firebase manages users, including email, usernames, and passwords. It also allows for you to send confirmation emails, and handles secure password managing. A lot of calls to this part of firebase come in the Login/Logout components, and whenever user information needs to be queried.

2. Database

   The Database is essentially a NoSQL database that looks like a big json file. We can query that json file to get non-authentication information about users, such as their photos they upload (URL's), and information about those photos.
   
3. Storage

   Storage takes care of all the photos users upload of their food. The only time we really access this part in code is the GetImage page, as we upload the photo, it creates a public URL, then we save that URL to the database.
   
## 5. React
React is a product of Facebook.

See documentation here: https://facebook.github.io/react/

React gets most of it's power from the fact that it can efficiently update and render views on the fly. Another great plus is the fact that we can create components to create reusable structures that are used throughout the site. We can use many modules that make react even more powerful, simplifying a lot of common problems. Without going too much into the nitty gritty about how react works, all that matters is that it is the underlying framework for our js code.

## 6. Clarifai
See API documentation here: https://www.clarifai.com/

We use Clarifai's food image model to detect food items in a photo. It's actually pretty simple, here is an example of a call to the API:

```javascript
var app = new Clarifai.App(appId, appKey);
 app.models.predict(foodModel, photoUrl).then(
   function(response) {
     console.log(response);
     var concepts = response["outputs"][0]["data"]["concepts"];
     thisComponent.setState({
       url: photoUrl,
       concepts: concepts
     })
   },
   function(err) {
     console.error(err);
   }
 );
```

This function will set the state of the component to be of the food items, or concepts, as a result of a request to Clarifai's food model. From this list, you get both food items and the probability it thinks that it is there.

## 7. Nutritionix
See API documentation here: https://developer.nutritionix.com/docs/v1_1

After we get the food items from Clarifai, we now want to get the nutrient profile of the foods. This would be things like fats, proteins, sodium, fiber, vitamin a, etc. However, this API will return both specific food items (ie. banana), and get correct results for things like that, but "burrito" might get the first burrito food item it knows, perhaps a brand name burrito and the nutrients in that. So when it gets brand names it is off, but not by much. Also, we don't consider proportions, so this is not a big issue.

An example of a call to the nutritionix api is here:

```javascript
fetch('https://api.nutritionix.com/v1_1/search/' + foodItem + '?results=0:1&cal_min=0&cal_max=800&fields=item_name,nf_calories,nf_total_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_protein,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_potassium&appId=' + nutixAppId + '&appKey=' + nutixAppKey) 
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          console.log('parsed json', json);
          //nutrients are contained within json
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });
```

This code block will log the json returned by nutritionix, which will include nutrients for the given foodItem.

## 8. Stack
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
