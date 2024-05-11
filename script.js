const peopleList = document.getElementById('people-list');

function displayPeople(data) {
  // Loop through each row in the CSV data
  for (const row of data) {
    // Create table row for each person
    const rowElement = document.createElement('tr');

    // Loop through each field in the row
    for (const field of row) {
      // Create table cell for each field
      const cell = document.createElement('td');
      cell.textContent = field;
      rowElement.appendChild(cell);
    }

    // Append the row to the table body
    peopleList.appendChild(rowElement);
  }
}

fetch('cut-leaderboard.csv') // Replace with your actual CSV file name
  .then(response => response.text())
  .then(data => {
    // Split the CSV text into lines
    const lines = data.split('\n');

    // Remove leading/trailing whitespace from each line
    const trimmedLines = lines.map(line => line.trim());

    // Filter out empty lines
    const csvData = trimmedLines.filter(line => line.trim() !== '');

    // Convert lines into an array of data rows (assuming comma-separated)
    const rows = csvData.map(row => row.split(','));

    // Display the people data
    displayPeople(rows);
  })
  .catch(error => console.error("Error fetching CSV data:", error));
