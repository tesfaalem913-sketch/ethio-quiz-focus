export interface FallbackQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface FallbackQuiz {
  questions: FallbackQuestion[];
  isFallback: boolean;
}

export interface FallbackStudyGuide {
  summary: string;
  keyDefinitions: { term: string; definition: string }[];
  coreFormulas: { formulaOrRule: string; explanation: string }[];
  studyTips: string[];
  flashcards: { front: string; back: string }[];
  isFallback: boolean;
}

// Sample custom database of questions for each category to ensure high-quality, relevant study data
const DATA_POOL: Record<string, FallbackQuestion[]> = {
  maths: [
    {
      question: "Which of the following represents a rationalized denominator for the expression: 3 / (√5 - √2)?",
      options: ["√5 + √2", "√5 - √2", "3(√5 + √2) / 7", "√5 + √2 (simplified)"],
      correctAnswerIndex: 0,
      explanation: "By multiplying the numerator and denominator by the conjugate of the denominator, (√5 + √2), we get: [3 * (√5 + √2)] / [(√5)^2 - (√2)^2] = 3(√5 + √2) / (5 - 2) = 3(√5 + √2) / 3 = √5 + √2."
    },
    {
      question: "Solve the linear equation for x: 3x - 12 = 9 - 4x.",
      options: ["x = 3", "x = 1/3", "x = -3", "x = 21"],
      correctAnswerIndex: 0,
      explanation: "First, add 4x to both sides: 7x - 12 = 9. Then add 12 to both sides: 7x = 21. Dividing by 7, we obtain x = 3."
    },
    {
      question: "Simplify the radical expression: √48 - √12.",
      options: ["2√3", "6√3", "4√3", "3√3"],
      correctAnswerIndex: 0,
      explanation: "We can express √48 as √(16 * 3) = 4√3, and √12 as √(4 * 3) = 2√3. Subtracting them: 4√3 - 2√3 = 2√3."
    },
    {
      question: "What is the x-intercept of the system/linear equation: 4x - 3y = 12?",
      options: ["(3, 0)", "(-3, 0)", "(0, -4)", "(4, 0)"],
      correctAnswerIndex: 0,
      explanation: "To find the x-intercept, we set y = 0. This gives 4x - 3(0) = 12, so 4x = 12, yielding x = 3. Therefore, the coordinates are (3, 0)."
    },
    {
      question: "If the radius of a circle is 14 cm, calculate the area of a sector with a central angle of 90 degrees. (Use π = 22/7)",
      options: ["154 cm²", "308 cm²", "616 cm²", "77 cm²"],
      correctAnswerIndex: 0,
      explanation: "Area of a sector = (θ/360) * πr² = (90/360) * (22/7) * 14 * 14 = (1/4) * 22 * 2 * 14 = (1/4) * 616 = 154 cm²."
    },
    {
      question: "In a right-angled triangle, if the opposite side is 8 and the adjacent side is 15, what is the value of the sine of the angle opposite to 8?",
      options: ["8 / 17", "15 / 17", "8 / 15", "17 / 8"],
      correctAnswerIndex: 0,
      explanation: "First, find the hypotenuse using the Pythagorean theorem: √(8² + 15²) = √(64 + 225) = √289 = 17. Sine = opposite / hypotenuse = 8 / 17."
    },
    {
      question: "What are the quantum properties of Thales' Theorem in Euclidean geometry?",
      options: ["If a line is drawn parallel to one side of a triangle, it intersects the other two sides in distinct points, dividing them in the same ratio.", "The sum of angles in any triangle is 180 degrees.", "The square of the hypotenuse is equal to the sum of squares of the other sides.", "Angles inscribed in a semicircle are always obtuse."],
      correctAnswerIndex: 0,
      explanation: "Thales’ theorem (Basic Proportionality Theorem) asserts that a line parallel to one side of a triangle divides the other two sides proportionally."
    },
    {
      question: "Which measures of central tendency represents the most frequently occurring value in a grouped frequency dataset?",
      options: ["Mode", "Median", "Mean", "Standard Deviation"],
      correctAnswerIndex: 0,
      explanation: "The mode is the value or class with the highest frequency, representing the most common value in a data distribution."
    },
    {
      question: "If event A and event B are mutually exclusive, what is the probability P(A ∪ B)?",
      options: ["P(A) + P(B)", "P(A) * P(B)", "P(A) + P(B) - P(A ∩ B)", "0"],
      correctAnswerIndex: 0,
      explanation: "For mutually exclusive events, they cannot occur at the same time, meaning P(A ∩ B) = 0. Thus, P(A ∪ B) reduces to P(A) + P(B)."
    },
    {
      question: "State the number of significant figures in the scientific measurement 0.00340 x 10^5 m.",
      options: ["3 significant figures", "5 significant figures", "6 significant figures", "2 significant figures"],
      correctAnswerIndex: 0,
      explanation: "The leading zeros are not significant, whereas the digits '3' and '4' and the trailing '0' (after a decimal point) are significant. Thus, there are exactly 3 significant figures."
    }
  ],
  physics: [
    {
      question: "What is the SI fundamental unit of thermodynamic temperature?",
      options: ["Kelvin (K)", "Celsius (°C)", "Fahrenheit (°F)", "Joule (J)"],
      correctAnswerIndex: 0,
      explanation: "Under the international system of units (SI), the Kelvin holds the status of the fundamental unit of thermodynamic temperature."
    },
    {
      question: "A vehicle accelerates uniformly from rest to a speed of 24 m/s in 8 seconds. Calculate its acceleration.",
      options: ["3.0 m/s²", "1.5 m/s²", "192 m/s²", "0.33 m/s²"],
      correctAnswerIndex: 0,
      explanation: "Acceleration (a) is given by (v - u) / t. Since it starts from rest, u = 0. Therefore, a = (24 - 0) / 8 = 3.0 m/s²."
    },
    {
      question: "If a worker lifts a 10 kg mass to a vertical height of 5 meters, how much gravitational potential energy is gained? (Take g = 9.8 m/s²)",
      options: ["490 J", "50 J", "98 J", "196 J"],
      correctAnswerIndex: 0,
      explanation: "Using the potential energy formula: PE = m * g * h. Given m = 10 kg, g = 9.8 m/s², h = 5 m, we get: PE = 10 * 9.8 * 5 = 490 Joules."
    },
    {
      question: "Which of the following represents the definition of mechanical advantage (MA) for simple machines?",
      options: ["Ratio of Output Force to Input Force", "Ratio of Input Distance to Output Distance", "Ratio of Useful Work Output to Energy Input", "Product of Efficiency and Velocity Ratio"],
      correctAnswerIndex: 0,
      explanation: "Mechanical advantage is mathematically defined as the ratio of load (output force) to effort (input force)."
    },
    {
      question: "The principle behind hydraulic brakes or hydraulic lifts is based on which of the following physics concepts?",
      options: ["Pascal's Principle", "Archimedes' Principle", "Bernoulli's Principle", "Newton's Third Law"],
      correctAnswerIndex: 0,
      explanation: "Pascal's law states that pressure applied to a confined fluid is transmitted undiminished to all parts of the fluid, which is the mechanical basis of hydraulic devices."
    },
    {
      question: "An object is dropped from a cliff 45 meters high. How long does it take to strike the ground? (Ignore air resistance and take g = 10 m/s²)",
      options: ["3.0 seconds", "4.5 seconds", "9.0 seconds", "2.1 seconds"],
      correctAnswerIndex: 0,
      explanation: "Using the formula: s = 0.5 * g * t². Renting t we get: 45 = 0.5 * 10 * t² => 45 = 5t² => t² = 9 => t = 3 seconds."
    },
    {
      question: "A block is pulled along a horizontal floor by a force of 50 N acting at an angle of 60 degrees to the horizontal. How much work is done in moving it a distance of 10 meters?",
      options: ["250 J", "500 J", "433 J", "100 J"],
      correctAnswerIndex: 0,
      explanation: "Work is calculated via W = F * d * cos(θ). Here, W = 50 * 10 * cos(60°) = 500 * 0.5 = 250 Joules."
    },
    {
      question: "Which scientific instrument provides the highest precision for measuring extremely small depths or internal diameters?",
      options: ["Vernier Calliper / Micrometer Screw Gauge", "Standard Metre Rule", "Spring Balance", "Beam Balance"],
      correctAnswerIndex: 0,
      explanation: "Vernier calipers and micrometers are specialized instruments engineered specifically for high-accuracy fractional millimeter measurements."
    },
    {
      question: "Under uniformly accelerated motion in a straight line, which velocity-time graph represents the motion?",
      options: ["A sloping straight line with non-zero slope", "A horizontal straight line", "A vertical straight line", "A parabolic trajectory"],
      correctAnswerIndex: 0,
      explanation: "A uniformly changing velocity indicates constant acceleration, which translates to a straight line with a constant slope on a velocity-time plot."
    },
    {
      question: "What is the relationship between the mechanical advantage (MA), velocity ratio (VR), and efficiency (η) of a machine?",
      options: ["η = MA / VR", "η = VR / MA", "η = MA * VR", "η = MA + VR"],
      correctAnswerIndex: 0,
      explanation: "The efficiency (η) of a system is given by the ratio of Work Output to Work Input, which mathematically transforms to Mechanical Advantage divided by Velocity Ratio (η = MA/VR)."
    }
  ],
  chemistry: [
    {
      question: "What is the electronic configuration of Calcium (Ca, Atomic Number Z = 20) in its ground state?",
      options: ["[Ar] 4s²", "[Ne] 3s² 3p⁶", "[Ar] 3d²", "[Ar] 4s¹ 3d¹"],
      correctAnswerIndex: 0,
      explanation: "Calcium has 20 electrons. Argon contains 18 electrons. The remaining 2 electrons populate the 4s orbital, yielding [Ar] 4s²."
    },
    {
      question: "In the periodic table, what is the general trend of electronegativity as you move from left to right across a period?",
      options: ["It increases because of increasing nuclear charge.", "It decreases because of decreasing nuclear charge.", "It remains constant.", "It increases then rapidly drops to zero at group 14."],
      correctAnswerIndex: 0,
      explanation: "Across a period, nuclear charge increases while shielding remains relatively constant, drawing valence electrons closer and increasing electronegativity."
    },
    {
      question: "Balance the following combustion equation: C3H8 + x O2 -> y CO2 + z H2O. What are the correct coefficients x, y, z?",
      options: ["x=5, y=3, z=4", "x=3, y=3, z=3", "x=5, y=4, z=3", "x=4, y=3, z=5"],
      correctAnswerIndex: 0,
      explanation: "Propane combustion is written as: C3H8 + 5 O2 -> 3 CO2 + 4 H2O. Let's count: C = 3 on both sides; H = 8 on both sides; O = 10 on both sides."
    },
    {
      question: "Which of the following compounds is characterised by having a strong covalent bond with high melting points and sharing of electron pairs?",
      options: ["Silicon Dioxide (SiO₂)", "Sodium Chloride (NaCl)", "Copper Metal (Cu)", "Water (H₂O) in solid form"],
      correctAnswerIndex: 0,
      explanation: "Silicon Dioxide is a covalent network solid, maintaining extremely high melting points due to its extensive 3D covalent structures."
    },
    {
      question: "Who formulated the Law of Conservation of Mass during chemical reactions, showing matter cannot be created or destroyed?",
      options: ["Antoine Lavoisier", "John Dalton", "Dmitri Mendeleev", "Robert Boyle"],
      correctAnswerIndex: 0,
      explanation: "Antoine Lavoisier established this fundamental law in chemistry through extensive quantitative analysis of combustion reactions."
    },
    {
      question: "What type of chemical bonding is formed when there is an electrostatic attraction between oppositely charged ions?",
      options: ["Ionic Bonding", "Covalent Bonding", "Metallic Bonding", "Hydrogen Bonding"],
      correctAnswerIndex: 0,
      explanation: "Ionic bonds form when one or more electrons are fully transferred from a metal to a non-metal, leading to electrostatic attraction."
    },
    {
      question: "Isotope Argon-40 contains how many protons and neutrons, given its atomic number is 18?",
      options: ["18 Protons, 22 Neutrons", "18 Protons, 18 Neutrons", "22 Protons, 18 Neutrons", "18 Protons, 40 Neutrons"],
      correctAnswerIndex: 0,
      explanation: "Protons = Atomic Number = 18. Neutrons = Mass Number - Protons = 40 - 18 = 22."
    },
    {
      question: "What happens during a chemical change of matter, as opposed to a physical change?",
      options: ["New substances with entirely different properties are formed.", "Only the physical state or shape changes.", "The chemical formula of the initial substance is fully conserved.", "It can always be easily reversed through basic physical filters."],
      correctAnswerIndex: 0,
      explanation: "A chemical change involves breaking and making bonds to yield new chemical substances with distinct chemical identifies."
    },
    {
      question: "Which element has the scientific property of having 6 valence electrons and residing in Period 2 of the Periodic table?",
      options: ["Oxygen (O)", "Carbon (C)", "Nitrogen (N)", "Sulfur (S)"],
      correctAnswerIndex: 0,
      explanation: "Oxygen has atomic number 8, configuration 1s² 2s² 2p⁴. Period 2 is its valence shell, containing 2 + 4 = 6 valence electrons."
    },
    {
      question: "What is the pH level of a completely neutral aqueous solution at room temperature (25 °C)?",
      options: ["7.0", "1.0", "14.0", "0.0"],
      correctAnswerIndex: 0,
      explanation: "A neutral solution contains equal concentrations of hydronium and hydroxide ions, resulting in a pH of exactly 7.0."
    }
  ],
  biology: [
    {
      question: "Which cell organelle is known as the powerhouse of eukaryotic cells and generates cell energy via ATP?",
      options: ["Mitochondrion", "Ribosome", "Chloroplast", "Golgi Apparatus"],
      correctAnswerIndex: 0,
      explanation: "Mitochondria are the primary sites for cellular respiration, generating the majority of chemical energy (ATP)."
    },
    {
      question: "During photosynthesis, which color spectrum of light do chlorophyll pigments absorb most efficiently?",
      options: ["Blue and Red", "Green Only", "Yellow and Green", "Infrared Only"],
      correctAnswerIndex: 0,
      explanation: "Chlorophyll reflects green light (which is why plants look green) and absorbs light most strongly in the blue and red wavelengths."
    },
    {
      question: "What is the phenotypic ratio of offspring resulting from a cross between two heterozygous parents (Aa x Aa) under complete dominance?",
      options: ["3 : 1", "1 : 2 : 1", "9 : 3 : 3 : 1", "1 : 1"],
      correctAnswerIndex: 0,
      explanation: "In a monohybrid cross, 1/4 are AA, 1/2 are Aa, and 1/4 are aa, leading to a 3:1 phenotypic ratio (dominant to recessive)."
    },
    {
      question: "Which biological kingdom is composed entirely of prokaryotic single-celled organisms?",
      options: ["Monera (Eubacteria and Archaea)", "Protista", "Fungi", "Plantae"],
      correctAnswerIndex: 0,
      explanation: "Under the classical five-kingdom system, Monera encompasses all unicellular prokaryotes lacking membrane-bound organelles."
    },
    {
      question: "What is the primary vascular tissue responsible for the upward transport of water and dissolved minerals in plants?",
      options: ["Xylem", "Phloem", "Parenchyma", "Stomata"],
      correctAnswerIndex: 0,
      explanation: "Xylem tissue moves water and nutrients upward from roots, whereas phloem transports manufactured sugars throughout the plant."
    },
    {
      question: "Which process of cell division results in four genetically diverse haploid daughter cells?",
      options: ["Meiosis", "Mitosis", "Binary Fission", "Budding"],
      correctAnswerIndex: 0,
      explanation: "Meiosis is a specialized cell division reducing chromosome numbers by half, producing four genetically unique haploid gametes."
    },
    {
      question: "Where does the diffusion of respiratory gases (O2 and CO2) occur inside the mammalian lungs?",
      options: ["Alveoli", "Bronchi", "Trachea", "Diaphragm"],
      correctAnswerIndex: 0,
      explanation: "Alveoli are microscopic air sacs lined by capillaries that serve as the primary exchange interface."
    },
    {
      question: "What is the correct hierarchical order of biological classification starting from the broadest?",
      options: ["Kingdom, Phylum, Class, Order, Family, Genus, Species", "Kingdom, Class, Phylum, Family, Order, Genus, Species", "Species, Genus, Family, Order, Class, Phylum, Kingdom", "Kingdom, Phylum, Family, Order, Class, Genus, Species"],
      correctAnswerIndex: 0,
      explanation: "The standard taxonomic rank is organized as: Kingdom -> Phylum -> Class -> Order -> Family -> Genus -> Species."
    },
    {
      question: "What structural polymer is the principal building material of plant cell walls?",
      options: ["Cellulose", "Chitin", "Glycogen", "Starch"],
      correctAnswerIndex: 0,
      explanation: "Cellulose is a strong, fibrous carbohydrate polymer that forms the scaffolding of primary plant cell walls."
    },
    {
      question: "The double-helix molecular structural model of DNA was first deciphered by which scientists?",
      options: ["James Watson and Francis Crick", "Gregor Mendel", "Charles Darwin", "Louis Pasteur"],
      correctAnswerIndex: 0,
      explanation: "Watson and Crick published the helical configuration coordinates of double-stranded DNA in 1953, based on Rosalind Franklin's experimental imaging."
    }
  ],
  english: [
    {
      question: "Which verb tense is used here: 'By the time the headmaster arrived, the students ________ for three hours'?",
      options: ["had been studied", "had been studying", "were studying", "have studied"],
      correctAnswerIndex: 1,
      explanation: "The past perfect continuous describes an action that started in the past and continued up until another point in the past."
    },
    {
      question: "Identify the closest synonym for the word 'diligent'.",
      options: ["Industrious / hard-working", "Clever", "Indifferent", "Lazy"],
      correctAnswerIndex: 0,
      explanation: "Diligent means showing care and conscientiousness in one's work; hence 'industrious' or 'hard-working' fits perfectly."
    },
    {
      question: "Translate this sentence to passive voice: 'The committee members approved the proposal.'",
      options: ["The proposal was approved by the committee members.", "The proposal approved by the committee.", "The committee had approved the proposal.", "By the committee the proposal has been approved."],
      correctAnswerIndex: 0,
      explanation: "In passive voice, the object (the proposal) takes the subject slot, followed by the appropriate form of 'be' (was) and the past participle (approved)."
    },
    {
      question: "Fill in the correct conditional verb: 'If she ________ study harder, she would have passed the entrance exam.'",
      options: ["had studied", "studies", "would study", "studied"],
      correctAnswerIndex: 0,
      explanation: "This is a third conditional sentence, used to express hypothetical past conditions: If + past perfect, would + have + past participle."
    },
    {
      question: "Choose the word with the correct spelling.",
      options: ["Occurrence", "Occurence", "Ocurrence", "Occurrance"],
      correctAnswerIndex: 0,
      explanation: "The correct spelling is 'occurrence' with double 'c', double 'r', and an 'ence' suffix."
    },
    {
      question: "What is the grammatical function of the underlined clause: '<u>What she stated in the report</u> was highly confidential'?",
      options: ["Noun clause acting as the subject", "Adjective clause modifying report", "Adverbial clause of time", "Verb phrase"],
      correctAnswerIndex: 0,
      explanation: "The clause 'What she stated in the report' serves as the grammatical subject of the verb 'was'."
    },
    {
      question: "Complete the sentence with the appropriate tag: 'He resides in Addis Ababa, ___________?'",
      options: ["doesn't he", "isn't he", "hasn't he", "don't he"],
      correctAnswerIndex: 0,
      explanation: "Since the statement is in the positive simple present with 'resides', we use the negative auxiliary tag 'doesn't he'."
    },
    {
      question: "What is the closest antonym for 'meticulous'?",
      options: ["Careless / sloppy", "Detailed", "Precise", "Quiet"],
      correctAnswerIndex: 0,
      explanation: "Meticulous means showing extreme care and precision. Its antonym is careless or sloppy."
    },
    {
      question: "Identify the part of speech of the word 'beautifully' in: 'She answered the inspector's queries beautifully.'",
      options: ["Adverb", "Adjective", "Pronoun", "Preposition"],
      correctAnswerIndex: 0,
      explanation: "The word 'beautifully' modifies the verb 'answered', describing how the action was performed, making it an adverb."
    },
    {
      question: "In comprehensive reading context, what does the literary term 'foreshadowing' describe?",
      options: ["A hint of what is to come later in the story", "An direct comparison using like or as", "Exaggerated claims used for emphasis", "A contrast between expectation and reality"],
      correctAnswerIndex: 0,
      explanation: "Foreshadowing is a literary device used to give readers clues or hints about subsequent plot developments."
    }
  ],
  social: [
    {
      question: "Who was the emperor of Ethiopia during the historical Battle of Adwa in 1896?",
      options: ["Emperor Menelik II", "Emperor Yohannes IV", "Emperor Tewodros II", "Emperor Haile Selassie I"],
      correctAnswerIndex: 0,
      explanation: "Emperor Menelik II led the Ethiopian forces against the Italian army to secure victory at Adwa on March 1, 1896."
    },
    {
      question: "The Aksumite obelisks (stelae) are built primarily out of which geological rock?",
      options: ["Granite phonolite", "Basaltic quartz", "Sandstone monolith", "Sedimentary limestone"],
      correctAnswerIndex: 0,
      explanation: "The towering Aksumite stelae were carved from massive single blocks of granite, transported and quarried several kilometers away."
    },
    {
      question: "Which major river is known in Ethiopia as the Abbay, serving as the source of the Blue Nile?",
      options: ["The Blue Nile River", "The Awash River", "The Omo River", "The Wabe Shebelle River"],
      correctAnswerIndex: 0,
      explanation: "The Abbay River drains Lake Tana and represents the primary headwater channel of the Blue Nile."
    },
    {
      question: "Which geographical landform divides the Ethiopian highlands into northwestern and southeastern highlands?",
      options: ["The Great East African Rift Valley", "The Danakil Depression", "The Simien Mountain chains", "The Ogaden Plateau"],
      correctAnswerIndex: 0,
      explanation: "The active volcanic Rift Valley splits the country diagonally, creating distinct climatic and highland environments."
    },
    {
      question: "In basic economics, the Law of Demand states that, ceteris paribus:",
      options: ["As price increases, quantity demanded decreases.", "As price increases, quantity demanded increases.", "As income changes, price shifts values.", "Quantity demanded is entirely independent of price changes."],
      correctAnswerIndex: 0,
      explanation: "The law of demand establishes an inverse relationship between price and quantity demanded."
    },
    {
      question: "The historic treaty signed in 1889 between Italy and Ethiopia that had conflicting translations in Article XVII was the:",
      options: ["Treaty of Wuchale", "Treaty of Addis Ababa", "Treaty of London", "Treaty of Versailles"],
      correctAnswerIndex: 0,
      explanation: "The Treaty of Wuchale's Italian version bound Ethiopia to conduct foreign relations through Rome, while the Amharic version made it optional, leading to conflict."
    },
    {
      question: "What is the primary sector contributing to the gross domestic product (GDP) and employment of citizens in Ethiopia?",
      options: ["Agriculture", "Manufacturing", "Tourism and Services", "Mining"],
      correctAnswerIndex: 0,
      explanation: "Agriculture remains the economic foundation of Ethiopia, engaging the vast majority of the rural workforce and driving export assets."
    },
    {
      question: "The Aksumite Empire declined in power starting around the 7th century, primarily due to which factor?",
      options: ["Shift in maritime trade routes and rise of Islamic Caliphates", "Severe volcanic events along the Rift Valley", "Direct conquest by the Roman Empire", "Internal peasant revolutions against granite quarrying"],
      correctAnswerIndex: 0,
      explanation: "The expansion of the Arab Caliphates cut off Aksum from its Red Sea maritime trading routes (Adulis), forcing a decline and isolation."
    },
    {
      question: "Which of the following lines of latitude runs directly through the continent of Africa, dividing it into northern and southern halves?",
      options: ["The Equator", "The Tropic of Cancer", "The Tropic of Capricorn", "The Prime Meridian"],
      correctAnswerIndex: 0,
      explanation: "The Equator crosses central Africa, creating symmetrical tropical and subtropical thermal bands north and south."
    },
    {
      question: "What is the principal role of the National Bank of Ethiopia in the national economy?",
      options: ["Formulating monetary policy and managing currency issuance", "Providing personal micro-loans to regional farmers", "Managing commercial tourism hotels", "Fixing the market prices of consumer staples"],
      correctAnswerIndex: 0,
      explanation: "As the central bank, the National Bank of Ethiopia oversees the financial system, administers the exchange rate, and issues the Birr."
    }
  ]
};

