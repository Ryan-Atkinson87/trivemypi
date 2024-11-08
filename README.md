# Trive My Pi README

**This application was made to work with the Raspberry Pi 5.**

**Compatability with other models is unknown.**

**Please check which ports and make sure they work for your setup**

## Overview
The application is made up of:
- UnfluxDB database
- Flask backend server
- React frontend application

## Setting up the flask backend
- Before running the Flask backend, ensure the following software is installed:
    - Python 3
    - pip (Python’s package manager)
    - InfluxDB
        - Instructions below how to set this up

### Virtual Environment
- A virtual environment was used to manage dependencies:
- To start virtual environment

    ```bash
    python3 -m venv venv
    ```

    Linux.macOS:

    ```bash
    source venv/bin/activate
    ```

    windows:

    ```bash
    venv\Scripts\activate
    ```

Once virtual environment is running, install the required rependencies

    ```bash
    pip install -r requirements.txt
    ```

## Starting the database:
### Install InfluxDB (Version 1) on the Raspberry Pi
- Download influxdb onto the the raspberry pi, if not already installed

    ```bash
    sudo apt update
    sudo apt install influxdb
    ```

- Start and enable to service

    ```bash
    sudo systemctl start influxdb
    sudo systemctl enable influxdb
    ```

### Configure InfluxDB
- Open the InfluxDB configuration file if any adjustments are needed, especially if you’re setting up authentication or changing default ports.
    - I kept everything standard for my build

    ```bash
    sudo nano /etc/influxdb/influxdb.conf
    ```

- Restart the InfluxDB service to apply any configuration changes

    ```bash
    sudo systemctl restart influxdb
    ```

### Access the InfluxDB CLI
- InfluxDB’s CLI can be accessed directly on the Raspberry Pi by typing

    ```bash
    influx v1 shell
    ```

- This will open an interactive prompt where you can execute InfluxDB commands

### Set Up Your Database
- Inside the InfluxDB CLI, create a new database for your application. For example:

    ```sql
    CREATE DATABASE your_database_name
    ```

- Confirm it’s created by listing databases

    ```sql
    SHOW DATABASES
    ```

### Enable Authentication
- Edit the InfluxDB Configuration File
    - Open the InfluxDB configuration file (influxdb.conf).

    ```bash
    sudo nano /etc/influxdb/influxdb.conf
    ```

- Enable Authentication
    - In the configuration file, look for the [http] section. Inside this section, you’ll see an option auth-enabled, which is set to false by default. Change this setting to true to enable authentication.

    ```plaintext
    [http]
    # Determines whether HTTP authentication is enabled.
    auth-enabled = true
    ```

- Restart InfluxDB
    - After making this change, restart the InfluxDB service to apply the configuration.

        ```bash
        sudo systemctl restart influxdb
        ```

### Create an Admin User
- Setup your admin user with full read write privileges

    ```sql
    CREATE USER "your_username" WITH PASSWORD 'your_password' WITH ALL PRIVILEGES
    ```

## Setting up the React Frontend

- Before running the React frontend, make sure the following are installed:
    - Node.js
    - npm
    - A Running Flask Backend

- Install dependencies

    ```bash
    npm install
    ```

- To start the React development server run:

    ```bash
    npm start
    ```

## Starting the production servers
### Writing to the database
- Within ```backend/scripts``` there is a file ```write_db.py``` that will write stats to the database
- Start this file

    ```bash
    python3 write_db.py
    ```

### Start the flask server
- from within the ```backend/scripts``` directory

    ```bash
    flask run --host=0.0.0.0 --port=8000
    ```

### Start the React server
- Within the frontend directories

    ```bash
    npm run build
    ```

- If serve isn't installed

    ```bash
    npm install -g serve
    ```

- To serve the production build

    ```bash
    serve -s build
    ```

