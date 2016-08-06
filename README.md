# SwipeSecretApp
It's like Tinder, but for matching people based on their mutual appreciation of each others' secrets.

### Requirement Implementation
* Master Category : User Accounts
* Detail Category : Secrets
* User Accounts : Each user creates an account, fills in personal details, adds a secret to be considered on their profile. Log in approve/reject secrets, confirm matches, and update credentials and other profile information.
* Ability to Add Favorites : A private catalogue of people who are a mutual match with a given user.
* Modern Front-End Architecture with AJAX Calls : _____________
* Appropriately Styled UI : Bootstrap and Handlebars.js
* Deployed to Heroku : http://swipesecret.herokuapp.com

### Stretch Goals

* Add moderator accounts and permissions to filter and approve secrets for public consumption
* Add the ability for users to filter out secrets based on trigger type
* Add image uploads (Heroku does not support writing to file systems)
* Add a rating system for users to rate the matches they're given
* Match based on location
* Customization of search based on history of tags "liked"
* Show the secrets of individuals who have already liked a user higher in that user's queue of secrets to approve/reject
* Support for swipe gestures (mobile centric) -- HammerJS ?

### App Process

User will see a secret upon logging in, they can choose to approve or reject the secret. If they reject the other user's secret they move on to rating the next available secret, if they approve the secret then they'll be notified if the other user also approves their match and allowed to move onto the next step, if the other users rejects their secret then their approval means nothing and there will be no further action on that match.

If both users approve each others' secret they'll each be offered a secondary approval/rejection step where they're given a few more details about the individual (gender, location, sexual orientation/interests/ etc...) and given the ability to approve or reject the user based on the combination of their secret and their details. If one or both users reject or take no action on the secondary step there will be no further action on that match.

If both users approve that secondary step then they'll each be offered the other user's first name and preferred contact information (phone or email most likely) and invited to reach out to the other user outside of the app. That "match" is then stored for each of those users so they can retrieve the information again at a later date from their profile.

### Information Collected from User at Signup

* First name
* Secret
* location
* Age
* Gender (M/F/Custom -- RYO text field)
* Sexual Orientation or interests
* Contact Information (Email/Phone)
* _____
* _____
* _____

### Information collected about user/secret throughout use

* Matches (for User)
* Date SignedUp (for User)
* Date Submitted (for Secret)
* Number of Views (for Secret)
* Number of approves (for Secret)
* Number of rejects (for Secret)

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
