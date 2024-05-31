#!/bin/bash

# Start SQL Server
/opt/mssql/bin/sqlservr & sleep 30

# Run the initialization script
echo "Running the initialization script..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d master

# Keep the container running
wait