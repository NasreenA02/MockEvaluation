// Sidebar Navigation
const sidebarItems = document.querySelectorAll('.sidebar-item');

sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    sidebarItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// Timer Functionality
const timerBtn = document.getElementById('timerBtn');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');
const timerLabel = document.querySelector('.timer-label');
const timerTime = document.querySelector('.timer-time');

let timerInterval = null;
let seconds = 0;

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

timerBtn.addEventListener('click', () => {
  if (timerInterval) {
    // Stop timer
    clearInterval(timerInterval);
    timerInterval = null;
    timerBtn.classList.remove('running');
    
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
    timerLabel.classList.remove('hidden');
    timerTime.classList.add('hidden');
  } else {
    // Start timer
    timerInterval = setInterval(() => {
      seconds++;
      timerTime.textContent = formatTime(seconds);
    }, 1000);
    
    timerBtn.classList.add('running');
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
    timerLabel.classList.add('hidden');
    timerTime.classList.remove('hidden');
    timerTime.textContent = formatTime(seconds);
  }
});

// Task Item Click (Toggle Complete)
const taskItems = document.querySelectorAll('.task-item');

taskItems.forEach(item => {
  item.addEventListener('click', () => {
    const checkbox = item.querySelector('.task-checkbox');
    const title = item.querySelector('.task-title');
    const circle = checkbox.querySelector('.task-circle');
    const check = checkbox.querySelector('.task-check');
    
    if (title.classList.contains('task-completed')) {
      // Uncomplete task
      title.classList.remove('task-completed');
      if (check) {
        check.style.display = 'none';
      }
      if (circle) {
        circle.style.display = 'block';
      }
    } else {
      // Complete task
      title.classList.add('task-completed');
      if (circle) {
        circle.style.display = 'none';
      }
      if (check) {
        check.style.display = 'block';
      }
    }
  });
});

// Weekly Chart
const canvas = document.getElementById('weeklyChart');
const ctx = canvas.getContext('2d');

const data = [
  { day: 'Mon', hours: 7.5 },
  { day: 'Tue', hours: 5.5 },
  { day: 'Wed', hours: 8.2 },
  { day: 'Thu', hours: 6.8 },
  { day: 'Fri', hours: 7.0 },
  { day: 'Sat', hours: 3.5 },
  { day: 'Sun', hours: 2.0 }
];

function drawChart() {
  const padding = 40;
  const chartWidth = canvas.width - padding * 2;
  const chartHeight = canvas.height - padding * 2;
  const barWidth = chartWidth / data.length - 20;
  const maxHours = Math.max(...data.map(d => d.hours));
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw grid lines
  ctx.strokeStyle = '#e9d5ff';
  ctx.lineWidth = 1;
  
  for (let i = 0; i <= 4; i++) {
    const y = padding + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(padding, y);
    ctx.lineTo(canvas.width - padding, y);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  
  // Draw bars
  data.forEach((item, index) => {
    const barHeight = (item.hours / maxHours) * chartHeight;
    const x = padding + index * (chartWidth / data.length) + 10;
    const y = canvas.height - padding - barHeight;
    
    // Create gradient for each bar
    const gradient = ctx.createLinearGradient(x, y, x, canvas.height - padding);
    gradient.addColorStop(0, '#a78bfa');
    gradient.addColorStop(0.5, '#ec4899');
    gradient.addColorStop(1, '#60a5fa');
    
    // Draw bar with rounded top
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barHeight, [12, 12, 0, 0]);
    ctx.fill();
    
    // Draw day label
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.day, x + barWidth / 2, canvas.height - padding + 20);
    
    // Draw hours value on hover
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.fillText(item.hours + 'h', x + barWidth / 2, y - 8);
  });
  
  // Draw Y-axis labels
  ctx.fillStyle = '#9ca3af';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'right';
  
  for (let i = 0; i <= 4; i++) {
    const value = (maxHours / 4) * (4 - i);
    const y = padding + (chartHeight / 4) * i;
    ctx.fillText(value.toFixed(1), padding - 10, y + 4);
  }
}

// Polyfill for roundRect (for older browsers)
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radii) {
    const radius = Array.isArray(radii) ? radii : [radii, radii, radii, radii];
    
    this.moveTo(x + radius[0], y);
    this.lineTo(x + width - radius[1], y);
    this.arcTo(x + width, y, x + width, y + radius[1], radius[1]);
    this.lineTo(x + width, y + height - radius[2]);
    this.arcTo(x + width, y + height, x + width - radius[2], y + height, radius[2]);
    this.lineTo(x + radius[3], y + height);
    this.arcTo(x, y + height, x, y + height - radius[3], radius[3]);
    this.lineTo(x, y + radius[0]);
    this.arcTo(x, y, x + radius[0], y, radius[0]);
  };
}

// Draw chart on load
drawChart();

// Redraw chart on window resize
window.addEventListener('resize', drawChart);

// Add Task Button
const addTaskBtn = document.querySelector('.add-task-btn');

addTaskBtn.addEventListener('click', () => {
  alert('Add new task functionality would be implemented here!');
});
