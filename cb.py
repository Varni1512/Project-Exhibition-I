import streamlit as st
import time
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import os

# Sample labeled data (user prompts and their corresponding categories)
data = [
    ("I need help cleaning my room", "Room Cleaning"),
    ("Can you fix the leaking pipe?", "Plumber"),
    ("The light switch isn't working", "Electrician"),
    ("Please mop the floor in the kitchen", "Room Cleaning"),
    ("My sink is clogged", "Plumber"),
    ("There is a short circuit in the house", "Electrician"),
    ("I want the carpet vacuumed", "Room Cleaning"),
    ("My faucet is leaking", "Plumber"),
    ("The electric outlet is not working", "Electrician"),
    ("Can you scrub the bathroom?", "Room Cleaning"),
]

# Splitting the data into features (X) and labels (y)
X = [item[0] for item in data]  # User prompts
y = [item[1] for item in data]  # Corresponding categories

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a pipeline that first converts text into TF-IDF features and then uses a Naive Bayes classifier
model = make_pipeline(TfidfVectorizer(), MultinomialNB())

# Train the model on the training data
model.fit(X_train, y_train)

# Test the model and calculate accuracy
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

# Streamlit app
st.title("Request Categorization Chatbot")
st.write("This chatbot categorizes user requests into specific service categories like Room Cleaning, Plumber, or Electrician.")

# Input for user prompt
user_prompt = st.text_input("Enter your request:")

if user_prompt:
    # Predict the category of the prompt
    category = model.predict([user_prompt])[0]
    st.write(f"**Your request has been categorized as:** {category}")

    # Collect user details
    st.write("Please provide your details below:")
    name = st.text_input("Name:")
    phone = st.text_input("Phone Number:")
    room_number = st.text_input("Room Number:")

    if st.button("Submit"):
        if name and phone and room_number:
            # Format the data for saving
            details = (
                f"Category: {category}\n"
                f"Name: {name}\n"
                f"Phone: {phone}\n"
                f"Room Number: {room_number}\n\n"
            )

            # Save the details to a text file
            with open("user_requests.txt", "a") as file:
                file.write(details)

            st.success("Your details have been saved.")

            # Wait for 2 seconds and redirect to ticket.html
            time.sleep(2)
            st.experimental_rerun()  # Refresh the app
        else:
            st.error("Please fill in all the fields.")
