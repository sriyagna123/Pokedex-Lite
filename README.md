📘 Pokedex Lite

🔗 Live Demo: (https://pokedex-lites.netlify.app/)

🚀 Overview

Pokedex Lite is a responsive web application that allows users to explore Pokémon data in an intuitive and visually appealing interface.
The application fetches real-time data from the PokéAPI and provides features such as search, filtering, pagination, and favorites management.

This project was built to demonstrate strong frontend development skills, including clean UI design, efficient state management, and scalable code architecture.

✨ Features
🔍 Search Pokémon
Search Pokémon by name with real-time filtering.
🎯 Filter by Type
Filter Pokémon based on their types (Fire, Water, Grass, etc.).
📄 Pagination
Efficient data loading using pagination instead of fetching all data at once.
⭐ Favorites System
Mark/unmark Pokémon as favorites and persist data using localStorage.
📊 Detailed View
View detailed Pokémon information including:
Stats (HP, Attack, Defense)
Abilities
Types
📱 Fully Responsive UI
Optimized for mobile, tablet, and desktop screens.
⚡ Loading & Error Handling
Graceful handling of API loading states and errors.
🛠️ Tech Stack
Frontend: React / Next.js
Language: JavaScript / TypeScript
Styling: Tailwind CSS / CSS
API: PokéAPI
State Management: React Hooks
Persistence: localStorage
Deployment: Netlify / Vercel
📂 Project Structure
src/
 ├── components/
 │   ├── PokemonCard
 │   ├── SearchBar
 │   ├── Filter
 │   ├── Modal
 │
 ├── pages/
 │   └── Home
 │
 ├── services/
 │   └── api.js
 │
 ├── hooks/
 │   └── useFavorites.js
 │
 ├── App.js
 └── main.js
⚙️ Installation & Setup

Clone the repository:

git clone https://github.com/your-username/pokedex-lite.git
cd pokedex-lite

Install dependencies:

npm install

Run the development server:

npm run dev
🧠 Key Implementation Details
Used pagination (limit & offset) to optimize API calls and improve performance.
Implemented localStorage to persist user favorites across sessions.
Designed reusable components for better scalability.
Managed application state efficiently using React hooks.
Ensured accessibility and responsiveness across all devices.
⚡ Challenges Faced
Handling multiple API calls efficiently.
Managing search + filter + pagination together.
Maintaining clean UI while handling asynchronous data.
Persisting and syncing favorites without conflicts.
🔮 Future Improvements
Add animations and transitions for better UX
Implement server-side rendering (SSR)
Add authentication (OAuth login)
Improve performance with caching
📬 Submission Details
✅ GitHub Repository: https://github.com/sriyagna123/Pokedex-Lite
✅ Live URL: (https://pokedex-lites.netlify.app/)
🙌 Acknowledgements
Data provided by PokéAPI
Inspired by modern Pokédex applications and UI practices
⚠️ Disclaimer

This project is built for educational purposes only.
All Pokémon-related content belongs to Nintendo, Game Freak, and The Pokémon Company.
