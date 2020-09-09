# Todo api with NodeJS, Polka and MSSQL

This is testbed for MS SQL server with NodeJS. Polka web server setup is copied from [todo-api-bench project](https://github.com/dmijatovic/todo-api-bench/tree/master/todo-polka-api).

## MSSQL NodeJS library

For MSSQL connection pool and queries we use [node-mssql library](https://github.com/tediousjs/node-mssql#pool-management)

## Usage

To start api service use `docker-compose up` command. The service will be avaliable on http://localhost:8080.

To run loadtest with autocannon execute `loadtest.sh` (Linux/Mac only). Performed steps from this file are:

```bash
#!/bin/bash
# start solution in detached mode
docker-compose up -d
# wait 30 sec
echo "wait for containers to settle"
sleep 30
# run load test
npm test
# close solution and clear volumes
docker-compose down --volumes
# message
echo "Load test completed..."
```

Note! You might need to mark loadtest.sh as executable

```bash
# make it executable
sudo chmod +x ./loadtest.sh
```

## Remarks

Compared to similair api with Postgres database the performance of MSSQL api solution seem to be lower. Maybe there are some optimizations that can make api performance better?

This api load test shows about 50k requests are handled within 30 seconds test. Similair api using Postgres handles about 100k in 30 seconds.

```bash
# nodejs-polka-mssql-todo-api (thisone)
48k requests in 30.06s, 27.7 MB read
Saved to lowdb json file
IdNotRetuned:  0

# nodejs-polka-postgres-todo-api
# https://github.com/dmijatovic/todo-api-bench/tree/master/todo-polka-api
104k requests in 30.04s, 59.8 MB read
IdNotRetuned tot: 0, lists: 0, items:0
Created tot: 29839, lists: 14921, items: 14918
Saved to lowdb json file
```