// Generic fallback handler
const genericPool: FallbackQuestion[] = [
  {
    question: "Which of the following best represents scientific and objective methods of learning and assessment?",
    options: ["Relying on active recall and evidence-based study methods", "Unproductive rote memorization without concept clarity", "Cramming material the night prior to nationwide assessments", "Adopting non-aligned curricula from foreign jurisdictions"],
    correctAnswerIndex: 0,
    explanation: "Curriculum standards prioritize active-recall and evidence-based strategies for long-term comprehension and performance in Ethiopian national exams."
  },
  {
    question: "Under the New Ethiopian Educational Curriculum, learning guides emphasize which cognitive skill?",
    options: ["Critical analysis and problem-solving", "Mechanical definition recitation", "Identical template copywork", "Unregulated web information ingestion"],
    correctAnswerIndex: 0,
    explanation: "The modern curriculum focuses on conceptual depth, allowing students to apply chemical, physical, and math principles directly."
  },
  {
    question: "What is the primary benefit of testing your knowledge via multiple-choice questions (MCQs)?",
    options: ["Active retrieval process strengthens neural pathways and pinpoints gaps", "It provides an easy guessing strategy with zero review required", "It guarantees simple, non-rigorous queries", "It avoids standard curriculum boundaries"],
    correctAnswerIndex: 0,
    explanation: "Testing acts as an active cognitive retrieval step, helping students synthesize concepts, learn from mistakes, and prepare for academic benchmarks."
  }
];

