
# Finformo - Financial News Credibility Checker

Chrome extension that analyzes financial articles for credibility using AI and source reputation analysis.

## Quick Start (Use the Extension)

1. Clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `extension` folder
5. Visit any financial news article and click the extension icon

## Run Locally (Development)

### Prerequisites
- Node.js 16+
- Vercel CLI: `npm i -g vercel`
- Gemini API key from https://aistudio.google.com/app/apikey

### Setup

1. **Install dependencies:**
```bash
   npm install
```

2. **Configure environment:**
```bash
   echo "GEMINI_API_KEY=your_api_key_here" > .env
```

3. **Run backend:**
```bash
   vercel dev
```

4. **Update extension API URL:**
   - Edit `extension/popup.js` line 1
   - Change to: `http://localhost:3000/api/classify`

5. **Load extension in Chrome** (see Quick Start steps 2-5)

## Technologies

- **Backend:** Vercel Serverless Functions, Node.js
- **AI:** Google Gemini 2.5 Flash API
- **Frontend:** Chrome Extension (Manifest V3), Vanilla JS/CSS

## Features

- Real-time credibility analysis (0-100 score)
- Multi-factor evaluation (fact-checking, bias detection, source verification)
- 10+ publisher reputation database
- Cool purple themed UI with smooth animations

## Built Using
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)

