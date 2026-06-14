import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { initialProfileData } from './src/db/seedData.ts';
import crypto from 'crypto';
import dns from 'dns';

const _filename = typeof __filename !== 'undefined'
  ? __filename
  : (import.meta && import.meta.url ? fileURLToPath(import.meta.url) : '');
const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(_filename);

// Define path for DB file
const DB_DIR = path.join(_dirname, 'src', 'db');
const DB_FILE = path.join(DB_DIR, 'data.json');

// Ensure DB directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Load or seed profile data
let currentProfileData = initialProfileData;

function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const dataStr = fs.readFileSync(DB_FILE, 'utf-8');
      currentProfileData = JSON.parse(dataStr);
    } else {
      console.log('No data.json file found. Seeding with initial profile data.');
      fs.writeFileSync(DB_FILE, JSON.stringify(initialProfileData, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Error loading database file:', error);
  }
}

function saveDatabase(data: any) {
  try {
    currentProfileData = data;
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving data to database file:', error);
    return false;
  }
}

loadDatabase();

// Generate a random session token for security on startup
const SESSION_SECRET = crypto.randomBytes(32).toString('hex');

// In-memory admin sessions mapping for tracking inactivity times
interface AdminSession {
  lastActivity: number;
}
const activeSessions = new Map<string, AdminSession>();

const app = express();
app.use(express.json({ limit: '10mb' }));

// Enforce HTTPS across the entire application in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// Set default credentials:
// Configurable via environment variables or fallback values.
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'asmitha2026';

console.log(`[Admin Account info] Username: ${ADMIN_USER} | Password: ${ADMIN_PASS}`);

// API: Auth Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || typeof username !== 'string' || !password || typeof password !== 'string') {
    return res.status(401).json({ success: false, error: 'Invalid request payload.' });
  }
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = crypto.createHmac('sha256', SESSION_SECRET).update(`${username}-${Date.now()}-${Math.random()}`).digest('hex');
    activeSessions.set(token, { lastActivity: Date.now() });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials. Please try again.' });
  }
});

// Middleware for Admin authentication with inactivity checks (30 min)
const adminAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Authorization token required' });
  }
  const token = authHeader.split(' ')[1];
  const session = activeSessions.get(token);

  if (session) {
    const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
    const now = Date.now();
    if (now - session.lastActivity > INACTIVITY_TIMEOUT) {
      activeSessions.delete(token);
      return res.status(401).json({ success: false, error: 'Session expired due to inactivity. Please log in again.' });
    }
    // Update tracking timestamp
    session.lastActivity = now;
    next();
  } else {
    res.status(401).json({ success: false, error: 'Invalid or expired authorization token' });
  }
};

app.post('/api/auth/logout', adminAuth, (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    activeSessions.delete(token);
  }
  res.json({ success: true });
});

// API: Get profile content
app.get('/api/profile', (req, res) => {
  res.json({ success: true, data: currentProfileData });
});

// API: Update profile content
app.post('/api/profile', adminAuth, (req, res) => {
  const success = saveDatabase(req.body);
  if (success) {
    res.json({ success: true, data: currentProfileData });
  } else {
    res.status(500).json({ success: false, error: 'Failed to write content to system disk' });
  }
});

// SUBMISSIONS CONSTANTS & PERSISTENCE
const SUBMISSIONS_FILE = path.join(DB_DIR, 'submissions.json');

// Ensure submissions list exists
if (!fs.existsSync(SUBMISSIONS_FILE)) {
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// Robust JSON loader to prevent any file corruption from crashing the platform
function loadSubmissions(): any[] {
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const fileContent = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
      if (!fileContent.trim()) {
        return [];
      }
      return JSON.parse(fileContent);
    }
  } catch (err) {
    console.error('Error parsing submissions.json file. Falling back to empty list.', err);
  }
  return [];
}

// Improved Email Security & Sandbox Validation Rules
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com', '10minutemail.com', 'tempmail.com', 'temp-mail.org', 
  'yopmail.com', 'dispostable.com', 'guerrillamail.com', 'sharklasers.com', 
  'getairmail.com', 'burnermail.io', 'fakeinbox.com', 'trbvm.com', 
  'tempmailaddress.com', 'throwawaymail.com', 'maildrop.cc', 'temp-mail.com',
  '10minutemail.co.za', '10minutemail.de', 'tempmail.de', 'temp-mail.de',
  'generator.email', 'tempmail.net', 'temp-mail.net', 'guerrillamailblock.com',
  'guerrillamail.net', 'guerrillamail.org', 'guerrillamail.biz', 'grr.la',
  'disposable.com', 'trashmail.com', 'mailnesia.com', 'mailcatch.com'
]);

