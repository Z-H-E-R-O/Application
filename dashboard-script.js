document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from localStorage
    const donations = JSON.parse(localStorage.getItem("donations")) || [];
    const requests = JSON.parse(localStorage.getItem("foodRequests")) || [];
    const recipients = JSON.parse(localStorage.getItem("recipients")) || []; // Fetch approved requests

    // Aggregate food categories (for donations)
    const foodCategories = {
      freshProduce: 0,
      proteinSources: 0,
      grainsAndStarches: 0,
      cannedAndPackagedGoods: 0,
      snacksAndPantryStaples: 0,
      beverages: 0,
      babyAndSpecialtyItems: 0,
      personalCareAndHousehold: 0,
    };

     // Broader category mappings to specific categories
     const categoryMapping = {
        "Fresh Produce": ["freshProduce"],
        "Protein Sources": ["proteinSources"],
        "Grains and Starches": ["grainsAndStarches"],
        "Canned and Packaged Goods": ["cannedAndPackagedGoods"],
        "Snacks and Pantry Staples": ["snacksAndPantryStaples"],
        "Beverages": ["beverages"],
        "Baby and Specialty Items": ["babyAndSpecialtyItems"],
    };

    // Process each donation to assign quantities dynamically
    donations.forEach(donation => {
        if (donation.category) {
            // Match the donation's category to a broader group
            for (const [group, specificCategories] of Object.entries(categoryMapping)) {
                if (donation.category === group) {
                    // Add quantities to the relevant specific categories
                    specificCategories.forEach(specificCategory => {
                        if (foodCategories[specificCategory] !== undefined) {
                            foodCategories[specificCategory] += parseFloat(donation.quantity || 0);
                            foodCategories[specificCategory] += parseFloat(donation.item || 0);
                        }
                    });
                }
            }
        }
    });

    // Update category counts in the DOM
    for (const [key, value] of Object.entries(foodCategories)) {
        const countElement = document.getElementById(`${key}Count`);
        if (countElement) {
            countElement.textContent = value;
        }
    }

    // Aggregate summary data (include requests and recipients)
    const summaryData = {
        totalDonors: new Set(donations.map(donation => donation.name)).size, // Unique donors
        totalRequests: requests.length, // Total requests
        approvedRequests: recipients.length, // Total approved requests (recipients)
        totalFoodUnits: donations.reduce((total, donation) => total + parseFloat(donation.quantity || 0), 0), // Total donated food units
        totalFoodItems: donations.reduce((total, donation) => total + parseFloat(donation.item || 0), 0), // Total donated food item
    };

    // Update summary data in the DOM
    for (const [key, value] of Object.entries(summaryData)) {
        const summaryElement = document.getElementById(key);
        if (summaryElement) {
            summaryElement.textContent = value;
        }
    }
});