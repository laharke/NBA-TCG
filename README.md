# NBA TCG

NBA TCG is a web application built with Django where users can collect NBA player cards, open packs, trade cards with other users, and participate in trivia-based game modes.

## Features

* User registration and authentication
* Daily card packs
* Card collection album
* Card trading system
* NBA trivia game mode
* Rarity system

## Technologies

* Python
* Django
* JavaScript
* jQuery
* HTML
* CSS
* Bootstrap
* SQLite (development)
* PostgreSQL (production on Render)

## Distinctiveness and Complexity

This project differs significantly from the applications developed throughout the course. Its complexity is comparable to, and in some aspects exceeds, that of an e-commerce platform or social network clone. The application required managing multiple interconnected entities, including users, cards, collections, trades, and wagers/bets, while enforcing a variety of rules and restrictions.

Unlike a traditional e-commerce application, where transactions generally follow a straightforward buyer-seller model, this project involves a more complex trading system in which ownership, availability, and trade validity must all be verified before an exchange can occur. This required careful consideration of database relationships and application logic.

Throughout development, I explored and evaluated different approaches to solving problems. For example, I experimented with various ways of storing players/cards data, eventually deciding to create a dedicated Django model (one thing I wanted to avoid). Similar design decisions were made for the trivia system, card management, and game mechanics. I also had to determine which responsibilities should be handled on the frontend and which should remain on the backend, balancing responsiveness, maintainability, and security, especially regarding the trivia parts where I didn't want users to 'hack' the game and find the correct answer but also didn't want to make one request per question, so I eneded up compromising on creating a small API that sends all the questions with their answers encoded.

Overall, the project combines user authentication, database design, game mechanics, trading functionality, collection management, and dynamic frontend interactions into a single application, making it substantially different from the projects completed during the course.


## Files

I don't think a through explantion is needed for each file i created, but to give a simple run down:
In the root projects there's a build.sh thats needed for deployment in Render. Theres also a small script called importar.py that reads the cards from a json file and adds them into the database.

Aside from that there's the common static folder with just a single Css file for the whole project.
Theres a data folder containing the jsons with the questions and players/cards information.
An imgs folder that has all the imgs used in the project.
And finally a JS folder where each HTML template has its own javascript file for the logic of the view.

The template folder has all the HTMLs used in the TCG.

And last but not least theres a utils folder where I have a mini library I made for cards queries called cards.py and the script I use to fill the database with cards.

## EXTRA INFO

Not much else to say, this project has a (hopefully still) working demo in https://nba-tcg.onrender.com/
It's been fun to combine my two passions and build something I'll probably keep working on, I want to add an online duel feature soon and some small QOLs regarding trading. 

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd NBA-TCG
```

Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Import cards:

```bash
python importar.py
```

Start the development server:

```bash
python manage.py runserver
```

## Author

Mauro Andres Ronconi
