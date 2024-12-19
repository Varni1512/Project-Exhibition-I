document.getElementById('loadComplaints').addEventListener('click', async function () {
    try {
        const response = await fetch('http://localhost:3000/getComplaints'); // Fetch all complaints data

        if (response.ok) {
            const complaints = await response.json();
            const tableBody = document.querySelector('#complaintsTable tbody');
            tableBody.innerHTML = ''; // Clear previous data

            complaints.forEach(complaint => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${complaint.ticket_subject || '-'}</td>
                    <td>${complaint.ticket_category || '-'}</td>
                    <td>${complaint.contact_number || '-'}</td>
                    <td>${complaint.subcategory || '-'}</td>
                    <td>${complaint.building || '-'}</td>
                    <td>${complaint.floor || '-'}</td>
                    <td>${complaint.location || '-'}</td>
                    <td>${complaint.hostel_block || '-'}</td>
                    <td>${complaint.room_number || '-'}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            console.error('Failed to fetch complaints:', response.status);
            alert('Error loading complaints. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while loading complaints. Please check your connection.');
    }
});