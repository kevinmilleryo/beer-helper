Beer-Helper

App for brewery sales teams to use to track accounts and visits.

Link to project: https://beer-helper.cyclic.app/

Demo User  
email: tester1234@gmail.com
password: tester1234

![Screenshot](public/imgs/beer-helper-screenshot.png)

How It's Made:
Tech used: EJS, CSS, JavaScript, Bootstrap, Node.js, Express.js, MongoDB

Optimizations: Would like to eventually add a sort function for sorting by account type, distributor, user, etc. Would like to be able to export accounts by week, month, etc.

Lessons Learned:
How to add functionality using the backend. Implementation of MVC methods. Using middleware such as mongoose and method override. Use of bootstrap for styling and design. # beer-helper

Install
npm install

Things to add
Create a .env file in config folder and add the following as key = value
PORT = 2121 (can be any port example: 3000)
DB_STRING = your database URI
CLOUD_NAME = your cloudinary cloud name
API_KEY = your cloudinary api key
API_SECRET = your cloudinary api secret

Run
npm start
