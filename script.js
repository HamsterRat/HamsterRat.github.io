/**
 * Helping Hands - Main Site Logic
 * This script handles the internal search without interfering with the slideshow.
 */
// hi
document.addEventListener('DOMContentLoaded', () => {
    // 1. DATA: This acts as your "Search Index"
    const siteResources = [
        { title: "Food and Nutrition", url: "/Categories/foodnutrition", keywords: "hunger, pantry, meals, grocery, soup kitchen" },
        { title: "Health and Wellbeing", url: "/Categories/health", keywords: "doctor, clinic, mental health, medicine, hospital" },
        { title: "Employment and Education", url: "/Categories/employment", keywords: "jobs, resume, school, training, hiring" },
        { title: "Community Support", url: "/Categories/community", keywords: "shelter, help, volunteer, neighbors" },
        { title: "Sign Up to Volunteer", url: "/Make an Impact/Sign Up", keywords: "join, account, help" }
    ];

    // 2. ELEMENTS: Getting the parts of the page we need
    const searchInput = document.getElementById('user-search-input');
    const searchBtn = document.querySelector('.search-container button');
    const resultsArea = document.getElementById('search-results-area');
    const resultsList = document.getElementById('results-list');
    const termDisplay = document.getElementById('search-term-display');

    // 3. THE SEARCH FUNCTION
    function runInternalSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query === "") return; // Don't search for nothing!

        // Clear previous results
        resultsList.innerHTML = '';
        resultsArea.style.display = 'block';
        termDisplay.textContent = query;

        // Filter through the resources array
        const filtered = siteResources.filter(item => {
            return item.title.toLowerCase().includes(query) || 
                   item.keywords.toLowerCase().includes(query);
        });

        // Display results
        if (filtered.length > 0) {
            filtered.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <h3 style="margin-bottom: 5px;">
                        <a href="${item.url}" style="color: #2c3e50; text-decoration: none; border-bottom: 2px solid #3498db;">
                            ${item.title}
                        </a>
                    </h3>
                    <p style="color: #666; font-size: 0.9rem;">Found in: ${item.url}</p>
                    <hr style="opacity: 0.2; margin: 15px 0;">
                `;
                resultsList.appendChild(resultItem);
            });
        } else {
            resultsList.innerHTML = `<p>No local resources found for "<strong>${query}</strong>". Try searching for "Food" or "Health".</p>`;
        }

        // Smooth scroll to results
        resultsArea.scrollIntoView({ behavior: 'smooth' });
    }

    // 4. LISTENERS: Trigger search on click or Enter key
    if (searchBtn) {
        searchBtn.addEventListener('click', runInternalSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                runInternalSearch();
            }
        });
    }
});

// This stays outside the DOMContentLoaded so the 'onclick' in your HTML can find it
function closeSearch() {
    const resultsArea = document.getElementById('search-results-area');
    resultsArea.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}