// ==================== Tab Switching ====================
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');

        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(tabContent => {
            tabContent.classList.add('hidden');
        });

        // Show selected tab content
        document.getElementById(tab).classList.remove('hidden');

        // Update active tab styles
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('tab-active', 'bg-white', 'text-gray-900');
            btn.classList.add('text-gray-600');
        });
        btn.classList.add('tab-active', 'bg-white', 'text-gray-900');
        btn.classList.remove('text-gray-600');
    });
});

// ==================== Dark Mode Toggle ====================
const darkToggle = document.getElementById('darkModeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('bg-gray-900');
    document.body.classList.toggle('text-white');

    const isDark = document.body.classList.contains('bg-gray-900');
    sunIcon.classList.toggle('hidden', isDark);
    moonIcon.classList.toggle('hidden', !isDark);
});

// ==================== Pomodoro Timer ====================
let timer;
let timeLeft = 25 * 60;
let isRunning = false;

const display = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timerStatus = document.getElementById('timerStatus');

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    pauseBtn.disabled = false;
    timerStatus.textContent = "Focus time started!";
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            timerStatus.textContent = "Time's up! Take a break.";
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    timerStatus.textContent = "Timer paused.";
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 25 * 60;
    isRunning = false;
    updateTimerDisplay();
    timerStatus.textContent = "Ready to focus? Click Start!";
    pauseBtn.disabled = true;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateTimerDisplay(); // Initial display

// ==================== World Clock ====================
const cities = {
    "ny": "America/New_York",
    "mumbai": "Asia/Kolkata",
    "tokyo": "Asia/Tokyo",
    "london": "Europe/London"
};

function updateWorldClocks() {
    const now = new Date();

    for (const [id, timeZone] of Object.entries(cities)) {
        const cityTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone });
        const cityDate = now.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', timeZone });

        document.getElementById(`${id}-time`).textContent = cityTime;
        document.getElementById(`${id}-date`).textContent = cityDate;
    }
}

setInterval(updateWorldClocks, 1000);
updateWorldClocks(); // Initial call

// ==================== To-Do List ====================
const taskInput = document.getElementById('taskInput');
const deadlineInput = document.getElementById('deadlineInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

function createTaskElement(taskText, deadline) {
    const taskItem = document.createElement('div');
    taskItem.className = 'bg-gray-100 p-4 rounded-xl flex justify-between items-center shadow-sm';

    const left = document.createElement('div');
    left.innerHTML = `<p class="font-semibold">${taskText}</p><p class="text-sm text-gray-500">Deadline: ${deadline || 'No deadline'}</p>`;

    const right = document.createElement('button');
    right.textContent = "✕";
    right.className = "text-red-500 hover:text-red-700 font-bold text-lg";
    right.addEventListener('click', () => taskItem.remove());

    taskItem.appendChild(left);
    taskItem.appendChild(right);
    return taskItem;
}

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const deadline = deadlineInput.value;

    if (taskText === "") return;

    const newTask = createTaskElement(taskText, deadline);
    if (document.querySelector('#taskList .text-center')) {
        document.querySelector('#taskList .text-center').remove();
    }

    taskList.appendChild(newTask);

    taskInput.value = '';
    deadlineInput.value = '';
});
