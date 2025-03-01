let habits = [];


function addHabit() {
   
    let habitText = document.getElementById('habitInput').value;
    let priority = document.getElementById('priorityInput').value;
    
    
    if (habitText !== '') {
      
        let habit = {
            text: habitText,
            priority: priority,
            count: 0,
            id: Date.now() //create unique id
        };
        
       
        habits.push(habit);
        
        // Clear input
        document.getElementById('habitInput').value = '';
        
        // Updatedisplay
        displayHabits();
    } else {
        alert('Please enter a habit!');
    }
}

function increaseCount(id) {
    
    
    for (let habit of habits) {
        if (habit.id === id) {
            habit.count++;
            break;
        }
    }
    displayHabits();
}

function decreaseCount(id) {
    

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


