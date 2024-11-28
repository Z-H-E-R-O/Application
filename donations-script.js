 // Fetch donations from localStorage and render them
 function renderDonations(filterCategory = "", filterDonor = "") {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];
    const tableBody = document.getElementById("donationTableBody");
    tableBody.innerHTML = ""; // Clear existing rows

    // Filter donations by category or donor
    const filteredDonations = donations.filter(donation => {
        return (
            (!filterCategory || donation.category === filterCategory) &&
            (!filterDonor || donation.name === filterDonor)
        );
    });

    // Display filtered donations
    filteredDonations.forEach(donation => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${donation.name}</td>
            <td>${donation.email}</td>
            <td>${donation.phone}</td>
            <td>${donation.address}</td>
            <td>${donation.category}</td>
            <td>${donation.quantity}</td>
            <td>${donation.item}</td>
            <td>${donation.foodDate}</td>
            <td>${donation.note}</td>
        `;
        tableBody.appendChild(row);
    });

    // Update total donations counter
    const totalQuantity = filteredDonations.reduce((total, donation) => total + parseFloat(donation.quantity || 0), 0);
    document.getElementById("totalDonations").innerText = `Total Donations per kg: ${totalQuantity} `;

    // Update total item counter
    const totalItem = filteredDonations.reduce((total, donation) => total + parseFloat(donation.item|| 0), 0);
    document.getElementById("totalItems").innerText = `Total Donations per item: ${totalItem} `;
}


// Handle filter changes
function handleFilterChange() {
    const categoryFilter = document.getElementById("categoryFilter").value;
    const donorFilter = document.getElementById("donorFilter").value;
    renderDonations(categoryFilter, donorFilter);
}

// Load data when the page loads
document.addEventListener("DOMContentLoaded", () => {
    renderDonations();

    // Populate filter dropdowns
    const donations = JSON.parse(localStorage.getItem("donations")) || [];
    const categories = [...new Set(donations.map(donation => donation.category))];
    const donors = [...new Set(donations.map(donation => donation.name))];

    const categoryFilter = document.getElementById("categoryFilter");
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    const donorFilter = document.getElementById("donorFilter");
    donors.forEach(donor => {
        const option = document.createElement("option");
        option.value = donor;
        option.textContent = donor;
        donorFilter.appendChild(option);
    });
});