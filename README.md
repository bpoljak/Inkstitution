<h1 align="center">Inkstitution</h1> <h2 align="left">About The Project</h2> <p align="left"><b>Inkstitution</b> is a web-based and mobile application that allows users to browse tattoo studios, book appointments with tattoo artists, and manage studio resources efficiently. This README provides a step-by-step guide for setting up the project locally, including database setup, backend and frontend configuration, and application usage instructions.</p> <h2 align="left">Built With</h2> <div align="left"> <img src="https://skillicons.dev/icons?i=mysql" height="40" alt="mysql logo" /> <img width="12" /> <img src="https://skillicons.dev/icons?i=express" height="40" alt="express logo" /> <img width="12" /> <img src="https://cdn.quasar.dev/logo-v2/512/logo.png" height="40" alt="vuejs logo" /> <img width="12" /> <img src="https://skillicons.dev/icons?i=nodejs" height="40" alt="nodejs logo" /> </div> <h2 align="left">Requirements</h2> <p align="left"><b>Before setting up the project, ensure you have the following installed:</b></p> <ul> <li>Node.js (Recommended: version 14.x or newer)</li> <li>npm (Comes with Node.js) or Yarn</li> <li>MySQL or MariaDB</li> <li>A browser for accessing the application (e.g., Chrome, Firefox)</li> </ul> <h2 align="left">Installation</h2> <h3 align="left">1. Clone the repository</h3> <p align="left">Run the following commands:</p> <pre>git clone https://github.com/bpoljak/Inkstitution.git 
cd Inkstitution</pre> <h3 align="left">2. Install dependencies</h3> <ul> <li><b>Install global Quasar CLI:</b></li> </ul> <pre>npm install -g @quasar/cli</pre>  <ul> <li><b>Install backend dependencies:</b></li> </ul> <pre>cd backend 
npm install</pre> <ul> <li><b>Install frontend dependencies:</b></li> </ul> <pre>cd ../frontend 
npm install</pre> <h2 align="left">Database Setup</h2> <h3 align="left">1. Start your MySQL/MariaDB server</h3> <p align="left">Ensure your database server is running locally or remotely.</p> <h3 align="left">2. Create the database</h3> <p align="left"><b>Log in to your MySQL CLI or use a tool like MySQL Workbench:</b></p> <pre>CREATE DATABASE inkstitution;</pre> <h3 align="left">3. Import the database structure and seed data</h3> <p align="left">Navigate to the root folder of the project and run:</p> <pre>mysql -u your_username -p inkstitution < /inkstitution.sql</pre> <p align="left"><b>Replace "your_username" with your MySQL username.</b></p> <h2 align="left">Configuration</h2> <h3 align="left">1. Backend environment variables</h3> <p align="left">Create a <b>.env</b> file in the <b>root</b> directory with the following content:</p> <pre>host=localhost 
user=your_database_user 
password=your_database_password 
database=inkstitution
port=3306</pre> <p align="left">Replace placeholders with your database credentials.</p> <h3 align="left">2. Frontend environment variables</h3> <p align="left">Create a <b>.env</b> file in the <b>frontend</b> directory with the following content:</p> <pre>VITE_GOOGLE_MAPS_API_KEY=your_api_key</pre> <p align="left"><b>To generate your API key:</b></p> <ol> <li>Go to the <a href="https://console.cloud.google.com/">Google Cloud Console</a>.</li> <li>Create a new project and enable the "Maps JavaScript API".</li> <li>Navigate to "APIs & Services > Credentials" and generate your API key.</li> </ol> <p align="left">Create a <b>.env.android</b> file with the following content:</p> <pre>API_URL=http://your_ip:3000 
VITE_GOOGLE_MAPS_API_KEY=your_api_key</pre> <p align="left"><b>To find your IP address:</b> Run <code>ipconfig</code> (Windows) or <code>ifconfig</code> (Mac/Linux) and use the IPv4 address under your network connection.</p> <p align="left">Create a <b>.env.development</b> file with the following content:</p> <pre>API_URL=http://localhost:3000</pre> <h2 align="left">Running the Application</h2> <h3 align="left">1. Start the backend server</h3> <p align="left">Navigate to the backend directory:</p> <pre>cd backend</pre> <p align="left">Start the server:</p> <pre>npx nodemon server.js</pre> <h3 align="left">2. Start the frontend server</h3> <p align="left">Navigate to the frontend directory:</p> <pre>cd frontend</pre> <p align="left">Start the development server:</p> <pre>quasar dev</pre> <p align="left">For mobile development:</p> <pre>quasar dev -m android</pre> <h2 align="left">Using the Application</h2> <p align="left">Follow these steps:</p> <ol> <li><b>Register/Login:</b> Create an account or log in to access personalized features.</li> <li><b>Browse Studios:</b> Explore tattoo studios, view their profiles, and check availability.</li> <li><b>Book Appointments:</b> Select a studio and artist, then book a time slot that suits you.</li> <li><b>Manage Appointments:</b> Logged-in users can view and manage their appointments via their profile.</li> <li><b>Admin Panel:</b> If you have administrative privileges, manage artists and bookings through the admin dashboard.</li> </ol> <h2 align="left">Conclusion</h2> <p align="left"><b>Inkstitution</b> is designed to streamline the management of tattoo studios and provide users with an intuitive way to book appointments and explore tattoo artistry. With this guide, you should have all the necessary steps to set up and run the project locally. If you encounter any issues or have suggestions for improvements, feel free to open an issue or contribute to the project. Thank you for exploring <b>Inkstitution</b>, and we hope it enhances your tattoo studio experience!</p>
