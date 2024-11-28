// Fetch recipients from localStorage and render them
function renderRecipients() {
    const recipients = JSON.parse(localStorage.getItem("recipients")) || [];
    const tableBody = document.getElementById("recipientsTableBody");
    tableBody.innerHTML = ""; // Clear existing rows

    recipients.forEach(recipient => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${recipient.name}</td>
            <td>${recipient.email}</td>
            <td>${recipient.phone}</td>
            <td>${recipient.address}</td>
            <td>${recipient.category}</td>
            <td>${recipient.quantity}</td>
            <td>${recipient.needDate}</td>
            <td>${recipient.note || "N/A"}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Load recipients when the page loads
document.addEventListener("DOMContentLoaded", renderRecipients);