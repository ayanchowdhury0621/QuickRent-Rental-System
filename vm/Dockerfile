# vm/Dockerfile
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV NAME World

# Run api/index.py when the container launches
CMD ["python", "backend/api/index.py"]
