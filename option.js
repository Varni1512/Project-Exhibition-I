// JavaScript to show/hide fields based on ticket category selection
function toggleFields() {
  var category = document.getElementById("ticket-category").value;
  var subcategorySection = document.getElementById("subcategory-section");
  var civilFieldsSection = document.getElementById("civil-fields-section");
  var hostelBlockSection = document.getElementById("hostel-block-section");
  var roomNumberSection = document.getElementById("room-number-section");
  var slotsSection = document.getElementById("slots-section");

  // Initially hide all sections except basic fields
  subcategorySection.style.display = "none";
  civilFieldsSection.style.display = "none";
  hostelBlockSection.style.display = "none";
  roomNumberSection.style.display = "none";
  slotsSection.style.display = "none";

  // Show Problem Subcategory for Electrical issues in Hostels
  if (category && category.includes("electrical") && (category.includes("boys") || category.includes("girls"))) {
    subcategorySection.style.display = "block";
  }

  // Show Hostel-related fields
  if (category && (category.includes("boys") || category.includes("girls"))) {
    hostelBlockSection.style.display = "block";
    roomNumberSection.style.display = "block";
    slotsSection.style.display = "block";
  }

  // Show Civil Work additional fields for "Other Buildings"
  if (category && category.includes("other")) {
    civilFieldsSection.style.display = "block";
  }
}
