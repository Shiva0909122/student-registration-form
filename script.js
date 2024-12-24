// profile pic
const profilePicInput = document.getElementById("profile-pic");
const previewImage = document.getElementById("preview");

// Event listener to handle image input
profilePicInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    // Load the file and set it as the source of the preview image
    reader.onload = (e) => {
      previewImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
});

// Duration of course
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");
const durationInput = document.getElementById("duration");

function calculateDuration() {
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);

  // Check if both dates are valid
  if (startDate && endDate && endDate >= startDate) {
    const durationInMilliseconds = endDate - startDate;
    const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    durationInput.value = durationInDays; // Populate the duration field
  } else {
    durationInput.value = ""; // Clear the field if dates are invalid
  }
}

// Roll no & Certificate no
function generateNumbers() {
  const year = document.getElementById("year").value; // Get year from user input
  const department = document.getElementById("department").value; // Get department from user input
  const serial = parseInt(document.getElementById("serial").value, 10); // Get serial number from user input

  if (!year || !department || isNaN(serial)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  const rollNumber = `${year}-${department}-${serial.toString().padStart(1, '0')}`;
  const randomPart = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
  const certificateNumber = `ELC-${year}-${department}-${serial.toString().padStart(2, '0')}-${randomPart}`;

  document.getElementById("roll").value = rollNumber; // Set roll number in the input
  document.getElementById("certification").value = certificateNumber; // Set certificate number in the input
}

// Add event listeners for input changes
startDateInput.addEventListener("change", calculateDuration);
endDateInput.addEventListener("change", calculateDuration);

// ========== adding the student details to the database ======================== //
const backendUrl = 'http://localhost:5000'; // Update with your backend's actual URL

    async function addStudent() {
        // Gather form data
        const studentData = {
            name: document.getElementById('name').value,
            mobile: document.getElementById('mobile').value,
            parentMobile: document.getElementById('parent-mobile').value,
            email: document.getElementById('email').value,
            college: document.getElementById('address').value,
            course: document.getElementById('course').value,
            startDate: document.getElementById('start-date').value,
            endDate: document.getElementById('end-date').value,
            duration: document.getElementById('duration').value,
            year: document.getElementById('year').value,
            department: document.getElementById('department').value,
            serial: document.getElementById('serial').value,
            roll: document.getElementById('roll').value,
            certification: document.getElementById('certification').value,
        };

        try {
            // Send data to the backend
            const response = await fetch(`${backendUrl}/students`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData),
            });

            if (!response.ok) throw new Error('Failed to add student');

            // Refresh the student list
            fetchStudents();
        } catch (err) {
            console.error(err.message);
            alert('Error adding student');
        }
    }

    async function fetchStudents() {
        try {
            const response = await fetch(`${backendUrl}/students`);
            const students = await response.json();

            // Update the student list
            const studentList = document.getElementById('student');
            studentList.innerHTML = ''; // Clear the list

            students.forEach(student => {
                const li = document.createElement('li');
                li.textContent = `1.Name -> ${student.name} 2.Course -> ${student.course} 3.Roll No. -> ${student.roll}`;
                studentList.appendChild(li);
            });
        } catch (err) {
            console.error(err.message);
            alert('Error fetching students');
        }
    }

    // Fetch the student list on page load
    document.addEventListener('DOMContentLoaded', fetchStudents);
