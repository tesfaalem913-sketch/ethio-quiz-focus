import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { getFallbackQuiz, getFallbackStudyGuide } from "./fallbackGenerator";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper function to thoroughly sanitize and validate the Gemini API Key
function sanitizeKey(key: string | undefined): string {
  if (!key || typeof key !== "string") return "";
  let k = key.trim();
  // Remove wrapping single or double quotes if any
  if ((k.startsWith('"') && k.endsWith('"')) || (k.startsWith("'") && k.endsWith("'"))) {
    k = k.substring(1, k.length - 1).trim();
  }
  if (k === "MY_GEMINI_API_KEY" || k === "undefined" || k === "null" || k === "") {
    return "";
  }
  return k;
}

// Initialize Gemini Client
const API_KEY = sanitizeKey(process.env.GEMINI_API_KEY);
let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({
    apiKey: API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

function getAiClient(clientApiKey?: string): GoogleGenAI | null {
  const sanitizedClientKey = sanitizeKey(clientApiKey);
  const activeKey = sanitizedClientKey || API_KEY;
  
  if (!activeKey) {
    return null;
  }
  
  // Use the cached top-level client if the key matches the environment key
  if (activeKey === API_KEY && ai) {
    return ai;
  }
  
  return new GoogleGenAI({
    apiKey: activeKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Helper function to call generateContent with transparent gemini-2.5-flash fallback if gemini-3.5-flash encounters demand/quota/unavailability issues
async function generateContentWithFallback(
  activeAi: GoogleGenAI,
  params: {
    model?: string;
    contents: any;
    config?: any;
    tools?: any;
    toolConfig?: any;
  }
) {
  const primaryModel = params.model || "gemini-3.5-flash";
  try {
    return await activeAi.models.generateContent({
      ...params,
      model: primaryModel,
    });
  } catch (error: any) {
    const errorStr = (error.message || error.toString() || "").toLowerCase();
    const errorStringified = JSON.stringify(error).toLowerCase();
    
    const isServiceFailure = 
      errorStr.includes("demand") || 
      errorStr.includes("503") || 
      errorStr.includes("overloaded") || 
      errorStr.includes("unavailable") || 
      errorStr.includes("quota") || 
      errorStr.includes("429") || 
      errorStr.includes("resource_exhausted") || 
      errorStringified.includes("demand") || 
      errorStringified.includes("503") || 
      errorStringified.includes("unavailable") || 
      errorStringified.includes("quota") || 
      errorStringified.includes("429");

    if (primaryModel === "gemini-3.5-flash" && isServiceFailure) {
      console.warn(`[Gemini Fallback] Model ${primaryModel} failed. Falling back to gemini-2.5-flash. Error:`, error.message || error);
      
      // Deep clone / clean config to remove tools if any to ensure fallback matches model capability safely
      const cleanConfig = params.config ? JSON.parse(JSON.stringify(params.config)) : {};
      if (cleanConfig.tools) {
        delete cleanConfig.tools;
      }
      if (cleanConfig.toolConfig) {
        delete cleanConfig.toolConfig;
      }

      return await activeAi.models.generateContent({
        ...params,
        model: "gemini-2.5-flash",
        config: cleanConfig
      });
    }
    
    throw error;
  }
}

// API endpoint to generate high school quizzes dynamically
app.post("/api/generate-quiz", async (req, res) => {
  const { grade, subject, unit, subtopic, examId, examSubject, examYear, clientApiKey } = req.body;
  const activeAi = getAiClient(clientApiKey);

  if (!activeAi) {
    console.warn("Gemini client is not initialized. Using premium fallback quiz...");
    const fallbackQuiz = getFallbackQuiz({ grade, subject, unit, subtopic, examId, examSubject, examYear });
    return res.json(fallbackQuiz);
  }

  try {
    let userPrompt = "";
    if (examId && examSubject && examYear) {
      let focusGuideline = "";
      if (examId === "euee_full_natural") {
        focusGuideline = `This is a comprehensive, stream-wide exam containing a balanced mixture of multiple choice questions from ALL major Ethiopian Natural Stream EUEE subjects:
- Mathematics (Natural)
- Physics
- Chemistry
- Biology
- English language & grammar
- Scholastic Aptitude Test (SAT)
Please ensure you distribute the 10 questions across these subjects. Label each question with the subject name inside brackets at the beginning, e.g., '[Physics] ...' or '[Mathematics (Natural)] ...'.`;
      } else if (examId === "euee_full_social") {
        focusGuideline = `This is a comprehensive, stream-wide exam containing a balanced mixture of multiple choice questions from ALL major Ethiopian Social Stream EUEE subjects:
- Mathematics (Social)
- Geography
- History
- Economics
- English language & grammar
- Scholastic Aptitude Test (SAT)
Please ensure you distribute the 10 questions across these subjects. Label each question with the subject name inside brackets at the beginning, e.g., '[History] ...' or '[Geography] ...'.`;
      } else {
        focusGuideline = `The subjects should be highly relevant and accurate to what is tested in the EUEE for "${examSubject}" in Ethiopia.`;
      }

      // University Entrance Exam EUEE request
      userPrompt = `You are an expert educator specialishing in the Ethiopian high school curriculum and University Entrance Examinations (EUEE).
Generate a highly professional prep quiz simulating the Ethiopian University Entrance Examination (EUEE).
Subject: "${examSubject}"
Exam Year: "${examYear}"

Requirements:
1. Provide exactly 10 high-quality multiple choice questions matching the analytical depth, vocabulary, and difficulty of the official EUEE exams.
2. ${focusGuideline}
3. For each question, provide exactly four distinct options and a highly detailed educational explanation ("reason") explaining the physical, chemical, historical, or mathematical principles that make the selected choice correct.
4. Keep the questions focused on scientific and logical rigour, using human-appropriate terminology.`;
    } else {
      // Normal Grade 9-12 curriculum request
      userPrompt = `You are a certified professional educator specialishing in the Ethiopian High School NEW Curriculum.
Generate a structured learning quiz for the following topic:
Grade: "${grade}"
Subject: "${subject}"
Unit: "${unit || 'General'}"
Sub-topic: "${subtopic || 'General Overview'}"

Requirements:
1. Provide exactly 10 curriculum-aligned conceptual and/or numerical questions designed for students studying under the new Ethiopian curriculum guidelines.
2. The level of difficulty must be perfectly suited to "${grade}" students.
3. For each question, supply exactly 4 diverse, realistic multiple-choice options.
4. Under each question, write a comprehensive, clear educational explanation ("reason") that reveals step-by-step logic, calculation steps, or factual evidence so that students can understand why the correct answer is indeed correct and learn effectively.`;
    }

    // Call Gemini API using modern GoogleGenAI SDK with thinking behavior automatically controlled and fallback enabled
    const response = await generateContentWithFallback(activeAi, {
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: "You are a senior Ethiopian National Educational Assessment and Examinations Agency (NEAEA) specialist. You generate highly accurate, curriculum-appropriate exam papers and learning assessments. You always output responses in strict JSON format that strictly respects the requested JSON schema with valid options and correct answer indexes.",
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              description: "List of exactly 10 high-quality multiple-choice questions.",
              items: {
                type: Type.OBJECT,
                properties: {
                  question: {
                    type: Type.STRING,
                    description: "The full text of the question. For numerical topics, specify units cleanly.",
                  },
                  options: {
                    type: Type.ARRAY,
                    description: "Four choices/options representing possibilities A, B, C, and D.",
                    items: { type: Type.STRING },
                  },
                  correctAnswerIndex: {
                    type: Type.INTEGER,
                    description: "The index of the correct answer inside options (value must be 0, 1, 2, or 3).",
                  },
                  explanation: {
                    type: Type.STRING,
                    description: "A rich, detailed, student-friendly explanation / reason illustrating the core concepts and steps behind the correct option.",
                  },
                },
                required: ["question", "options", "correctAnswerIndex", "explanation"],
              },
            },
          },
          required: ["questions"],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Received empty response from the Gemini API.");
    }

    const quizData = JSON.parse(responseText.trim());
    return res.json(quizData);
  } catch (error: any) {
    console.error("Quiz generation via Gemini failed, loading high-quality dynamic fallback:", error);
    try {
      const fallbackQuiz = getFallbackQuiz({ grade, subject, unit, subtopic, examId, examSubject, examYear });
      return res.json(fallbackQuiz);
    } catch (fallbackError: any) {
      return res.status(500).json({
        error: "Generation Failed",
        message: error.message || "An unexpected error occurred during quiz generation.",
      });
    }
  }
});

// API endpoint to generate high school study guides dynamically
app.post("/api/generate-study-guide", async (req, res) => {
  const { grade, subject, unit, subtopic, examId, examSubject, examYear, clientApiKey } = req.body;
  const activeAi = getAiClient(clientApiKey);

  if (!activeAi) {
    console.warn("Gemini client is not initialized. Using premium fallback study guide...");
    const fallbackGuide = getFallbackStudyGuide({ grade, subject, unit, subtopic, examId, examSubject, examYear });
    return res.json(fallbackGuide);
  }

  try {
    let userPrompt = "";
    if (examId && examSubject && examYear) {
      let focusGuideline = "";
      if (examId === "euee_full_natural") {
        focusGuideline = `This is a stream-wide comprehensive Natural Sciences exam study handbook. Please supply definitions, summaries, formulas, and tips covering ALL major subjects in this track (Mathematics Natural, Physics, Chemistry, Biology, English, and Scholastic Aptitude Test).`;
      } else if (examId === "euee_full_social") {
        focusGuideline = `This is a stream-wide comprehensive Social Sciences exam study handbook. Please supply definitions, summaries, formulas, and tips covering ALL major subjects in this track (Mathematics Social, Geography, History, Economics, English, and Scholastic Aptitude Test).`;
      } else {
        focusGuideline = `Create an intensive study handbook / revision guide to help a student master this specific examination blueprint.`;
      }

      userPrompt = `You are an expert academic tutor specializing in the Ethiopian University Entrance Examinations (EUEE).
${focusGuideline}
Subject: "${examSubject}"
Exam Year: "${examYear}"

Please supply solid core summaries, definition of high-frequency exam terms, formulas or key conceptual models tested in this exam, strategic test-taking tips, and revision flashcards. Make materials academically deep, structured, and curriculum-accurate. Ensure you write high quality text in Markdown formats where helpful.`;
    } else {
      userPrompt = `You are a certified senior curriculum specialist for the NEW Ethiopian high school curriculum under the Ministry of Education guidelines.
Generate a comprehensive, beautifully structured study guide and active-recall flashcard deck for:
Grade: "${grade}"
Subject: "${subject}"
Unit: "${unit || 'General'}"
Sub-topic: "${subtopic || 'General Overview'}"

Ensure the definitions, summaries, and formulas are perfectly aligned with the depth and pedagogy expected for a "${grade}" student under the modern curriculum standards. Make it extremely beneficial for revision. Provide answers where applicable, using solid English and beautiful styling.`;
    }

    // Call Gemini API to draft study guide and flashcards using gemini-3.5-flash and fallback enabled
    const response = await generateContentWithFallback(activeAi, {
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: "You are a senior educational content developer. You generate accurate, crisp, structured study guides aligned with the Ethiopian National Educational Assessment and Examinations Agency (NEAEA) frameworks. You always respond in a strict JSON format with summaries, concise definitions, core formulas/theorems, practical tips, and clear flashcards.",
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "A rich, detailed, yet compact summary (using bullet points or bold text in Markdown format) detailing the core concepts, historical elements, and outcomes.",
            },
            keyDefinitions: {
              type: Type.ARRAY,
              description: "A list of at least 4 critical terms or concepts and their precise academic definitions.",
              items: {
                type: Type.OBJECT,
                properties: {
                  term: { type: Type.STRING },
                  definition: { type: Type.STRING },
                },
                required: ["term", "definition"],
              },
            },
            coreFormulas: {
              type: Type.ARRAY,
              description: "A list of equations, grammatical rules, scientific laws, or historical context rules depending on the subject type.",
              items: {
                type: Type.OBJECT,
                properties: {
                  formulaOrRule: { type: Type.STRING, description: "The equation, rule, or model name/statement." },
                  explanation: { type: Type.STRING, description: "The descriptive explanation or components definition." },
                },
                required: ["formulaOrRule", "explanation"],
              },
            },
            studyTips: {
              type: Type.ARRAY,
              description: "At least 3 practical exam recommendations or cognitive strategies for this topic.",
              items: { type: Type.STRING },
            },
            flashcards: {
              type: Type.ARRAY,
              description: "A list of at least 4 high-frequency active recall questions and answers.",
              items: {
                type: Type.OBJECT,
                properties: {
                  front: { type: Type.STRING, description: "Study question or concept challenge." },
                  back: { type: Type.STRING, description: "A simple, clear, educational answer or answer steps." },
                },
                required: ["front", "back"],
              },
            },
          },
          required: ["summary", "keyDefinitions", "coreFormulas", "studyTips", "flashcards"],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Received empty response from the Gemini API.");
    }

    const studyGuideData = JSON.parse(responseText.trim());
    return res.json(studyGuideData);
  } catch (error: any) {
    console.error("Study guide generation via Gemini failed, loading high-quality dynamic fallback:", error);
    try {
      const fallbackGuide = getFallbackStudyGuide({ grade, subject, unit, subtopic, examId, examSubject, examYear });
      return res.json(fallbackGuide);
    } catch (fallbackError: any) {
      return res.status(500).json({
        error: "Generation Failed",
        message: error.message || "An unexpected error occurred during study guide generation.",
      });
    }
  }
});

// API endpoint to handle real-time chat messages for the AI Assistant
app.post("/api/ai-chat", async (req, res) => {
  const { message, history, attachments, isKidsMode, clientApiKey } = req.body;
  const activeAi = getAiClient(clientApiKey);

  if (!activeAi) {
    console.warn("Gemini client is not initialized for chat. Using highly relevant curriculum tutor response fallback...");
    const assistantName = isKidsMode ? "Foocus" : "EthioQuiz Focus AI";
    const greetingFallback = isKidsMode
      ? `Selam! I am ${assistantName}, your super-friendly educational helper! 🌟 I use simple analogies and happy emojis to help you learn! Let's talk about Math, Physics, Chemistry, Biology, or dynamic exam secrets! Currently, we are in offline conditions. Enter your GEMINI_API_KEY in the Settings tab to let me look at your images, videos, or camera captures! 🎉`
      : `Hello! I am ${assistantName}, your expert Ethiopian curriculum learning coach. I can help you master the new High School Curriculum (Grades 9 to 12) and prep for University Entrance Exams (EUEE).\n\nCurrently, the Gemini AI service is running under offline fallback. To activate interactive real-time AI capabilities, please enter your GEMINI_API_KEY in the **Settings** menu!`;

    let reply = greetingFallback;
    const msgLower = (message || "").toLowerCase();
    
    if (msgLower.includes("math") || msgLower.includes("equation") || msgLower.includes("calculus") || msgLower.includes("formula") || msgLower.includes("limit")) {
      reply = isKidsMode 
        ? `### Math is a Fun Puzzle! 🧩\n\nHey there! Let's explore how awesome Math is!\n\n1.  **Limits & Calculus:** Imagine walking halfway to a wall, and then halfway again. You keep getting closer and closer but never quite touch it! That is what a limit is! 🏃‍♂️\n2.  **Equations & Graphs:** Graphs are just secret drawings of equations! For example, a circle centered at $(h, k)$ with a radius of $r$ has a secret rule:\n    $$(x-h)^2 + (y-k)^2 = r^2$$\n\nTell me which Math problem we should play with today! ✏️`
        : `### mathematics study assistance (Grade 9-12 New Syllabus)\n\nIn the new Ethiopian high school mathematics curriculum, major focal areas include:\n\n1.  **Grade 11 & 12 Calculus:** Master limits, rates of change, derivations, and integrations. A primary rule is the classic limit:\n    $$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$$\n2.  **Matrices and Linear Transformations:** Highly tested for solving complex simultaneous linear systems using determinants or Gauss-Jordan methods.\n3.  **Coordinate Geometry:** Circles, parabolas, and ellipses are heavily featured. Make sure you understand standard equations like $(x-h)^2 + (y-k)^2 = r^2$.\n\nWhat mathematical concept or textbook exercise would you like to solve together?`;
    } else if (msgLower.includes("physics") || msgLower.includes("force") || msgLower.includes("velocity") || msgLower.includes("motion") || msgLower.includes("newton")) {
      reply = isKidsMode
        ? `### Fun with Physics! 🚀\n\nPhysics is just the game rules of the whole universe! Let's check them out:\n\n1.  **Newton's Laws ($F = ma$):** Force is like a big push or pull! If you kick a soccer ball hard (more force $F$), it flies faster and accelerates more ($a$)! ⚽💨\n2.  **Energy:** Energy is the power to do things! A roller coaster at the top of a hill has stored potential energy, and when it zooms down, it turns into kinetic speed energy! 🎢\n\nWant to solve a physics challenge or study forces with me? Let's go! 🌟`
        : `### physics learning companion (Grade 9-12 New Syllabus)\n\nPhysics under the modern Ministry of Education curriculum covers:\n\n1.  **Mechanics & Dynamics (Grade 11):** Projectile motion, momentum conservation, and Newton's Laws ($F = ma$). Also focus on rotational kinetic energy and angular momentum.\n2.  **Electromagnetism (Grade 12):** Coulomb's Law of electrostatic force, electric potential, moving charges in magnetic fields, and Faraday's Law of induction.\n3.  **Thermodynamics & Fluid Mechanics:** Clean concepts of fluid dynamics (Bernoulli's Principle) and heat engine efficiency ($e = 1 - \\frac{T_c}{T_h}$).\n\nWhat physics topic should we check or calculate?`;
    } else if (msgLower.includes("chemistry") || msgLower.includes("reaction") || msgLower.includes("bond") || msgLower.includes("acid") || msgLower.includes("equilibrium")) {
      reply = isKidsMode
        ? `### Cool Bonding Chemistry! 🧪\n\nChemistry is like a big recipe book where atoms are the ingredients! 👩‍🔬\n\n1.  **Chemical Bonds:** Atoms are like friendly kids! Ionic bonds are when one atom gives a toy (electron) to another to become best friends. Covalent bonds are when they agree to share the toy! 🤝\n2.  **Acids and Bases:** Acids are sour (like lemons! 🍋) and bases are slippery (like soap! 🧼). We measure how sour or soapy they are using pH!\n\nWhat fun chemistry formula or bond do you want to explore? 🔮`
        : `### chemistry tutor guide (Grade 9-12 New Syllabus)\n\nIn the new educational guidelines, high school Chemistry focuses extensively on:\n\n1.  **Chemical Bonding (Grade 11):** Lewis dot structures, covalent/ionic bonds, hybridization (sp, sp2, sp3), and the VSEPR theory for molecular shapes.\n2.  **Chemical Equilibrium & Acid-Base Theory:** Le Chatelier's Principle, buffer solutions, weak acid/base ionization constants ($K_a$, $K_b$), and calculations of pH/pOH.\n3.  **Electrochemistry (Grade 12):** Voltaic or galvanic cells, calculating cell potentials ($E^0_{cell} = E^0_{cathode} - E^0_{anode}$), and electrolysis calculations using Faraday's Constants.\n\nLet's analyze a chemical equation or rule together!`;
    } else if (msgLower.includes("biology") || msgLower.includes("cell") || msgLower.includes("genetics") || msgLower.includes("human") || msgLower.includes("organism")) {
      reply = isKidsMode
        ? `### The Amazing World of Cells! 🧬\n\nCells are the super tiny building blocks of everything that is alive - plants, animals, and YOU! 🌿🦁\n\n1.  **Mighty Mitochondria:** This is the battery or powerplant of the cell! It turns the food we eat into high-voltage energy so we can run and jump! 🔋\n2.  **DNA & Genetics:** DNA is your body's instruction manual. It decides your eye color, hair type, and if you can roll your tongue! 📖🔬\n\nAsk me any biology question to inspect deeper!`
        : `### biology tutor guide (Grade 9-12 New Syllabus)\n\nEthiopian High School biology covers foundational concepts critical for medical and agricultural streams:\n\n1.  **Cell Biology (Cytology):** Organelle structures, mitochondrial cellular respiration (Glycolysis, Krebs Cycle, and Electron Transport Chain), and enzyme action.\n2.  **Genetics & DNA (Grade 12):** Mendelian crosses (dominant/recessive alleles), Watson-Crick double helix structure, transcription (DNA to RNA), and translation on ribosomes.\n3.  **Microorganisms & Disease:** The virus structures, bacterial pathology, immune defenses, and endemic disease challenges in East Africa.\n\nAsk me any biology question to inspect deeper!`;
    } else if (msgLower.includes("euee") || msgLower.includes("entrance") || msgLower.includes("exam") || msgLower.includes("prepar") || msgLower.includes("test")) {
      reply = isKidsMode
        ? `### Scoring Stars on Exams! 🎯\n\nPreparing for the EUEE is just like practicing for a big game! Here are our gaming codes:\n\n1.  **Play Level-by-Level:** Practice with our **EUEE Preparation** nav tab. Starting with specific subject units helps you level up your brain! 🎮\n2.  **Beat the Boss Timer:** Each question has a 60-second limit. If you get stuck on a super-hard level, just skip it and defeat the easier ones first! ⏳\n\nClick the **EUEE Preparation** tab to play practice mode!`
        : `### EUEE university entrance exam strategies\n\nTo pass the EUEE with high competitive scores, implement these three golden rules:\n\n1.  **Spaced Recall on Past Papers:** The exam structures test core analytical competencies repeated from Grade 11 & 12 textbook units. Use our **EUEE Preparation** tool to practice real previous papers.\n2.  **Time Optimization:** EUEE gives around 60-120 seconds per question. Learn to quickly bypass highly complex arithmetic questions and solve conceptual questions first.\n3.  **Aptitude Mastery:** Scholastic Aptitude Tests (SAT) are excellent for scoring easy, massive points if you practice reasoning daily.\n\nClick the **EUEE Preparation** nav tab in the sidebar to launch a practice session!`;
    } else if (attachments && attachments.length > 0) {
      reply = `### Files Observed! 🌟\n\nI can see you uploaded ${attachments.length} media file(s)! Currently in local offline mode, I cannot inspect images/videos. Complete your setup by entering your key under **Settings**! 🎉`;
    }
    
    return res.json({ reply, isFallback: true });
  }

  try {
    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }]
    }));

    // Construct parts array for Gemini content call
    const lastParts: any[] = [{ text: message || "Please review these attachments and guide me!" }];
    if (attachments && Array.isArray(attachments)) {
      attachments.forEach((att: any) => {
        let base64Data = att.data;
        if (base64Data.includes("base64,")) {
          base64Data = base64Data.split("base64,")[1];
        }
        lastParts.push({
          inlineData: {
            mimeType: att.mimeType,
            data: base64Data
          }
        });
      });
    }

    const assistantName = isKidsMode ? "Foocus" : "EthioQuiz Focus Expert AI Assistant";
    const systemInstruction = isKidsMode
      ? "You are 'Foocus', a fun, supportive and energetic AI Learning Assistant for children. You love using happy emojis and simple analogies to help kids understand high school subjects (Mathematics, Physics, Chemistry, Biology) and clear study concepts. When answering questions, write in a very clear, easy-to-understand, kid-friendly way, but keep your content academically accurate. Bold key terms and keep lists highly readable!"
      : "You are the 'EthioQuiz Focus Expert AI Assistant', an enthusiastic academic coach specializing in the Ethiopian National High School Curriculum (Grade 9-12 level) and University Entrance Examinations (EUEE). You explain difficult science, math, or language concepts cleanly, concisely, and with structured bullet points. Bold terms to maintain scannability. Use basic markdown equations or simple bold formulas. Always remain encouraging and highly educational.";

     let response;
    try {
      response = await generateContentWithFallback(activeAi, {
        model: "gemini-3.5-flash",
        contents: [
          ...formattedHistory,
          { role: "user", parts: lastParts }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
          tools: [{ googleSearch: {} }]
        }
      });
    } catch (searchError: any) {
      console.warn("Generating content with search tool failed, retrying without tools:", searchError.message || searchError);
      response = await generateContentWithFallback(activeAi, {
        model: "gemini-3.5-flash",
        contents: [
          ...formattedHistory,
          { role: "user", parts: lastParts }
        ],
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });
    }

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web?.uri)
      .map((chunk: any) => ({
        title: chunk.web.title || "Search Source",
        uri: chunk.web.uri
      }));

    return res.json({
      reply: response.text || "I was unable to formulate an answer right now.",
      sources,
      isFallback: false
    });
  } catch (error: any) {
    console.error("AI Assistant Chat generation failed:", error);
    return res.json({
      reply: `It looks like my AI services details have an issue. Error message: ${error.message || error.toString()}. If you have a custom key, please enter it in the Settings tab! Let me know what academic topic you want to discuss and we'll check preloaded notes instead!`,
      isFallback: true
    });
  }
});

// Configure Vite or production static assets serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

setupServer();
