#!/bin/bash

# Start SQL Server
/opt/mssql/bin/sqlservr &

# Wait for SQL Server to start

# Run the initialization script
echo "Running the initialization script..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d master -i /init-db.sql

# Keep the container running
wait
