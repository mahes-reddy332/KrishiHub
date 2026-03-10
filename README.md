# KrishiHub — AI-Powered Multilingual Agriculture Platform

An intelligent, multilingual platform that empowers Indian farmers with AI-driven crop health diagnosis, market price estimation, government scheme discovery, and labor management — all in one place.

## Features

- **Sarthi AI Assistant** — Conversational farming advisor powered by Groq (Llama 3.3 70B). Ask questions about fertilizers, pest control, irrigation, and more.
- **Crop Health Detection** — Upload a photo of a crop leaf and get instant disease diagnosis with treatment recommendations. Powered by a TensorFlow CNN model trained on 38 disease classes.
- **Price Estimation** — AI-generated crop price predictions based on crop type, region, soil, and season.
- **Work Dashboard** — Post and browse agricultural labor listings with payment, location, and requirements.
- **Government Schemes** — Browse and apply for relevant agricultural subsidies and government programs.
- **Land Marketplace** — List and discover agricultural land for sale with map integration.
- **IoT Dashboard** — Real-time sensor data monitoring for smart farming.
- **Multilingual Support** — Full i18n with 5 languages: English, Hindi, Bengali, Telugu, Tamil.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Backend | Express.js, MongoDB, Mongoose |
| AI/ML | TensorFlow/Keras (CNN), Flask API, Groq SDK (Llama 3.3 70B) |
| IoT | Node.js sensor dashboard |

## Project Structure

```
├── frontend/          # React + TypeScript + Vite
├── backend/           # Express.js REST API
├── AI-ML/             # Flask ML API + TensorFlow model
│   ├── api_server.py  # Flask prediction server
│   ├── trained_model.keras  # (download separately — not in git)
│   ├── fertilizers.csv
│   └── crops_data_cleaned.csv
└── Iot/               # IoT sensor dashboard
```


<img width="1890" height="1183" alt="Screenshot 2026-03-10 231202" src="https://github.com/user-attachments/assets/72824bff-5947-4057-bf13-06c36e0912c2" />
<img width="427" height="732" alt="Screenshot 2026-03-10 194734" src="https://github.com/user-attachments/assets/0ee8b939-8743-43b4-b8c2-28c0d8483e91" />


## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB (local or Atlas)

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env![Uploading Screenshot 2026-03-10 194734.png…]()

MONGO_URI=your_mongodb_uri
GROQ_API_KEY=your_groq_api_key
PORT=10000
```

```bash
node index.js
```

### 2. Frontend

```bash
cd frontend
npm install
npx vite --port 8081
```

### 3. ML API Server

```bash
cd AI-ML
pip install -r requirements.txt
pip install flask flask-cors Pillow
```

> **Note:** Download `trained_model.keras` and place it in the `AI-ML/` folder (not included in git due to size).

```bash
python api_server.py
```

The ML server runs on `http://localhost:5000`.

### 4. IoT Dashboard (optional)

```bash
cd Iot
npm install
node app.js
```

## API Endpoints

### Backend (port 10000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/chatboat` | Sarthi AI chatbot |
| POST | `/api/ai/estimate` | Crop price estimation |
| POST | `/api/ai/crop_data` | Crop recommendations |
| GET | `/api/work/` | Get all work listings |
| POST | `/api/work/` | Create work listing |
| GET/POST | `/api/farmers/` | Farmer CRUD |
| GET/POST | `/api/land/` | Land listings |
| POST | `/api/tokens/` | Token management |

### ML API (port 5000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/predict` | Upload crop leaf image → disease diagnosis + treatment |
| GET | `/health` | Health check |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `GROQ_API_KEY` | Groq API key for LLM |
| `PORT` | Backend server port (default: 10000) |



## License

MIT
