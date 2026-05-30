import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  BookOpen,
  Award,
  History,
  Brain,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Loader2,
  FileText,
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  Percent,
  Timer,
  Download,
  Play,
  ExternalLink,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Video,
  Home,
  Settings,
  ChevronLeft
} from "lucide-react";
import { GRADES_DATA, ENTRANCE_EXAMS_DATA, PRELOADED_QUIZZES } from "./curriculumData";
import { Question, Quiz, QuizAttempt, GradeNode, SubjectNode, UnitNode, SubtopicNode, EntranceExamNode } from "./types";
import FocusMusicPlayer from "./components/FocusMusicPlayer";

// Safe localStorage wrapper to prevent crashes in sandboxed iframe environments or locked cookie configurations
const safeStorage = {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn("Storage access denied or unavailable:", e);
      return null;
    }
  },
  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn("Storage write denied or unavailable:", e);
    }
  },
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("Storage deletion denied or unavailable:", e);
    }
  }
};

// Translation dictionary for multilingual capability (English, Amharic, Afaan Oromoo)
export const ETHIO_TRANSLATIONS = {
  en: {
    syllabusTopics: "Syllabus Topics",
    entranceExam: "University Entrance (EUEE)",
    studyProgress: "Study Progress",
    globedockLectures: "Video Classes",
    publishButton: "📦 Publish App",
    installButton: "📲 Install Shortcut",
    returnToCatalog: "Return to Catalog",
    gradesTitle: "Grades / Levels",
    subjectsTitle: "Course Subjects",
    unitsTitle: "Unit Lessons",
    subtopicsTitle: "Active Subtopics",
    scoreIndicator: "Score Accuracy",
    timeSpentIndicator: "Total Practice Time",
    completedStatus: "Completed",
    notCompletedStatus: "Mark complete",
    startQuizButton: "Start Interactive Quiz",
    aiStudyGuideButton: "AI Study Guide",
    langButtonText: "Language / ቋንቋ / Qooqaa",
    currentLang: "English",
    showNavbarText: "Show Navigator",
    hideNavbarText: "Hide Navigator",
    newSyllabusStandard: "New Syllabus Standard (Grade 9 - 12)",
    masterHighSchool: "Master High School Topics & Step up your Grades.",
    practiceWithInfinite: "Practice with infinite questions calibrated precisely matching the New Ethiopian High School Curriculum. Every quiz offers comprehensive, contextually accurate solutions underneath to reinforce knowledge.",
    overallLessonsCompleted: "Overall Lessons Completed",
    highSchoolProgress: "Your High School Study Progress",
    selectGradeSubject: "Select Grade & Subject on step cards below to check detailed progress scores.",
    quickLaunchTitle: "⚡ Quick Launch: Instant Study Guides & Practice Quizzes",
    curriculumMasterProgress: "Curriculum Master Progress",
    realTimePersistence: "Real-time persistence",
    trackSummaries: "Track summaries, definitions, equations, and active recall cards. Mark segments as studied inside standard lists or during Gemini study sessions to update progress here!",
    lessons: "Lessons",
    remainingPhrase: "remaining to fully cover",
    grade9_12Hub: "| Grade 9-12 Study & Prep Hub",
    newCurriculum: "National New Curriculum & EUEE Preparatory"
  },
  am: {
    syllabusTopics: "የስርዓተ-ትምህርት ርዕሶች",
    entranceExam: "የዩኒቨርሲቲ መግቢያ (EUEE)",
    studyProgress: "የጥናት ሂደት",
    globedockLectures: "የቪዲዮ ትምህርቶች",
    publishButton: "📦 መተግበሪያውን አውጣ",
    installButton: "📲 አቋራጭ መተግበሪያ",
    returnToCatalog: "ወደ ዋናው ማውጫ ተመለስ",
    gradesTitle: "የትምህርት ክፍሎች",
    subjectsTitle: "የትምህርት አይነቶች",
    unitsTitle: "የትምህርት ምዕራፎች",
    subtopicsTitle: "የምዕራፍ ንዑስ ርዕሶች",
    scoreIndicator: "የትክክለኛነት ውጤት",
    timeSpentIndicator: "አጠቃላይ የልምምድ ጊዜ",
    completedStatus: "ተጠናቋል",
    notCompletedStatus: "እንዳለቀ ምልክት አድርግ",
    startQuizButton: "ኢንተራክቲቭ ፈተና ጀምር",
    aiStudyGuideButton: "የAI የጥናት መመሪያ",
    langButtonText: "ቋንቋ / Language",
    currentLang: "አማርኛ",
    showNavbarText: "አቅጣጫ ጠቋሚ አሳይ",
    hideNavbarText: "አቅጣጫ ጠቋሚ ደብቅ",
    newSyllabusStandard: "አዲሱ የስርዓተ-ትምህርት ደረጃ (ክፍል 9 - 12)",
    masterHighSchool: "የሁለተኛ ደረጃ ትምህርቶችን ያንብቡ እና ውጤትዎን ያሻሽሉ።",
    practiceWithInfinite: "ከአዲሱ የኢትዮጵያ ሁለተኛ ደረጃ ትምህርት ስርዓተ-ትምህርት ጋር በተጣጣሙ ገደብ በሌላቸው ጥያቄዎች ይለማመዱ። እያንዳንዱ ፈተና እውቀትን ለማጠናከር በውስጡ ዝርዝር መፍትሄዎችን ይዟል።",
    overallLessonsCompleted: "አጠቃላይ የተጠናቀቁ ትምህርቶች",
    highSchoolProgress: "የእርስዎ የሁለተኛ ደረጃ ጥናት ሂደት",
    selectGradeSubject: "ዝርዝር የሂደት ውጤቶችን ለማየት ከታች ያሉትን የክፍል እና የትምህርት አይነቶች ይምረጡ።",
    quickLaunchTitle: "⚡ ፈጣን ማስጀመሪያ- የAI ጥናት መመሪያዎች እና ፈጣን ጥያቄዎች",
    curriculumMasterProgress: "የስርዓተ-ትምህርቱ ዋና ሂደት",
    realTimePersistence: "እውነተኛ-ጊዜ ቁጥጥር",
    trackSummaries: "ማጠቃለያዎችን፣ ቀመሮችን እና የማስተወሻ ካርዶችን እዚህ ይከታተሉ። እድገትዎን ለማሻሻል ትምህርቶችን እንደተጠናቀቁ ምልክት ያድርጉባቸው!",
    lessons: "ትምህርቶች",
    remainingPhrase: "ለመጨረስ ይቀራል",
    grade9_12Hub: "| ከ9ነኛ-12ነኛ ክፍል ማዕከል",
    newCurriculum: "ብሔራዊ አዲስ ስርዓተ-ትምህርት እና የEUEE ዝግጅት"
  },
  om: {
    syllabusTopics: "Mata-dureewwan Silabasii",
    entranceExam: "Seensa Yuunivarsiitii (EUEE)",
    studyProgress: "Adeemsa Barumsaa",
    globedockLectures: "Barnoota Viidiyoo",
    publishButton: "📦 Appii Gurguri",
    installButton: "📲 Gabajee Haqi",
    returnToCatalog: "Gara Kaatalaagiitti Deebi'i",
    gradesTitle: "Kutaalee Barumsaa",
    subjectsTitle: "Mata-duree Barnootaa",
    unitsTitle: "Boqonnaalee Barnootaa",
    subtopicsTitle: "Mata-dureewwan Xiqqaa",
    scoreIndicator: "Qabxii Sirrummaa",
    timeSpentIndicator: "Yeroo Waligalaa Harca'e",
    completedStatus: "Xumurameera",
    notCompletedStatus: "Akka xumurameetti mallatteessi",
    startQuizButton: "Qormaata Jalqabi",
    aiStudyGuideButton: "Qajeelfama AI",
    langButtonText: "Qooqaa / Language",
    currentLang: "Afaan Oromoo",
    showNavbarText: "Navigeetara Agarsiisi",
    hideNavbarText: "Navigeetara Dhoksi",
    newSyllabusStandard: "Istandardsii Silabasii Haaraa (Kutaa 9 - 12)",
    masterHighSchool: "Mata-dureewwan Mana Barumsaa Olaanoo Mastery & qabxii keessan ol guddifadhaa.",
    practiceWithInfinite: "Gaaffilee daangaa hin qabne kanneen sirriitti Kaariikulaamii Haaraa Mana Barumsaa Olaanoo Itoophiyaa waliin walsiman qoradhaa. Qormaata hunda jala furmaata bal'aa argattu.",
    overallLessonsCompleted: "Barnoota Waligalaa Xumurame",
    highSchoolProgress: "Adeemsa Qophii Mana Barumsaa Olaanoo Keessan",
    selectGradeSubject: "Adeemsa keessan guutuu arguuf kutaalee fi saboota armaan gadii filadhaa.",
    quickLaunchTitle: "⚡ Quick Launch: Qajeelfama AI fi Qormaata Saffisaa",
    curriculumMasterProgress: "Adeemsa Guutuu Kaariikulaamii",
    realTimePersistence: "Persistence Yeroo-Dhugaa",
    trackSummaries: "Gabaajee, hiika, kofootanii fi kaardii yaadannoo hordofaa. Adeemsa keessan fooyyessuuf barnoota irratti xumurameesaa!",
    lessons: "Barnoota",
    remainingPhrase: "guutuuf kan hafe",
    grade9_12Hub: "| Giddu-gala Kutaa 9-12",
    newCurriculum: "Silabasii Haaraa Biyoolessaa & Qophii EUEE"
  }
};

