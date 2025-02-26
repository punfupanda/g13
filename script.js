let habits = [];

// Function to add a new habit
function addHabit() {
    // Get input values
    let habitText = document.getElementById('habitInput').value;
    let priority = document.getElementById('priorityInput').value;
    
    // Check if habit text is not empty
    if (habitText !== '') {
        // Create new habit object
        let habit = {
            text: habitText,
            priority: priority,
            count: 0,
            id: Date.now() // Simple way to create unique id
        };
        
        // Add to habits array
        habits.push(habit);
        
        // Clear input
        document.getElementById('habitInput').value = '';
        
        // Update display
        displayHabits();
    } else {
        alert('Please enter a habit!');
    }
}

// Function to increase count
function increaseCount(id) {
    // Find the habit and increase its count
    for (let habit of habits) {
        if (habit.id === id) {
            habit.count++;
            break;
        }
    }
    displayHabits();
}

// Function to decrease count
function decreaseCount(id) {
    // Find the habit and decrease its count
    for (let habit of habits) {
        if (habit.id === id) {
            if (habit.count > 0) {
                habit.count--;
            }
            break;
        }
    }
    displayHabits();
}
