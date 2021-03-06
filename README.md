For my CPA02, the webapp I created is called The Book Logger. You can use it to keep track of each book you read, including its title, author, genre, a short description, and the rating you would give it. You can also look through other users' book logs, with options to search by title, author, genre, and rating.  
# Running the app  
You can use the app online at its heroku site (https://the-book-logger.herokuapp.com/). If you want to run the app locally, you'll need a MongoDB cloud server. Download the source code from github, create a startup.ps1 file in which you set $Env:mongodb_URI equal to your MongoDB server, and include "npm start". Then you can run the app by executing .\startup.ps1 in your terminal.    
  
# Using the app  
When you start the app, you'll be directed to the homepage.  
<br />
<img width="937" alt="image" src="https://user-images.githubusercontent.com/99210028/167206951-f2226a6d-5e8a-41ac-9912-3daba4c248fb.png">  
<br />
From this page, you can use any of the search forms to view book logs. For example, selecting "Fantasy" in the search by genre form brings you to the following page:  
<br />
<img width="929" alt="image" src="https://user-images.githubusercontent.com/99210028/167207388-3d3eb732-b791-43d0-852d-5309a813ae0a.png">  
<br />
As users continue to review books, the searches will show more and more books.  
<br />
In the navigation bar, you can select "My Books." If you haven't signed in yet, it will redirect you to the following signin page:  
<br />
<img width="923" alt="image" src="https://user-images.githubusercontent.com/99210028/167207725-9460f75c-2a47-48ce-a347-5df67d5d533d.png">  
<br />
Selecting "Signin/Signup" in the navigation bar will also bring you to that page.  
<br />
After signing in or signing up, you can access the "My Books" page:  
<br />
<img width="921" alt="image" src="https://user-images.githubusercontent.com/99210028/167207964-cb5c018c-3034-4257-83c8-049884cbc56d.png">  
<br />
It will show you a complete list of all the books that you've reviewed. Also, as you can see, signing in changes the navigation bar option to allow you to log out. If you scroll down further, you'll see that the "My Books" page also allows you to add more books:  
<br />
<img width="922" alt="image" src="https://user-images.githubusercontent.com/99210028/167208612-d4faa2eb-1f13-4407-a1eb-d8671a6f1a74.png">  
<br />
And that's The Book Logger! Enjoy!  
<br />
Video pitch: https://brandeis.zoom.us/rec/share/OS99vL8VFppQTQpN6Cb1HNyOV0A3Qft9BfoqFvddZWAEU96JZ2gGJX_MexRDG68H.xcjJXxCk9UTTAR9q?startTime=1651870297000
