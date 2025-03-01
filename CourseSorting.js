// Define the semesters in chronological order for sorting purposes
const semesterOrder = [
    "Fall 2022",
    "Winter 2023",
    "Spring 2023",
    "Fall 2023",
    "Winter 2024",
    "Spring 2024",
    "Fall 2024",
    "Winter 2025"
];

// Function to add sorting controls to the page
function addSortingControls() {
    // Create the sorting controls container
    const sortingControls = document.createElement('div');
    sortingControls.className = 'text-center mb-4';

    // Add a label and sorting buttons
    sortingControls.innerHTML = `
    <div class="btn-group" role="group" aria-label="Sorting options">
      <button type="button" class="btn btn-outline-primary" id="sortAscending">
        <i class="fas fa-sort-amount-down-alt me-2"></i>Oldest First
      </button>
      <button type="button" class="btn btn-primary" id="sortDescending">
        <i class="fas fa-sort-amount-down me-2"></i>Newest First
      </button>
    </div>
  `;

    // Insert the sorting controls after the horizontal rule (hr)
    const targetElement = document.querySelector('hr:nth-of-type(2)');
    if (targetElement) {
        targetElement.insertAdjacentElement('afterend', sortingControls);
    }

    // Add event listeners to the sorting buttons
    document.getElementById('sortAscending').addEventListener('click', function() {
        sortSections('ascending');
        toggleActiveButton(this, document.getElementById('sortDescending'));
    });

    document.getElementById('sortDescending').addEventListener('click', function() {
        sortSections('descending');
        toggleActiveButton(this, document.getElementById('sortAscending'));
    });
}

// Function to toggle active state between buttons
function toggleActiveButton(activeButton, inactiveButton) {
    activeButton.classList.remove('btn-outline-primary');
    activeButton.classList.add('btn-primary');

    inactiveButton.classList.remove('btn-primary');
    inactiveButton.classList.add('btn-outline-primary');
}

// Function to sort the semester sections
function sortSections(direction) {
    const container = document.querySelector('.container');
    const sections = Array.from(document.querySelectorAll('section.mb-5'));

    // Sort the sections based on semester order
    sections.sort((a, b) => {
        const headerA = a.querySelector('h2').textContent.trim();
        const headerB = b.querySelector('h2').textContent.trim();

        const indexA = semesterOrder.indexOf(headerA);
        const indexB = semesterOrder.indexOf(headerB);

        return direction === 'ascending' ? indexA - indexB : indexB - indexA;
    });

    // Find the element after which sections should be inserted
    const sortingControls = document.querySelector('.btn-group[role="group"][aria-label="Sorting options"]');
    const insertAfterElement = sortingControls ?
        sortingControls.closest('div') :
        document.querySelector('hr:nth-of-type(2)');

    // Re-append sections in sorted order
    sections.forEach(section => {
        container.insertBefore(section, insertAfterElement.nextElementSibling);
    });
}

// Force all sections to be collapsed
function collapseAllSections() {
    // Get all collapse elements
    const collapseElements = document.querySelectorAll('.collapse');

    // Reset all to collapsed state
    collapseElements.forEach(collapse => {
        const sectionHeader = collapse.parentElement.querySelector('h2');
        const arrow = sectionHeader ? sectionHeader.querySelector('i') : null;

        // Force remove the 'show' class
        collapse.classList.remove('show');

        // Update arrow direction
        if (arrow) {
            arrow.classList.remove('fa-chevron-up');
            arrow.classList.add('fa-chevron-down');
        }
    });
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // First override any default expanded sections
    collapseAllSections();

    // Add sorting controls
    addSortingControls();

    // Sort in descending order (newest first)
    sortSections('descending');
});