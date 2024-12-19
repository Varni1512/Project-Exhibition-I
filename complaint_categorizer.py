import os
import imagehash
from PIL import Image
import streamlit as st

# Path to the complaint image collection folder
COMPLAINT_IMAGES_PATH = "complaint_images"  # Folder where your complaint images are stored

# Function to get image hash
def get_image_hash(image_path):
    image = Image.open(image_path)
    return imagehash.average_hash(image)

# Function to find the best match based on hash comparison
def find_complaint_type(uploaded_image_hash):
    best_match = None
    min_difference = float('inf')  # Initialize with a large number
    best_category = None
    
    # Iterate over all folders (complaint categories) in the collection
    for category_folder in os.listdir(COMPLAINT_IMAGES_PATH):
        category_folder_path = os.path.join(COMPLAINT_IMAGES_PATH, category_folder)
        
        if os.path.isdir(category_folder_path):
            # Check all images in the current category folder
            for img_name in os.listdir(category_folder_path):
                img_path = os.path.join(category_folder_path, img_name)
                
                if img_path.endswith(('jpg', 'jpeg', 'png', 'gif')):  # Ensure it's an image file
                    # Calculate hash for the current image in the collection
                    img_hash = get_image_hash(img_path)
                    # Calculate hash difference (use absolute difference)
                    difference = abs(uploaded_image_hash - img_hash)  # Absolute difference
                    
                    if difference < min_difference:
                        min_difference = difference
                        best_match = img_path
                        best_category = category_folder
    
    # If no match was found, return None for both match and category
    if best_match is None:
        return None, None
    
    return best_match, best_category

# Streamlit UI
st.title('Complaint Image Categorization')

# Upload Image
uploaded_file = st.file_uploader("Upload a complaint image", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    # Show the uploaded image first
    uploaded_image = Image.open(uploaded_file)
    st.image(uploaded_image, caption="Uploaded Image", use_column_width=True)
    
    # Add a Submit button to trigger categorization
    if st.button("Submit"):
        # Load uploaded image and compute its hash
        uploaded_image_hash = get_image_hash(uploaded_file)

        # Find the best match and category from the complaint image collection
        best_match_path, best_category = find_complaint_type(uploaded_image_hash)

        # After showing the uploaded image, show the category message
        if best_match_path:
            st.subheader(f"The complaint is categorized as: {best_category}")
        else:
            st.subheader("Sorry, I am not able to categorize this complaint.")
