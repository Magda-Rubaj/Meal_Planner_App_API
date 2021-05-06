# Meal Planner App

Api for Meal Planner App https://github.com/Magda-Rubaj/Meal_Planner_App

### Requirements

* Python 3.8
* Postgresql

### Setup

* Create virtual enviroment of choice.
Example env set up: https://docs.python.org/3/library/venv.html
* Use the package manager [pip](https://pip.pypa.io/en/stable/) to install dependencies
```bash
pip install -r requirements.txt
```
* Create and configure postgresql database
* Create .env file at the same level as manage.py file, and set variables: 

 SECRET_KEY,  DEBUG,  DB_NAME,  DB_USER,  DB_PASSWORD, DB_HOST
* Run the commands: 
```bash
python manage.py makemigrations
python manage.py migrate
```
* To run the server:
```bash
python manage.py runserver
```
