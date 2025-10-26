
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getSourceCredibility } from './sources.js';

export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, url, title } = request.body;
    
    if (!text) {
      return response.status(400).json({ error: 'Text is required' });
    }

    const sourceInfo = url ? getSourceCredibility(url) : null;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const truncatedText = text.substring(0, 2000);
    const truncationNote = text.length > 2000 ? '...(truncated)' : '';
    const sourceName = sourceInfo?.description || 'Unknown';
    const titleText = title || 'No title provided';

    const prompt = `You are analyzing a financial news article for credibility.

Title: "${titleText}"
Article Text: "${truncatedText}"${truncationNote}
Source: ${sourceName}

Analyze on these dimensions and respond ONLY with valid JSON in this exact format:
{
  "factCheckRating": "High or Medium or Low",
  "articleStatus": "Verified or Unverified or Questionable",
  "biasIndicators": {
    "emotionalLanguage": "Low or Medium or High",
    "sourceBalance": "Good or Fair or Poor",
    "factualAccuracy": "High or Medium or Low"
  },
  "transparencyIssues": [],
  "reasoning": "Brief explanation"
}

Rules:
- factCheckRating must be exactly "High", "Medium", or "Low"
- articleStatus must be exactly "Verified", "Unverified", or "Questionable"
- emotionalLanguage must be exactly "Low", "Medium", or "High"
- sourceBalance must be exactly "Good", "Fair", or "Poor"
- factualAccuracy must be exactly "High", "Medium", or "Low"
- transparencyIssues must be an array
- Return ONLY the JSON, no other text`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    const cleanedResponse = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const analysis = JSON.parse(cleanedResponse);

    const aiScore = calculateAIScore(analysis);
    const sourceScore = sourceInfo?.score || 50;
    
    const overallCredibility = Math.round((aiScore * 0.6) + (sourceScore * 0.4));

    const finalResponse = {
      overallCredibility,
      factCheckRating: analysis.factCheckRating,
      articleStatus: analysis.articleStatus,
      biasIndicators: analysis.biasIndicators,
      transparencyIssues: analysis.transparencyIssues || [],
      metadata: {
        published: extractPublishDate(text),
        readTime: estimateReadTime(text),
        sourceName: sourceInfo?.description || 'Unknown Source',
        sourceTier: sourceInfo?.tier || 3,
        sourceScore: sourceScore
      },
      reasoning: analysis.reasoning
    };

    return response.status(200).json(finalResponse);

  } catch (error) {
    console.error('Error:', error);
    return response.status(500).json({ 
      error: 'Failed to analyze article',
      details: error.message 
    });
  }
}

function calculateAIScore(analysis) {
  let score = 70;
  
  if (analysis.factCheckRating === 'High') score += 20;
  else if (analysis.factCheckRating === 'Low') score -= 20;
  
  if (analysis.articleStatus === 'Verified') score += 10;
  else if (analysis.articleStatus === 'Questionable') score -= 30;
  
  if (analysis.biasIndicators?.factualAccuracy === 'High') score += 10;
  else if (analysis.biasIndicators?.factualAccuracy === 'Low') score -= 20;
  
  if (analysis.biasIndicators?.emotionalLanguage === 'High') score -= 10;
  
  if (analysis.biasIndicators?.sourceBalance === 'Good') score += 5;
  else if (analysis.biasIndicators?.sourceBalance === 'Poor') score -= 10;
  
  if (analysis.transparencyIssues && analysis.transparencyIssues.length > 0) {
    score -= analysis.transparencyIssues.length * 5;
  }
  
  return Math.max(0, Math.min(100, score));
}

function estimateReadTime(text) {
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 250);
  return `${minutes} min`;
}

function extractPublishDate(text) {
  const dateRegex = /\b(\d{1,2}\/\d{1,2}\/\d{2,4}|\w+ \d{1,2},? \d{4}|\d{4}-\d{2}-\d{2})\b/;
  const match = text.match(dateRegex);
  return match ? match[0] : 'Date not found';
}
