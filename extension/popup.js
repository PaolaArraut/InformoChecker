const API_URL = 'https://informo-checker.vercel.app/api/classify';

document.addEventListener('DOMContentLoaded', async () => {
  const loading = document.getElementById('loading');
  const error = document.getElementById('error');
  const results = document.getElementById('results');
  const retryBtn = document.getElementById('retry-btn');

  setupTabs();

  retryBtn.addEventListener('click', () => {
    analyzeCurrentPage();
  });

  await analyzeCurrentPage();
});

async function analyzeCurrentPage() {
  const loading = document.getElementById('loading');
  const error = document.getElementById('error');
  const results = document.getElementById('results');

  loading.classList.remove('hidden');
  error.classList.add('hidden');
  results.classList.add('hidden');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extractArticleContent
    });

    const articleData = result.result;

    if (!articleData || !articleData.text) {
      throw new Error('Could not extract article content from this page');
    }

    updateHeader(articleData.title, articleData.url);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: articleData.text,
        url: articleData.url,
        title: articleData.title
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    displayResults(data);

    loading.classList.add('hidden');
    results.classList.remove('hidden');

  } catch (err) {
    console.error('Analysis error:', err);
    loading.classList.add('hidden');
    error.classList.remove('hidden');
    document.querySelector('.error-message').textContent = err.message || 'Failed to analyze article. Please try again.';
  }
}

function extractArticleContent() {
  const title = document.title || 
                document.querySelector('h1')?.textContent || 
                'Untitled Article';

  const url = window.location.href;

  const articleSelectors = [
    'article',
    '[role="article"]',
    '.article-content',
    '.post-content',
    '.entry-content',
    'main'
  ];

  let articleElement = null;
  for (const selector of articleSelectors) {
    articleElement = document.querySelector(selector);
    if (articleElement) break;
  }

  let text = '';
  if (articleElement) {
    const paragraphs = articleElement.querySelectorAll('p');
    text = Array.from(paragraphs)
      .map(p => p.textContent.trim())
      .filter(t => t.length > 50)
      .join('\n\n');
  }

  if (!text || text.length < 100) {
    const allParagraphs = document.querySelectorAll('p');
    text = Array.from(allParagraphs)
      .map(p => p.textContent.trim())
      .filter(t => t.length > 50)
      .join('\n\n');
  }

  return { title, url, text };
}

function updateHeader(title, url) {
  document.querySelector('.site-title').textContent = title;
  
  const urlObj = new URL(url);
  const domain = urlObj.hostname.replace('www.', '');
  
  document.querySelector('.url').textContent = domain + urlObj.pathname;
  document.querySelector('.article-link').href = url;
}

function displayResults(data) {
  updateCredibilityOverview(data);
  updateAnalysisTab(data);
  updatePublisherTab(data);
}

function updateCredibilityOverview(data) {
  const score = data.overallCredibility;
  
  let credibilityText = 'Moderate Credibility';
  let badgeIcon = '⚠️';
  
  if (score >= 85) {
    credibilityText = 'High Credibility';
    badgeIcon = '✅';
  } else if (score >= 70) {
    credibilityText = 'Moderate Credibility';
    badgeIcon = '⚠️';
  } else {
    credibilityText = 'Low Credibility';
    badgeIcon = '❌';
  }

  document.querySelector('.badge-icon').textContent = badgeIcon;
  document.querySelector('.badge-text').textContent = credibilityText;
  document.querySelector('.badge-score').textContent = `${score}/100`;
  document.querySelector('.progress-fill').style.width = `${score}%`;

  const factCheckBadge = document.querySelectorAll('.metric-badge')[0];
  factCheckBadge.textContent = data.factCheckRating;
  factCheckBadge.className = `metric-badge ${data.factCheckRating.toLowerCase()}`;

  const statusBadge = document.querySelectorAll('.metric-badge')[1];
  statusBadge.textContent = data.articleStatus;
  statusBadge.className = `metric-badge ${data.articleStatus.toLowerCase()}`;

  document.getElementById('published-date').textContent = data.metadata.published;
  document.getElementById('read-time').textContent = data.metadata.readTime;
}

function updateAnalysisTab(data) {
  const indicators = document.querySelectorAll('.indicator-value');
  
  indicators[0].textContent = data.biasIndicators.emotionalLanguage;
  indicators[0].className = `indicator-value ${data.biasIndicators.emotionalLanguage.toLowerCase()}`;
  
  indicators[1].textContent = data.biasIndicators.sourceBalance;
  indicators[1].className = `indicator-value ${data.biasIndicators.sourceBalance.toLowerCase()}`;
  
  indicators[2].textContent = data.biasIndicators.factualAccuracy;
  indicators[2].className = `indicator-value ${data.biasIndicators.factualAccuracy.toLowerCase()}`;

  if (data.transparencyIssues && data.transparencyIssues.length > 0) {
    const transparencyBox = document.querySelector('.transparency-box');
    transparencyBox.style.background = '#FEF2F2';
    transparencyBox.style.borderColor = '#FECACA';
    
    const header = document.querySelector('.transparency-header');
    header.style.color = '#991B1B';
    header.querySelector('span').textContent = 'Transparency Issues Detected';
    
    const text = document.querySelector('.transparency-text');
    text.style.color = '#991B1B';
    text.textContent = data.transparencyIssues.join('. ');
  }

  document.getElementById('reasoning-text').textContent = data.reasoning;
}

function updatePublisherTab(data) {
  document.getElementById('publisher-name').textContent = data.metadata.sourceName;
  document.getElementById('publisher-score').textContent = data.metadata.sourceScore;
  
  const tierBadge = document.querySelector('.tier-badge');
  tierBadge.textContent = `Tier ${data.metadata.sourceTier}`;
  tierBadge.className = `tier-badge tier-${data.metadata.sourceTier}`;

  let description = 'Unknown source - credibility cannot be verified.';
  
  if (data.metadata.sourceTier === 0) {
    description = 'Official government or regulatory source with primary data.';
  } else if (data.metadata.sourceTier === 1) {
    description = 'Premium financial news source with high editorial standards and rigorous fact-checking.';
  } else if (data.metadata.sourceTier === 2) {
    description = 'Reputable mainstream media with established editorial processes.';
  } else if (data.metadata.sourceTier === 3) {
    description = 'Generally reliable source, but verify important claims independently.';
  } else if (data.metadata.sourceTier === 4) {
    description = 'Use with caution. May contain promotional content or less rigorous fact-checking.';
  } else if (data.metadata.sourceTier === 5) {
    description = 'Known for publishing questionable content. Verify claims through reputable sources.';
  }

  document.querySelector('.publisher-description').textContent = description;
}

function setupTabs() {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(panel => {
        if (panel.id === `${targetTab}-tab`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}