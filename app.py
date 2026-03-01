import os
import psutil
import socket
from flask import Flask, render_template, jsonify

app = Flask(__name__)

def get_system_metrics():
    # CPU
    cpu_percent = psutil.cpu_percent(interval=None) # Non-blocking
    cpu_cores = psutil.cpu_count(logical=True)
    
    # Memory
    mem = psutil.virtual_memory()
    mem_total = round(mem.total / (1024 ** 3), 2)  # GB
    mem_used = round(mem.used / (1024 ** 3), 2)    # GB
    mem_percent = mem.percent
    
    # Disk (Root directory usually, but on windows C: is better, we'll use root for cross-platform compatibility where possible, or fallback to current dir)
    try:
        disk = psutil.disk_usage('/')
    except:
        disk = psutil.disk_usage('C:\\' if os.name == 'nt' else '/')
    
    disk_total = round(disk.total / (1024 ** 3), 2)
    disk_used = round(disk.used / (1024 ** 3), 2)
    disk_percent = disk.percent
    
    # Network / Host
    hostname = socket.gethostname()
    try:
        ip_address = socket.gethostbyname(hostname)
    except:
        ip_address = "Unknown"

    return {
        "cpu": {
            "percent": cpu_percent,
            "cores": cpu_cores
        },
        "memory": {
            "total_gb": mem_total,
            "used_gb": mem_used,
            "percent": mem_percent
        },
        "disk": {
            "total_gb": disk_total,
            "used_gb": disk_used,
            "percent": disk_percent
        },
        "system": {
            "hostname": hostname,
            "ip": ip_address,
            "os": os.name
        }
    }

@app.route('/')
def dashboard():
    return render_template('index.html')

@app.route('/api/metrics')
def metrics():
    return jsonify(get_system_metrics())

@app.route('/health')
def health():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    # Initialize CPU percent calculation
    psutil.cpu_percent()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
