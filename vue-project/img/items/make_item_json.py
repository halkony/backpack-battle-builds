# %%
import json
import pathlib

# Get the directory path
dir_path = pathlib.Path('.')

# Create an empty list to store the file names
file_names = []

# Loop through the files in the directory
for file_path in dir_path.iterdir():
    # Check if the file is a regular file (not a directory)
    if file_path.is_file():
        # Add the file name to the list
        file_names.append(file_path.stem)

# Convert the list to a JSON string
with open('items.json', 'w') as file:
    json_str = json.dump(file_names, file)

# Print the JSON string
print(json_str)
