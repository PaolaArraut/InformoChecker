export const SOURCE_CREDIBILITY = { //Entire DB rating system
  // Tier 1
  'ft.com': { 
    score: 98, 
    tier: 1, 
    bias: 'Center', 
    description: 'Financial Times' 
  },
  'wsj.com': { 
    score: 97, 
    tier: 1, 
    bias: 'Center-Right', 
    description: 'Wall Street Journal' 
  },
  'bloomberg.com': { 
    score: 97, 
    tier: 1, 
    bias: 'Center', 
    description: 'Bloomberg' 
  },
  'reuters.com': { 
    score: 98, 
    tier: 1, 
    bias: 'Center', 
    description: 'Reuters' 
  },
  'economist.com': { 
    score: 96, 
    tier: 1, 
    bias: 'Center', 
    description: 'The Economist' 
  },
  'barrons.com': { 
    score: 90, 
    tier: 1, 
    bias: 'Center-Right', 
    description: "Barron's" 
  },

  // Tier 2: Reputable Financial Media (80-94)
  'cnbc.com': { 
    score: 85, 
    tier: 2, 
    bias: 'Center', 
    description: 'CNBC' 
  },
  'forbes.com': { 
    score: 82, 
    tier: 2, 
    bias: 'Center-Right', 
    description: 'Forbes' 
  },
  'fortune.com': { 
    score: 83, 
    tier: 2, 
    bias: 'Center', 
    description: 'Fortune' 
  },
  'businessinsider.com': { 
    score: 78, 
    tier: 2, 
    bias: 'Center', 
    description: 'Business Insider' 
  },
  'marketwatch.com': { 
    score: 85, 
    tier: 2, 
    bias: 'Center', 
    description: 'MarketWatch' 
  },
  'hbr.org': { 
    score: 92, 
    tier: 2, 
    bias: 'Center', 
    description: 'Harvard Business Review' 
  },
  'morningstar.com': { 
    score: 88, 
    tier: 2, 
    bias: 'Center', 
    description: 'Morningstar' 
  },
  'investors.com': { 
    score: 88, 
    tier: 2, 
    bias: 'Center-Right', 
    description: "Investor's Business Daily" 
  },

  // Tier 3: Generally Reliable (65-79)
  'seekingalpha.com': { 
    score: 70, 
    tier: 3, 
    bias: 'Varies', 
    description: 'Seeking Alpha' 
  },
  'fool.com': { 
    score: 68, 
    tier: 3, 
    bias: 'Center', 
    description: 'The Motley Fool' 
  },
  'investopedia.com': { 
    score: 75, 
    tier: 3, 
    bias: 'Center', 
    description: 'Investopedia' 
  },
  'finance.yahoo.com': { 
    score: 75, 
    tier: 3, 
    bias: 'Center', 
    description: 'Yahoo Finance' 
  },
  'kiplinger.com': { 
    score: 75, 
    tier: 3, 
    bias: 'Center', 
    description: 'Kiplinger' 
  },
  'techcrunch.com': { 
    score: 75, 
    tier: 3, 
    bias: 'Center-Left', 
    description: 'TechCrunch' 
  },
  'venturebeat.com': { 
    score: 72, 
    tier: 3, 
    bias: 'Center', 
    description: 'VentureBeat' 
  },
  'arstechnica.com': { 
    score: 80, 
    tier: 3, 
    bias: 'Center-Left', 
    description: 'Ars Technica' 
  },
  'qz.com': { 
    score: 82, 
    tier: 3, 
    bias: 'Center', 
    description: 'Quartz' 
  },
  'fastcompany.com': { 
    score: 80, 
    tier: 3, 
    bias: 'Center-Left', 
    description: 'Fast Company' 
  },
  'inc.com': { 
    score: 80, 
    tier: 3, 
    bias: 'Center', 
    description: 'Inc.' 
  },

  // Tier 4: Use With Caution (40-64)
  'benzinga.com': { 
    score: 60, 
    tier: 4, 
    bias: 'Center', 
    description: 'Benzinga' 
  },
  'thestreet.com': { 
    score: 62, 
    tier: 4, 
    bias: 'Center', 
    description: 'TheStreet' 
  },
  '247wallst.com': { 
    score: 55, 
    tier: 4, 
    bias: 'Center', 
    description: '24/7 Wall St' 
  },
  'marketbeat.com': { 
    score: 58, 
    tier: 4, 
    bias: 'Center', 
    description: 'MarketBeat' 
  },

  // Tier 5: Questionable (Below 40)
  'zerohedge.com': { 
    score: 35, 
    tier: 5, 
    bias: 'Far-Right', 
    description: 'Zero Hedge (Known for conspiracy theories)' 
  },

  // Government/Official Sources (100)
  'sec.gov': { 
    score: 100, 
    tier: 0, 
    bias: 'Neutral', 
    description: 'U.S. Securities and Exchange Commission' 
  },
  'federalreserve.gov': { 
    score: 100, 
    tier: 0, 
    bias: 'Neutral', 
    description: 'Federal Reserve' 
  },
  'bls.gov': { 
    score: 100, 
    tier: 0, 
    bias: 'Neutral', 
    description: 'Bureau of Labor Statistics' 
  },
  'bea.gov': { 
    score: 100, 
    tier: 0, 
    bias: 'Neutral', 
    description: 'Bureau of Economic Analysis' 
  },
  'treasury.gov': { 
    score: 100, 
    tier: 0, 
    bias: 'Neutral', 
    description: 'U.S. Department of the Treasury' 
  },

  // International Sources
  'theguardian.com': { 
    score: 85, 
    tier: 2, 
    bias: 'Center-Left', 
    description: 'The Guardian' 
  },
  'bbc.com': { 
    score: 88, 
    tier: 2, 
    bias: 'Center', 
    description: 'BBC' 
  },
  'scmp.com': { 
    score: 75, 
    tier: 3, 
    bias: 'Center', 
    description: 'South China Morning Post' 
  },
  'nikkei.com': { 
    score: 90, 
    tier: 2, 
    bias: 'Center', 
    description: 'Nikkei' 
  },
  'handelsblatt.com': { 
    score: 85, 
    tier: 2, 
    bias: 'Center', 
    description: 'Handelsblatt' 
  },
};

export function getSourceCredibility(url) {
  try {
    // Extract domain from URL
    const domain = new URL(url).hostname.replace('www.', '');
    
    // Look up in database
    const sourceInfo = SOURCE_CREDIBILITY[domain];
    
    if (sourceInfo) {
      return sourceInfo;
    }
    
    // Default for unknown sources
    return { 
      score: 50, 
      tier: 3, 
      bias: 'Unknown', 
      description: 'Unknown Source' 
    };
    
  } catch (error) {
    // If URL is invalid or missing
    return { 
      score: 50, 
      tier: 3, 
      bias: 'Unknown', 
      description: 'Invalid URL' 
    };
  }
}