const peopleList = document.getElementById('people-list');
const container = document.querySelector('.container'); // Reference the container element
let sortedData = null; // Stores the currently sorted data
let sortOrder = 'asc'; // Initial sorting order (ascending)

// Function to create a circle element
function createCircle() {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.top = Math.random() * 100 + '%'; // Random top position (0-100%)
  circle.style.left = Math.random() * 100 + '%'; // Random left position (0-100%)

  container.appendChild(circle);

  // Start animation for the new circle
  circle.style.animation = 'animate 10s linear infinite';
}

// Function to generate random spawn intervals with a minimum wait time
function getRandomInterval() {
  const minWait = 5000; // Minimum wait time in milliseconds (5 seconds)
  return Math.floor(Math.random() * 3000) + minWait; // Random interval between minWait and 3 seconds more
}

// Initial circle creation (optional)
createCircle(); // Add an initial circle on page load (adjust as needed)

// Start spawning circles at random intervals with minimum wait
setInterval(() => {
  createCircle();
}, getRandomInterval());
// Function to display the leaderboard data with sorting and highlighting
function displayPeople(data) {
  sortedData = data.slice(); // Create a copy of the data for sorting

  const tableBody = document.getElementById('people-list').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear existing table content

  // Loop through each row and create table elements
  for (const row of sortedData) {
    const rowElement = document.createElement('tr');

    for (const fieldIndex in row) {
      const cell = document.createElement('td');
      cell.textContent = row[fieldIndex];
      rowElement.appendChild(cell);
    }

    // Add classes for gold, silver, and bronze rows based on the rank (first row, second row, third row)
    if (row[0] === '1') {
      rowElement.classList.add('gold-row');
    } else if (row[0] === '2') {
      rowElement.classList.add('silver-row');
    } else if (row[0] === '3') {
      rowElement.classList.add('bronze-row');
    }

    tableBody.appendChild(rowElement);
  }
}


// Function to sort data based on a specific column index
function sortData(columnIndex) {
  sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle sorting order
  sortedData.sort((a, b) => {
    if (a[columnIndex] > b[columnIndex]) {
      return sortOrder === 'asc' ? 1 : -1;
    } else if (a[columnIndex] < b[columnIndex]) {
      return sortOrder === 'asc' ? -1 : 1;
    } else {
      return 0; // Equal values, maintain order
    }
  });

  displayPeople(sortedData); // Re-display the table with sorted data
}

// ... (rest of your code for fetching and parsing the CSV data)

// Example usage (assuming you have a function to fetch and parse CSV data)
fetch('cut-leaderboard.csv') // Replace with your actual CSV file name
  .then(response => response.text())
  .then(data => {
    const parsedData = parseCSVData(data); // Replace with your parsing logic
    displayPeople(parsedData); // Display the leaderboard data
  })
  .catch(error => console.error("Error fetching CSV data:", error));

// Implement a function `parseCSVData` to handle parsing your specific CSV format
function parseCSVData(csvText) {
  // Split the CSV text into lines
  const lines = csvText.split('\n');

  // Remove leading/trailing whitespace from each line (optional)
  const trimmedLines = lines.map(line => line.trim());

  // Filter out empty lines
  const csvData = trimmedLines.filter(line => line.trim() !== '');

  // Convert lines into an array of data rows, assuming comma-separated
  return csvData.map(row => row.split(','));
}