const validateEmailFormatAndSafety = (email: string): { isValid: boolean; error?: string } => {
  const trimmed = email.trim();
  if (trimmed.length < 5) {
    return { isValid: false, error: "Email address is too short." };
  }
  if (trimmed.length > 100) {
    return { isValid: false, error: "Email address is too long (maximum 100 characters)." };
  }

  // Check structure has exactly one '@'
  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { isValid: false, error: "Email address must contain exactly one '@' character." };
  }

  const [username, domain] = parts;
  if (!username || !domain) {
    return { isValid: false, error: "Email address has invalid username or domain structure." };
  }

  // Username safety check
  if (username.startsWith('.') || username.endsWith('.')) {
    return { isValid: false, error: "Email username cannot start or end with a dot." };
  }
  if (username.includes('..')) {
    return { isValid: false, error: "Email username cannot contain consecutive dots." };
  }
  if (/[^\w.!#$%&'*+/=?^_`{|}~-]/.test(username)) {
    return { isValid: false, error: "Email username contains invalid characters." };
  }

  // Domain safety check
  if (!domain.includes('.')) {
    return { isValid: false, error: "Email domain must possess a dot suffix (e.g., .com)." };
  }
  if (domain.startsWith('.') || domain.endsWith('.')) {
    return { isValid: false, error: "Email domain cannot start or end with a dot." };
  }
  if (domain.includes('..')) {
    return { isValid: false, error: "Email domain cannot contain consecutive dots." };
  }
  if (/[^\w.-]/.test(domain)) {
    return { isValid: false, error: "Email domain contains invalid format characters." };
  }

  // Standard regex syntax validation
  const standardRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!standardRegex.test(trimmed)) {
    return { isValid: false, error: "Please write a valid email address format (e.g., name@example.com)." };
  }

  // Disposable check
  const lowerDomain = domain.toLowerCase();
  if (DISPOSABLE_EMAIL_DOMAINS.has(lowerDomain)) {
    return { isValid: false, error: "Temporary/disposable email addresses are denied to prevent spam. Please use a standard address." };
  }

  return { isValid: true };
};

// DNS resolution validation with a strict timeout to ensure non-blocking UX
const validateDomainDns = async (domain: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      console.log(`DNS check timed out for domain: ${domain}. Proceeding with dynamic validation.`);
      resolve(true); // Gracefully fallback to accept under heavy network/infrastructure latency
    }, 2500);

    dns.resolveMx(domain, (err, addresses) => {
      if (!err && addresses && addresses.length > 0) {
        clearTimeout(timeoutId);
        return resolve(true);
      }

      // Check standard A record as fallback if MX resolution fails or returned nothing
      dns.resolve(domain, 'A', (errA, addressesA) => {
        if (!errA && addressesA && addressesA.length > 0) {
          clearTimeout(timeoutId);
          return resolve(true);
        }

        // Check AAAA record as final lookup fallback
        dns.resolve(domain, 'AAAA', (errAAAA, addressesAAAA) => {
          clearTimeout(timeoutId);
          if (!errAAAA && addressesAAAA && addressesAAAA.length > 0) {
            return resolve(true);
          }
          console.log(`DNS lookup failed for invalid email domain: ${domain}`);
          resolve(false);
        });
      });
    });
  });
};

// In-Memory CAPTCHA challenges storage
interface CaptchaChallenge {
  answer: string;
  expiresAt: number;
}
const activeCaptchas = new Map<string, CaptchaChallenge>();

