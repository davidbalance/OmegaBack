#!/bin/bash

# Server details (using environment variables)
SSH_PRIVATE_KEY=${SSH_PRIVATE_KEY}
SERVER_HOST=${SERVER_HOST}

# Connect to the server using SSH with the agent (no key management needed)
ssh -o StrictHostKeyChecking=no  -i $SSH_PRIVATE_KEY $SERVER_HOST

# You can add additional commands here to execute on the server after connecting
# For example, you might transfer files, run scripts on the server, etc.

# Exit the script
exit 0