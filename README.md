Welcome to my app !Discover a new way to shop with our clothing exchange program.Clothing Store helps you to trade your new or gently used clothes for fresh, stylish pieces that suit your wardrobe.
Whether you’re looking to update your look or make room in your closet, our exchange system is easy and eco-friendly.Join us in reducing waste and promoting fashion that doesn’t cost the earth.
Trade, shop, and save – welcome to a smarter way of dressing!

-----------------------------------------------------------------

This project is a server side rendered application using the EJS templating language, Node/Express, and the MongoDB database.
 For now, the application has two Mongoose data models. One is User data model and one is Product model.  Any user who wants to use this application has to login or register that's why User model is needed.
 On this project, I implement user registration and logon. For authentication I use Passport Local Strategy. 
 To prevent the creation of invalid records,  validation for model attributes are implemented.
 CRUD (create, read, update, delete) operations are implemented for Product model in my controllers and routes.
 Also, non-CRUD operations like sorting, pagination are implemented
 Access control middleware is implemented so that the CRUD operations require authentication.
 Access control logic is implemented in my controllers, so that one user cannot access another user’s data. 
 Appropriate notifications to the user is implemented, I store the message in the user session, using the connect-flash NPM package.
 To organize my application code and in indentation, I use prettier to make sure my code is organized.

 For the User Interface, there are EJS views. The User Interface have these capabilities: Registration, logon, and logoff, all CRUD operations for Product model are supported.
 Links or buttons are provided to help the users navigate the application.
 To style my project, I use Bootstrap

 I deploy my application on render. Here is the link to it : https://clothing-store-ejs-2.onrender.com
