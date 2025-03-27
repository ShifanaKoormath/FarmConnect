🌿 FarmConnect - Smart Farming Assistant
FarmConnect is a web-based platform that helps farmers with real-time weather updates, fact-checking agricultural news, and more.

🔧 Installation & Setup
1️⃣ Clone the Repository
bash
Copy code
git clone https://github.com/ShifanaKoormath/FarmConnect.git
cd FarmConnect
2️⃣ Setup the Backend
bash
Copy code
cd server
npm install
Install additional dependencies:

bash
Copy code


npm install axios multer express body-parser cors path

3️⃣ Setup the Chatbot
Install Python dependencies:
Ensure you have Python installed, then run:

bash
Copy code

pip install datasets scikit-learn

4️⃣ Start the Backend Server

bash
Copy code

node index.js

The server should run on:
http://localhost:5000/

5️⃣ Setup the Frontend
bash
Copy code

cd client
npm install react-markdown
npm install
npm start

The frontend should run on:
http://localhost:3000/

Go to:

http://localhost:3000/signup → for signing up

http://localhost:3000/login → for logging in

🚀 Features
✅ User Authentication (Signup/Login)
✅ Weather Forecast (Real-time weather updates)
✅ Pest Management
✅ News Fact-Checking (Validates agricultural news)
✅ Pest Management Alerts (Pest detection & treatment recommendations)
✅ Farming Chatbot (AI-powered agricultural assistant)
✅ Crop Price Prediction (Real-time & predicted prices)
✅ Dashboard (User-friendly interface)
✅ Chat Feature (Farmer-to-farmer communication)

🛠️ Technologies Used
Frontend:
React.js

Bootstrap

Backend:
Node.js

Express.js

Database:
MongoDB Atlas

APIs & Libraries:
OpenWeather API (Weather Forecast)

NewsAPI (Fact-Checking News)

Roboflow (Pest Detection)

Hugging Face Datasets (Chatbot Training Data)

Scikit-Learn (TF-IDF for Chatbot)

📄 Project Documentation
For detailed project documentation, refer to the FarmConnect.pdf file.

📞 Support
For any issues or contributions, feel free to open an Issue or Pull Request on GitHub.

updation:
cd server 
pip install datasets
