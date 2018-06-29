# ContactApp
This is a ContactApp

## How to run the code ?
Put the terminal in the “backend” folder and run “npm install” to install the dependencies.
Then run “npm start”. Both the frontend and the backend will start on the http://localhost:3000 address.

## Technical choices.
Vue framework | Element component library | webpack

IDE is ATOM

## Possible future improvements
1.The column of ContactCount is unable to sort. Backend sql doesn't support sorting by ContactCount.
2.For now the frontend lacks of user guidance and false hints.

## Strategy to track user actions and detect anomalies when in production
Recording all the requests that triggered by the user and generate a log file.
Each request corresponds to one operation. By analysising the log file can track the user actions.

## backend improvements
The function of getAllUsers is responsible for too many operations.
Creating  based on the req can be encapsulated as a function.
Creating sql  based on the page and order can be encapsulated as another function.
Then main function calls this two independent function to get res.
