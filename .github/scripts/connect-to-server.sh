#!/bin/bash

# Server details (using environment variables)
SERVER_HOST=${SERVER_HOST}
SERVER_USERNAME=${SERVER_USERNAME}

# Connect to the server using SSH with the agent (no key management needed)
ssh -o StrictHostKeyChecking=no  -A $SERVER_USERNAME@$SERVER_HOST

# You can add additional commands here to execute on the server after connecting
# For example, you might transfer files, run scripts on the server, etc.

# Exit the script
exit 0