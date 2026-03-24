function executeSearch() {
  const query = document.getElementById('user-search-input').value.toLowerCase();
  const hero = document.querySelector('.hero-slideshow');
  const resultsArea = document.getElementById('search-results-area');
  const resultsList = document.getElementById('results-list');
  const termDisplay = document.getElementById('search-term-display');

  if (query.trim() === "") return; // Don't search if empty


  hero.style.display = 'none';
  resultsArea.style.display = 'block';
  termDisplay.innerText = query;

  const matches = searchIndex.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.category.toLowerCase().includes(query)
  );

  resultsList.innerHTML = "";
  if (matches.length > 0) {
    matches.forEach(item => {
      resultsList.innerHTML += `
        <div class="result-card">
          <h3><a href="${item.link}">${item.title}</a></h3>
          <p>${item.category}</p>
        </div>`;
    });
  } else {
    resultsList.innerHTML = "<p>No matches found.</p>";
  }
}

function closeSearch() {
  document.querySelector('.hero-slideshow').style.display = 'block';
  document.getElementById('search-results-area').style.display = 'none';
}