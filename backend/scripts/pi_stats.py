import psutil

def get_cpu_usage():
    """
    returns the cpu utilisation of the raspberry pi for each CPU core as a list
    """
    return psutil.cpu_percent(interval=1, percpu=True)

def get_cpu_temp():
    """
    returns the cpu temperature
    """
    cpu_temp = psutil.sensors_temperatures()
    return cpu_temp['cpu_thermal'][0].current

def get_pcnt_memory():
    """
    returns the total available memory as a percentage
    """
    available_memory = psutil.virtual_memory()
    return available_memory.percent

def get_cpu_frequency():
    """
    returns the maximum frequency of the CPU
    """
    frequency_in_ghz = psutil.cpu_freq()
    return frequency_in_ghz.max / 1000


def get_total_memory():
    """
    returns the total memory for the raspberry pi in GB
    """
    total_memory = psutil.virtual_memory()
    memory_in_gb = total_memory.total / 1000000000
    return round(memory_in_gb, 2)