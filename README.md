# NBA TCG

NBA TCG is a web application built with Django where users can collect NBA player cards, open packs, trade cards with other users, and participate in trivia-based game modes.

## Features

* User registration and authentication
* Daily card packs
* Card collection album
* Card trading system
* NBA trivia game mode
* Rarity system
* Responsive interface
* Django Admin support

## Technologies

* Python
* Django
* JavaScript
* HTML
* CSS
* Bootstrap
* SQLite (development)
* PostgreSQL (production)

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

## Game Modes

### Offline Duel

Players can wager a card and answer NBA trivia questions to earn rewards.

### Trading

Users can publish trades offering one card in exchange for another.

## Author

Mauro Ronconi
