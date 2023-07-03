# 67272_PATS_v3

This is a basic Rails app that was built as a class demonstration in the spring of 2018. This version focuses more on using VueJS, enhancing the user experience with Ajax, and adding search functionality.

The class is Application Design & Development (67-272) and is for students in [Information Systems at Carnegie Mellon University](https://67272.cmuis.net). We have posted this code on [github.com](https://github.com/profh) in a public directory so that (a) it is readily accessible to students and (b) that students will get a little familiarity with github.com.

This project does require the use of several gems to work properly. Check the Gemfile to see which gems are used. This project also assumes the user is running Ruby 2.4.x since that is what is used in the course.

## Running

```bash
rails s
```

to run React, in a separate terminal, do:
https://github.com/reactjs/react-rails#get-started-with-shakapacker

before running rails generate react:install
source_entry_path: packs

```bash
./bin/webpacker-dev-server
```

# testing

yarn add --dev jest
yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer
yarn add --dev @testing-library/react
yarn add -D jest-environment-jsdom
yarn add msw --dev
yarn add --dev react-select-event
yarn add --dev whatwg-fetch

## Setup

This version of the project requires only a sqlite3 database. After cloning this repo, install all gems with the `bundle install` on the command line. To set up the database and populate it with realistic sample records, run on the command line `rake db:populate`. The populate script will remove any old databases, create new development and test databases, run all the migrations to set up the structure and add in the triggers, and then create 240 owners with over 450 pets and several thousand visits. (Every run will generate a different set of data and because of the large numbers and the callbacks used, it will take a few minutes.)

To verify the model and controller tests are functioning, simply run `rails test` on the command line. The SimpleCov gem will create a coverage directory with an index.html file in it; open this file in a web browser to see the coverage provided.

The populate script will also create a vet user to login into the system. The username is 'vet' and the password is 'yodel' -- a tribute to VeggieTales' [The Yodeling Veterinarian of the Alps](https://www.youtube.com/watch?v=bUkpE16b56g).

If you want to load the testing context into the development database, you can do the following:

1. if you have previously populated the database, drop it and rerun `rails db:migrate` to recreate a blank db.
1. open `rails console`
1. type `require 'factory_bot_rails'` (it will say 'false')
1. type `require './test/contexts'` (it will say 'true')
1. type `include Contexts` (it will say 'Object')
1. type in whatever context building method you wish (e.g., `create_animals`)

or...

you could just run `rake db:contexts` and let that script do it for you. ;)
