function runSimulation() {
    // Get input values
    const pages = document.getElementById('pages').value.split(',').map(Number);
    const framesCount = parseInt(document.getElementById('frames').value);
    const algorithm = document.getElementById('algorithm').value;

    // Initialize variables
    let memory = [];
    let pageFaults = 0;
    let pageHits = 0;
    let resultHTML = '<h2>Simulation Result</h2>';

    pages.forEach((page, index) => {
        let explanation = `Step ${index + 1}: Requested Page ${page} - `;
        let currentState;

        if (!memory.includes(page)) {
            pageFaults++;
            explanation += `<span class="page-fault">Page Fault occurred because Page ${page} is not in memory. </span>`;
            
            if (memory.length < framesCount) {
                explanation += `Loading Page ${page} into memory (space available).`;
                memory.push(page);
            } else {
                if (algorithm === 'FIFO') {
                    explanation += `Memory is full. Using FIFO, Page ${memory[0]} (the oldest page) is removed, and Page ${page} is loaded.`;
                    memory.shift(); // Remove the oldest page
                } else if (algorithm === 'LRU') {
                    explanation += `Memory is full. Using LRU, Page ${memory[0]} (the least recently used page) is removed, and Page ${page} is loaded.`;
                    memory.shift(); // Remove the least recently used page
                } else if (algorithm === 'MRU') {
                    explanation += `Memory is full. Using MRU, Page ${memory[memory.length - 1]} (the most recently used page) is removed, and Page ${page} is loaded.`;
                    memory.pop(); // Remove the most recently used page
                }
                memory.push(page);
            }
        } else {
            pageHits++;
            explanation += `<span class="page-hit">Page Hit occurred because Page ${page} is already in memory. </span>`;
            
            if (algorithm === 'LRU') {
                explanation += `Since LRU is used, Page ${page} is moved to the most recently used position.`;
                memory = memory.filter(p => p !== page); // Remove page
                memory.push(page); // Re-add it to the end
            } else if (algorithm === 'MRU') {
                explanation += `Since MRU is used, Page ${page} is moved to the most recently used position.`;
                memory = memory.filter(p => p !== page); // Remove page
                memory.push(page); // Re-add it to the end
            }
        }

        // Update memory state before displaying
        currentState = `[${memory.join(', ')}]`;

        // Display current memory state with an explanation
        resultHTML += `<div class="step"><p class="step-description">${explanation}<br>Current Memory State: <span class="memory-state">${currentState}</span></p></div>`;
    });

    resultHTML += `<p><strong>Total Page Faults:</strong> ${pageFaults}</p>`;
    resultHTML += `<p><strong>Total Page Hits:</strong> ${pageHits}</p>`;
    document.getElementById('result').innerHTML = resultHTML;
}

