# Dynamic Request Sender

Dynamic Request Sender is a Node.js application that sends a specified number of HTTP requests to a target URL, allowing users to customize the target URL, total requests, and requests per second. The application also logs each request's performance, status, and errors into a daily log file.

## Features

- **Dynamic Configuration**: Users can customize the following parameters:
  - `targetURL`: The URL to which requests will be sent.
  - `totalRequests`: The total number of requests to send.
  - `requestsPerSecond`: The number of requests to send every second.
  
- **Error Handling**: The application logs any request failures, providing insights into issues.

- **Performance Logging**: Each request's response status and time taken are logged for performance analysis.

- **Daily Log Files**: Logs are stored in a date-wise file format, ensuring easy organization and retrieval of logs.

## Prerequisites

- Node.js (v12 or later)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>



## How to use 
1. npm i ratelimitsense

## Install the required dependencies:
1. npm install axios


#### Run Following command on terminal 
1. node ratelimit.js <targetURL> <totalRequests> <requestsPerSecond>
4. example : node index.js https://www.example.com 50 5


### In this example:

* The application will send 50 requests to https://www.example.com.
* It will send 5 requests per second.
## Default Values:
* If you do not provide parameters, the application defaults to:

* targetURL: https://www.youtube.com/
* totalRequests: 20
* requestsPerSecond: 1

# Log Files
The application creates a log file named request-log-YYYY-MM-DD.txt in the project directory.
Each log entry records the date and time, response status, request duration, and any errors encountered.
Handling Graceful Shutdown
You can stop the application gracefully using Ctrl + C. This will ensure that all logs are written properly before the application exits.

# Contributing
Contributions are welcome! If you have suggestions for improvements or features, please fork the repository and submit a pull request.

# License
This project is licensed under the MIT License. See the LICENSE file for details.

# Author
Vikas Gavandi - Feel free to reach out for any questions or feedback.






### Notes on the README File

1. **Structure**: The README file is structured into sections that cover all essential aspects of the project.

2. **Customization**: Feel free to customize the "Author" section with your details and the repository URL in the "Installation" section.

3. **Additional Sections**: If you plan to add more features or have a detailed contribution guide, you can add sections accordingly.

4. **Markdown Formatting**: The README uses Markdown syntax for formatting, which is commonly used on platforms like GitHub.

You can save this text in a file named `README.md` in your project directory. This will help users understand how to use your application effectively.
#   r a t e l i m i t s e n s e  
 