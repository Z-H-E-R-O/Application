// Fetch food requests from localStorage and render them
function renderRequests() {
    const requests = JSON.parse(localStorage.getItem("foodRequests")) || [];
    const tableBody = document.getElementById("requestTableBody");
    tableBody.innerHTML = ""; // Clear existing rows

    requests.forEach((request, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${request.name}</td>
            <td>${request.email}</td>
            <td>${request.phone}</td>
            <td>${request.address}</td>
            <td>${request.category}</td>
            <td>${request.quantity}</td>
            <td>${request.needDate}</td>
            <td>${request.note || "N/A"}</td>
            <td>
                <button class="action-btn accept-btn" onclick="handleAction(${index}, 'accept')">Accept</button>
                <button class="action-btn decline-btn" onclick="handleAction(${index}, 'decline')">Decline</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function handleAction(index, action) {
const requests = JSON.parse(localStorage.getItem("foodRequests")) || [];
const recipients = JSON.parse(localStorage.getItem("recipients")) || [];

if (action === "accept") {
alert(`Request from ${requests[index].name} has been accepted.`);

// Add to recipients
recipients.push(requests[index]);
localStorage.setItem("recipients", JSON.stringify(recipients));
} else if (action === "decline") {
alert(`Request from ${requests[index].name} has been declined.`);
}

// Remove the request from the list
requests.splice(index, 1);
localStorage.setItem("foodRequests", JSON.stringify(requests)); // Update localStorage

// Re-render the table
renderRequests();
}

// Load requests when the page loads
document.addEventListener("DOMContentLoaded", renderRequests);