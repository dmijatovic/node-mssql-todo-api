#!/bin/bash

# start solution
docker-compose up -d
# wait 30 sec
echo "wait 30 sec. for container to settle"
sleep 30
# run load test
npm test
# close solution and clear volumes
docker-compose down --volumes

echo "Load test completed..."