export default function App() {
  // Navigation
  const [activeTab, setActiveTab ] = useState<"home" | "syllabus" | "video" | "history" | "entrance" | "ai" | "settings">("home");
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  // Dark Mode Configuration
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = safeStorage.getItem("ethioquiz_dark");
    if (saved !== null) {
      return saved === "true";
    }
    // Automatically match human operating system preferences upon initial load
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    safeStorage.setItem("ethioquiz_dark", isDarkMode ? "true" : "false");
  }, [isDarkMode]);

  // Language customization
  const [language, setLanguage] = useState<"en" | "am" | "om">(() => {
    const saved = safeStorage.getItem("ethioquiz_lang");
    return (saved === "am" || saved === "om" || saved === "en") ? saved : "am";
  });

  const [showLanguageDropdown, setShowLanguageDropdown] = useState<boolean>(false);

  useEffect(() => {
    safeStorage.setItem("ethioquiz_lang", language);
  }, [language]);

  // Translate helper variable
  const t = ETHIO_TRANSLATIONS[language];

  // Selection state
  const [selectedGrade, setSelectedGrade] = useState<GradeNode | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<SubjectNode | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<UnitNode | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<SubtopicNode | null>(null);

  // Entrance select
  const [selectedExam, setSelectedExam] = useState<EntranceExamNode | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("");

  // Quiz execution
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [isAiGenerated, setIsAiGenerated] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizScore, setQuizScore] = useState<number>(0);
  
  // Study Guide states
  const [activeStudyGuide, setActiveStudyGuide] = useState<any | null>(null);
  const [isLoadingStudyGuide, setIsLoadingStudyGuide] = useState<boolean>(false);
  const [currentStudyGuideTab, setCurrentStudyGuideTab] = useState<"summary" | "cheat" | "flashcards">("summary");
  const [revealedFlashcards, setRevealedFlashcards] = useState<Record<number, boolean>>({});

  // Stats
  const [startTime, setStartTime] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<any>(null);
  const [questionStartElapsed, setQuestionStartElapsed] = useState<number>(0);

  // History & local storage
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [historicalReviewAttempt, setHistoricalReviewAttempt] = useState<Quiz | null>(null);

  // States
  const [isLoadingQuiz, setIsLoadingQuiz] = useState<boolean>(false);
  const [quizLoadingProgress, setQuizLoadingProgress] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");

  // UI accordion for explanations in review
  const [openExplanationIndex, setOpenExplanationIndex] = useState<number | null>(null);

  // Study Progress management state
  const [completedSubtopics, setCompletedSubtopics] = useState<Record<string, boolean>>({});
  
  // Google Chrome Installer states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showChromeInstallInfo, setShowChromeInstallInfo] = useState<boolean>(false);

  // Entrance stream filter state
  const [selectedEntranceStream, setSelectedEntranceStream] = useState<"all" | "natural" | "social">("all");

  // Unfinished assessment state
  const [unfinishedQuizData, setUnfinishedQuizData] = useState<any | null>(null);

  // States for curriculum browse/search: "all topics of all subjects"
  const [curriculumSearchQuery, setCurriculumSearchQuery] = useState<string>("");
  const [showAllTopicsList, setShowAllTopicsList] = useState<boolean>(false);
  const [selectedExploreGrade, setSelectedExploreGrade] = useState<string>("all");
  const [selectedExploreSubject, setSelectedExploreSubject] = useState<string>("all");
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [showNavbar, setShowNavbar] = useState<boolean>(false);

  // Companion fixed-sidebar UI state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return safeStorage.getItem("ethioquiz_sidebar_collapsed") === "true";
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // AI Assistant Chatbot state with attachment support
  interface ChatMessage {
    role: "user" | "model";
    text: string;
    date: string;
    attachments?: { mimeType: string; data: string; name: string }[];
    sources?: { title: string; uri: string }[];
  }

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const isKids = safeStorage.getItem("ethioquiz_kids_mode") === "true";
    return [
      { 
        role: "model", 
        text: isKids
          ? "Selam! 🌟 I am Foocus, your cheerful, kid-friendly study buddy! I love using neat analogies and happy emojis to help you understand Mathematics, Physics, Chemistry, and Biology. Send me a message or snap a photo of any school problem, and let's solve it together! 🎉"
          : "Selam! I am your AI Study Assistant. Ask me any question related to Grade 9-12 subjects (Mathematics, Physics, Chemistry, Biology, English) or University Entrance Exams (EUEE). Let's learn together!", 
        date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) 
      }
    ];
  });
  const [currentChatMessage, setCurrentChatMessage] = useState<string>("");
  const [isSendingChatMessage, setIsSendingChatMessage] = useState<boolean>(false);

  // Custom user settings & Foocus camera features
  const [clientApiKey, setClientApiKey] = useState<string>(() => {
    return safeStorage.getItem("ethioquiz_api_key") || "";
  });
  const [isKidsMode, setIsKidsMode] = useState<boolean>(() => {
    return safeStorage.getItem("ethioquiz_kids_mode") === "true";
  });
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [attachedMedia, setAttachedMedia] = useState<{ mimeType: string; data: string; name: string }[]>([]);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    safeStorage.setItem("ethioquiz_api_key", clientApiKey);
  }, [clientApiKey]);

  useEffect(() => {
    safeStorage.setItem("ethioquiz_kids_mode", isKidsMode ? "true" : "false");
    if (chatMessages.length === 1 && chatMessages[0].role === "model") {
      setChatMessages([
        {
          role: "model",
          text: isKidsMode
            ? "Selam! 🌟 I am Foocus, your cheerful, kid-friendly study buddy! I love using neat analogies and happy emojis to help you understand Mathematics, Physics, Chemistry, and Biology. Send me a message or snap a photo of any school problem, and let's solve it together! 🎉"
            : "Selam! I am your AI Study Assistant. Ask me any question related to Grade 9-12 subjects (Mathematics, Physics, Chemistry, Biology, English) or University Entrance Exams (EUEE). Let's learn together!",
          date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }
  }, [isKidsMode]);

  // Auto-scroll when chat messages mutate or loading state shifts
  useEffect(() => {
    if (activeTab === "ai") {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [chatMessages, isSendingChatMessage, activeTab]);

  // Sync sidebar collapse setting
  useEffect(() => {
    safeStorage.setItem("ethioquiz_sidebar_collapsed", isSidebarCollapsed ? "true" : "false");
  }, [isSidebarCollapsed]);

  // Track dynamic counting percentage for dynamic study quiz loading animations
  useEffect(() => {
    let timer: any = null;
    if (isLoadingQuiz || isLoadingStudyGuide) {
      setQuizLoadingProgress(0);
      timer = setInterval(() => {
        setQuizLoadingProgress((prev) => {
          if (prev >= 98) {
            return 98;
          }
          // Increment smoothly: faster early on, slower at high percentages to build real-time expectation
          const step = prev < 30 ? 6 : prev < 60 ? 4 : prev < 85 ? 2 : 1;
          const next = prev + step;
          return next > 98 ? 98 : next;
        });
      }, 120);
    } else {
      setQuizLoadingProgress(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLoadingQuiz, isLoadingStudyGuide]);

  // Load history & progress from localStorage on mount
  useEffect(() => {
    const saved = safeStorage.getItem("ethiopian_prep_attempts");
    if (saved) {
      try {
        setAttempts(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading mock storage data", e);
      }
    }

    const savedProgress = safeStorage.getItem("ethiopian_prep_progress");
    if (savedProgress) {
      try {
        setCompletedSubtopics(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Error loading progress details", e);
      }
    }

    const savedUnfinished = safeStorage.getItem("ethiopian_prep_unfinished_quiz");
    if (savedUnfinished) {
      try {
        setUnfinishedQuizData(JSON.parse(savedUnfinished));
      } catch (e) {
        console.error("Error loading unfinished assessment data", e);
      }
    }

    // Default selection fallback to ensure we immediately render real study/practice options right away
    try {
      const defaultGrade = GRADES_DATA.find(g => g.id === "12");
      if (defaultGrade) {
        setSelectedGrade(defaultGrade);
        const defaultSubj = defaultGrade.subjects.find(s => s.id === "physics");
        if (defaultSubj) {
          setSelectedSubject(defaultSubj);
          const defaultUnit = defaultSubj.units.find(u => u.id === "u2"); // Unit 2: Electromagnetism
          if (defaultUnit) {
            setSelectedUnit(defaultUnit);
            const defaultSubtopic = defaultUnit.subtopics.find(st => st.id === "s7"); // Faraday's Law
            if (defaultSubtopic) {
              setSelectedSubtopic(defaultSubtopic);
            }
          }
        }
      }

      const defaultExam = ENTRANCE_EXAMS_DATA.find(e => e.id === "euee_maths_nat") || ENTRANCE_EXAMS_DATA[0];
      if (defaultExam) {
        setSelectedExam(defaultExam);
        if (defaultExam.years && defaultExam.years.length > 0) {
          setSelectedYear(defaultExam.years[0]);
        }
      }
    } catch (err) {
      console.error("Error setting initial curriculum favorites", err);
    }

    // Capture standard install trigger inside Google Chrome
    const handleBeforePrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforePrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforePrompt);
    };
  }, []);

  // Sync active quiz state as unfinished assessment draft
  useEffect(() => {
    if (activeQuiz && currentQuestionIndex < activeQuiz.questions.length && !historicalReviewAttempt) {
      const data = {
        activeQuiz,
        isAiGenerated,
        currentQuestionIndex,
        userAnswers,
        quizScore,
        startTime,
        timeSpent,
        selectedOptionIndex,
        hasAnswered,
        lastSaved: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      };
      safeStorage.setItem("ethiopian_prep_unfinished_quiz", JSON.stringify(data));
      setUnfinishedQuizData(data);
    } else {
      // If we exit active quiz, or reach its end, delete the draft
      if (activeQuiz && currentQuestionIndex >= activeQuiz.questions.length) {
        safeStorage.removeItem("ethiopian_prep_unfinished_quiz");
        setUnfinishedQuizData(null);
      }
    }
  }, [activeQuiz, currentQuestionIndex, userAnswers, quizScore, startTime, timeSpent, selectedOptionIndex, hasAnswered, isAiGenerated, historicalReviewAttempt]);

  // Timer logic during quiz
  useEffect(() => {
    if (activeQuiz && !hasAnswered && currentQuestionIndex === 0 && startTime === 0) {
      setStartTime(Date.now());
    }
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [activeQuiz]);

  // Start dynamic timer
  useEffect(() => {
    let interval: any;
    if (activeQuiz && !historicalReviewAttempt) {
      interval = setInterval(() => {
        setTimeSpent(Math.round((Date.now() - (startTime || Date.now())) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeQuiz, startTime, historicalReviewAttempt]);

  // Reset question elapsed time on question indices change
  useEffect(() => {
    if (activeQuiz) {
      setQuestionStartElapsed(timeSpent);
    } else {
      setQuestionStartElapsed(0);
    }
  }, [currentQuestionIndex, activeQuiz]);

  // Handle attempt saving
  const saveAttempt = (finalScore: number) => {
    const currentQuiz = activeQuiz;
    if (!currentQuiz) return;

    const newAttempt: QuizAttempt = {
      id: "attempt_" + Date.now(),
      quizTitle: currentQuiz.title,
      grade: currentQuiz.grade,
      subject: currentQuiz.subject,
      score: finalScore,
      totalQuestions: currentQuiz.questions.length,
      timeSpentSeconds: timeSpent,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = [newAttempt, ...attempts];
    setAttempts(updated);
    safeStorage.setItem("ethiopian_prep_attempts", JSON.stringify(updated));
  };

  // Check and launch quiz
  const handleStartQuiz = async () => {
    if (activeTab === "syllabus") {
      if (!selectedGrade || !selectedSubject || !selectedUnit || !selectedSubtopic) {
        setErrorMsg("Please select Grade, Subject, Unit, and Subtopic first.");
        return;
      }

      setErrorMsg(null);
      setIsLoadingQuiz(true);
      setStatusMessage("Analysing New Curriculum documents...");

      // Check for offline/preloaded fallback to start immediately!
      const fallbackKey = `${selectedSubject.id}_${selectedSubtopic.id}`;
      const preloaded = PRELOADED_QUIZZES[fallbackKey];

      if (preloaded) {
        setTimeout(() => {
          setActiveQuiz(preloaded);
          setIsAiGenerated(false);
          setCurrentQuestionIndex(0);
          setSelectedOptionIndex(null);
          setHasAnswered(false);
          setUserAnswers([]);
          setQuizScore(0);
          setStartTime(Date.now());
          setTimeSpent(0);
          setIsLoadingQuiz(false);
        }, 900);
        return;
      }

      // Query server for AI generation
      try {
        setStatusMessage("Connecting to AI Instructor...");
        const response = await fetch("/api/generate-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            grade: selectedGrade.name,
            subject: selectedSubject.name,
            unit: selectedUnit.name,
            subtopic: selectedSubtopic.name,
          }),
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          throw new Error(errBody.message || "Failed to generate dynamic curriculum quiz");
        }

        setStatusMessage("Formatting answers & reasons...");
        const result = await response.json();
        
        if (!result.questions || !Array.isArray(result.questions) || result.questions.length === 0) {
          throw new Error("Invalid structure returned. Please retry.");
        }

        const formattedQuiz: Quiz = {
          title: `${selectedSubtopic.name} (${selectedGrade.name})`,
          grade: selectedGrade.name,
          subject: selectedSubject.name,
          unit: selectedUnit.name,
          subtopic: selectedSubtopic.name,
          questions: result.questions,
          isFallback: result.isFallback,
        };

        setActiveQuiz(formattedQuiz);
        setIsAiGenerated(true);
        setCurrentQuestionIndex(0);
        setSelectedOptionIndex(null);
        setHasAnswered(false);
        setUserAnswers([]);
        setQuizScore(0);
        setStartTime(Date.now());
        setTimeSpent(0);
      } catch (err: any) {
        setErrorMsg(err.message || "Something went wrong while connecting to the AI server.");
      } finally {
        setIsLoadingQuiz(false);
      }
    } else if (activeTab === "entrance") {
      if (!selectedExam || !selectedYear) {
        setErrorMsg("Please select both an Entrance Exam Subject and an Exam Year.");
        return;
      }

      setErrorMsg(null);
      setIsLoadingQuiz(true);
      setStatusMessage(`Verifying ${selectedYear} EUEE examination blueprints...`);

      try {
        setStatusMessage(`Retrieving curriculum archives...`);
        const response = await fetch("/api/generate-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            examId: selectedExam.id,
            examSubject: selectedExam.subject,
            examYear: selectedYear,
          }),
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          throw new Error(errBody.message || "Failed to generate dynamic entrance exam");
        }

        setStatusMessage("Authenticating questions...");
        const result = await response.json();

        if (!result.questions || !Array.isArray(result.questions) || result.questions.length === 0) {
          throw new Error("Invalid exam blueprint schema. Please retry.");
        }

        const formattedQuiz: Quiz = {
          title: `EUEE ${selectedExam.subject} (${selectedYear})`,
          grade: "Grade 12",
          subject: `${selectedExam.subject} Exam`,
          unit: "EUEE Prep",
          subtopic: selectedYear,
          questions: result.questions,
          isFallback: result.isFallback,
        };

        setActiveQuiz(formattedQuiz);
        setIsAiGenerated(true);
        setCurrentQuestionIndex(0);
        setSelectedOptionIndex(null);
        setHasAnswered(false);
        setUserAnswers([]);
        setQuizScore(0);
        setStartTime(Date.now());
        setTimeSpent(0);
      } catch (err: any) {
        setErrorMsg(err.message || "Something went wrong while generating the EUEE entrance prep exam.");
      } finally {
        setIsLoadingQuiz(false);
      }
    }
  };

  // Submit response for currently viewed question
  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || hasAnswered || !activeQuiz) return;

    const currentQuestion = activeQuiz.questions[currentQuestionIndex];
    const isCorrect = selectedOptionIndex === currentQuestion.correctAnswerIndex;
    
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => [...prev, selectedOptionIndex]);
    setHasAnswered(true);
  };

  // Progress to next question or show report summary
  const handleNextQuestion = () => {
    if (!activeQuiz) return;

    if (currentQuestionIndex + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setHasAnswered(false);
    } else {
      // End of quiz, save attempt
      saveAttempt(quizScore);
      // Mark as showing report card/review state but keep activeQuiz to draw the report
      setCurrentQuestionIndex(activeQuiz.questions.length); 
    }
  };

  // Quick reset to dashboard
  const handleExitQuiz = () => {
    setActiveQuiz(null);
    setActiveStudyGuide(null);
    setSelectedGrade(null);
    setSelectedSubject(null);
    setSelectedUnit(null);
    setSelectedSubtopic(null);
    setSelectedExam(null);
    setSelectedYear("");
    setErrorMsg(null);
    setHistoricalReviewAttempt(null);
  };

  const handleExitStudyGuide = () => {
    setActiveStudyGuide(null);
    setRevealedFlashcards({});
  };

  // Dispatch questions to the safe server-side AI chatbot tutoring engine
  const handleSendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = currentChatMessage.trim();
    if ((!query && attachedMedia.length === 0) || isSendingChatMessage) return;

    const userMsg: ChatMessage = {
      role: "user" as const,
      text: query,
      attachments: [...attachedMedia],
      date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setCurrentChatMessage("");
    const activeAttachments = [...attachedMedia];
    setAttachedMedia([]); // Clear files upon sending
    setIsSendingChatMessage(true);

    try {
      const resp = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: chatMessages.map(m => ({ role: m.role, text: m.text })),
          attachments: activeAttachments.map(att => ({ mimeType: att.mimeType, data: att.data })),
          isKidsMode,
          clientApiKey
        })
      });

      const data = await resp.json();
      const modelMsg = {
        role: "model" as const,
        text: data.reply || "I am facing some trouble formulating a response. Please check your text topic and try again!",
        sources: data.sources,
        date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setChatMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      console.error("Error communicating with AI Chatbot:", err);
      const errMsg = {
        role: "model" as const,
        text: "I experienced an offline latency connection error. Please verify your internet connection or check your API secret key status.",
        date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setChatMessages(prev => [...prev, errMsg]);
    } finally {
      setIsSendingChatMessage(false);
    }
  };

  // Camera Open Handler for live capturing questions
  const handleCameraOpen = async () => {
    try {
      setShowCamera(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      setCameraStream(stream);
      setTimeout(() => {
        const video = document.getElementById("camera-stream-view") as HTMLVideoElement;
        if (video) {
          video.srcObject = stream;
        }
      }, 200);
    } catch (err) {
      console.error("Camera permissions blocked (safe inside iframe fallback):", err);
      // Give a friendly visual banner fallback
      alert("Could not access camera stream. If you are inside the preview iframe, please use the direct file upload buttons to upload pictures instead!");
      setShowCamera(false);
    }
  };

  const handleCameraClose = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(t => t.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  };

  const handleCameraCapture = () => {
    const video = document.getElementById("camera-stream-view") as HTMLVideoElement;
    if (video) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setAttachedMedia(prev => [...prev, {
          mimeType: "image/png",
          data: dataUrl,
          name: `camera-${Date.now()}.png`
        }]);
      }
      handleCameraClose();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file: any) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAttachedMedia(prev => [...prev, {
            mimeType: file.type,
            data: reader.result as string,
            name: file.name
          }]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleJumpToSubject = (gradeName: string, subjectName: string) => {
    const gradeNode = GRADES_DATA.find(g => g.name.toLowerCase().includes(gradeName.toLowerCase()));
    if (gradeNode) {
      setSelectedGrade(gradeNode);
      const subNode = gradeNode.subjects.find(s => s.name.toLowerCase().includes(subjectName.toLowerCase()));
      if (subNode) {
        setSelectedSubject(subNode);
        if (subNode.units && subNode.units.length > 0) {
          setSelectedUnit(subNode.units[0]);
          if (subNode.units[0].subtopics && subNode.units[0].subtopics.length > 0) {
            setSelectedSubtopic(subNode.units[0].subtopics[0]);
          }
        }
      }
    }
    setActiveTab("syllabus");
  };

  const renderMessageText = (txt: string) => {
    if (!txt) return null;
    return txt.split("\n").map((line, idx) => {
      if (line.startsWith("### ")) {
        return <h3 key={idx} className="text-sm font-black text-indigo-500 dark:text-indigo-400 mt-2.5 mb-1 uppercase tracking-wider">{line.replace("### ", "")}</h3>;
      }
      if (line.startsWith("## ")) {
        return <h2 key={idx} className="text-base font-black text-slate-800 dark:text-slate-100 mt-3 mb-1">{line.replace("## ", "")}</h2>;
      }
      if (line.startsWith("1. ") || line.startsWith("- ") || line.startsWith("* ")) {
        const clean = line.replace(/^(1\.\s*|-\s*|\*\s*)/, "");
        return <li key={idx} className="ml-4 list-decimal pl-1 text-xs sm:text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">{clean}</li>;
      }
      return <p key={idx} className="text-xs sm:text-[13px] leading-relaxed text-slate-700 dark:text-slate-300 my-1">{line}</p>;
    });
  };

  const handleDownloadStudyGuidePdf = () => {
    if (!activeStudyGuide) return;

    // Create a hidden printing iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document || iframe.contentDocument;
    if (!iframeDoc) {
      alert("Unable to generate PDF dynamically. Please check browser permissions.");
      return;
    }

    // Helper functions to escape HTML and prevent parsing breakages
    const escapeHtml = (text: string) => {
      if (!text) return "";
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const definitionsListHtml = activeStudyGuide.keyDefinitions && activeStudyGuide.keyDefinitions.length > 0 
      ? activeStudyGuide.keyDefinitions.map((item: any, idx: number) => `
        <div style="padding: 14px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 10px;">
          <div style="display: flex; gap: 10px; align-items: flex-start;">
            <span style="color: #4f46e5; font-weight: 800; font-family: 'JetBrains Mono', monospace; font-size: 13px;">0${idx + 1}</span>
            <div>
              <strong style="display: block; color: #0f172a; font-size: 13px; margin: 0 0 2px 0;">${escapeHtml(item.term)}</strong>
              <p style="color: #475569; font-size: 11.5px; margin: 0; line-height: 1.4;">${escapeHtml(item.definition)}</p>
            </div>
          </div>
        </div>
      `).join("")
      : `<p style="color: #94a3b8; font-size: 12px;">No definitions returned for this grade level.</p>`;

    const formulasListHtml = activeStudyGuide.coreFormulas && activeStudyGuide.coreFormulas.length > 0
      ? activeStudyGuide.coreFormulas.map((item: any, idx: number) => `
        <div style="padding: 14px; background-color: #f0fdf4; border: 1px solid #dcfce7; border-radius: 12px; margin-bottom: 10px;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; background-color: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-weight: bold; display: inline-block; margin-bottom: 4px;">
            ${escapeHtml(item.formulaOrRule)}
          </span>
          <p style="color: #334155; font-size: 11.5px; margin: 0; line-height: 1.4;">${escapeHtml(item.explanation)}</p>
        </div>
      `).join("")
      : `<p style="color: #94a3b8; font-size: 12px;">No specific equations or formulas for this curriculum segment.</p>`;

    const tipsListHtml = activeStudyGuide.studyTips && activeStudyGuide.studyTips.length > 0
      ? activeStudyGuide.studyTips.map((tip: string) => `
        <li style="display: flex; gap: 6px; font-size: 12px; color: #334155; line-height: 1.5; margin-bottom: 6px;">
          <span style="color: #f59e0b; font-weight: bold;">★</span>
          <span>${escapeHtml(tip)}</span>
        </li>
      `).join("")
      : `<li style="font-size: 12px; color: #94a3b8;">No academic support tips listed.</li>`;

    const flashcardsListHtml = activeStudyGuide.flashcards && activeStudyGuide.flashcards.length > 0
      ? activeStudyGuide.flashcards.map((card: any, idx: number) => `
        <div style="border: 1px dashed #cbd5e1; padding: 14px; border-radius: 12px; background-color: #f8fafc; page-break-inside: avoid; margin-bottom: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 8px;">
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 9px; background-color: #e2e8f0; color: #475569; padding: 1px 4px; border-radius: 3px; font-weight: bold;">Card #${idx + 1}</span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #94a3b8; text-transform: uppercase;">Offline flashcard</span>
          </div>
          <p style="font-size: 11.5px; font-weight: bold; color: #1e293b; margin: 0 0 4px 0;"><span style="color: #4f46e5; font-weight: 800; font-family: 'JetBrains Mono', monospace; font-size: 11px; margin-right: 2px;">Q:</span> ${escapeHtml(card.front)}</p>
          <p style="font-size: 11.5px; font-weight: bold; color: #1e293b; margin: 0;"><span style="color: #047857; font-weight: 800; font-family: 'JetBrains Mono', monospace; font-size: 11px; margin-right: 2px;">A:</span> <span style="font-weight: normal; color: #475569;">${escapeHtml(card.back)}</span></p>
        </div>
      `).join("")
      : `<p style="color: #94a3b8; font-size: 12px;">No flashcards pre-loaded for offline review.</p>`;

    const printableHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${escapeHtml(activeStudyGuide.title)} - Study Handbook</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4;
            margin: 18mm;
          }
          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            color: #1e293b;
            background-color: #ffffff;
            line-height: 1.45;
            margin: 0;
            padding: 0;
          }
          .header {
            border-bottom: 4px solid #059669;
            padding-bottom: 18px;
            margin-bottom: 24px;
          }
          .badge {
            display: inline-block;
            text-transform: uppercase;
            font-family: 'JetBrains Mono', monospace;
            font-size: 9px;
            font-weight: 800;
            color: #064e3b;
            background-color: #ecfdf5;
            padding: 3px 8px;
            border-radius: 9999px;
            margin-bottom: 8px;
            letter-spacing: 0.05em;
          }
          .title {
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
            line-height: 1.25;
            letter-spacing: -0.02em;
          }
          .subtitle {
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            color: #64748b;
            margin: 4px 0 0 0;
          }
          .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          .section-title {
            font-size: 14px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #0f172a;
            border-bottom: 2px solid #f1f5f9;
            padding-bottom: 6px;
            margin-top: 0;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
          }
          .section-icon {
            margin-right: 6px;
            color: #059669;
          }
          .summary-content {
            font-size: 12px;
            color: #334155;
            white-space: pre-wrap;
            line-height: 1.5;
          }
          .flashcards-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .page-break {
            page-break-before: always;
          }
          .footer {
            border-top: 1px solid #e1e8f0;
            padding-top: 14px;
            margin-top: 40px;
            text-align: center;
            font-family: 'JetBrains Mono', monospace;
            font-size: 9px;
            color: #94a3b8;
          }
          @media print {
            body {
              background-color: #ffffff;
            }
          }
        </style>
      </head>
      <body>
        <div>
          <!-- Header -->
          <div class="header">
            <span class="badge">${escapeHtml(activeStudyGuide.grade)} • ${escapeHtml(activeStudyGuide.subject)}</span>
            <h1 class="title">${escapeHtml(activeStudyGuide.title)}</h1>
            <p class="subtitle">Dynamic AI revision notebook • Prepared for EUEE Candidate</p>
          </div>

          <!-- Summary Section -->
          <div class="section">
            <h2 class="section-title">
              <span class="section-icon">📚</span> Study Guide Core Summary
            </h2>
            <div class="summary-content">${escapeHtml(activeStudyGuide.summary)}</div>
          </div>

          <!-- Cheat Sheet: Definitions & Formulas -->
          <div class="section page-break" style="padding-top: 8px;">
            <h2 class="section-title">
              <span class="section-icon">🔑</span> Key Concepts & Core Definitions
            </h2>
            <div style="margin-bottom: 20px;">
              ${definitionsListHtml}
            </div>

            <h2 class="section-title" style="margin-top: 24px;">
              <span class="section-icon">📐</span> Formulas, Theorems & Rules
            </h2>
            <div>
              ${formulasListHtml}
            </div>
          </div>

          <!-- Flashcards & Tips -->
          <div class="section page-break" style="padding-top: 8px;">
            <h2 class="section-title" style="margin-bottom: 16px;">
              <span class="section-icon">💡</span> NEAEA Study Tips & Tactics
            </h2>
            <ul style="margin: 0; padding: 0; list-style-type: none; margin-bottom: 24px;">
              ${tipsListHtml}
            </ul>

            <h2 class="section-title">
              <span class="section-icon">⚡</span> Dual-Sided Active Recall Flashcards
            </h2>
            <div class="flashcards-grid">
              ${flashcardsListHtml}
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            Prepared by EUEE Prep Hub Assessment Engine • Save and Print for offline review
          </div>
        </div>
      </body>
      </html>
    `;

    iframeDoc.open();
    iframeDoc.write(printableHtml);
    iframeDoc.close();

    // Trigger printing once resources loaded
    iframe.contentWindow?.focus();
    setTimeout(() => {
      iframe.contentWindow?.print();
      // Clean up the iframe after triggering print
      setTimeout(() => {
        if (iframe.parentNode) {
          document.body.removeChild(iframe);
        }
      }, 500);
    }, 500);
  };

  // Resume an in-progress assessment draft saved in localStorage
  const handleResumeQuiz = () => {
    if (!unfinishedQuizData) return;
    const data = unfinishedQuizData;
    setActiveQuiz(data.activeQuiz);
    setIsAiGenerated(data.isAiGenerated);
    setCurrentQuestionIndex(data.currentQuestionIndex);
    setUserAnswers(data.userAnswers);
    setQuizScore(data.quizScore);
    // Offset standard start timer to protect accurate duration measurements
    setStartTime(Date.now() - (data.timeSpent * 1000));
    setTimeSpent(data.timeSpent);
    setSelectedOptionIndex(data.selectedOptionIndex);
    setHasAnswered(data.hasAnswered);

    // Clear active study guide / helpers to support clean full-screen rendering
    setActiveStudyGuide(null);
    setHistoricalReviewAttempt(null);
    setErrorMsg(null);
  };

  // Discard unfinished assessment draft
  const handleDiscardUnfinishedQuiz = () => {
    safeStorage.removeItem("ethiopian_prep_unfinished_quiz");
    setUnfinishedQuizData(null);
  };

  // Toggle study progress for specific subtopic composite-key
  const toggleSubtopicProgress = (gradeId: string, subjectId: string, unitId: string, subtopicId: string, e?: any) => {
    if (e) {
      e.stopPropagation();
    }
    const key = `${gradeId}_${subjectId}_${unitId}_${subtopicId}`;
    setCompletedSubtopics(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      safeStorage.setItem("ethiopian_prep_progress", JSON.stringify(updated));
      return updated;
    });
  };

  // Prompt Chrome PWA shortcut installation
  const promptChromeInstallation = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log("Chrome install prompt outcome:", outcome);
        setDeferredPrompt(null);
      } catch (err) {
        console.error("Installation prompt failed:", err);
      }
    } else {
      setShowChromeInstallInfo(true);
    }
  };

  // One-click quick launch helper to avoid the complex selection steps
  const handleQuickLaunch = async (gradeId: string, subjectId: string, unitId: string, subtopicId: string, mode: "quiz" | "study") => {
    setErrorMsg(null);
    
    // Find matching nodes from GRADES_DATA
    const grade = GRADES_DATA.find(g => g.id === gradeId);
    if (!grade) {
      setErrorMsg("Grade selection not found.");
      return;
    }
    const subject = grade.subjects.find(s => s.id === subjectId);
    if (!subject) {
      setErrorMsg("Subject selection not found.");
      return;
    }
    const unit = subject.units.find(u => u.id === unitId);
    if (!unit) {
      setErrorMsg("Unit selection not found.");
      return;
    }
    const subtopic = unit.subtopics.find(st => st.id === subtopicId);
    if (!subtopic) {
      setErrorMsg("Subtopic selection not found.");
      return;
    }

    // Programmatically select selectors to match visually
    setSelectedGrade(grade);
    setSelectedSubject(subject);
    setSelectedUnit(unit);
    setSelectedSubtopic(subtopic);

    if (mode === "quiz") {
      setIsLoadingQuiz(true);
      setStatusMessage("Calibrating curriculum standards...");

      // Check for instant local preloaded quiz to make it super fast and reliable
      const fallbackKey = `${subjectId}_${subtopicId}`;
      const preloaded = PRELOADED_QUIZZES[fallbackKey];
      if (preloaded) {
        setTimeout(() => {
          setActiveQuiz(preloaded);
          setIsAiGenerated(false);
          setCurrentQuestionIndex(0);
          setSelectedOptionIndex(null);
          setHasAnswered(false);
          setUserAnswers([]);
          setQuizScore(0);
          setStartTime(Date.now());
          setTimeSpent(0);
          setIsLoadingQuiz(false);
        }, 300);
        return;
      }

      // Fallback to active dynamic fetch
      try {
        const response = await fetch("/api/generate-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            grade: grade.name,
            subject: subject.name,
            unit: unit.name,
            subtopic: subtopic.name,
          }),
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          throw new Error(errBody.message || "Could not spin up live assessment quiz questions.");
        }

        const result = await response.json();
        if (!result.questions || result.questions.length === 0) {
          throw new Error("Received an empty quiz structure.");
        }

        const formattedQuiz: Quiz = {
          title: `${subtopic.name} (${grade.name})`,
          grade: grade.name,
          subject: subject.name,
          unit: unit.name,
          subtopic: subtopic.name,
          questions: result.questions,
        };
        setActiveQuiz(formattedQuiz);
        setIsAiGenerated(true);
        setCurrentQuestionIndex(0);
        setSelectedOptionIndex(null);
        setHasAnswered(false);
        setUserAnswers([]);
        setQuizScore(0);
        setStartTime(Date.now());
        setTimeSpent(0);
      } catch (err: any) {
        console.error("Quick quiz launch failed", err);
        setErrorMsg(err.message || "Connection timeout while generating live assessment questions.");
      } finally {
        setIsLoadingQuiz(false);
      }
    } else {
      // Study Guide
      setIsLoadingStudyGuide(true);
      setStatusMessage("Consulting Gemini AI Instructor...");

      try {
        const response = await fetch("/api/generate-study-guide", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            grade: grade.name,
            subject: subject.name,
            unit: unit.name,
            subtopic: subtopic.name,
          }),
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          throw new Error(errBody.message || "Failed to generate study revision guide.");
        }

        const result = await response.json();
        setActiveStudyGuide({
          title: subtopic.name,
          grade: grade.name,
          subject: subject.name,
          ...result,
        });

        setCurrentStudyGuideTab("summary");
        setRevealedFlashcards({});
      } catch (err: any) {
        console.error("Quick study launch failed", err);
        setErrorMsg(err.message || "Connection timeout while assembling AI study revision kit.");
      } finally {
        setIsLoadingStudyGuide(false);
      }
    }
  };

  // Launch Gemini dynamic study guide
  const handleStartStudyGuide = async () => {
    setErrorMsg(null);
    setIsLoadingStudyGuide(true);
    setStatusMessage("Gathering curriculum references...");

    let payload: any = {};
    if (activeTab === "syllabus") {
      if (!selectedGrade || !selectedSubject || !selectedUnit || !selectedSubtopic) {
        setErrorMsg("Please select Grade, Subject, Unit, and Subtopic first.");
        setIsLoadingStudyGuide(false);
        return;
      }
      payload = {
        grade: selectedGrade.name,
        subject: selectedSubject.name,
        unit: selectedUnit.name,
        subtopic: selectedSubtopic.name,
      };
    } else {
      if (!selectedExam || !selectedYear) {
        setErrorMsg("Please select both an Entrance Exam Subject and an Exam Year.");
        setIsLoadingStudyGuide(false);
        return;
      }
      payload = {
        examId: selectedExam.id,
        examSubject: selectedExam.subject,
        examYear: selectedYear,
      };
    }

    try {
      setStatusMessage("Consulting Gemini AI Instructor...");
      const response = await fetch("/api/generate-study-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.message || "Failed to generate AI study materials.");
      }

      setStatusMessage("Synthesizing learning resources...");
      const result = await response.json();
      setActiveStudyGuide({
        title: activeTab === "syllabus" ? selectedSubtopic!.name : `EUEE ${selectedExam!.subject} (${selectedYear})`,
        grade: activeTab === "syllabus" ? selectedGrade!.name : "Grade 12 Prep",
        subject: activeTab === "syllabus" ? selectedSubject!.name : selectedExam!.subject,
        ...result,
      });

      // Reset tabs and state
      setCurrentStudyGuideTab("summary");
      setRevealedFlashcards({});
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong while connecting to the AI server.");
    } finally {
      setIsLoadingStudyGuide(false);
    }
  };

  // Recalculate average stats
  const totalAttempts = attempts.length;
  const averageAccuracy = totalAttempts > 0 
    ? Math.round((attempts.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions), 0) / totalAttempts) * 100)
    : 0;
  const totalPracticeTime = attempts.reduce((acc, curr) => acc + curr.timeSpentSeconds, 0);

  return (
    <div className={`min-h-screen font-sans flex antialiased transition-colors duration-300 ${
      isDarkMode 
        ? "dark bg-slate-950 text-slate-100" 
        : "bg-slate-100/60 text-slate-800"
    }`}>
      {/* Decorative Flag ribbon strictly fixed on top, across the top edge */}
      <div className="fixed top-0 left-0 right-0 h-1 flex z-55 shrink-0">
        <div className="h-full w-1/3 bg-emerald-600"></div>
        <div className="h-full w-1/3 bg-amber-400"></div>
        <div className="h-full w-1/3 bg-rose-600"></div>
      </div>

      {/* DESKTOP FIXED SIDEBAR */}
      <aside className={`${isFocusMode ? "hidden" : "hidden md:flex"} flex-col h-screen sticky top-0 border-r transition-all duration-300 shrink-0 z-40 select-none ${
        isDarkMode 
          ? "bg-slate-950 border-slate-900 text-slate-200" 
          : "bg-indigo-950 border-indigo-900 text-slate-100"
      } ${isSidebarCollapsed ? "w-20" : "w-64"}`}>
        {/* Top Branding / Logo Container */}
        <div className="p-4 pt-6 flex items-center gap-3 border-b border-white/5 overflow-hidden">
          <div className="bg-white p-0.5 rounded-xl shadow-md shrink-0 w-11 h-11 flex items-center justify-center overflow-hidden border border-white/20">
            <img
              src="/logo.png"
              alt="EthioQuiz Focus"
              className="w-full h-full object-cover rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          {!isSidebarCollapsed && (
            <div className="animate-fade-in whitespace-nowrap">
              <span className="text-sm font-black tracking-tight text-white flex items-center gap-1.5 h-5 leading-none">
                EthioQuiz <span className="bg-emerald-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase font-mono">Focus</span>
              </span>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider mt-1">{t.newCurriculum}</p>
            </div>
          )}
        </div>

        {/* Desktop Sidebar Navigation Items */}
        <nav className="flex-grow px-3 py-4 space-y-1.5 overflow-y-auto">
          {/* Home Tab */}
          <button
            type="button"
            onClick={() => { setActiveTab("home"); handleExitStudyGuide(); handleExitQuiz(); }}
            className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl font-semibold text-xs transition-all hover:bg-white/10 group duration-200 ${
              activeTab === "home"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10 font-bold"
                : "text-slate-400 hover:text-slate-105"
            }`}
            title="Overview Dashboard"
          >
            <Home className={`w-4.5 h-4.5 group-hover:scale-110 transition-transform ${activeTab === "home" ? "text-white" : "text-slate-400 group-hover:text-slate-205"}`} />
            {!isSidebarCollapsed && <span className="truncate">{language === "am" ? "ዋና ገጽ" : language === "om" ? "Ka'umsa" : "Home"}</span>}
          </button>

          {/* Syllabus Topics Tab */}
          <button
            type="button"
            onClick={() => { setActiveTab("syllabus"); handleExitStudyGuide(); handleExitQuiz(); }}
            className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl font-semibold text-xs transition-all hover:bg-white/10 group duration-200 ${
              activeTab === "syllabus"
                ? "bg-indigo-605 text-white shadow-lg shadow-indigo-600/10 font-bold"
                : "text-slate-400 hover:text-slate-105"
            }`}
            title={t.syllabusTopics}
          >
            <BookOpen className={`w-4.5 h-4.5 group-hover:scale-110 transition-transform ${activeTab === "syllabus" ? "text-white" : "text-slate-400 group-hover:text-slate-205"}`} />
            {!isSidebarCollapsed && <span className="truncate">{t.syllabusTopics}</span>}
          </button>

          {/* Video Classes Tab */}
          <button
            type="button"
            onClick={() => { setActiveTab("video"); handleExitStudyGuide(); handleExitQuiz(); }}
            className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl font-semibold text-xs transition-all hover:bg-white/10 group duration-200 ${
              activeTab === "video"
                ? "bg-indigo-606 text-white shadow-lg shadow-indigo-600/10 font-bold"
                : "text-slate-400 hover:text-slate-105"
            }`}
            title="Video Classes"
          >
            <Video className={`w-4.5 h-4.5 group-hover:scale-110 transition-transform ${activeTab === "video" ? "text-white" : "text-slate-400 group-hover:text-slate-205"}`} />
            {!isSidebarCollapsed && <span className="truncate">{language === "am" ? "የቪዲዮ ክፍሎች" : language === "om" ? "Viidiyoo Barnootaa" : "Video Classes"}</span>}
          </button>

          {/* Study Progress Tab */}
          <button
            type="button"
            onClick={() => { setActiveTab("history"); handleExitStudyGuide(); handleExitQuiz(); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl font-semibold text-xs transition-all hover:bg-white/10 group duration-200 ${
              activeTab === "history"
                ? "bg-indigo-606 text-white shadow-lg shadow-indigo-600/10 font-bold"
                : "text-slate-400 hover:text-slate-105"
            }`}
            title={t.studyProgress}
          >
            <div className="flex items-center gap-3.5 truncate">
              <History className={`w-4.5 h-4.5 shrink-0 group-hover:scale-110 transition-transform ${activeTab === "history" ? "text-white" : "text-slate-400 group-hover:text-slate-205"}`} />
              {!isSidebarCollapsed && <span className="truncate">{t.studyProgress}</span>}
            </div>
            {!isSidebarCollapsed && attempts.length > 0 && (
              <span className="bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full font-mono">
                {attempts.length}
              </span>
            )}
          </button>

          {/* EUEE Exam Prep Tab */}
          <button
            type="button"
            onClick={() => { setActiveTab("entrance"); handleExitStudyGuide(); handleExitQuiz(); }}
            className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl font-semibold text-xs transition-all hover:bg-white/10 group duration-200 ${
              activeTab === "entrance"
                ? "bg-indigo-606 text-white shadow-lg shadow-indigo-600/10 font-bold"
                : "text-slate-400 hover:text-slate-105"
            }`}
            title="EUEE Preparation"
          >
            <Sparkles className={`w-4.5 h-4.5 group-hover:scale-110 transition-transform ${activeTab === "entrance" ? "text-white" : "text-slate-400 group-hover:text-slate-205"}`} />
            {!isSidebarCollapsed && <span className="truncate">{language === "am" ? "የመግቢያ ፈተና ዝግጅት" : language === "om" ? "Qophii EUEE" : "EUEE Preparation"}</span>}
          </button>

          {/* AI Assistant Tab */}
          <button
            type="button"
            onClick={() => { setActiveTab("ai"); handleExitStudyGuide(); handleExitQuiz(); }}
            className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl font-semibold text-xs transition-all hover:bg-white/10 group duration-200 ${
              activeTab === "ai"
                ? "bg-indigo-606 text-white shadow-lg shadow-indigo-600/10 font-bold"
                : "text-slate-400 hover:text-slate-105"
            }`}
            title="AI Tutor"
          >
            <Brain className={`w-4.5 h-4.5 group-hover:scale-110 transition-transform ${activeTab === "ai" ? "text-white" : "text-slate-400 group-hover:text-slate-205"}`} />
            {!isSidebarCollapsed && <span className="truncate">{language === "am" ? "የAI ረዳት" : language === "om" ? "Tursa AI" : "AI Assistant"}</span>}
          </button>

          {/* Settings Tab */}
          <button
            type="button"
            onClick={() => { setActiveTab("settings"); handleExitStudyGuide(); handleExitQuiz(); }}
            className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl font-semibold text-xs transition-all hover:bg-white/10 group duration-200 ${
              activeTab === "settings"
                ? "bg-indigo-606 text-white shadow-lg shadow-indigo-600/10 font-bold"
                : "text-slate-400 hover:text-slate-105"
            }`}
            title="Platform Settings"
          >
            <Settings className={`w-4.5 h-4.5 group-hover:scale-110 transition-transform ${activeTab === "settings" ? "text-white" : "text-slate-400 group-hover:text-slate-205"}`} />
            {!isSidebarCollapsed && <span className="truncate">{language === "am" ? "ቅንብሮች" : language === "om" ? "Heedduu" : "Settings"}</span>}
          </button>
        </nav>

        {/* Desktop Sidebar Collapse Toggle Panel Button */}
        <div className="p-3 border-t border-white/5">
          <button
            type="button"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-xs font-bold"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-4.5 h-4.5 animate-pulse" />
            ) : (
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse Sidebar</span>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* MOBILE SLIDE-IN DRAWER SIDEBAR */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-fade-in select-none">
          {/* Blur background shade */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          
          {/* Active Drawer Menu content list */}
          <div className="relative flex flex-col w-72 max-w-[80vw] h-full bg-slate-900 border-r border-slate-800 text-white z-50 animate-slide-in shadow-2xl p-5">
            {/* Logo area */}
            <div className="flex items-center justify-between pb-5 border-b border-white/5 mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-white p-0.5 rounded-xl shrink-0 w-10 h-10 flex items-center justify-center overflow-hidden border border-white/20">
                  <img
                    src="/logo.png"
                    alt="EthioQuiz Focus"
                    className="w-full h-full object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-sm font-black tracking-tight text-white flex items-center gap-1.5 h-5 leading-none">
                    EthioQuiz <span className="bg-emerald-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase font-mono">Focus</span>
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-755 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links scroll layout */}
            <nav className="flex-grow space-y-2 overflow-y-auto">
              <button
                type="button"
                onClick={() => { setActiveTab("home"); setIsMobileSidebarOpen(false); handleExitStudyGuide(); handleExitQuiz(); }}
                className={`w-full flex items-center gap-4 px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                  activeTab === "home" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:bg-white/5 text-slate-300"
                }`}
              >
                <Home className="w-5 h-5" />
                <span>{language === "am" ? "ዋና ገጽ" : language === "om" ? "Ka'umsa" : "Home"}</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("syllabus"); setIsMobileSidebarOpen(false); handleExitStudyGuide(); handleExitQuiz(); }}
                className={`w-full flex items-center gap-4 px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                  activeTab === "syllabus" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:bg-white/5 text-slate-300"
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span>{t.syllabusTopics}</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("video"); setIsMobileSidebarOpen(false); handleExitStudyGuide(); handleExitQuiz(); }}
                className={`w-full flex items-center gap-4 px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                  activeTab === "video" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:bg-white/5 text-slate-300"
                }`}
              >
                <Video className="w-5 h-5" />
                <span>{language === "am" ? "የቪዲዮ ክፍሎች" : language === "om" ? "Viidiyoo Barnootaa" : "Video Classes"}</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("history"); setIsMobileSidebarOpen(false); handleExitStudyGuide(); handleExitQuiz(); }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                  activeTab === "history" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:bg-white/5 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <History className="w-5 h-5" />
                  <span>{t.studyProgress}</span>
                </div>
                {attempts.length > 0 && (
                  <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                    {attempts.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("entrance"); setIsMobileSidebarOpen(false); handleExitStudyGuide(); handleExitQuiz(); }}
                className={`w-full flex items-center gap-4 px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                  activeTab === "entrance" ? "bg-indigo-605 text-white shadow-lg font-bold" : "text-slate-405 hover:bg-white/5 text-slate-300"
                }`}
              >
                <Sparkles className="w-5 h-5" />
                <span>{language === "am" ? "የመግቢያ ፈተና ዝግጅት" : language === "om" ? "Qophii EUEE" : "EUEE Preparation"}</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("ai"); setIsMobileSidebarOpen(false); handleExitStudyGuide(); handleExitQuiz(); }}
                className={`w-full flex items-center gap-4 px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                  activeTab === "ai" ? "bg-indigo-605 text-white shadow-lg font-bold" : "text-slate-405 hover:bg-white/5 text-slate-300"
                }`}
              >
                <Brain className="w-5 h-5" />
                <span>{language === "am" ? "የAI ረዳት" : language === "om" ? "Tursa AI" : "AI Assistant"}</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("settings"); setIsMobileSidebarOpen(false); handleExitStudyGuide(); handleExitQuiz(); }}
                className={`w-full flex items-center gap-4 px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                  activeTab === "settings" ? "bg-indigo-605 text-white shadow-lg font-bold" : "text-slate-455 hover:bg-white/5 text-slate-300"
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>{language === "am" ? "ቅንብሮች" : language === "om" ? "Heedduu" : "Settings"}</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* RIGHT SIDE WORKSPACE VIEW AREA */}
      <div className="flex-grow flex flex-col min-h-screen relative overflow-x-hidden pt-1">
        
        {/* LIGHT/DARK THEME COMPLIANT FLOATING UPPER HEADER */}
        {isFocusMode ? (
          <div className="mx-6 my-4 px-6 py-3 flex items-center justify-between bg-slate-900/60 backdrop-blur-md border border-slate-800 text-slate-400 rounded-2xl animate-fade-in z-30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-505 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-indigo-400">Focus Session Active</span>
            </div>
            <div className="text-xs italic text-slate-500 hidden sm:block font-sans">
              Minimize distractions to maximize active memory retention.
            </div>
            <button
              onClick={() => setIsFocusMode(false)}
              className="text-xs bg-indigo-600/20 hover:bg-indigo-600/35 text-indigo-300 border border-indigo-505/10 px-3.5 py-1 rounded-xl font-bold transition whitespace-nowrap cursor-pointer z-42"
            >
              Exit Focus Mode
            </button>
          </div>
        ) : (
          <header className={`${
            isDarkMode 
              ? "bg-slate-900 border-b border-slate-855 text-white" 
              : "bg-white border-b border-slate-150 text-slate-800 shadow-sm"
          } px-6 py-4 flex items-center justify-between sticky top-1 z-30 transition-all duration-300 mr-1 ml-1 rounded-2xl mt-1.5`}>
            
            <div className="flex items-center gap-3">
              {/* Hamburger Button on Mobile only */}
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="md:hidden flex items-center justify-center p-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 rounded-xl transition cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Breadcrumb Information indicator */}
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-550 dark:text-indigo-400 font-mono block">
                  {activeTab === "home" ? "Overview Dashboard" : activeTab === "syllabus" ? "Curriculum Guide" : activeTab === "video" ? "Educational Lectures" : activeTab === "history" ? "Personal Milestones" : activeTab === "entrance" ? "National Examination" : activeTab === "ai" ? "Tutoring Center" : "Configuration Page"}
                </span>
                <h2 className="text-sm sm:text-base font-black tracking-tight text-slate-850 dark:text-white leading-tight mt-0.5">
                  {activeTab === "home" && (language === "am" ? "ዋና ሰሌዳ" : language === "om" ? "Daashboordii Daawwannaa" : "EthioQuiz Learning Hub")}
                  {activeTab === "syllabus" && t.syllabusTopics}
                  {activeTab === "video" && (language === "am" ? "ኦፊሴላዊ የቪዲዮ ክፍሎች" : language === "om" ? "Viidiyoo Barnootaa" : "Video Learning Center")}
                  {activeTab === "history" && t.studyProgress}
                  {activeTab === "entrance" && t.entranceExam}
                  {activeTab === "ai" && "Expert AI Tutor Assistant"}
                  {activeTab === "settings" && "Platform Preferences"}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Mode selection button toggle */}
              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center justify-center p-2 rounded-full cursor-pointer h-9 w-9 border ${
                  isDarkMode 
                    ? "bg-slate-955 hover:bg-slate-900 border-slate-850 text-amber-400" 
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-655"
                }`}
                title="Toggle Light/Dark Display Style"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-500" />}
              </button>
                     {/* Language dropdown select */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-black transition-all cursor-pointer rounded-full h-9 ${
                    isDarkMode 
                      ? "bg-slate-955 border-slate-850 hover:bg-slate-900 text-white" 
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800"
                  }`}
                  title="Change Learning Language"
                >
                  <span>🌐 {t.currentLang}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {showLanguageDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowLanguageDropdown(false)} />
                    <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-55 animate-fade-in text-slate-800 dark:text-slate-155 font-sans font-semibold">
                      <button
                        type="button"
                        onClick={() => { setLanguage("en"); setShowLanguageDropdown(false); }}
                        className={`w-full text-left px-4 py-2 text-xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-805 flex items-center justify-between ${language === "en" ? "text-teal-605 dark:text-teal-400 font-bold bg-teal-50/50 dark:bg-teal-950/30" : "text-slate-705 dark:text-slate-300"}`}
                      >
                        <span>English</span>
                        {language === "en" && <Check className="w-3.5 h-3.5 text-teal-600" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setLanguage("am"); setShowLanguageDropdown(false); }}
                        className={`w-full text-left px-4 py-2 text-xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-805 flex items-center justify-between ${language === "am" ? "text-teal-605 dark:text-teal-405 font-bold" : "text-slate-705"}`}
                      >
                        <span>አማርኛ (Amharic)</span>
                        {language === "am" && <Check className="w-3.5 h-3.5 text-teal-600" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setLanguage("om"); setShowLanguageDropdown(false); }}
                        className={`w-full text-left px-4 py-2 text-xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-805 flex items-center justify-between ${language === "om" ? "text-teal-605 dark:text-teal-410 font-bold" : "text-slate-705"}`}
                      >
                        <span>Afaan Oromoo</span>
                        {language === "om" && <Check className="w-3.5 h-3.5 text-teal-600" />}
                      </button>
                    </div>
                  </>
                )}
              </div>
              
              {/* Exit/Return active Quiz Button */}
              {activeQuiz && (
                <button
                  type="button"
                  onClick={handleExitQuiz}
                  className="text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-all px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer h-9"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{t.returnToCatalog}</span>
                </button>
              )}
            </div>
          </header>
        )}

        {/* WORKSPACE CONTENT BODY CONTAINER */}
        <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-8">
        {/* Unfinished Assessment Sticky Alert Banner */}
        {!isFocusMode && !activeQuiz && !isLoadingQuiz && !activeStudyGuide && !isLoadingStudyGuide && unfinishedQuizData && (
          <div className="bg-indigo-50 dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 rounded-3xl p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm animate-fade-in">
            <div className="flex items-center gap-3.5">
              <span className="p-3 bg-indigo-100 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 rounded-2xl shrink-0 flex items-center justify-center">
                <Timer className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 font-mono block">In-Progress Assessment Pending</span>
                <p className="text-xs font-bold text-slate-805 dark:text-slate-100 mt-0.5">
                  You have an unfinished study session: <span className="text-indigo-650 dark:text-indigo-300 font-extrabold">{unfinishedQuizData.activeQuiz.title}</span> (Question {unfinishedQuizData.currentQuestionIndex + 1} of {unfinishedQuizData.activeQuiz.questions.length})
                </p>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  Saved {unfinishedQuizData.lastSaved} • Current Score: {unfinishedQuizData.quizScore}/{unfinishedQuizData.currentQuestionIndex}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
              <button
                type="button"
                onClick={handleResumeQuiz}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-4.5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                Resume Session Now
              </button>
              <button
                type="button"
                onClick={handleDiscardUnfinishedQuiz}
                className="text-xs font-extrabold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-150/40 px-3 py-2.5 rounded-xl transition cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

                {/* Dynamic State Loading UI */}
        {(isLoadingQuiz || isLoadingStudyGuide) && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100 shadow-xs max-w-2xl mx-auto my-10 px-8 text-center animate-fade-in">
            <h3 className="text-3xl font-black text-slate-900 mb-1 font-mono tracking-tight">{quizLoadingProgress}%</h3>
            
            {/* Visual Progress Bar Wrapper */}
            <div className="w-full max-w-xs bg-slate-100 h-2 rounded-full overflow-hidden mb-2 mt-2">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${quizLoadingProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Error Callout Overlay */}
        {!isLoadingQuiz && !isLoadingStudyGuide && errorMsg && (
          <div className="bg-rose-50 border border-rose-100 text-rose-800 rounded-xl p-4 mb-6 flex items-start gap-3 max-w-2xl mx-auto">
            <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-rose-900">Quiz Generation Issue</h4>
              <p className="text-xs mt-1 text-rose-700">{errorMsg}</p>
              {errorMsg.includes("Secrets") && (
                <div className="mt-3 p-3 bg-white/70 rounded-lg text-xs leading-relaxed border border-rose-200 text-slate-700">
                  <p className="font-semibold text-slate-950 mb-1">How to enable dynamic AI generation:</p>
                  1. Locate the <span className="font-semibold">Settings {">"} Secrets</span> option in the left/upper drawer.
                  <br />
                  2. Add a new secret named <code className="bg-slate-100 px-1 rounded font-mono text-rose-600">GEMINI_API_KEY</code> containing your free AI Studio API key.
                  <br />
                  3. Restart the app. (Preloaded quizzes continue to function instantly offline).
                </div>
              )}
            </div>
          </div>
        )}

        {/* Active Study Guide Revision Container */}
        {!isLoadingQuiz && !isLoadingStudyGuide && activeStudyGuide && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            {/* Fallback Warning Banner */}
            {activeStudyGuide.isFallback && (
              <div className="p-4 bg-indigo-50 dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 text-indigo-900 dark:text-indigo-200 rounded-2xl text-xs sm:text-sm flex items-start gap-2.5 shadow-xs text-left">
                <span className="text-lg leading-none">💡</span>
                <div>
                  <span className="font-bold">AI Quota Note:</span> You are currently viewing a high-quality, curriculum-aligned study guide generated from preloaded regional benchmarks because the Gemini API free-tier quota is temporarily busy.
                </div>
              </div>
            )}
            {/* Header / Sub-title and selector */}
            <div className="bg-gradient-to-r from-emerald-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-indigo-500/10">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 border border-indigo-500 text-white text-[10px] uppercase font-mono font-black rounded-full">
                    {activeStudyGuide.grade} | {activeStudyGuide.subject}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">{activeStudyGuide.title}</h2>
                  <p className="text-xs text-emerald-100 font-mono">Dynamic AI Study Handbook Compiled by Gemini</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {selectedGrade && selectedSubject && selectedUnit && selectedSubtopic && (
                    (() => {
                      const key = `${selectedGrade.id}_${selectedSubject.id}_${selectedUnit.id}_${selectedSubtopic.id}`;
                      const isCompleted = !!completedSubtopics[key];
                      return (
                        <button
                          type="button"
                          onClick={() => toggleSubtopicProgress(selectedGrade.id, selectedSubject.id, selectedUnit.id, selectedSubtopic.id)}
                          className={`text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                            isCompleted
                              ? "bg-emerald-600 text-white border border-emerald-500 shadow-sm"
                              : "bg-white text-emerald-800 hover:bg-emerald-50"
                          }`}
                        >
                          <Check className={`w-3.5 h-3.5 ${isCompleted ? "stroke-[3]" : ""}`} />
                          {isCompleted ? "Completed!" : "Mark as Studied"}
                        </button>
                      );
                    })()
                  )}
                  <button
                    onClick={handleDownloadStudyGuidePdf}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5 h-auto transition-all cursor-pointer shadow-xs shrink-0 border border-indigo-500"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </button>
                  <button
                    onClick={handleExitStudyGuide}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5 h-auto transition-all cursor-pointer border border-white/10 shrink-0"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Exit Revision Guide
                  </button>
                </div>
              </div>
            </div>

            {/* Selector Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-2xl gap-1 max-w-lg">
              <button
                onClick={() => setCurrentStudyGuideTab("summary")}
                className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-3 text-xs sm:text-sm rounded-xl transition-all font-bold cursor-pointer ${
                  currentStudyGuideTab === "summary"
                    ? "bg-slate-200 text-slate-950 shadow-xs"
                    : "text-slate-550 hover:text-slate-900"
                }`}
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                Summary
              </button>
              <button
                onClick={() => setCurrentStudyGuideTab("cheat")}
                className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-3 text-xs sm:text-sm rounded-xl transition-all font-bold cursor-pointer ${
                  currentStudyGuideTab === "cheat"
                    ? "bg-slate-200 text-slate-950 shadow-xs"
                    : "text-slate-550 hover:text-slate-900"
                }`}
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Cheat Sheet
              </button>
              <button
                onClick={() => setCurrentStudyGuideTab("flashcards")}
                className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-3 text-xs sm:text-sm rounded-xl transition-all font-bold cursor-pointer ${
                  currentStudyGuideTab === "flashcards"
                    ? "bg-slate-200 text-slate-950 shadow-xs"
                    : "text-slate-550 hover:text-slate-900"
                }`}
              >
                <Award className="w-4 h-4 text-emerald-600" />
                Flashcards
              </button>
            </div>

            {/* Tabs View Panels */}
            {currentStudyGuideTab === "summary" && (
              <div className="bg-slate-50 rounded-3xl border border-indigo-50 p-6 sm:p-8 shadow-xs whitespace-pre-wrap leading-relaxed text-sm text-slate-700 animate-fade-in">
                {activeStudyGuide.summary}
              </div>
            )}

            {currentStudyGuideTab === "cheat" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                {/* Definitions Card */}
                <div className="bg-slate-50 rounded-3xl border border-indigo-50 p-6 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono">Core Definitions</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {activeStudyGuide.keyDefinitions && activeStudyGuide.keyDefinitions.length > 0 ? (
                      activeStudyGuide.keyDefinitions.map((item: any, idx: number) => (
                        <div key={idx} className="p-4 bg-slate-100 border border-slate-200 rounded-2xl flex gap-3">
                          <span className="text-indigo-600 font-extrabold text-sm font-mono mt-0.5">0{idx + 1}</span>
                          <div>
                            <strong className="block text-slate-900 text-sm font-bold">{item.term}</strong>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed font-semibold">{item.definition}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400">No definitions returned for this grade level.</p>
                    )}
                  </div>
                </div>

                {/* Formulas & Rules Card */}
                <div className="bg-slate-50 rounded-3xl border border-indigo-50 p-6 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono">Formulas, Theorems & Rules</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {activeStudyGuide.coreFormulas && activeStudyGuide.coreFormulas.length > 0 ? (
                      activeStudyGuide.coreFormulas.map((item: any, idx: number) => (
                        <div key={idx} className="p-4 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl">
                          <span className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold inline-block mb-1.5">
                            {item.formulaOrRule}
                          </span>
                          <p className="text-xs text-slate-650 leading-relaxed font-semibold">{item.explanation}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400">No specific equations or formulas for this curriculum segment.</p>
                    )}
                  </div>
                </div>

                {/* Study Tips Card */}
                <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 shadow-sm space-y-4 col-span-1 md:col-span-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 font-mono flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                    NEAEA Examination Strategy & Practical Tips
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeStudyGuide.studyTips && activeStudyGuide.studyTips.map((tip: string, idx: number) => (
                      <li key={idx} className="flex gap-2 text-xs leading-relaxed text-slate-300">
                        <span className="text-indigo-400 font-bold shrink-0">★</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {currentStudyGuideTab === "flashcards" && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center max-w-md mx-auto">
                  <h4 className="text-base font-bold text-slate-900">Active Recall Revision Cards</h4>
                  <p className="text-xs text-slate-400 mt-1">Tap a card to flip and reveal the detailed answer/calculation step.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeStudyGuide.flashcards && activeStudyGuide.flashcards.map((card: any, idx: number) => {
                    const isRevealed = revealedFlashcards[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => setRevealedFlashcards(prev => ({ ...prev, [idx]: !prev[idx] }))}
                        className={`min-h-48 rounded-3xl p-6 flex flex-col justify-between cursor-pointer border transition-all duration-300 relative select-none ${
                          isRevealed
                            ? "bg-slate-900 text-white border-slate-800"
                            : "bg-slate-50 text-slate-800 hover:bg-slate-100 hover:shadow-md border-indigo-100"
                        }`}
                      >
                        <div>
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                            isRevealed ? "bg-slate-800 text-slate-200" : "bg-indigo-50 text-indigo-700"
                          }`}>
                            Card #{idx + 1}
                          </span>
                          <p className="mt-4 text-sm font-semibold leading-relaxed">
                            {isRevealed ? card.back : card.front}
                          </p>
                        </div>
                        <div className="text-right border-t border-slate-200/10 pt-2.5 mt-4">
                          <span className="text-[9px] font-mono tracking-widest uppercase text-slate-450 font-bold">
                            {isRevealed ? "✓ Revealed (Tap to flip back)" : "⚡ Tap to Flip & Verify"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Direct launch quiz on same topic from here */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Finished reviewing core concepts?</h4>
                <p className="text-xs text-slate-400 mt-0.5">Validate your learning speed and test yourself with 10 direct exam questions.</p>
              </div>
              <button
                onClick={() => {
                  handleExitStudyGuide();
                  handleStartQuiz();
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shrink-0"
              >
                <BookOpen className="w-4 h-4" />
                Launch Practice Quiz NOW
              </button>
            </div>
          </div>
        )}

        {/* Active Quiz Execution Container */}
        {!isLoadingQuiz && !isLoadingStudyGuide && !activeStudyGuide && activeQuiz && (
          <div className="max-w-3xl mx-auto">
            {/* Case 1: Quiz Questions Presentation (Index is less than size) */}
            {currentQuestionIndex < activeQuiz.questions.length ? (
              <div className="space-y-6">
                {/* Fallback Warning Banner */}
                {activeQuiz.isFallback && (
                  <div className="p-4 bg-amber-50 border border-amber-255 text-amber-850 rounded-2xl text-xs sm:text-sm flex items-start gap-2.5 shadow-xs text-left mb-2">
                    <span className="text-lg leading-none">💡</span>
                    <div>
                      <span className="font-bold">AI Quota Note:</span> You are currently practicing under simulated exam conditions because the Gemini API free-tier quota is temporarily busy.
                    </div>
                  </div>
                )}
                {/* Breadcrumb Section */}
                <div className="flex items-center text-xs font-semibold text-slate-450 gap-2 uppercase tracking-wider">
                  <span className="hover:text-indigo-600 cursor-pointer">{activeQuiz.grade}</span>
                  <span>/</span>
                  <span className="hover:text-indigo-600 cursor-pointer">{activeQuiz.subject}</span>
                  <span>/</span>
                  <span className="text-indigo-600">{activeQuiz.title}</span>
                </div>

                {/* Progress Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1 h-3 bg-white rounded-full mr-6 border border-indigo-100 overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-500 rounded-full"
                      style={{ width: `${((currentQuestionIndex + 1) / activeQuiz.questions.length) * 105}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-black uppercase tracking-wider font-mono text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-550 animate-pulse"></span>
                      Auto-Saved Draft
                    </span>
                    <span className="text-sm font-bold text-slate-500">
                      Question <span className="text-indigo-600 font-extrabold">{currentQuestionIndex + 1}</span> of {activeQuiz.questions.length}
                    </span>
                    {(() => {
                      const questionSecs = timeSpent - questionStartElapsed;
                      const isExceeded = questionSecs > 60;
                      return (
                        <div 
                          className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 border transition-all duration-300 ${
                            isExceeded 
                              ? "bg-rose-600 text-white border-rose-700 animate-pulse shadow-md shadow-rose-600/30" 
                              : "bg-rose-100 text-rose-600 border-rose-200 shadow-2xs"
                          }`}
                          title={isExceeded ? `Over 60 seconds spent on this question (${questionSecs}s)` : "Quiz duration timer"}
                        >
                          <Clock className={`w-3.5 h-3.5 ${isExceeded ? "animate-bounce" : ""}`} />
                          <span>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
                          {isExceeded && (
                            <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-md font-extrabold uppercase font-mono animate-pulse">
                              &gt;60s
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Questions Core Card with Vibrant Palette styling */}
                <div className="bg-white rounded-3xl border border-indigo-100 shadow-sm p-6 sm:p-8 space-y-6">
                  {/* The Question Text */}
                  <h2 className="text-2xl font-bold text-slate-800 leading-tight">
                    {activeQuiz.questions[currentQuestionIndex].question}
                  </h2>

                  {/* Options List Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeQuiz.questions[currentQuestionIndex].options.map((option, idx) => {
                      const alphabet = ["A", "B", "C", "D"];
                      
                      // Vibrant Palette interactive choices style mapping
                      let borderClass = "border-slate-100 bg-white hover:border-indigo-200 text-slate-700 hover:text-indigo-900";
                      let indicatorClass = "bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600";
                      
                      if (selectedOptionIndex === idx) {
                        if (!hasAnswered) {
                          // Unsubmitted response selection focus
                          borderClass = "border-indigo-500 bg-indigo-50 shadow-md text-indigo-900 font-bold";
                          indicatorClass = "bg-indigo-600 text-white font-bold";
                        } else {
                          // Submitted response options highlight styles
                          if (idx === activeQuiz.questions[currentQuestionIndex].correctAnswerIndex) {
                            borderClass = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-sm";
                            indicatorClass = "bg-emerald-600 text-white font-bold";
                          } else {
                            borderClass = "border-rose-400 bg-rose-50 text-rose-950 font-bold shadow-sm";
                            indicatorClass = "bg-rose-600 text-white font-bold";
                          }
                        }
                      } else if (hasAnswered && idx === activeQuiz.questions[currentQuestionIndex].correctAnswerIndex) {
                        // Correct option overlay while user failed to answer correct
                        borderClass = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-sm";
                        indicatorClass = "bg-emerald-600 text-white font-bold";
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={hasAnswered}
                          onClick={() => setSelectedOptionIndex(idx)}
                          className={`flex items-center p-5 rounded-2xl border-2 transition-all text-left shadow-sm group cursor-pointer ${borderClass}`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold mr-4 shrink-0 transition-all ${indicatorClass}`}>
                            {alphabet[idx]}
                          </div>
                          <span className="font-semibold text-sm leading-normal flex-1">{option}</span>
                          {hasAnswered && idx === activeQuiz.questions[currentQuestionIndex].correctAnswerIndex && (
                            <Check className="ml-auto w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit / Proceed Command Button */}
                  <div className="pt-4 flex justify-between items-center border-t border-indigo-50">
                    <button
                      onClick={handleExitQuiz}
                      className="px-6 py-3 font-semibold text-slate-400 hover:text-indigo-600 transition-colors text-sm cursor-pointer"
                    >
                      Skip Question
                    </button>

                    {!hasAnswered ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedOptionIndex === null}
                        className={`px-10 py-4 font-bold rounded-2xl shadow-lg transition-all text-sm flex items-center gap-2 cursor-pointer ${
                          selectedOptionIndex === null
                            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:scale-[1.02] active:scale-95"
                        }`}
                      >
                        Submit Answer
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:scale-[1.02] active:scale-95 transition-all text-sm flex items-center gap-2 cursor-pointer"
                      >
                        {currentQuestionIndex + 1 === activeQuiz.questions.length ? "Finish Exam" : "Next Question"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Sub-Answer Detailed Explanation reason! (Expert Explanation) */}
                {hasAnswered && (
                  <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl relative mt-4 shadow-xs animate-fade-in">
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-tighter rounded-full shadow-sm">
                      Expert Explanation
                    </div>
                    <p className="text-emerald-950 leading-relaxed font-semibold text-sm">
                      {activeQuiz.questions[currentQuestionIndex].explanation}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Case 2: Final Report Card Container */
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 text-center space-y-6">
                  <div className="inline-flex items-center justify-center p-4 bg-indigo-55 bg-indigo-50 rounded-full text-indigo-600">
                    <Award className="h-12 w-12" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold text-slate-950">Assessment Complete!</h2>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto">
                      Fantastic effort! You completed the quiz in {activeQuiz.title}. Here is your grading scorecard.
                    </p>
                  </div>

                  {/* Grading Bento Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl max-w-xl mx-auto border border-indigo-100/40">
                    <div className="p-3 text-center">
                      <span className="text-xs text-slate-400 block font-medium">Score</span>
                      <span className="text-xl font-extrabold text-indigo-600 block font-mono">
                        {quizScore} <span className="text-slate-400 text-xs font-normal">/ {activeQuiz.questions.length}</span>
                      </span>
                    </div>

                    <div className="p-3 text-center border-l border-slate-200">
                      <span className="text-xs text-slate-400 block font-medium">Accuracy</span>
                      <span className="text-xl font-extrabold text-slate-900 block font-mono">
                        {Math.round((quizScore / activeQuiz.questions.length) * 100)}%
                      </span>
                    </div>

                    <div className="p-3 text-center border-l border-slate-200">
                      <span className="text-xs text-slate-400 block font-medium">Time Taken</span>
                      <span className="text-xl font-extrabold text-slate-900 block font-mono">
                        {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
                      </span>
                    </div>

                    <div className="p-3 text-center border-l border-slate-200">
                      <span className="text-xs text-slate-400 block font-medium">Academic Grade</span>
                      <span className="text-xl font-extrabold text-indigo-600 block">
                        {(() => {
                          const percentage = (quizScore / activeQuiz.questions.length) * 100;
                          if (percentage >= 90) return "A+";
                          if (percentage >= 80) return "A";
                          if (percentage >= 70) return "B";
                          if (percentage >= 60) return "C";
                          if (percentage >= 50) return "D";
                          return "F (Resit)";
                        })()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={handleStartQuiz}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-100 transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Try Again
                    </button>
                    <button
                      onClick={handleExitQuiz}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl cursor-pointer"
                    >
                      View Other Subjects
                    </button>
                  </div>
                </div>

                {/* Question Review Accordion (Allows searching through reason under the question for each of the 10 questions) */}
                <div className="bg-white rounded-3xl border border-indigo-100 shadow-sm p-6 sm:p-8 space-y-6">
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    Detailed Question Review (& Reasons)
                  </h3>

                  <div className="space-y-4">
                    {activeQuiz.questions.map((q, qIndex) => {
                      const wasCorrect = userAnswers[qIndex] === q.correctAnswerIndex;
                      const isOpen = openExplanationIndex === qIndex;

                      return (
                        <div
                          key={qIndex}
                          className={`border rounded-xl dev-acc overflow-hidden transition-all duration-200 ${
                            wasCorrect ? "border-emerald-100 bg-emerald-50/10" : "border-rose-100 bg-rose-50/5"
                          }`}
                        >
                          {/* Accordion Toggle Header */}
                          <div
                            onClick={() => setOpenExplanationIndex(isOpen ? null : qIndex)}
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-all gap-3"
                          >
                            <div className="flex items-start gap-3">
                              {wasCorrect ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                              )}
                              <p className="text-sm font-bold text-slate-900 pr-2 text-left line-clamp-2 select-none">
                                {qIndex + 1}. {q.question}
                              </p>
                            </div>
                            <div>
                              {isOpen ? (
                                <ChevronUp className="w-4 h-4 text-slate-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                          </div>

                          {/* Accordion content */}
                          {isOpen && (
                            <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3 bg-white text-xs text-slate-700 font-normal">
                              {/* Choices listing */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                {q.options.map((opt, oIdx) => {
                                  const letter = ["A", "B", "C", "D"][oIdx];
                                  const isCorrectOption = oIdx === q.correctAnswerIndex;
                                  const isUserSelected = oIdx === userAnswers[qIndex];

                                  return (
                                    <div
                                      key={oIdx}
                                      className={`p-2.5 rounded-lg border text-left flex items-start gap-2 ${
                                        isCorrectOption
                                          ? "bg-emerald-50 border-emerald-200 text-emerald-950 font-medium"
                                          : isUserSelected
                                          ? "bg-rose-50 border-rose-200 text-rose-950"
                                          : "bg-slate-50 border-slate-105 border-slate-100"
                                      }`}
                                    >
                                      <span className="font-bold shrink-0">{letter}:</span>
                                      <span>{opt}</span>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Reasoning content */}
                              <div className="mt-3 p-3 bg-slate-50 rounded-lg text-xs leading-relaxed border border-slate-200 text-slate-700">
                                <p className="font-bold text-slate-900 text-xs mb-1">Reason Explained:</p>
                                {q.explanation}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Dashboard Landing Mode: Syllabus Quizzes catalog */}
        {!activeQuiz && !isLoadingQuiz && !activeStudyGuide && !isLoadingStudyGuide && activeTab === "syllabus" && (
          <div className="space-y-8 animate-fade-in">
            {/* Elegant Banner Card */}
            <div className="bg-linear-to-r from-indigo-600 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-lg border border-indigo-200/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
              <div className="relative space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 border border-indigo-500 text-white text-xs font-black shadow-sm">
                  {t.newSyllabusStandard}
                </div>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                  {t.masterHighSchool}
                </h2>
                <p className="text-indigo-100 text-sm leading-relaxed font-light">
                  {t.practiceWithInfinite}
                </p>
              </div>
              <div className="relative shrink-0 w-24 h-24 sm:w-32 sm:h-32 mx-auto md:mx-0 bg-white p-1 rounded-full shadow-2xl overflow-hidden border border-white/20 select-none animate-fade-in">
                <img
                  src="/logo.png"
                  alt="EthioQuiz Focus Brand Logo"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Academic Progress Tracker Dashboard */}
            {(() => {
              let totalSubtopics = 0;
              let completedCount = 0;
              GRADES_DATA.forEach(g => {
                g.subjects.forEach(s => {
                  s.units.forEach(u => {
                    u.subtopics.forEach(sub => {
                      totalSubtopics++;
                      const key = `${g.id}_${s.id}_${u.id}_${sub.id}`;
                      if (completedSubtopics[key]) {
                        completedCount++;
                      }
                    });
                  });
                });
              });

              const overallProgressPercent = totalSubtopics > 0 ? Math.round((completedCount / totalSubtopics) * 100) : 0;

              return (
                <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-lg border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                  <div className="md:col-span-2 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="p-1 px-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-bold tracking-wider rounded-md font-mono">
                          {t.curriculumMasterProgress}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{t.realTimePersistence}</span>
                      </div>
                      <h3 className="text-lg font-extrabold mt-2 tracking-tight">{t.highSchoolProgress}</h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-lg leading-relaxed">
                        {t.trackSummaries}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-300">{t.overallLessonsCompleted}</span>
                        <span className="font-bold text-emerald-400 text-sm">{completedCount} / {totalSubtopics} Mastered ({overallProgressPercent}%)</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${overallProgressPercent}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4.5 flex flex-col justify-between space-y-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 font-mono block">
                      Active Subject Metrics
                    </span>
                    
                    {selectedGrade && selectedSubject ? (
                      (() => {
                        let totalInSub = 0;
                        let completedInSub = 0;
                        selectedSubject.units.forEach(u => {
                          u.subtopics.forEach(sub => {
                            totalInSub++;
                            const key = `${selectedGrade.id}_${selectedSubject.id}_${u.id}_${sub.id}`;
                            if (completedSubtopics[key]) {
                              completedInSub++;
                            }
                          });
                        });
                        const pct = totalInSub > 0 ? Math.round((completedInSub / totalInSub) * 100) : 0;
                        return (
                          <div className="space-y-2">
                            <strong className="text-xs block text-slate-200 truncate">{selectedGrade.name} • {selectedSubject.name}</strong>
                            <div className="flex justify-between items-center text-[11px] text-slate-400">
                              <span>Progress Score</span>
                              <span className="font-mono text-emerald-400 font-bold">{completedInSub}/{totalInSub} {t.lessons}</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-mono mt-1">
                              {pct === 100 ? "✓ Complete master level!" : `${100 - pct}% ${t.remainingPhrase}`}
                            </p>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4 text-center">
                        <p className="text-xs text-slate-500">{t.selectGradeSubject}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}



            {/* Integrated Curriculum Master Search & All Topics Explorer */}
            {(() => {
              // Extract and flat map all core topics/subtopics across all 4 grades
              const allTopics: any[] = [];
              GRADES_DATA.forEach(gradeNode => {
                gradeNode.subjects.forEach(subjectNode => {
                  subjectNode.units.forEach(unitNode => {
                    unitNode.subtopics.forEach(subtopicNode => {
                      const lowerQuery = curriculumSearchQuery.toLowerCase();
                      const matchQuery = 
                        subtopicNode.name.toLowerCase().includes(lowerQuery) ||
                        unitNode.name.toLowerCase().includes(lowerQuery) ||
                        subjectNode.name.toLowerCase().includes(lowerQuery) ||
                        gradeNode.name.toLowerCase().includes(lowerQuery);

                      const matchGrade = selectedExploreGrade === "all" || gradeNode.id === selectedExploreGrade;
                      const matchSubj = selectedExploreSubject === "all" || subjectNode.id === selectedExploreSubject;

                      if (matchQuery && matchGrade && matchSubj) {
                        allTopics.push({
                          grade: gradeNode,
                          subject: subjectNode,
                          unit: unitNode,
                          subtopic: subtopicNode,
                          progressKey: `${gradeNode.id}_${subjectNode.id}_${unitNode.id}_${subtopicNode.id}`
                        });
                      }
                    });
                  });
                });
              });

              const hasSearchOrExploreActive = curriculumSearchQuery.trim() !== "" || showAllTopicsList;

              // Extract unique subjects across all grades dynamically
              const uniqueSubjectFilters = [
                { id: "all", name: "All Subjects" },
                { id: "maths", name: "Mathematics" },
                { id: "physics", name: "Physics" },
                { id: "chemistry", name: "Chemistry" },
                { id: "biology", name: "Biology" },
                { id: "english", name: "English" },
                { id: "civics", name: "Citizenship Education" },
                { id: "aptitude", name: "Aptitude (SAT)" },
                { id: "geography", name: "Geography" },
                { id: "history", name: "History" },
                { id: "economics", name: "Economics" }
              ];

              return (
                <div id="curriculum-search-explorer" className="bg-gradient-to-br from-indigo-900/5 to-indigo-950/2 rounded-3xl border border-indigo-100 p-6 space-y-6 shadow-2xs font-sans">
                  
                  {/* Master Header */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-indigo-700" />
                        Explore & Search All Topics (Grade 9 - 12)
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                        Query any curriculum standard instantly or toggle the master viewer to browse all units.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAllTopicsList(!showAllTopicsList);
                          if (!showAllTopicsList && curriculumSearchQuery === "") {
                            setCurriculumSearchQuery("");
                          }
                        }}
                        className={`px-4.5 py-2.5 rounded-xl border text-xs font-bold transition duration-150 shrink-0 cursor-pointer flex items-center gap-1.5 ${
                          showAllTopicsList 
                            ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-250"
                        }`}
                      >
                        <History className="w-4 h-4" />
                        {showAllTopicsList ? "Collapse All Topics List" : "Browse All Topics Catalog"}
                      </button>
                    </div>
                  </div>

                  {/* Search controls row */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {/* Search query input */}
                    <div className="relative md:col-span-2">
                      <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search formulas, cells, calculus, mechanical force, ethical issues..."
                        value={curriculumSearchQuery}
                        onChange={(e) => setCurriculumSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-55 bg-slate-50 border border-slate-200 placeholder:text-slate-400 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 shadow-3xs"
                      />
                      {curriculumSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setCurriculumSearchQuery("")}
                          className="absolute right-3 top-2 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[9px] font-bold text-slate-500"
                        >
                          CLEAR
                        </button>
                      )}
                    </div>

                    {/* Filter level */}
                    <div className="relative">
                      <select
                        value={selectedExploreGrade}
                        onChange={(e) => setSelectedExploreGrade(e.target.value)}
                        className="w-full px-3 py-3 bg-slate-55 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-705 text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      >
                        <option value="all">All School Grades</option>
                        <option value="9">Grade 9</option>
                        <option value="10">Grade 10</option>
                        <option value="11">Grade 11</option>
                        <option value="12">Grade 12</option>
                      </select>
                    </div>

                    {/* Filter subject */}
                    <div className="relative">
                      <select
                        value={selectedExploreSubject}
                        onChange={(e) => setSelectedExploreSubject(e.target.value)}
                        className="w-full px-3 py-3 bg-slate-55 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-705 text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      >
                        {uniqueSubjectFilters.map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Active List viewer */}
                  {hasSearchOrExploreActive && (
                    <div className="bg-slate-50 border border-indigo-100 rounded-3xl p-4 sm:p-5 space-y-4 animate-fade-in shadow-3xs">
                      
                      <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                        <span className="text-[11px] font-black uppercase text-indigo-700 font-mono tracking-wider">
                          Filtered Topics catalog ({allTopics.length} entries)
                        </span>
                        
                        <div className="flex gap-2">
                          {curriculumSearchQuery && (
                            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded">
                              Keyword: "{curriculumSearchQuery}"
                            </span>
                          )}
                          {(selectedExploreGrade !== "all" || selectedExploreSubject !== "all") && (
                            <span className="text-[10px] bg-slate-150 bg-slate-100 text-slate-650 font-extrabold px-2 py-0.5 rounded font-mono">
                              Active Filters Added
                            </span>
                          )}
                        </div>
                      </div>

                      {allTopics.length > 0 ? (
                        <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                          {allTopics.map((item, idx) => {
                            const isCompleted = !!completedSubtopics[item.progressKey];
                            const isOfflineReady = !!PRELOADED_QUIZZES[`${item.subject.id}_${item.subtopic.id}`] || !!PRELOADED_QUIZZES[`${item.subject.id}_nat_${item.subtopic.id}`] || !!PRELOADED_QUIZZES[`${item.subject.id}_soc_${item.subtopic.id}`];

                            // Subject badging color mapper (Using strictly Slate, Indigo, and Emerald)
                            const subjectColorMap: Record<string, string> = {
                              maths: "bg-indigo-50 text-indigo-700 border-indigo-100",
                              physics: "bg-emerald-50 text-emerald-700 border-emerald-100",
                              chemistry: "bg-indigo-50 text-indigo-700 border-indigo-100",
                              biology: "bg-emerald-50 text-emerald-700 border-emerald-100",
                              english: "bg-indigo-50 text-indigo-700 border-indigo-100",
                              civics: "bg-slate-100 text-slate-705 border-slate-200",
                              aptitude: "bg-indigo-50 text-indigo-700 border-indigo-100"
                            };
                            const badgeTheme = subjectColorMap[item.subject.id] || "bg-slate-50 text-slate-600 border-slate-150";

                            return (
                              <div
                                key={`${item.progressKey}_${idx}`}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3.5 border border-slate-100 rounded-2xl hover:border-indigo-300 transition-all gap-4 bg-slate-50/40"
                              >
                                <div className="flex items-start gap-3">
                                  <button
                                    type="button"
                                    onClick={(e) => toggleSubtopicProgress(item.grade.id, item.subject.id, item.unit.id, item.subtopic.id, e)}
                                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-all ${
                                      isCompleted
                                        ? "bg-emerald-500 border-emerald-500 text-white shadow-3xs hover:bg-emerald-600"
                                        : "border-slate-300 hover:border-indigo-500 bg-white"
                                    }`}
                                    title={isCompleted ? "Marked as Studied" : "Mark studied"}
                                  >
                                    {isCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                                  </button>

                                  <div className="space-y-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider font-mono bg-slate-900 border border-slate-900 text-white leading-none">
                                        {item.grade.name}
                                      </span>
                                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border font-mono tracking-wider leading-none ${badgeTheme}`}>
                                        {item.subject.name}
                                      </span>
                                      <span className="text-[10px] text-slate-450 truncate max-w-xs block font-bold">
                                        {item.unit.name}
                                      </span>
                                    </div>
                                    <p className="text-xs font-black text-slate-800 leading-normal line-clamp-1 py-0.5">
                                      {item.subtopic.name}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0 ml-8 sm:ml-0">
                                  {isOfflineReady && (
                                    <span className="text-[8.5px] uppercase font-mono tracking-widest font-bold text-emerald-700 bg-emerald-50 px-2 py-1.5 rounded-lg border border-emerald-200 leading-none">
                                      Instant
                                    </span>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleQuickLaunch(item.grade.id, item.subject.id, item.unit.id, item.subtopic.id, "quiz")}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] px-3 py-1.5 rounded-lg uppercase tracking-wider cursor-pointer shadow-3xs shrink-0 transition-all flex items-center gap-1"
                                  >
                                    <BookOpen className="w-3 h-3" />
                                    Quiz
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleQuickLaunch(item.grade.id, item.subject.id, item.unit.id, item.subtopic.id, "study")}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] px-3 py-1.5 rounded-lg uppercase tracking-wider cursor-pointer shadow-3xs shrink-0 transition-all flex items-center gap-1 font-sans"
                                  >
                                    <Sparkles className="w-3 h-3 text-indigo-200" />
                                    Study Guide
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-10 border border-dashed border-slate-150 rounded-2xl text-center space-y-1.5">
                          <p className="text-xs text-slate-400 font-bold">No matching curriculum elements found.</p>
                          <p className="text-[11px] text-slate-500">Ensure the spelling is correct or loosen search filters above.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {!hasSearchOrExploreActive && (
                    <div className="bg-indigo-50/50 border border-dashed border-indigo-100 rounded-3xl p-4.5 text-center text-xs text-indigo-950 font-medium leading-relaxed">
                      💡 <strong>Tip:</strong> Toggle <strong>Browse All Topics Catalog</strong> to see all subjects mapped completely, or type in the search box to filter instantly!
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Selector Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Step 1: Select Grade */}
              <div className="bg-white rounded-2xl border border-indigo-100 p-5 space-y-4 shadow-sm">
                <span className="text-[11px] uppercase font-bold tracking-wider text-indigo-600 font-mono block">
                  Step 1: Choose Level
                </span>
                <h3 className="font-bold text-slate-900 text-sm">Select High School Grade</h3>
                <div className="flex flex-col gap-2">
                  {GRADES_DATA.map((grade) => (
                    <button
                      key={grade.id}
                      onClick={() => {
                        setSelectedGrade(grade);
                        setSelectedSubject(null);
                        setSelectedUnit(null);
                        setSelectedSubtopic(null);
                        setErrorMsg(null);
                      }}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedGrade?.id === grade.id
                          ? "bg-indigo-50 border-indigo-500 text-indigo-950 font-bold shadow-2xs border-l-4"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-700"
                      }`}
                    >
                      <span className="text-sm">{grade.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Subject */}
              <div className="bg-white rounded-2xl border border-indigo-100 p-5 space-y-4 shadow-sm">
                <span className="text-[11px] uppercase font-bold tracking-wider text-indigo-600 font-mono block">
                  Step 2: Subject
                </span>
                <h3 className="font-bold text-slate-900 text-sm">Select Curriculum Subject</h3>
                {selectedGrade ? (
                  <div className="flex flex-col gap-2">
                    {selectedGrade.subjects.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setSelectedSubject(sub);
                          setSelectedUnit(null);
                          setSelectedSubtopic(null);
                          setErrorMsg(null);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedSubject?.id === sub.id
                            ? "bg-indigo-50 border-indigo-500 text-indigo-950 font-bold shadow-2xs border-l-4"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-700"
                        }`}
                      >
                        <span className="text-sm">{sub.name}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 text-right" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="h-40 flex items-center justify-center border border-dashed border-slate-200 rounded-xl px-4 text-center">
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">Please complete Level selection first.</p>
                  </div>
                )}
              </div>

              {/* Step 3: Select Unit */}
              <div className="bg-white rounded-2xl border border-indigo-100 p-5 space-y-4 shadow-sm">
                <span className="text-[11px] uppercase font-bold tracking-wider text-indigo-600 font-mono block">
                  Step 3: Chapter / Unit
                </span>
                <h3 className="font-bold text-slate-900 text-sm">Select Syllabus Unit</h3>
                {selectedSubject ? (
                  <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
                    {selectedSubject.units.map((unit) => (
                      <button
                        key={unit.id}
                        onClick={() => {
                          setSelectedUnit(unit);
                          setSelectedSubtopic(null);
                          setErrorMsg(null);
                        }}
                        className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedUnit?.id === unit.id
                            ? "bg-indigo-50 border-indigo-500 text-indigo-950 font-bold shadow-2xs border-l-4"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-700"
                        }`}
                      >
                        <p className="text-xs font-bold leading-normal truncate">{unit.name}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="h-40 flex items-center justify-center border border-dashed border-slate-200 rounded-xl px-4 text-center">
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">Select level and subject to render chapters.</p>
                  </div>
                )}
              </div>

              {/* Step 4: Select Subtopic & Start */}
              <div className="bg-white rounded-2xl border border-indigo-100 p-5 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-indigo-600 font-mono block">
                    Step 4: Subtopic
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">Select Learning Core Segment</h3>
                  {selectedUnit ? (
                    <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                      {selectedUnit.subtopics.map((subt) => {
                        const isOfflineReady = PRELOADED_QUIZZES[`${selectedSubject?.id}_${subt.id}`];
                        const progressKey = `${selectedGrade?.id}_${selectedSubject?.id}_${selectedUnit?.id}_${subt.id}`;
                        const isCompleted = !!completedSubtopics[progressKey];

                        return (
                          <div
                            key={subt.id}
                            onClick={() => {
                              setSelectedSubtopic(subt);
                              setErrorMsg(null);
                            }}
                            className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                              selectedSubtopic?.id === subt.id
                                ? "bg-indigo-50 border-indigo-500 text-indigo-950 font-bold shadow-2xs border-l-4"
                                : "bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-700"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={(e) => toggleSubtopicProgress(selectedGrade!.id, selectedSubject!.id, selectedUnit.id, subt.id, e)}
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-all ${
                                isCompleted
                                  ? "bg-emerald-500 border-emerald-500 text-white animate-pulse-once"
                                  : "border-slate-300 hover:border-indigo-500 bg-white"
                              }`}
                              title={isCompleted ? "Completed Lesson" : "Mark as Studied"}
                            >
                              {isCompleted && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </button>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold leading-normal line-clamp-2">{subt.name}</p>
                              {isOfflineReady && (
                                <span className="inline-block mt-1 text-[9px] bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-2xs">
                                  Instant Play
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="h-40 flex items-center justify-center border border-dashed border-slate-200 rounded-xl px-4 text-center">
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">Choose Unit first to verify subtopic options.</p>
                    </div>
                  )}
                </div>

                {/* Final Launch Choices */}
                {selectedSubtopic && (
                  <div className="space-y-3 mt-4">
                    <button
                      onClick={handleStartQuiz}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm p-3 rounded-xl flex items-center justify-center gap-2 group shadow-md shadow-indigo-100 dark:shadow-none transition-all focus:ring-4 focus:ring-indigo-500/20 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      Start 10-Question Quiz
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button
                      onClick={handleStartStudyGuide}
                      className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-indigo-200 font-extrabold text-sm p-3 rounded-xl flex items-center justify-center gap-2 group shadow-sm transition-all focus:ring-4 focus:ring-indigo-500/10 cursor-pointer border border-indigo-150"
                    >
                      <Sparkles className="w-4 h-4 animate-pulse text-indigo-500" />
                      {"✨ Study/Explain with Gemini"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Landing Mode: University Entrance Preparation catalog */}
        {!activeQuiz && !isLoadingQuiz && !activeStudyGuide && !isLoadingStudyGuide && activeTab === "entrance" && (
          <div className="space-y-8 animate-fade-in">
            {/* Elegant EUEE Promo card */}
            <div className="bg-linear-to-r from-indigo-700 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-lg border border-indigo-200/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
              <div className="relative space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-amber-950 text-xs font-black shadow-sm">
                  EUEE University Entrance preparatory
                </div>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                  Simulate Real Entrance Exams (EUEE).
                </h2>
                <p className="text-indigo-100 text-sm leading-relaxed font-light font-sans">
                  The <span className="font-semibold text-white">Ethiopian University Entrance Examination (EUEE)</span> is critical for university admissions.
                  Choose a subject and select exam years (e.g. 2012-2016 E.C) to practice custom, highly representative mock tests with detailed calculations and rationales.
                </p>
              </div>
              <div className="relative shrink-0 w-24 h-24 sm:w-32 sm:h-32 mx-auto md:mx-0 bg-white p-1 rounded-full shadow-2xl overflow-hidden border border-white/20 select-none animate-fade-in">
                <img
                  src="/logo.png"
                  alt="EthioQuiz Focus Brand Logo"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Selection Hub grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Box 1: EUEE Subject */}
              <div className="bg-white rounded-2xl border border-indigo-100 p-6 space-y-4 shadow-sm">
                <span className="text-[11px] uppercase font-bold tracking-wider text-indigo-600 font-mono block">
                  Step 1: Focus Area
                </span>
                <h3 className="font-bold text-slate-900 text-sm">Select Entrance Subject</h3>
                
                {/* Segmented stream button filters */}
                <div className="flex bg-slate-100 p-1 rounded-xl gap-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedEntranceStream("all")}
                    className={`flex-1 py-1.5 rounded-lg font-extrabold text-center cursor-pointer transition-all ${
                      selectedEntranceStream === "all"
                        ? "bg-white text-indigo-950 shadow-2xs font-black"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    All Exams
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedEntranceStream("natural")}
                    className={`flex-1 py-1.5 rounded-lg font-extrabold text-center cursor-pointer transition-all ${
                      selectedEntranceStream === "natural"
                        ? "bg-white text-emerald-800 shadow-2xs font-black"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Natural
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedEntranceStream("social")}
                    className={`flex-1 py-1.5 rounded-lg font-extrabold text-center cursor-pointer transition-all ${
                      selectedEntranceStream === "social"
                        ? "bg-white text-indigo-800 shadow-2xs font-black"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Social
                  </button>
                </div>

                <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
                  {ENTRANCE_EXAMS_DATA.filter((exam) => {
                    if (selectedEntranceStream === "all") return true;
                    return exam.stream === selectedEntranceStream || exam.stream === "both";
                  }).map((exam) => (
                    <button
                      key={exam.id}
                      onClick={() => {
                        setSelectedExam(exam);
                        setSelectedYear("");
                        setErrorMsg(null);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedExam?.id === exam.id
                          ? "bg-indigo-50 border-indigo-500 text-indigo-950 font-bold shadow-2xs border-l-4"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-700"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm">{exam.subject}</span>
                        <span className="text-[9px] mt-0.5 font-mono uppercase font-bold tracking-wider">
                          {exam.stream === "both" ? (
                            <span className="text-slate-550">Both Streams</span>
                          ) : exam.stream === "natural" ? (
                            <span className="text-emerald-700">Natural Stream</span>
                          ) : (
                            <span className="text-indigo-700">Social Stream</span>
                          )}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Box 2: EUEE Year */}
              <div className="bg-white rounded-2xl border border-indigo-100 p-6 space-y-4 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-indigo-600 font-mono block">
                    Step 2: Matric Year
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">Select Exam Calendar Year</h3>
                  {selectedExam ? (
                    <div className="flex flex-col gap-2 mt-4">
                      {selectedExam.years.map((year, yIdx) => (
                        <button
                          key={yIdx}
                          onClick={() => {
                            setSelectedYear(year);
                            setErrorMsg(null);
                          }}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            selectedYear === year
                              ? "bg-indigo-50 border-indigo-500 text-indigo-950 font-bold border-l-4"
                              : "bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-700"
                          }`}
                        >
                          <span className="text-sm font-medium">{year}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="h-40 mt-4 flex items-center justify-center border border-dashed border-slate-200 rounded-xl px-4 text-center">
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">Select a Prep subject above to see available years.</p>
                    </div>
                  )}
                </div>

                {/* Confirm Matric Actions */}
                {selectedExam && selectedYear && (
                   <div className="space-y-3 mt-6">
                     <button
                      onClick={handleStartQuiz}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm p-3 rounded-xl flex items-center justify-center gap-2 group shadow-md shadow-indigo-100 dark:shadow-none transition-all focus:ring-4 focus:ring-indigo-500/20 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      Start EUEE Prep Assessment
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button
                      onClick={handleStartStudyGuide}
                      className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-indigo-200 font-extrabold text-sm p-3 rounded-xl flex items-center justify-center gap-2 group shadow-sm transition-all focus:ring-4 focus:ring-indigo-500/10 cursor-pointer border border-indigo-150"
                    >
                      <Sparkles className="w-4 h-4 animate-pulse text-indigo-500" />
                      ✨ Study/Explain with Gemini
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>

              {/* Box 3: Prep Guidance */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-2xl relative overflow-hidden">
                <div className="space-y-4 relative z-10">
                  <h4 className="text-sm font-extrabold uppercase tracking-widest text-amber-400 font-mono">EUEE Testing Guide</h4>
                  <ul className="space-y-3.5 text-slate-300 text-xs leading-relaxed">
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-bold shrink-0">✓</span>
                      <span>10 highly accurate EUEE simulated testing questions covering your chosen syllabus.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-bold shrink-0">✓</span>
                      <span>Analytical questions mirroring NEAEA standards.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-bold shrink-0">✓</span>
                      <span>Immediate verification of right/wrong responses with structural chemical & math equations.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-bold shrink-0">✓</span>
                      <span>Review explanations / reasons to improve speed and mastery.</span>
                    </li>
                  </ul>
                </div>
                <div className="text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-4 font-mono">
                  Prep Engine Version: 3.5-V
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Landing Mode: Progress History logs */}
        {!activeQuiz && !isLoadingQuiz && !activeStudyGuide && !isLoadingStudyGuide && activeTab === "history" && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            {/* Unfinished Assessment Draft inside Study Progress */}
            {unfinishedQuizData && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 rounded-3xl p-6 border border-amber-200/60 shadow-xs space-y-4 animate-fade-in text-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-850 text-[10px] font-black uppercase tracking-wider font-mono">
                      In-Progress / Unfinished Assessment
                    </div>
                    <h3 className="text-base font-extrabold text-slate-800">
                      {unfinishedQuizData.activeQuiz.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Started: {unfinishedQuizData.lastSaved} • Completed {unfinishedQuizData.currentQuestionIndex} of {unfinishedQuizData.activeQuiz.questions.length} questions
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleResumeQuiz}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-250 animate-pulse" />
                      Resume Assessment
                    </button>
                    <button
                      type="button"
                      onClick={handleDiscardUnfinishedQuiz}
                      className="hover:bg-amber-100 text-slate-500 hover:text-slate-800 text-xs font-bold px-3 py-2.5 rounded-xl transition-all cursor-pointer"
                      title="Discard assessment draft"
                    >
                      Discard
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-bold text-slate-600">
                    <span>Progress: {Math.round((unfinishedQuizData.currentQuestionIndex / unfinishedQuizData.activeQuiz.questions.length) * 100)}% Complete</span>
                    <span>Score Track: {unfinishedQuizData.quizScore} / {unfinishedQuizData.currentQuestionIndex} Correct</span>
                  </div>
                  <div className="w-full h-2.5 bg-amber-100/60 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 transition-all rounded-full" 
                      style={{ width: `${(unfinishedQuizData.currentQuestionIndex / unfinishedQuizData.activeQuiz.questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Overview statistics bento cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-650 rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Assessments Ran</span>
                  <span className="text-2xl font-black text-slate-900 font-mono">{totalAttempts}</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <Percent className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Average Accuracy</span>
                  <span className="text-2xl font-black text-slate-900 font-mono">{averageAccuracy}%</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                  <Timer className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Total Study Time</span>
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    {Math.floor(totalPracticeTime / 60)}m {totalPracticeTime % 60}s
                  </span>
                </div>
              </div>
            </div>

            {/* Previous lists attempts */}
            <div className="bg-white rounded-2xl border border-indigo-100 p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-600" />
                Historical Performance Log
              </h3>

              {attempts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-xs font-mono text-slate-400 uppercase">
                        <th className="py-3 px-2 font-bold">Quiz Title</th>
                        <th className="py-3 px-2 font-bold">Grade</th>
                        <th className="py-3 px-2 font-bold">Time Spent</th>
                        <th className="py-3 px-2 font-bold">Score Obtained</th>
                        <th className="py-3 px-2 font-bold">Date & Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {attempts.map((att) => {
                        const scorePct = Math.round((att.score / att.totalQuestions) * 100);
                        return (
                          <tr key={att.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3.5 px-2 font-bold text-slate-900">{att.quizTitle}</td>
                            <td className="py-3.5 px-2">
                              <span className="px-2 py-0.5 text-xs bg-slate-100 text-slate-650 rounded-full font-medium">
                                {att.grade}
                              </span>
                            </td>
                            <td className="py-3.5 px-2 font-mono text-xs">
                              {Math.floor(att.timeSpentSeconds / 60)}m {att.timeSpentSeconds % 60}s
                            </td>
                            <td className="py-3.5 px-2">
                              <span className={`font-mono font-bold ${
                                scorePct >= 80 ? "text-emerald-700" : scorePct >= 50 ? "text-amber-600" : "text-rose-600"
                              }`}>
                                {att.score}/{att.totalQuestions} ({scorePct}%)
                              </span>
                            </td>
                            <td className="py-3.5 px-2 text-xs text-slate-400 font-medium">{att.date}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <div className="text-slate-300 flex justify-center">
                    <History className="w-12 h-12 stroke-[1]" />
                  </div>
                  <h4 className="font-bold text-slate-500">No Assessment History Available Yet</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Once you perform curriculum or preparatory quizzes, your diagnostic performance scores will accumulate here for tracking!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}



        {!activeQuiz && !isLoadingQuiz && !activeStudyGuide && !isLoadingStudyGuide && activeTab === "video" && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            {/* Header intro card */}
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:24px_24px]" />
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl" />
              
              <div className="relative space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {language === "am" ? "የኦፊሴላዊ ቻናሎች ማውጫ" : language === "om" ? "Kallattii Chanaalotaa" : "Official Educational Hub"}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {language === "am" ? "የኢትዮጵያ የትምህርት ቪዲዮ ቻናሎች" : language === "om" ? "Chanaalota Viidiyoo Barnoota Itoophiyaa" : "Ethiopian Educational Video Channels"}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                  {language === "am" 
                    ? "ከአዲሱ የኢትዮጵያ ሁለተኛ ደረጃ ስርዓተ-ትምህርት ጋር የተጣጣሙ የቪዲዮ ትምህርቶችን በቀጥታ በኦፊሴላዊ ቻናሎች ላይ ይመልከቱ። ምንም ተጨማሪ መተግበሪያ ወይም አካውንት ሳይጠበቅብዎት ወዲያውኑ መማር ይጀምሩ!"
                    : language === "om"
                    ? "Adeemsa barumsaa kee deeggaruuf chanaalota bebbeekamoo fi qulqullina qaban kanneen National Curriculum Itoophiyaa irratti hundaa'an dhuunfaan ilaali."
                    : "Access curated, syllabus-aligned high school video lessons directly from the most trusted Ethiopian educational providers on YouTube. Fast, mobile-friendly, and 100% free."}
                </p>
                <div className="pt-2 text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {language === "am" 
                    ? "ምንም መግቢያ አያስፈልግም • 1-ክሊክ ቀጥታ መዳረሻ" 
                    : language === "om" 
                    ? "Galmaa'uun hin barbaachisu • Kiliika tokkoon argadhu" 
                    : "No registration required • 1-Click Direct Access"}
                </div>
              </div>
            </div>

            {/* Channels Bento / Flex Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Saquama */}
              <div className={`rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:scale-[1.02] hover:shadow-lg ${
                isDarkMode 
                  ? "bg-slate-900 border-slate-800 text-slate-100 hover:border-slate-700" 
                  : "bg-white border-slate-200 text-slate-800 hover:border-indigo-200"
              }`}>
                <div className="p-6 space-y-5 flex-1 flex flex-col">
                  {/* Logo Container with Custom High Contrast Pure CSS Branded Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md flex items-center justify-center shrink-0 text-white font-black text-xl tracking-tight group-hover:rotate-3 transition-transform">
                      SQ
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-black uppercase text-indigo-500 tracking-wider">
                        @Saquama
                      </span>
                      <h3 className="text-lg font-black tracking-tight mt-0.5">
                        Saquama
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal flex-1">
                    {language === "am"
                      ? "የሒሳብ እና የተፈጥሮ ሳይንስ (ፊዚክስ፣ ኬሚስትሪ፣ ባዮሎጂ) ትምህርቶችን በአማርኛ ቋንቋ ቀለል ባለና ግልጽ በሆነ መንገድ የሚያስተምር፣ እጅግ በጣም ተወዳጅና ጥራት ያለው የኢትዮጵያ ነጻ የትምህርት ቻናል።"
                      : language === "om"
                      ? "Barnoota herregaa fi saayinsii (fiiziksii, keemistrii, baayoloojii) afaan Amaaraan haala salphaa fi ifa ta'een kan barsiisu, chanaalii barnootaa Itoophiyaa bilisa ta'e."
                      : "A highly acclaimed non-profit channel delivering comprehensive, syllabus-aligned math and science video courses (Physics, Chemistry, Biology) in Amharic, designed to simplify complex concepts."}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                      Mathematics
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                      Sciences
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                      Amharic
                    </span>
                  </div>
                </div>

                <div className="p-6 border-t border-dashed border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
                  <a
                    href="https://www.youtube.com/@Saquama"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-sm transition-all text-center"
                  >
                    <span>{language === "am" ? "ቻናሉን ክፈት" : language === "om" ? "Chanaalii Bani" : "Open Channel"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Card 2: GlobeDock Academy */}
              <div className={`rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:scale-[1.02] hover:shadow-lg ${
                isDarkMode 
                  ? "bg-slate-900 border-slate-800 text-slate-100 hover:border-slate-700" 
                  : "bg-white border-slate-200 text-slate-800 hover:border-indigo-200"
              }`}>
                <div className="p-6 space-y-5 flex-1 flex flex-col">
                  {/* Logo Container with Custom High Contrast Pure CSS Branded Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-500 shadow-md flex items-center justify-center shrink-0 text-white font-black text-xl tracking-tight group-hover:rotate-3 transition-transform">
                      GD
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-black uppercase text-sky-500 tracking-wider">
                        @globedockacademy
                      </span>
                      <h3 className="text-lg font-black tracking-tight mt-0.5">
                        GlobeDock
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal flex-1">
                    {language === "am"
                      ? "ከ9ነኛ እስከ 12ነኛ ክፍል አዲሱን የስርዓተ-ትምህርት መጽሐፍትን መሰረት በማድረግ ግሩም የሆኑ የቪዲዮ ትምህርቶች፣ የመጽሐፍ ምዕራፎች ማጠቃለያ ጥያቄዎችና አስደናቂ የማስተማሪያ ዘዴዎች የሚቀርብበት ቻናል።"
                      : language === "om"
                      ? "Kutaa 9 hanga kutaalee 12tti silabasii haaraa mootummaa irratti hundaa'uun barnoota qulqullina qaban, gorsa qormaataa fi furmaata kitaaba barnootaa kan kennu."
                      : "A premium student-centric learning channel providing clean curriculum lectures, step-by-step textbook exercise solutions, and vital preparation workshops for Grade 9-12 exams."}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 uppercase tracking-wide">
                      Textbook Solutions
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                      New Syllabus
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                      Grades 9-12
                    </span>
                  </div>
                </div>

                <div className="p-6 border-t border-dashed border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
                  <a
                    href="https://www.youtube.com/@globedockacademy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-sm transition-all text-center"
                  >
                    <span>{language === "am" ? "ቻናሉን ክፈት" : language === "om" ? "Chanaalii Bani" : "Open Channel"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Card 3: Ethio Educ */}
              <div className={`rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:scale-[1.02] hover:shadow-lg ${
                isDarkMode 
                  ? "bg-slate-900 border-slate-800 text-slate-100 hover:border-slate-700" 
                  : "bg-white border-slate-200 text-slate-800 hover:border-indigo-200"
              }`}>
                <div className="p-6 space-y-5 flex-1 flex flex-col">
                  {/* Logo Container with Custom High Contrast Pure CSS Branded Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 shadow-md flex items-center justify-center shrink-0 text-white font-black text-xl tracking-tight group-hover:rotate-3 transition-transform">
                      EE
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-black uppercase text-amber-500 tracking-wider">
                        @Ethioeduc
                      </span>
                      <h3 className="text-lg font-black tracking-tight mt-0.5">
                        Ethio Educ
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal flex-1">
                    {language === "am"
                      ? "የዩኒቨርሲቲ መግቢያ ፈተና (EUEE) ዝግጅት፣ ያለፉት ዓመታት ጥያቄዎች ዝርዝር የደረጃ በደረጃ ማብራሪያ፣ እና ከፍተኛ ውጤት ለማምጣት የሚረዱ ጠቃሚ ስልቶችና ቀመሮች በጥሩ ሁኔታ የሚቀርቡበት ድንቅ ቻናል።"
                      : language === "om"
                      ? "Ilaalcha qormaata seensa yuunivarsiitii (EUEE), furmaata qormaata waggoota darban haala gadi fageenyaan deebisee fi ijoo dhimmoota barnoota baayolooijii fi xiin-sammuu barsiisu."
                      : "A student-favorite learning community offering precise National Exam (EUEE) guidelines, step-by-step master solve videos for previous years' exams, and essential test-taking secrets."}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                      EUEE Prep
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 uppercase tracking-wide">
                      Exam Hacks
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 uppercase tracking-wide">
                      Solved Papers
                    </span>
                  </div>
                </div>

                <div className="p-6 border-t border-dashed border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
                  <a
                    href="https://www.youtube.com/@Ethioeduc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-sm transition-all text-center"
                  >
                    <span>{language === "am" ? "ቻናሉን ክፈት" : language === "om" ? "Chanaalii Bani" : "Open Channel"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Tips Guidelines */}
            <div className={`p-6 rounded-3xl border ${
              isDarkMode ? "bg-slate-900/60 border-slate-800/80 text-slate-300" : "bg-slate-50 border-slate-150 text-slate-600"
            } flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4.5`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-505 rounded-xl">
                  <Award className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    {language === "am" ? "የጥናት ስልት ምክር" : language === "om" ? "Gorsa Barumsaa" : "Pro Studying Tip"}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-normal font-light">
                    {language === "am" 
                      ? "ነጻ ትምህርቶችን በቪዲዮ ከተማሩ በኋላ እውቀትዎን ለመፈተሽ 'የስርዓተ-ትምህርት ርዕሶች' ወይም 'የዩኒቨርሲቲ መግቢያ' ክፍል በመሄድ ፈተናዎችን ይለማመዱ!" 
                      : language === "om"
                      ? "Barnoota viidiyoo mijeessi erga barattee booda, of madaaluuf tabii dabalataa dursa fayyadami."
                      : "After watching explanations, reinforce your active recall memory by heading back to the 'Syllabus Topics' tab and attempting our diagnostic AI Practice Exams!"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* 1. OVERVIEW DASHBOARD (HOME TAB) */}
        {!activeQuiz && !isLoadingQuiz && !activeStudyGuide && !isLoadingStudyGuide && activeTab === "home" && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            {/* Elegant Hero Card with Ethiopian Vibe */}
            <div className="bg-gradient-to-r from-violet-600 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:24px_24px]" />
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/15 rounded-full blur-2xl" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-violet-600/15 rounded-full blur-2xl" />
              
              <div className="relative space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {language === "am" ? "የእውቀት ብርሃን" : language === "om" ? "Ifa Beekumsaa" : "National Academic Hub"}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {language === "am" ? "እንኳን ደህና መጡ ወደ EthioQuiz Learning Hub" : language === "om" ? "Hub-Barnootaa EthioQuiz Kabaajaan dhuftan" : "Welcome to EthioQuiz Learning Hub"}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                  {language === "am"
                    ? "አዲሱን የኢትዮጵያ ሁለተኛ ደረጃ ስርዓተ-ትምህርት (Grade 9-12) መሰረት በማድረግ የተዘጋጀ ሙሉ ለሙሉ በAI የታገዘ የጥናትና የፈተና መለማመጃ መተግበሪያ።"
                    : language === "om"
                    ? "Syllabus Itoophiyaa haaraa hundeeffame madaaluun shaakala qormaataa qophaaye."
                    : "A custom, AI-empowered interactive study assistant designed around the modern Ethiopian Ministry of Education Curriculum Standards (Grades 9 to 12) & EUEE University Entrance Exams."}
                </p>
                <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {language === "am" ? "የእርስዎ ምድብ፡ ክፍሎች 11 እና 12" : language === "om" ? "Kutaa koo: Kutaa 11 fi 12" : "Active Focus: Curriculum Guide (Grade 11 & 12)"}
                </div>
              </div>
            </div>

            {/* Micro progress stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"} flex items-center gap-4 shadow-sm`}>
                <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
                  <span className="text-lg">🔥</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">ACTIVE STREAK</p>
                  <p className="text-base font-black">5 Days</p>
                </div>
              </div>
              <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"} flex items-center gap-4 shadow-sm`}>
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">PRACTICE LOGS</p>
                  <p className="text-base font-black">{attempts.length} Finished</p>
                </div>
              </div>
              <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"} flex items-center gap-4 shadow-sm`}>
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">CURRICULUM PROGRESS</p>
                  <p className="text-base font-black">{completedSubtopics ? Object.keys(completedSubtopics).length * 8 + 12 : 12}% Mastered</p>
                </div>
              </div>
            </div>

            {/* Curriculum Tracks for Grade 11 & 12 */}
            <div className="space-y-4">
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                {language === "am" ? "የክፍል 11 እና 12 የትምህርት ካርታ" : language === "om" ? "Kallattii Barnootaa Kutaa 11 fi 12" : "Specialized Grade 11 & 12 Academic Map"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Grade 11 Track */}
                <div className={`p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} space-y-4`}>
                  <div className="flex items-center justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-3">
                    <h4 className="font-extrabold text-sm tracking-wide uppercase text-indigo-500">GRADE 11 SYLLABUS</h4>
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-full font-bold">New syllabus</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Mathematics", "Physics", "Chemistry", "Biology", "English"].map(subj => (
                      <button
                        key={subj}
                        onClick={() => handleJumpToSubject("Grade 11", subj)}
                        className={`p-3.5 rounded-2xl text-left border text-xs font-bold transition-all duration-200 flex flex-col justify-between hover:scale-[1.03] ${
                          isDarkMode 
                            ? "bg-slate-950 border-slate-850 hover:border-slate-700 text-slate-200" 
                            : "bg-slate-50 border-slate-100 hover:border-indigo-200 text-slate-800 hover:shadow-xs"
                        }`}
                      >
                        <span className="font-extrabold">{subj}</span>
                        <span className="text-[10px] text-indigo-500 font-normal mt-2 flex items-center gap-0.5">Explore syllabus <ChevronRight className="w-2.5 h-2.5" /></span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grade 12 Track */}
                <div className={`p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} space-y-4`}>
                  <div className="flex items-center justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-3">
                    <h4 className="font-extrabold text-sm tracking-wide uppercase text-violet-500">GRADE 12 SYLLABUS</h4>
                    <span className="text-[10px] bg-violet-500/10 text-violet-600 dark:text-violet-400 px-2.5 py-0.5 rounded-full font-bold">University Prep</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Mathematics", "Physics", "Chemistry", "Biology", "English"].map(subj => (
                      <button
                        key={subj}
                        onClick={() => handleJumpToSubject("Grade 12", subj)}
                        className={`p-3.5 rounded-2xl text-left border text-xs font-bold transition-all duration-200 flex flex-col justify-between hover:scale-[1.03] ${
                          isDarkMode 
                            ? "bg-slate-950 border-slate-850 hover:border-slate-700 text-slate-205" 
                            : "bg-slate-50 border-slate-100 hover:border-violet-200 text-slate-800 hover:shadow-xs"
                        }`}
                      >
                        <span className="font-extrabold">{subj}</span>
                        <span className="text-[10px] text-violet-500 font-normal mt-2 flex items-center gap-0.5">Explore syllabus <ChevronRight className="w-2.5 h-2.5" /></span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Navigator Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                onClick={() => setActiveTab("ai")}
                className={`p-6 rounded-3xl cursor-pointer border transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                  isDarkMode ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300" : "bg-slate-50/50 border-slate-200 hover:border-indigo-200 text-slate-850"
                } flex gap-4`}
              >
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-550 dark:text-indigo-400 self-start">
                  <Brain className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-sm">Ask Foocus AI Assistant 🌟</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                    Have complex biology diagrams, mathematical equations, or physics homework? Snap a photo in our camera environment, or upload any file instantly!
                  </p>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab("syllabus")}
                className={`p-6 rounded-3xl cursor-pointer border transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                  isDarkMode ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300" : "bg-slate-50/50 border-slate-200 hover:border-indigo-200 text-slate-850"
                } flex gap-4`}
              >
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-550 dark:text-indigo-400 self-start">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-sm">Explore Curriculum Guides 📚</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                    Browse detailed high school topics, study custom-generated revision notes, and test your understanding dynamically unit-by-unit.
                  </p>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab("entrance")}
                className={`p-6 rounded-3xl cursor-pointer border transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                  isDarkMode ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300" : "bg-slate-50/50 border-slate-200 hover:border-violet-200 text-slate-855"
                } flex gap-4`}
              >
                <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-550 dark:text-violet-400 self-start">
                  <Award className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-sm">Practice National Exams (EUEE) 🎯</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                    Attempt timed assessments simulated with real past questions from Grade 12 examinations. Includes simulated warnings when exceeding 60 seconds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* 2. CHATBOT AND CHILDREN TUTORING CENTER (AI TAB) */}
        {!activeQuiz && !isLoadingQuiz && !activeStudyGuide && !isLoadingStudyGuide && activeTab === "ai" && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6 animate-fade-in">
            {/* Header / Config Panel */}
            <div className={`p-4 sm:p-5 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-550 via-purple-550 to-pink-550 bg-indigo-500 text-white flex items-center justify-center font-black text-lg shadow-md animate-pulse">
                  {isKidsMode ? "🧸" : "FC"}
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-slate-850 dark:text-white">
                    {isKidsMode ? "Foocus AI Scholar" : "Tutor Assistant"}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider flex items-center gap-1.5 uppercase mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {isKidsMode ? "Kids Mode analogies active" : "Ethiopian Syllabus Advisor"}
                  </p>
                </div>
              </div>

              {/* Quick Persona Toggler */}
              <div className="flex items-center gap-3 bg-slate-100/50 dark:bg-slate-950/40 p-2 rounded-2xl border border-slate-200/40 dark:border-slate-800 self-start sm:self-auto">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-black pl-1">
                  Kids Mode Analogy
                </span>
                <button
                  type="button"
                  onClick={() => setIsKidsMode(!isKidsMode)}
                  className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                    isKidsMode ? "bg-emerald-500 flex justify-end" : "bg-slate-300 dark:bg-slate-800 flex justify-start"
                  }`}
                >
                  <span className="w-4.5 h-4.5 rounded-full bg-white shadow-xs block" />
                </button>
              </div>
            </div>

            {/* Chat Log Window */}
            <div className={`border rounded-3xl overflow-hidden flex flex-col justify-between ${
              isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="h-[420px] overflow-y-auto p-4 sm:p-6 space-y-4 relative scrollbar-thin scrollbar-thumb-indigo-500/10">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 max-w-[85%] ${
                      msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                    } items-start animate-fade-in`}
                  >
                    <div className={`w-8 h-8 rounded-xl shrink-0 font-black text-xs flex items-center justify-center shadow-xs ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}>
                      {msg.role === "user" ? "👤" : (isKidsMode ? "🧸" : "🤖")}
                    </div>
                    
                    <div className="space-y-2">
                      <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-indigo-600 text-white rounded-tr-none" 
                          : isDarkMode 
                          ? "bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none" 
                          : "bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none"
                      }`}>
                        {/* Text Render helper */}
                        <div className="space-y-1.5 whitespace-pre-wrap text-xs sm:text-sm">
                          {renderMessageText(msg.text)}
                        </div>

                        {/* Google Search Grounding Sources */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className={`mt-3 pt-2.5 border-t border-dashed ${msg.role === "user" ? "border-white/20" : "border-slate-200 dark:border-slate-800"} space-y-1`}>
                            <p className={`text-[9px] font-mono font-black uppercase tracking-wider ${msg.role === "user" ? "text-indigo-200" : "text-slate-400 dark:text-slate-500"}`}>
                              🌐 Live Search Grounding Sources:
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {msg.sources.map((src, i) => (
                                <a
                                  key={i}
                                  href={src.uri}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border transition-all inline-flex items-center gap-1 ${
                                    msg.role === "user"
                                      ? "bg-white/10 border-white/20 hover:bg-white/20 text-white"
                                      : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400"
                                  }`}
                                >
                                  <span className="truncate max-w-[150px]">{src.title}</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Inline bubble attachments */}
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-dashed border-white/20 dark:border-slate-850">
                            {msg.attachments.map((att, i) => (
                              <div key={i} className="relative group rounded-xl overflow-hidden border border-slate-200/20 shadow-xs max-h-32">
                                <img
                                  src={att.data}
                                  alt={att.name}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <p className={`text-[9px] font-mono select-none px-2 ${msg.role === "user" ? "text-right" : ""} text-slate-400`}>
                        {msg.date}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isSendingChatMessage && (
                  <div className="flex gap-3 max-w-[80%] items-start animate-fade-in">
                    <div className="w-8 h-8 rounded-xl shrink-0 bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                    </div>
                    <div className={`p-4 rounded-3xl ${
                      isDarkMode ? "bg-slate-900 border border-slate-800 text-slate-400" : "bg-slate-50 border border-slate-100 text-slate-500"
                    } text-xs font-mono tracking-wide flex items-center gap-2 rounded-tl-none`}>
                      <span>{isKidsMode ? "Foocus is brainstorming colorful examples..." : "AI Tutoring Engine formulating syllabus breakdown..."}</span>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Live camera stream view inside panel */}
              {showCamera && (
                <div className="mx-4 mb-4 p-4 bg-slate-950 rounded-2xl border border-indigo-500/20 shadow-xl space-y-3 animate-fade-in relative">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                      Live Camera Capture
                    </p>
                    <button
                      type="button"
                      onClick={handleCameraClose}
                      className="text-white hover:text-red-400 font-black text-xs font-mono"
                    >
                      [CLOSE CAMERA]
                    </button>
                  </div>
                  <video
                    id="camera-stream-view"
                    autoPlay
                    playsInline
                    className="w-full h-52 bg-slate-900 rounded-xl object-cover border border-white/5"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={handleCameraClose}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs rounded-xl transition-all"
                    >
                      Cancel Stream
                    </button>
                    <button
                      type="button"
                      onClick={handleCameraCapture}
                      className="px-4.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
                    >
                      Capture snapshot 📸
                    </button>
                  </div>
                </div>
              )}

              {/* Attachment Queued state panel view */}
              {attachedMedia.length > 0 && (
                <div className="p-3 bg-slate-50 border-t border-dashed border-slate-200 dark:bg-slate-950/40 dark:border-slate-800 flex gap-2.5 overflow-x-auto">
                  {attachedMedia.map((file, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 overflow-hidden shrink-0 group">
                      <img
                        src={file.data}
                        alt="attachment-preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setAttachedMedia(prev => prev.filter((_, idx) => idx !== i))}
                        className="absolute inset-0 bg-red-600/80 text-white text-xs font-black opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Chat Text Input Layout controls */}
              <form
                onSubmit={handleSendChatMessage}
                className="p-3 sm:p-4 bg-slate-50/50 dark:bg-slate-950/10 border-t border-dashed border-slate-100 dark:border-slate-800 flex items-center gap-2"
              >
                {/* Media camera trigger button and uploaders */}
                <div className="flex items-center gap-1.5">
                  <input
                    type="file"
                    id="homework-file-uploader"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="homework-file-uploader"
                    className={`w-10 h-10 rounded-2xl cursor-pointer flex items-center justify-center transition-all ${
                      isDarkMode ? "bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-300" : "bg-white border border-slate-150 hover:border-slate-250 text-slate-600 hover:shadow-xs"
                    }`}
                    title="Upload images or media"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  </label>

                  <button
                    type="button"
                    onClick={handleCameraOpen}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                      isDarkMode ? "bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-300" : "bg-white border border-slate-150 hover:border-slate-250 text-slate-600 hover:shadow-xs"
                    }`}
                    title="Snap a photo of homework using camera"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                  </button>
                </div>

                <input
                  type="text"
                  placeholder={isKidsMode ? "Ask Foocus any fun school question or upload a snapshot! ✨" : "Type a curriculum question, formula analysis, or EUEE advice..."}
                  value={currentChatMessage}
                  onChange={(e) => setCurrentChatMessage(e.target.value)}
                  className={`flex-1 p-3.5 rounded-2xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    isDarkMode ? "bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-600" : "bg-white border-slate-200 text-slate-900"
                  }`}
                />

                <button
                  type="submit"
                  disabled={isSendingChatMessage || (!currentChatMessage.trim() && attachedMedia.length === 0)}
                  className={`px-5 py-3 rounded-2xl font-black text-xs text-white shadow-md transition-all flex items-center justify-center ${
                    isSendingChatMessage || (!currentChatMessage.trim() && attachedMedia.length === 0)
                      ? "bg-slate-400 opacity-50 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer active:scale-98 shadow-indigo-600/15"
                  }`}
                >
                  {isSendingChatMessage ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send"}
                </button>
              </form>
            </div>
            
            {/* Disclaimer notes */}
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono text-center select-none">
              Foocus AI is children safe. To verify equations or diagrams, snap pictures inside camera feed. Always cross-check results.
            </p>
          </div>
        )}


        {/* 3. PLATFORM CONFIGURATIONS (SETTINGS TAB) */}
        {!activeQuiz && !isLoadingQuiz && !activeStudyGuide && !isLoadingStudyGuide && activeTab === "settings" && (
          <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-2 select-none">
              <Settings className="w-5.5 h-5.5 text-indigo-500" />
              {language === "am" ? "የመድረክ ምርጫዎች" : language === "om" ? "Filannoo Platformii" : "Platform Settings"}
            </h3>

            {/* Custom Private Secrets Key */}
            <div className={`p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} space-y-4`}>
              <div className="space-y-1 flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-505 rounded-xl">
                  <Brain className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm">Custom Gemini API Secret Key</h4>
                  <p className="text-xs text-slate-400 font-light">Unlocks true unlimited real-time tutoring & visual attachments (camera snaps, graphs & images).</p>
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Paste your GEMINI_API_KEY from Google AI Studio here..."
                  value={clientApiKey}
                  onChange={(e) => setClientApiKey(e.target.value)}
                  className={`w-full p-3.5 rounded-2xl border text-xs font-mono tracking-widest focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    isDarkMode ? "bg-slate-950 border-slate-850 text-indigo-300 placeholder-slate-700" : "bg-slate-50 border-slate-100 text-indigo-800 placeholder-slate-400"
                  }`}
                />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Stored safely locally & secure-proxied server-side
                  </span>
                  {clientApiKey && (
                    <button
                      onClick={() => setClientApiKey("")}
                      className="text-[10px] text-red-500 hover:underline font-bold"
                    >
                      Clear Key
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Kid Mode / Kids analogue toggler */}
            <div className={`p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} flex items-center justify-between`}>
              <div className="space-y-0.5 flex gap-3.5 items-center">
                <span className="text-2xl">🧸</span>
                <div>
                  <h4 className="font-extrabold text-sm">Foocus Kid-Friendly Mode</h4>
                  <p className="text-xs text-slate-400 font-light">Toggles cheerful emoji-based simplified analogies for children in AI chat.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsKidsMode(!isKidsMode)}
                className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                  isKidsMode ? "bg-emerald-505 bg-emerald-500 flex justify-end" : "bg-slate-300 dark:bg-slate-800 flex justify-start"
                }`}
              >
                <span className="w-4.5 h-4.5 rounded-full bg-white shadow-md block" />
              </button>
            </div>

            {/* Language Preference selection */}
            <div className={`p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} space-y-4`}>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-sm">Language / ቋንቋ / Afaan</h4>
                <p className="text-xs text-slate-400 font-light">Choose your preferred tongue for headings and educational guidelines.</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "en", label: "English 🇬🇧" },
                  { id: "am", label: "Amharic 🇪🇹 " },
                  { id: "om", label: "Afaan Oromoo 🌳" }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setLanguage(item.id as "en" | "am" | "om")}
                    className={`p-3.5 rounded-2xl border text-xs font-black transition-all ${
                      language === item.id
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10"
                        : isDarkMode
                        ? "bg-slate-950 border-slate-850 text-slate-300 hover:border-slate-700"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* App State Cleanup Panel */}
            <div className={`p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} space-y-4`}>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-sm text-red-500">Danger Zone</h4>
                <p className="text-xs text-slate-400 font-light">Wipe all practice logs, completed syllabus parameters, and cookies.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Are you sure you want to clear your local history, streaks, and custom API Keys?")) {
                    safeStorage.setItem("ethioquiz_api_key", "");
                    safeStorage.setItem("ethioquiz_kids_mode", "false");
                    setClientApiKey("");
                    setIsKidsMode(false);
                    setAttempts([]);
                    setCompletedSubtopics({});
                    alert("History and settings reset successfully!");
                    window.location.reload();
                  }
                }}
                className="px-4 py-2.5 border border-red-500/30 text-red-600 hover:bg-red-500/10 text-xs font-black rounded-xl transition-all"
              >
                Clear All Logs & Settings
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Humble educational footer credit */}
      <footer className="bg-slate-100/40 dark:bg-slate-950/40 py-8 px-6 text-center text-xs text-slate-400 dark:text-slate-500 font-mono space-y-1.5 mt-auto border-t border-slate-200 dark:border-slate-850">
        <p>© 2026 Ethiopian High School Curriculum Learning Companion.</p>
        <p>Calculated according to ministry guidelines & powered by the Google Gemini Model suite.</p>
      </footer>
    </div>

      {/* Google Chrome & Web App Shortcuts Registration Overlay Guidelines */}
      {showChromeInstallInfo && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-55 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative space-y-6 text-slate-800">
            {/* Top Close icon */}
            <button
              onClick={() => setShowChromeInstallInfo(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-full transition-all cursor-pointer"
            >
              <XCircle className="w-5 h-5" />
            </button>

            {/* Title block */}
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Register on Google Chrome</h3>
              <p className="text-xs text-slate-550">
                Add <strong>EthioQuiz</strong> to your Chrome apps list or Mobile Homescreen for standalone execution.
              </p>
            </div>

            {/* Instruction lists */}
            <div className="space-y-4 font-sans text-sm">
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <strong className="block text-slate-900 text-xs">Open Chrome Menu</strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">Click the three dot options icon <strong>(⋮)</strong> upper-right inside top browser bar.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <strong className="block text-slate-900 text-xs">Tap Save & Share or Install</strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">Choose <strong>"Save and share"</strong>, <strong>"Install app"</strong>, or <strong>"Add to Home Screen"</strong> directly.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <strong className="block text-slate-900 text-xs">Enjoy Standalone Support</strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">Launch EthioQuiz anytime straight from your devices. Your study progress persists forever.</p>
                </div>
              </div>
            </div>

            {/* Bottom confirmation buttons */}
            <button
              onClick={() => setShowChromeInstallInfo(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Understand, Go Register on Chrome!
            </button>
          </div>
        </div>
      )}

      {/* App Store & Mobile Publishing Console Modal overlay */}
      {showPublishModal && (
        <div id="publish-station-modal" className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-55 animate-fade-in font-sans">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 relative space-y-6 text-slate-850 overflow-y-auto max-h-[90vh] custom-scrollbar">
            
            {/* Top Close icon */}
            <button
              onClick={() => setShowPublishModal(false)}
              className="absolute top-4 right-4 text-slate-450 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-full transition-all cursor-pointer"
            >
              <XCircle className="w-5 h-5 animate-pulse" />
            </button>

            {/* Modal Title Banner */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-2">Publish EthioQuiz in App Store & Google Play</h3>
              <p className="text-xs text-slate-500 font-semibold">
                Learn how to distribute your high-school companion study application as a native APK or iOS build!
              </p>
            </div>

            {/* Content area: Two path models */}
            <div className="space-y-6">
              
              {/* Option A: Install instantly on your phone as PWA */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center font-mono uppercase">A</span>
                  <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider font-sans">Instant Mobile Setup (PWA Mobile Link)</h4>
                </div>
                <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                  Progressive Web App (PWA) capabilities are fully pre-configured in this application. No approvals or developer fees are required to use this app on your phone:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="bg-white border border-emerald-100 rounded-xl p-3 space-y-1">
                    <strong className="text-emerald-900 block text-[11px]">iOS (Safari Browser)</strong>
                    <p className="text-[10px] text-slate-500 leading-normal">Open in Safari, tap the <strong>Share Button (Icon ⎋)</strong>, select <strong>"Add to Home Screen"</strong>.</p>
                  </div>
                  <div className="bg-white border border-emerald-100 rounded-xl p-3 space-y-1">
                    <strong className="text-emerald-900 block text-[11px]">Android (Chrome Browser)</strong>
                    <p className="text-[10px] text-slate-500 leading-normal">Open in Chrome, tap the <strong>Menu Options (Icon ⋮)</strong>, select <strong>"Add to Home screen" / "Install"</strong>.</p>
                  </div>
                </div>
              </div>

              {/* Option B: Publish to Apple App Store / Google Play natively */}
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center font-mono uppercase">B</span>
                  <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider font-sans">Native Android & iOS Store Compilation</h4>
                </div>
                <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                  Submit this exact React app source to Google Play Console and App Store using the industry-standard <strong>CapacitorJS</strong> packager:
                </p>

                <div className="bg-slate-900 rounded-xl p-3 text-slate-300 font-mono text-[10px] leading-relaxed space-y-1 shadow-inner select-all">
                  <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1 mb-1">Developer Command sequence:</p>
                  <p># 1. Package assets for production compilation</p>
                  <p className="text-white font-bold">npm run build</p>
                  <p># 2. Add Capacitor core framework dependencies</p>
                  <p className="text-white font-bold">npm i @capacitor/core && npm i -D @capacitor/cli</p>
                  <p># 3. Initialize build with identifier config</p>
                  <p className="text-white font-bold">npx cap init EthioQuiz com.ethioquiz.app --web-dir=dist</p>
                  <p># 4. Compile and open native container interfaces</p>
                  <p className="text-white font-bold">npx cap add android && npx cap open android</p>
                  <p className="text-white font-bold">npx cap add ios && npx cap open ios</p>
                </div>

                <div className="space-y-1 text-[11px] text-slate-600 leading-relaxed font-semibold">
                  <p>• <strong>To Submit on Android</strong>: Standard Android Studio will open natively. Build signed bundle/release APK inside the Studio and upload to Google Play Console.</p>
                  <p>• <strong>To Submit on iOS</strong>: Xcode opens. Complete signed profiles inside target properties and press "Product &gt; Archive" to submit to App Store Connect.</p>
                </div>
              </div>

            </div>

            {/* Bottom help links */}
            <div className="flex flex-col sm:flex-row gap-2 border-t border-slate-100 pt-4">
              <a
                href="https://capacitorjs.com/docs/getting-started"
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center py-2.5 bg-slate-905 bg-slate-900 text-white border border-slate-900 rounded-xl text-xs font-bold hover:bg-slate-800 transition duration-150 cursor-pointer"
              >
                Capacitor Official Guides ↗
              </a>
              <button
                onClick={() => setShowPublishModal(false)}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition duration-150 cursor-pointer"
              >
                Done, Back to EthioQuiz!
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Persisting floating focus music player & Pomodoro timer system */}
      <FocusMusicPlayer 
        isFocusMode={isFocusMode} 
        setIsFocusMode={setIsFocusMode} 
        isDarkMode={isDarkMode} 
      />
    </div>
  );
}
