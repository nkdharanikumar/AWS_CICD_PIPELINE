const circumference = 339.292; // 2 * pi * 54

function setProgress(percent, elementId) {
    const ring = document.getElementById(elementId);
    if (!ring) return;

    // Calculate offset
    const offset = circumference - (percent / 100) * circumference;
    ring.style.strokeDashoffset = offset;

    // Change color based on threshold (e.g., >85% is red)
    if (percent >= 85) {
        ring.style.stroke = 'var(--accent-red)';
        ring.style.filter = 'drop-shadow(0 0 5px var(--accent-red-glow))';
    } else {
        // Reset color based on card (default colors handled in CSS, so just remove inline overrides)
        ring.style.stroke = '';
        ring.style.filter = '';
    }
}

function animateValue(element, start, end, duration) {
    if (!element) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        // Easing function outQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);

        const current = (start + (end - start) * easeProgress).toFixed(1);
        element.textContent = current;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end.toFixed(1);
        }
    };
    window.requestAnimationFrame(step);
}

let lastData = {
    cpu: 0,
    mem: 0,
    disk: 0
};

async function fetchMetrics() {
    try {
        const response = await fetch('/api/metrics');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // Update Host Info
        document.getElementById('sys-hostname').textContent = `Host: ${data.system.hostname}`;
        document.getElementById('sys-ip').textContent = `IP: ${data.system.ip}`;

        // Update CPU
        const cpuEl = document.getElementById('cpu-val');
        animateValue(cpuEl, lastData.cpu, data.cpu.percent, 800);
        setProgress(data.cpu.percent, 'cpu-ring');
        document.getElementById('cpu-cores').textContent = data.cpu.cores;
        lastData.cpu = data.cpu.percent;

        // Update Memory
        const memEl = document.getElementById('mem-val');
        animateValue(memEl, lastData.mem, data.memory.percent, 800);
        setProgress(data.memory.percent, 'mem-ring');
        document.getElementById('mem-used').textContent = data.memory.used_gb;
        document.getElementById('mem-total').textContent = data.memory.total_gb;
        lastData.mem = data.memory.percent;

        // Update Disk
        const diskEl = document.getElementById('disk-val');
        animateValue(diskEl, lastData.disk, data.disk.percent, 800);
        setProgress(data.disk.percent, 'disk-ring');
        document.getElementById('disk-used').textContent = data.disk.used_gb;
        document.getElementById('disk-total').textContent = data.disk.total_gb;
        lastData.disk = data.disk.percent;

        // Ensure status badge is healthy
        const badge = document.getElementById('env-status');
        if (badge.textContent !== 'Live') {
            badge.textContent = 'Live';
            badge.parentElement.style.borderColor = 'rgba(16, 185, 129, 0.2)';
            badge.parentElement.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            document.querySelector('.pulse-dot').style.backgroundColor = 'var(--accent-green)';
        }

    } catch (error) {
        console.error("Error fetching metrics:", error);

        // Update UI to error state
        const badge = document.getElementById('env-status');
        badge.textContent = 'Disconnected';
        badge.parentElement.style.borderColor = 'var(--accent-red)';
        badge.parentElement.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        document.querySelector('.pulse-dot').style.backgroundColor = 'var(--accent-red)';
    }
}

// Initial fetch
fetchMetrics();

// Poll every 2.5 seconds
setInterval(fetchMetrics, 2500);
