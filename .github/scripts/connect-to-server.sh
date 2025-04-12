#!/bin/bash

SERVER_HOST=${SERVER_USERNAME}
SERVER_HOST=${SERVER_PASSWORD}

# Load the private key from the environment variable
SSH_PRIVATE_KEY=${SSH_PRIVATE_KEY}

# Set the server hostname
SERVER_HOST=${SERVER_HOST}

# Create a temporary file to store the private key content
TMP_KEY_FILE=/tmp/ssh_key
echo "$SSH_PRIVATE_KEY" > "$TMP_KEY_FILE"

# Set permissions on the temporary key file (important for security)
chmod 600 "$TMP_KEY_FILE"

# Connect to the server using SSH with the agent (no key management needed)
ssh -o StrictHostKeyChecking=no  -i "$TMP_KEY_FILE" $SERVER_HOST

# Remove the temporary key file after use (optional but recommended)
rm "$TMP_KEY_FILE"

# You can add additional commands here to execute on the server after connecting
# For example, you might transfer files, run scripts on the server, etc.

# Exit the script
exit 0