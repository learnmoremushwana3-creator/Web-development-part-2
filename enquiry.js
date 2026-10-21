// Find the enquiry form and message elements
const enquiryForm = document.getElementById("enquiryForm");
const enquiryError = document.getElementById("enquiryError");
const enquirySuccess = document.getElementById("enquirySuccess");

// Replace this with your real business email address
const businessEmail = "info@braaimasters.co.za";

// Handle form submission
enquiryForm.addEventListener("submit", function (event) {

    // Prevent the form from submitting automatically
    event.preventDefault();

    // Read the customer's information
    const customerName = document
        .getElementById("customerName")
        .value.trim();

    const customerEmail = document
        .getElementById("customerEmail")
        .value.trim();

    const customerPhone = document
        .getElementById("customerPhone")
        .value.trim();

    const enquiryType = document
        .getElementById("enquiryType")
        .value;

    const eventDate = document
        .getElementById("eventDate")
        .value;

    const guestCount = document
        .getElementById("guestCount")
        .value;

    const budget = document
        .getElementById("budget")
        .value;

    const enquiryMessage = document
        .getElementById("enquiryMessage")
        .value.trim();

    // Clear previous messages
    enquiryError.textContent = "";
    enquirySuccess.textContent = "";

    // Validate the customer's name
    if (customerName.length < 2) {
        enquiryError.textContent =
            "Please enter your full name using at least 2 characters.";
        return;
    }

    // Validate the email address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(customerEmail)) {
        enquiryError.textContent =
            "Please enter a valid email address.";
        return;
    }

    // Validate the South African phone number
    const phonePattern = /^(\+27|0)[0-9 ]{9,13}$/;

    if (!phonePattern.test(customerPhone)) {
        enquiryError.textContent =
            "Please enter a valid South African phone number starting with 0 or +27.";
        return;
    }

    // Make sure an enquiry type is selected
    if (enquiryType === "") {
        enquiryError.textContent =
            "Please select your type of enquiry.";
        return;
    }

    // Validate the number of guests when provided
    if (
        guestCount !== "" &&
        (
            Number(guestCount) < 1 ||
            Number(guestCount) > 10000
        )
    ) {
        enquiryError.textContent =
            "Please enter a guest number between 1 and 10,000.";
        return;
    }

    // Validate the budget when provided
    if (budget !== "" && Number(budget) < 0) {
        enquiryError.textContent =
            "Please enter a valid budget.";
        return;
    }

    // Validate the enquiry message
    if (enquiryMessage.length < 10) {
        enquiryError.textContent =
            "Please provide more information using at least 10 characters.";
        return;
    }

    // Prepare the email subject
    const subject =
        "Braai Masters Enquiry - " + enquiryType;

    // Prepare the email body
    const body =
        "BRAAI MASTERS CUSTOMER ENQUIRY\n\n" +
        "Customer Name: " + customerName + "\n" +
        "Email Address: " + customerEmail + "\n" +
        "Phone Number: " + customerPhone + "\n" +
        "Enquiry Type: " + enquiryType + "\n" +
        "Event Date: " + (eventDate || "Not specified") + "\n" +
        "Number of Guests: " + (guestCount || "Not specified") + "\n" +
        "Estimated Budget: " +
        (budget ? "R" + budget : "Not specified") + "\n\n" +
        "Additional Information:\n" + enquiryMessage;

    // Build the email link
    const mailtoLink =
        "mailto:" + businessEmail +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    // Show feedback before opening the email application
    enquirySuccess.textContent =
        "Your enquiry has been validated. Opening your email application...";

    // Open the customer's configured email application
    window.location.href = mailtoLink;

});