

## Prerequisites without docker

Ensure you have `npm` and node installed on your local machine.

To check if `npm` is installed, run:

```
npm -v
```

To check if `node` is installed, run:

```
node -v
```

If these commands are not recognized, you can install Node.js and npm
from [Node.js Downloads](https://nodejs.org/en/download/package-manager).

Linux Installation
For Linux users, install Node.js and npm using the following commands:

```
sudo apt update
sudo apt install nodejs
sudo apt install npm
nodejs -v # to check Node.js version
npm -v # to check npm version

```

For more detailed instructions, refer to
this [DigitalOcean tutorial.](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)

## Getting Started

1- Clone the repository:

```
git clone "url of the repository"
cd "file's name"

```

2- Install dependencies:

```
npm install --force

```

3- Run the application:

```
npm start

```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser. The page will reload when
you make changes and you
may see lint errors in the console.

## Environment Configuration

The project connects to a backend API that should run on [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/). If you need to
change this, update the .env file in the project root.

The `.env` file includes:

```
REACT_APP_BASE_DASHBOARD_URL=/
BACKEND_API_URL=http://127.0.0.1:8000/api/

```

### Running with Docker

To run the application with Docker, follow these steps:

1. Ensure you have Docker installed. For installation instructions, visit [Docker Downloads](https://www.docker.com/products/docker-desktop).

2. Build and run the containers:

```
 docker build -t article-react-app .
 docker run -d -p 3000:3000 --name article-container article-react-app:latest 

```


3. The application will be available at [http://localhost:3000](http://localhost:3000).

### Docker Environment Configuration

When running with Docker, update the `.env` file as follows:


```

REACT_APP_BACKEND_URL=http://localhost:80/api/ NODE_ENV=production
```


This will ensure the frontend connects to the correct backend URL.

### Additional Information

- Ensure Docker is running before executing the Docker commands.
- If you need to stop the containers, run: