const enquiryForm = document.getElementById("enquiryForm");
const enquiryError = document.getElementById("enquiryError");
const enquirySuccess = document.getElementById("enquirySuccess");

const businessEmail = "info@braaimasters.co.za";

enquiryForm.addEventListener("submit", function (event) {

    event.preventDefault();

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

    enquiryError.textContent = "";
    enquirySuccess.textContent = "";

    if (customerName.length < 2) {
        enquiryError.textContent =
            "Please enter your full name using at least 2 characters.";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(customerEmail)) {
        enquiryError.textContent =
            "Please enter a valid email address.";
        return;
    }

    const phonePattern = /^(\+27|0)[0-9 ]{9,13}$/;

    if (!phonePattern.test(customerPhone)) {
        enquiryError.textContent =
            "Please enter a valid South African phone number starting with 0 or +27.";
        return;
    }

    if (enquiryType === "") {
        enquiryError.textContent =
            "Please select your type of enquiry.";
        return;
    }


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

    if (budget !== "" && Number(budget) < 0) {
        enquiryError.textContent =
            "Please enter a valid budget.";
        return;
    }

    if (enquiryMessage.length < 10) {
        enquiryError.textContent =
            "Please provide more information using at least 10 characters.";
        return;
    }

    const subject =
        "Braai Masters Enquiry - " + enquiryType;

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

    const mailtoLink =
        "mailto:" + businessEmail +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    enquirySuccess.textContent =
        "Your enquiry has been validated. Opening your email application...";

    window.location.href = mailtoLink;

});