// Simple dynamic CAPTCHA challenges to satisfy bot protection and spam prevention
const CAPTCHA_QUESTIONS = [
  { question: "What is 4 + 7?", answer: "11" },
  { question: "Type the word 'story' in UPPERCASE:", answer: "STORY" },
  { question: "Type the word 'ink' in UPPERCASE:", answer: "INK" },
  { question: "What is the opposite of 'cold'?", answer: "HOT" },
  { question: "What is 15 - 6?", answer: "9" },
  { question: "Type Asmitha's name in UPPERCASE:", answer: "ASMITHA" },
  { question: "What is the color of snow? (Red, Black, or White)", answer: "WHITE" },
  { question: "Type 'HUMAN' in lowercase letters:", answer: "human" },
  { question: "What is 8 plus 8?", answer: "16" },
  { question: "Type the first 3 letters of 'alphabet' in lowercase:", answer: "alp" }
];

// Submission Rate Limiting
const ipRecordMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 submissions per IP per window

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  let timestamps = ipRecordMap.get(ip) || [];
  // Clear timestamps older than window
  timestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW);
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  timestamps.push(now);
  ipRecordMap.set(ip, timestamps);
  return true;
};

// Robust sanitization function to strip and escape user inputs to prevent XSS
const sanitizeInput = (val: any, maxLength = 2000): string => {
  if (typeof val !== 'string') return '';
  let cleaned = val.trim();
  // Strip HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  // Escape HTML entities to prevent Reflected & Stored XSS
  cleaned = cleaned
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength);
  }
  return cleaned;
};

// API: Get a fresh human verification challenge
app.get('/api/submissions/captcha', (req, res) => {
  // Prune expired captchas first
  const now = Date.now();
  for (const [key, val] of activeCaptchas.entries()) {
    if (val.expiresAt < now) {
      activeCaptchas.delete(key);
    }
  }

  // Pick a random question
  const index = Math.floor(Math.random() * CAPTCHA_QUESTIONS.length);
  const selected = CAPTCHA_QUESTIONS[index];
  const token = crypto.randomBytes(16).toString('hex');

  // Keep verification active for 15 minutes
  activeCaptchas.set(token, {
    answer: selected.answer.trim().toLowerCase(),
    expiresAt: now + 15 * 60 * 1000
  });

  res.json({
    success: true,
    question: selected.question,
    token
  });
});

// API: Public Submission of Personal Letters
app.post('/api/submissions', async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ success: false, error: 'Too many submissions from your address. Please pause for a moment.' });
  }

  const {
    name,
    age,
    community,
    roots,
    currentLocation,
    company,
    lifestyle,
    email,
    resonatedReason,
    aboutYourself,
    additionalNotes,
    captchaToken,
    captchaAnswer
  } = req.body;

  // CAPTCHA VERIFICATION
  if (!captchaToken || typeof captchaToken !== 'string') {
    return res.status(400).json({ success: false, error: 'Human verification session is invalid or has expired.' });
  }
  const captchaRecord = activeCaptchas.get(captchaToken);
  if (!captchaRecord) {
    return res.status(400).json({ success: false, error: 'Verification session has expired. Please refresh the question.' });
  }
  if (captchaRecord.expiresAt < Date.now()) {
    activeCaptchas.delete(captchaToken);
    return res.status(400).json({ success: false, error: 'Verification challenge has expired. Please try again.' });
  }

  const cleanAnswer = (captchaAnswer || '').toString().trim().toLowerCase();
  if (cleanAnswer !== captchaRecord.answer) {
    return res.status(400).json({ success: false, error: 'Incorrect verification answer. Please try again.' });
  }

  // Consume the captcha token
  activeCaptchas.delete(captchaToken);

  // Mandatory constraints
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ success: false, error: 'Name is required.' });
  }
  if (!age || typeof age !== 'string' || age.trim() === '') {
    return res.status(400).json({ success: false, error: 'Age is required.' });
  }
  if (!community || typeof community !== 'string' || community.trim() === '') {
    return res.status(400).json({ success: false, error: 'Community identity is required.' });
  }
  if (!roots || typeof roots !== 'string' || roots.trim() === '') {
    return res.status(400).json({ success: false, error: 'Roots / native place info are required.' });
  }
  if (!currentLocation || typeof currentLocation !== 'string' || currentLocation.trim() === '') {
    return res.status(400).json({ success: false, error: 'Location is required.' });
  }
  if (!company || typeof company !== 'string' || company.trim() === '') {
    return res.status(400).json({ success: false, error: 'Occupation or company info are required.' });
  }
  if (!lifestyle || typeof lifestyle !== 'string' || lifestyle.trim() === '') {
    return res.status(400).json({ success: false, error: 'Lifestyle is required.' });
  }
  if (!email || typeof email !== 'string' || email.trim() === '') {
    return res.status(400).json({ success: false, error: 'Verified email address is required so Asmitha can reply.' });
  }

  // Input length guards
  if (name.length > 100 || age.length > 10 || community.length > 150 || roots.length > 150 || currentLocation.length > 150 || company.length > 150 || lifestyle.length > 150 || email.length > 100) {
    return res.status(400).json({ success: false, error: 'Input text exceeds maximum allowed limits.' });
  }

  // Email validation checking syntax, consecutive dots, disposable providers, and limits
  const emailCheck = validateEmailFormatAndSafety(email);
  if (!emailCheck.isValid) {
    return res.status(400).json({ success: false, error: emailCheck.error || 'Please enter a valid, safe email address format.' });
  }

  // Domain existed query (DNS/MX) check
  const domain = email.trim().split('@')[1];
  const isDnsValid = await validateDomainDns(domain);
  if (!isDnsValid) {
    return res.status(400).json({ 
      success: false, 
      error: `The email domain "${domain}" could not be resolved. Please verify the domain name spelling or use an active, standard email provider.` 
    });
  }

  try {
    const submissions = loadSubmissions();
    const newSubmission = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      name: sanitizeInput(name, 100),
      age: sanitizeInput(age, 10),
      community: sanitizeInput(community, 150),
      roots: sanitizeInput(roots, 150),
      currentLocation: sanitizeInput(currentLocation, 150),
      company: sanitizeInput(company, 150),
      lifestyle: sanitizeInput(lifestyle, 150),
      email: sanitizeInput(email, 100),
      resonatedReason: sanitizeInput(resonatedReason, 2000),
      aboutYourself: sanitizeInput(aboutYourself, 2000),
      additionalNotes: sanitizeInput(additionalNotes, 2000),
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    submissions.push(newSubmission);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
    res.json({ success: true, submission: newSubmission });
  } catch (error: any) {
    console.error('Error saving letter:', error);
    res.status(500).json({ success: false, error: 'Failed to write letter to disk database' });
  }
});

