# Aurora CS Course Scheduler
Author: Sean Dziatkowiec

Project for: Advance Web-Application (CSC3700)

Purpose: Create a fully functional web-application using the React framework for front-end and Node.js for the back-end.

---

## Download Requirements

 - Node.js
 - WebStorm - JetBrains IDE (or an IDE you know how to use)

## Download Instructions

 - Create a new project in WebStorm.
 - Download this project as a zip file and copy ONLY the courseScheduler folder into your project folder.
 - In your project open the terminal using the WebStorm GUI.
   1. Path inside the courseScheduler folder.
   2. Type: "npm install" and enter.
 - Open a new terminal window.
   1. Path inside the courseScheduler folder.
   2. Unless already installed, Type: "npm install json-server" and enter.
   3. After finishing type: "json-server --watch db/db.json --port NNNN" (where NNNN is a 4-digit number) and enter.
 - Create a file within courseScheduler, name it: ".env", and paste this in the file: "VITE_API_BASE_URL=http://localhost:NNNN". Ensure NNNN matches above.
 - Go back to the first terminal and type: "npm run dev" and enter.
   1. Type: "o" and enter to open the web-application in your browser.

---
