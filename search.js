// 1. Get the search term from the URL (e.g., ?q=food)
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q')?.toLowerCase();

const searchTermDisplay = document.getElementById('search-term');
const resultsContainer = document.getElementById('results-container');

if (query) {
  searchTermDisplay.innerText = query;

  // 2. Filter the data.js list
  const matches = searchIndex.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.description.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query)
  );

  // 3. Display the results
  if (matches.length > 0) {
    matches.forEach(item => {
      resultsContainer.innerHTML += `
        <div class="result-item">
          <h3><a href="${item.link}">${item.title}</a></h3>
          <p><strong>Category:</strong> ${item.category}</p>
          <p>${item.description}</p>
        </div>
      `;
    });
  } else {
    resultsContainer.innerHTML = "<p>No resources found. Try searching for 'Food' or 'Health'.</p>";
  }
}