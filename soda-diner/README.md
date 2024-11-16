# Welcome to 🥤 Fizzbin Sodas!

 With this app you can view, create, edit, or delete different Diners that each serve a variety of Sodas. You can also create and delete Sodas. 

 Pick one of our Diners and change its name, location, and which sodas it serves, or create your own. 
 
 Try creating your very own Soda and serve your new Soda in your own Diner!

***

## How to Get Started

1. Open a terminal and navigate into to the Soda_Diner root directory. (This is the same folder that contains this README file.)

    You will need to install the appropriate node modules to use the app.

2. In the terminal, run:

    `npm install`

    Now that all of your dependencies have been installed, it's time to seed the database with our pre-made Diners and Sodas.

3. In the terminal, run:

    `npm run seed`

    Your database now contains several Diners and Sodas, so now let's start the server.

4. In the terminal, run:

    `npm start`

If everything is successful, inside your terminal it will output:

    soda diner running on port 3080
    Mongoose connected to mongodb://localhost/soda-diner

Lastly, open a browser tab or window and navigate to <http://localhost:3080>

You will see the Fizzbin Sodas landing page.  

*** 

## How To Use

- To view the available Diners click the orange "All Diners" button.  
To view the available Sodas, click the brown "All Sodas" button.

- To view information about a Diner or a Soda, click its name. 

- To delete a Diner or a Soda from the database, click the "Delete" button inside the information section for that item.

- To edit a Diner, click on the "Edit Diner" button inside the information section for that Diner.  
Edit the information in the popup window and press "Save" to save your changes.

- To add a new Diner or Soda to the database, click on the "Add A New Diner" or "Add A New Soda" button on the bottom of their respective pages.  
Fill out the information in the popup window and press "Save" to add your item to the database. 

- Once added, your item is immediately available to view, edit, and delete.

> ### Enjoy your visit to Fizzbin Sodas!