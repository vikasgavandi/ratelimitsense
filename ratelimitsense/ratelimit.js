const axios = require('axios');
const fs = require('fs');
const path = require('path');
const process = require('process');

// Function to get today's date in YYYY-MM-DD format
const getCurrentDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Returns YYYY-MM-DD
};

// Dynamic log file based on today's date
const logFile = `request-log-${getCurrentDateString()}.txt`; // Log file for performance report
const startTime = new Date(); // Record the start time

const getParameters = () => {
    const args = process.argv.slice(2);
    const parameters = {
        targetURL: args[0] || 'https://www.example.com/',
        totalRequests: parseInt(args[1], 10) || 20,
        requestsPerSecond: parseInt(args[2], 10) || 1
    };

    // Input Validation
    if (!isValidURL(parameters.targetURL)) {
        console.error('Invalid URL provided.');
        process.exit(1);
    }
    if (isNaN(parameters.totalRequests) || parameters.totalRequests <= 0) {
        console.error('Total requests must be a positive integer.');
        process.exit(1);
    }
    if (isNaN(parameters.requestsPerSecond) || parameters.requestsPerSecond <= 0) {
        console.error('Requests per second must be a positive integer.');
        process.exit(1);
    }

    return parameters;
};

// Validate URL format
const isValidURL = (string) => {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\\.)+[a-z]{2,}|localhost|' + // domain name
        '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // OR ipv4
        '\\[?[a-f0-9]*:[a-f0-9:%.~]*\\])' + // OR ipv6
        '(\\:\\d+)?(\\/[-a-z0-9+&@#/%=~_|]*)*' + // path
        '(\\?[;&a-z0-9+&@#/%=~_|]*)?' + // query string
        '(\\#[-a-z0-9_]*)?$', // fragment locator
        'i' // case insensitive
    );
    return !!urlPattern.test(string);
};

// Get parameters
const { targetURL, totalRequests, requestsPerSecond } = getParameters();

// Counter to track the number of requests sent and errors
let requestsSent = 0;
let errorsEncountered = 0;

// Function to log messages to a date-wise file
const logMessage = (message) => {
    const logEntry = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFile, logEntry, 'utf8');
};

// Function to send a request
const sendRequest = async () => {
    try {
        const startTime = Date.now(); // Start time for the request
        const response = await axios.get(targetURL);
        const duration = Date.now() - startTime; // Calculate duration
        logMessage(`Response status: ${response.status} | Duration: ${duration} ms`);
    } catch (error) {
        errorsEncountered++;
        logMessage(`Request failed: ${error.message}`);
    }
};

// Function to send requests in batches per second
const sendBatchRequests = () => {
    let requestPromises = [];

    for (let i = 0; i < requestsPerSecond; i++) {
        if (requestsSent >= totalRequests) {
            clearInterval(batchInterval); // Stop when all requests are sent
            console.log('All requests sent.');
            logPerformanceReport(); // Log performance report when done
            break;
        }

        requestPromises.push(sendRequest());
        requestsSent++;
    }

    // Execute all requests for this batch
    Promise.all(requestPromises)
        .then(() => console.log(`Sent ${requestsSent} requests so far`))
        .catch((err) => {
            errorsEncountered++;
            console.error(`Error in batch: ${err.message}`);
        });
};

// Handle graceful shutdown
const shutdown = () => {
    console.log('Shutting down gracefully...');
    clearInterval(batchInterval);
    logPerformanceReport(); // Log performance report on shutdown
    process.exit(0);
};

// Log performance report
const logPerformanceReport = () => {
    const totalTime = Date.now() - startTime.getTime(); // Total time taken
    const report = `
Performance Report:
---------------------
Total Requests Sent: ${requestsSent}
Errors Encountered: ${errorsEncountered}
Total Time Taken: ${totalTime} ms
`;
    console.log(report);
    logMessage(report); // Log report to file
};

// Catch termination signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Send requests every second
const batchInterval = setInterval(sendBatchRequests, 1000);
