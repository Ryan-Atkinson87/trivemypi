import requests

response = requests.get("http://localhost:8000/api/cpu_stats")
print("Response Status Code:", response.status_code)
print("Response Content:", response.text)  # Print the raw response content

if response.status_code == 200:
    try:
        data = response.json()
        print("JSON Data:", data)
    except requests.exceptions.JSONDecodeError:
        print("Error: Response is not in JSON format.")
else:
    print("Error: Received status code", response.status_code)
