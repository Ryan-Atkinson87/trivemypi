To get project going:

- make sure backend environment is running
- make sure a terminal/other is running write_db.py to log the cpu/memory stats
- make sure app.py is running for background app
- make sure front-end is running either with npm start or serve -s build

scripts / commands that need running to start up development area:
- record values to db:
~/Projects/Development/trivemypi/backend/Scripts $ python3 write_db.py

- start up flask backend:
~/Projects/Development/trivemypi/backend/scripts $ flask run --host=0.0.0.0 --port=8000

- start up react frontend:
~/Projects/Development/trivemypi/frontend $ npm start

- (optional) query ddatabase directly:
~ $ influx v1 shell
USE pi_readings
SELECT * FROM cpu_stats

