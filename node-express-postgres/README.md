# DEV Jots Backend

<div align="center">

![DEV Jot Backend](./documentation/image.png)
[![GitHub Actions status](https://github.com/Cefalo/quick-meet/actions/workflows/build.yml/badge.svg)](https://github.com/parvez-ahammed/dev-jots-backend/actions/workflows/build_test.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/github/license/parvez-ahammed/winners-crud)](<(https://github.com/parvez-ahammed/dev-jots-backend?tab=AGPL-3.0-1-ov-file)%3E>)

</div>

This is Node.js project for the backend of the DEV Jots application. It is built utilizing the following technologies:

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white)

## Prerequisites

Make sure you have the following tools installed on your system:

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## Getting Started

1.  Clone this repository to your local machine.

    ```bash
    git clone https://github.com/parvez-ahammed/dev-jots-backend.git
    cd dev-jots-backend
    ```

2.  Copy the `.env.example` file and update the necessary environment variables.

    ```bash
        cp .env.example .env
    ```

3.  Start the Docker containers for the project.

    - Create a Docker network if not created called `dev-jots-net`.

        ```bash
        docker network create dev-jots-net
        ```

        ```bash
        docker compose up -d
        ```

        This will start the application, including its dependencies, in detached mode.

For further information, please refer to the [documentation](https://github.com/parvez-ahammed/dev-jots-backend/blob/develop/DOCUMENTATION.md).