// API: Retrieve letters for Admin Dashboard
app.get('/api/admin/submissions', adminAuth, (req, res) => {
  try {
    const submissions = loadSubmissions();
    // Return sorted by newest first
    submissions.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json({ success: true, data: submissions });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to read letter submissions' });
  }
});

// API: Administrative Delete Letter
app.delete('/api/admin/submissions/:id', adminAuth, (req, res) => {
  const { id } = req.params;
  try {
    const submissions = loadSubmissions();
    const filtered = submissions.filter((s: any) => s.id !== id);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to remove letter' });
  }
});

// API: Administrative Update Letter Status & Info
app.patch('/api/admin/submissions/:id', adminAuth, (req, res) => {
  const { id } = req.params;
  const { status, verificationStatus } = req.body;
  try {
    const submissions = loadSubmissions();
    const index = submissions.findIndex((s: any) => s.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Letter submission not found' });
    }
    
    submissions[index] = {
      ...submissions[index],
      status: status !== undefined ? status : (submissions[index].status || 'Pending'),
      verificationStatus: verificationStatus !== undefined ? verificationStatus : (submissions[index].verificationStatus || 'Unverified')
    };
    
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
    res.json({ success: true, data: submissions[index] });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to update letter' });
  }
});

// API: Upload custom photographs (Base64 file saving or direct URL conversion)
app.post('/api/upload', adminAuth, (req, res) => {
  const { base64Data, fileName, mimeType } = req.body;
  if (!base64Data) {
    return res.status(400).json({ success: false, error: 'No image base64 data provided' });
  }
  
  try {
    // We can return the base64 URI directly (which is fully self-contained and persistent in data.json)
    // or we can write to public folder and return web relative paths.
    // Both are supported. Let's return the base64 URI as they are incredibly robust on serverless setups,
    // but if the data is small we can save or just return as is. Let's return the data URI string representation.
    const dataUri = `data:${mimeType || 'image/jpeg'};base64,${base64Data}`;
    res.json({ success: true, url: dataUri });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

async function startServer() {
const PORT = Number(process.env.PORT) || 3000;

  // Mount Vite dev server in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(_dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Full-Stack dev server is running at http://localhost:${PORT}`);
  });
}

startServer();
