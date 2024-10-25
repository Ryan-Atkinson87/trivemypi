import psutil

def get_cpu_usage():
    """
    returns the cpu utilisation of the raspberry pi for each CPU core as a list
    """
    return psutil.cpu_percent(interval=1, percpu=True)

def get_cpu_frequency():
    """
    return the frequency of each CPU core as a list
    """
    return psutil.cpu_freq()

def get_pcnt_memory():
    """
    returns the total available memory as a percentage
    """
    available_memory = psutil.virtual_memory()
    return available_memory.percent

def get_total_memory():
    """
    returns the total memory for the raspberry pi in GB
    """
    total_memory = psutil.virtual_memory()
    memory_in_gb = total_memory.total / 1000000000
    return round(memory_in_gb, 2)