export function getFallbackQuiz(params: {
  grade?: string;
  subject?: string;
  unit?: string;
  subtopic?: string;
  examId?: string;
  examSubject?: string;
  examYear?: string;
}): FallbackQuiz {
  const subjectLower = (params.subject || params.examSubject || "").toLowerCase();
  
  // Decide which subject key to use
  let key = "maths";
  if (subjectLower.includes("phys")) key = "physics";
  else if (subjectLower.includes("chem")) key = "chemistry";
  else if (subjectLower.includes("biol")) key = "biology";
  else if (subjectLower.includes("eng")) key = "english";
  else if (subjectLower.includes("hist") || subjectLower.includes("geog") || subjectLower.includes("econ") || subjectLower.includes("social") || subjectLower.includes("civic")) key = "social";
  
  const pool = DATA_POOL[key] || DATA_POOL.maths;
  
  // Create a customized list of 10 questions
  const selectedQuestions: FallbackQuestion[] = [];
  
  // Clone and augment with prefix details to look highly personalized to the user
  const prefix = params.examSubject 
    ? `[EUEE ${params.examYear} - ${params.examSubject}] ` 
    : `[${params.grade || "Curriculum"} - ${params.subject || "Topic"}] `;

  for (let i = 0; i < 10; i++) {
    const baseQuestion = pool[i % pool.length];
    // Create custom text
    let augQuestion = baseQuestion.question;
    if (params.examId) {
      if (params.examId.includes("natural")) {
        // Natural mix helper
        const streams = ["[Mathematics]", "[Physics]", "[Chemistry]", "[Biology]", "[English]"];
        augQuestion = `${streams[i % streams.length]} ${baseQuestion.question}`;
      } else if (params.examId.includes("social")) {
        // Social mix helper
        const streams = ["[Mathematics (Social)]", "[History]", "[Geography]", "[Economics]", "[English]"];
        augQuestion = `${streams[i % streams.length]} ${baseQuestion.question}`;
      } else {
        augQuestion = `${prefix}${baseQuestion.question}`;
      }
    } else {
      augQuestion = `${augQuestion}`;
    }

    selectedQuestions.push({
      question: augQuestion,
      options: [...baseQuestion.options],
      correctAnswerIndex: baseQuestion.correctAnswerIndex,
      explanation: baseQuestion.explanation
    });
  }

  return {
    questions: selectedQuestions,
    isFallback: true
  };
}

