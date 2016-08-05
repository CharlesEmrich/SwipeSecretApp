# SwipeSecretApp
Like tinder, but for matching people based on their mutual appreciation of their secrets.

### Requirement Implementation
* Master Category : User Accounts
* Detail Category : Secrets
* User Accounts : Each user creates an account, fills in personal details, adds a secret to be considered on their profile. Log in approve/reject secrets, confirm matches, and update credentials and other profile information.
* Ability to Add Favorites : A private catalogue of people who are a mutual match with a given user.
* Modern Front-End Architecture with AJAX Calls :
* Appropriately Styled UI : Bootstrap and Handlebars.js
* Deployed to Heroku : http://swipesecret.herokuapp.com

### Stretch Goals

* Add moderator accounts and permissions to filter and approve secrets for public consumption
* Add image uploads (Heroku does not support writing to file systems)
* Add a rating system for users to rate the matches they're given
* Match based on location
* Customization of search based on history of tags "liked"
* Show the secrets of individuals who have already liked a user higher in that user's queue of secrets to approve/reject
* Support for swipe gestures (mobile centric) -- HammerJS ?

### Coding Standards

* Fat Arrow functions when applicable:

  `() => { ... }`

* Function declaration spacing as shown:

  `function thisFunction (param1, param2) { ... }`

* Camel case variable and function names:

  `var thisVariable = ...`

* Promises over callbacks

* Semicolons required

* Refer to .eslintrc for basics

### Application Structure

* start file, `index.js`, in root folder
* routes stored in `lib/routes` directory
* models stored in `lib/models` directory
* tests stored in `test` directory

### Build / Test / Run Instructions

* Setup steps...
* `npm start` to start the app in development mode
* `npm test` to start the test suite in dev mode (runs once)
* `npm run eslint` to start the linting in dev mode (runs once)
* `npm run watch` to start the test and lint suite (restarts upon file save)