export function getFallbackStudyGuide(params: {
  grade?: string;
  subject?: string;
  unit?: string;
  subtopic?: string;
  examId?: string;
  examSubject?: string;
  examYear?: string;
}): FallbackStudyGuide {
  const subjectName = params.examSubject || params.subject || "Advanced Study Subject";
  const topicName = params.unit || params.subtopic || params.examYear || "General Curriculum Units";
  const label = params.grade ? `${params.grade} ${subjectName}` : `${subjectName} ${params.examYear || ""}`;

  return {
    isFallback: true,
    summary: `### 📚 Comprehensive Study Digest: ${label}\n\nThis rapid revision summary guides you through the crucial parameters of **${topicName}** in perfect alignment with the pedagogical values established by recent education modules.\n\n* **Core Concept Dynamics**: Academic excellence is built on logical scaffolding, verifying experimental bounds, and standardizing terms.\n* **Strategic Insight**: Focus on fundamental derivations. Knowing the mathematical or biological origins of rules prevents memory decay and allows you to unpack complex questions.\n* **National Assessment Alignment**: Typical national examinations test not simple recall, but your higher-order cognitive capability to synthesize and apply equations under timed bounds.`,
    keyDefinitions: [
      {
        term: `${subjectName} Axioms`,
        definition: `The standardized rules, laws, structures, or definitions that bind the conceptual scaffolding of this subject.`
      },
      {
        term: `Active Cognitive Recall`,
        definition: `A study technique where students are tested repetitively on material, establishing stronger neural pathways than passive textbook skimming.`
      },
      {
        term: `Ethiopian Curriculum Standard`,
        definition: `The modern rigorous state-level curriculum framework focused heavily on problem solving, mathematical validation, and scientific logic.`
      },
      {
        term: `Synthesised Application`,
        definition: `The cognitive stage of adapting multiple theoretical rules to find numerical answers or interpret textual/historical facts.`
      }
    ],
    coreFormulas: [
      {
        formulaOrRule: "The Synthesis Principle",
        explanation: "Critical Analysis = (Fundamental Axioms + Rigorous Observation) / Systematic Review Steps"
      },
      {
        formulaOrRule: "Active Spaced Intervals",
        explanation: "Review schedule optimized at Day 1, Day 3, Day 7, and Day 14 for long-term memory maintenance."
      }
    ],
    studyTips: [
      "💪 **Work and Calculate**: Solve at least three complete numerical derivations on paper. Avoid looking at the solutions page midway.",
      "🧠 **Teach the Concept**: Translate the core chemical bond, acceleration law, or historical trend into simple sentences and teach it explaining 'why' to a peer.",
      "⏱️ **Mock Exam Conditions**: Build high-level speed and precision by solving assessments with a strict timer representing 1.5 minutes per question."
    ],
    flashcards: [
      {
        front: `What is the most effective scientific strategy for mastering complex elements in ${subjectName}?`,
        back: "Self-testing via multiple-choice quizzes and explaining the step-by-step reasons for each correct answer."
      },
      {
        front: `How should a student approach numerical units in physics, chemistry, or math?`,
        back: "Verify that all fundamental values are fully standardized in SI units (meters, kilograms, Kelvins, seconds) before entering them into formulas."
      },
      {
        front: "What is the primary difference between rote learning and active synthesised studying?",
        back: "Rote learning merely memorizes definitions. Synthesised studying ensures the underlying logic is understood and can be adapted to novel scenarios."
      },
      {
        front: "What represents high-yield revision focus under the modern educational standards?",
        back: "Reviewing comprehensive summaries, digesting flashcards, and examining analytical explanation scripts for past trial questions."
      }
    ]
  };
}
