import { GradeNode, EntranceExamNode } from "./types";

export const GRADES_DATA: GradeNode[] = [
  {
    id: "9",
    name: "Grade 9",
    subjects: [
      {
        id: "maths",
        name: "Mathematics",
        icon: "Calculator",
        units: [
          {
            id: "u1",
            name: "Unit 1: Further on Sets",
            subtopics: [
              { id: "s1", name: "1.1 Sets and Elements" },
              { id: "s2", name: "1.2 Set Description" },
              { id: "s3", name: "1.3 The Notion of Sets" },
              { id: "s4", name: "1.4 Operations on Sets" },
              { id: "s5", name: "1.5 Application of Sets" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: The Number System",
            subtopics: [
              { id: "s6", name: "2.1 Revision on Natural Numbers and Integers" },
              { id: "s7", name: "2.2 Rational Numbers" },
              { id: "s8", name: "2.3 Irrational Numbers" },
              { id: "s9", name: "2.4 Real Numbers" },
              { id: "s10", name: "2.5 Application of Number System" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Solving Equations",
            subtopics: [
              { id: "s11", name: "3.1 Revision on Linear Equation in One Variable" },
              { id: "s12", name: "3.2 Systems of Linear Equations in Two Variables" },
              { id: "s13", name: "3.3 Solving Non-linear Equations" },
              { id: "s14", name: "3.4 Applications of Equations & Modeling" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Solving Inequalities",
            subtopics: [
              { id: "s15", name: "4.1 Revision on Linear Inequalities in One Variable" },
              { id: "s16", name: "4.2 Systems of Linear Inequalities in Two Variables" },
              { id: "s17", name: "4.3 Inequalities Involving Absolute Value" },
              { id: "s18", name: "4.4 Quadratic Inequalities" },
              { id: "s19", name: "4.5 Applications of Inequalities" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Introduction to Trigonometry",
            subtopics: [
              { id: "s20", name: "5.1 Revision on Right-angled Triangles" },
              { id: "s21", name: "5.2 Trigonometric Ratios" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Regular Polygons",
            subtopics: [
              { id: "s22", name: "6.1 Sum of Interior Angles of a Convex Polygon" },
              { id: "s23", name: "6.2 Sum of Exterior Angles of a Convex Polygon" },
              { id: "s24", name: "6.3 Measures of Each Interior and Exterior Angle" },
              { id: "s25", name: "6.4 Properties of Regular Polygons" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Congruency and Similarity",
            subtopics: [
              { id: "s26", name: "7.1 Revision on Congruency of Triangles" },
              { id: "s27", name: "7.2 Definition of Similar Figures" },
              { id: "s28", name: "7.3 Theorems on Similar Plane Figures" },
              { id: "s29", name: "7.4 Ratio of Perimeters of Similar Plane Figures" },
              { id: "s30", name: "7.5 Ratio of Areas of Similar Plane Figures" },
              { id: "s31", name: "7.6 Construction of Similar Plane Figure" },
              { id: "s32", name: "7.7 Applications of Similarities" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Vectors in Two Dimensions",
            subtopics: [
              { id: "s33", name: "8.1 Vector and Scalar Quantities" },
              { id: "s34", name: "8.2 Representation of a Vector" },
              { id: "s35", name: "8.3 Vectors Operations (Addition, Subtraction, Scalar mult.)" },
              { id: "s36", name: "8.4 Position Vector" },
              { id: "s37", name: "8.5 Applications of Vectors in Two Dimensions" }
            ]
          },
          {
            id: "u9",
            name: "Unit 9: Statistics and Probability",
            subtopics: [
              { id: "s38", name: "9.1 Statistical Data Presentation and Interpretation" },
              { id: "s39", name: "9.2 Probability of Simple Events" }
            ]
          }
        ]
      },
      {
        id: "physics",
        name: "Physics",
        icon: "Zap",
        units: [
          {
            id: "u1",
            name: "Unit 1: Physics and Human Society",
            subtopics: [
              { id: "s1", name: "1.1 Definition and Nature of Physics" },
              { id: "s2", name: "1.2 Branches of Physics" },
              { id: "s3", name: "1.3 Related Fields to Physics" },
              { id: "s4", name: "1.4 Historical Issues and Contributors in Physics" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Physical Quantities",
            subtopics: [
              { id: "s5", name: "2.1 Scales, Standards, Units and Prefixes" },
              { id: "s6", name: "2.2 Measurement and Laboratory Safety Rules" },
              { id: "s7", name: "2.3 Classification of Physical Quantities" },
              { id: "s8", name: "2.4 Unit Conversion Techniques" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Motion in a Straight Line",
            subtopics: [
              { id: "s9", name: "3.1 Position, Distance and Displacement" },
              { id: "s10", name: "3.2 Average Speed and Instantaneous Speed" },
              { id: "s11", name: "3.3 Average Velocity and Instantaneous Velocity" },
              { id: "s12", name: "3.4 Acceleration" },
              { id: "s13", name: "3.5 Uniform Motion and Equations" },
              { id: "s14", name: "3.6 Graphical Representation of Motion" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Force, Work, Energy and Power",
            subtopics: [
              { id: "s15", name: "4.1 The Concept of Force" },
              { id: "s16", name: "4.2 Newton's Laws of Motion" },
              { id: "s17", name: "4.3 Forces of Friction (Static and Kinetic)" },
              { id: "s18", name: "4.4 The Concept and calculation of Work" },
              { id: "s19", name: "4.5 Kinetic and Potential Energies & Conservation" },
              { id: "s20", name: "4.6 Power and Core Applications" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Simple Machines",
            subtopics: [
              { id: "s21", name: "5.1 Simple Machines and their Purposes" },
              { id: "s22", name: "5.2 Simple Machines at Home" },
              { id: "s23", name: "5.3 Simple Machines at Workplace" },
              { id: "s24", name: "5.4 Classification of Simple Machines" },
              { id: "s25", name: "5.5 Mechanical Advantage, Velocity Ratio and Efficiency" },
              { id: "s26", name: "5.6 Designing Simple Machines" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Mechanical Oscillation and Sound Wave",
            subtopics: [
              { id: "s27", name: "6.1 Common Characteristics of Waves" },
              { id: "s28", name: "6.2 String, Pendulum and Spring Systems" },
              { id: "s29", name: "6.3 Propagation of Waves and Energy Transmission" },
              { id: "s30", name: "6.4 Sound Waves and Propagation" },
              { id: "s31", name: "6.5 Superposition principles of Waves" },
              { id: "s32", name: "6.6 Key Characteristics of Sound Waves" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Temperature and Thermometry",
            subtopics: [
              { id: "s33", name: "7.1 Temperature and Our Daily Life" },
              { id: "s34", name: "7.2 Extreme Temperature and Physical Safety" },
              { id: "s35", name: "7.3 Temperature Change and its Physical Effects" },
              { id: "s36", name: "7.4 Measuring Temperature with Different Scales" },
              { id: "s37", name: "7.5 Types of Thermometers and Their Proper Use" },
              { id: "s38", name: "7.6 Conversion between Temperature Scales (C, F, K)" },
              { id: "s39", name: "7.7 Thermal Expansion of Solid, Liquid, Gas Materials" }
            ]
          }
        ]
      },
      {
        id: "chemistry",
        name: "Chemistry",
        icon: "FlaskConical",
        units: [
          {
            id: "u1",
            name: "Unit 1: Chemistry and Its Importance",
            subtopics: [
              { id: "s1", name: "1.1 Definition and Scope of Chemistry" },
              { id: "s2", name: "1.2 Science and Technology in Modern Society" },
              { id: "s3", name: "1.3 Famous Chemists and Their Core Contributions" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Measurements and Scientific Methods",
            subtopics: [
              { id: "s4", name: "2.1 SI Units, Prefixes and Scientific Notation" },
              { id: "s5", name: "2.2 Significant Figures and Dimensional Analysis" },
              { id: "s6", name: "2.3 Scientific Method Steps and Laboratory Experiments" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Structure of the Atom",
            subtopics: [
              { id: "s7", name: "3.1 Subatomic Particles (Protons, Neutrons, Electrons)" },
              { id: "s8", name: "3.2 Atomic Number, Mass Number, and Isotopes" },
              { id: "s9", name: "3.3 Atomic Spectra and Bohr's Atomic Theory" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Periodic Classification of Elements",
            subtopics: [
              { id: "s10", name: "4.1 Historical Development of Periodic Classification" },
              { id: "s11", name: "4.2 Mendeleev's Classification of the Elements" },
              { id: "s12", name: "4.3 The Modern Periodic Table layout" },
              { id: "s13", name: "4.4 The Major Periodic Trends in the Table" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Chemical Bonding",
            subtopics: [
              { id: "s14", name: "5.1 Introduction to Chemical Bonding" },
              { id: "s15", name: "5.2 Ionic Bonding and Crystals" },
              { id: "s16", name: "5.3 Covalent Bonding and Molecules" },
              { id: "s17", name: "5.4 Metallic Bonding and Theory" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Chemical Reactions and Stoichiometry",
            subtopics: [
              { id: "s18", name: "6.1 Writing and Balancing Chemical Equations" },
              { id: "s19", name: "6.2 Types of Chemical Reactions" },
              { id: "s20", name: "6.3 Mole Concept and Stoichiometric Calculations" }
            ]
          }
        ]
      },
      {
        id: "biology",
        name: "Biology",
        icon: "Dna",
        units: [
          {
            id: "u1",
            name: "Unit 1: Introduction to Biology",
            subtopics: [
              { id: "s1", name: "1.1 Definition of Biology" },
              { id: "s2", name: "1.2 Why do we study Biology?" },
              { id: "s3", name: "1.3 The Scientific Method" },
              { id: "s4", name: "1.4 Tools of a Biologist (Laboratory & Field tools)" },
              { id: "s5", name: "1.5 The Light Microscope (Parts, Function and Handling)" },
              { id: "s6", name: "1.6 General Laboratory Safety Rules" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Characteristics and Classification of Organisms",
            subtopics: [
              { id: "s7", name: "2.1 Characteristics of living things" },
              { id: "s8", name: "2.2 Taxonomy of living things (Hierarchies & Classification)" },
              { id: "s9", name: "2.3 Relevance of biological classification" },
              { id: "s10", name: "2.4 Linnaean system of nomenclature" },
              { id: "s11", name: "2.5 Common Ethiopian unique animals and plants" },
              { id: "s12", name: "2.6 The five-kingdom system (Monera, Protista, Fungi, Plantae, Animalia)" },
              { id: "s13", name: "2.7 Renowned Taxonomists in Ethiopian history" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Cells",
            subtopics: [
              { id: "s14", name: "3.2 Cell theory concepts" },
              { id: "s15", name: "3.3 Cell structure and organelle function" },
              { id: "s16", name: "3.4 Types of cells (Prokaryotes vs Eukaryotes)" },
              { id: "s17", name: "3.5 Animal and plant cells comparison" },
              { id: "s18", name: "3.6 Observing cells under a light microscope" },
              { id: "s19", name: "3.7 The cell and its environment (Passive & Active transport)" },
              { id: "s20", name: "3.8 Levels of Biological Organization (Cells to Biosphere)" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Reproduction",
            subtopics: [
              { id: "s21", name: "4.1 Introduction to biological reproduction" },
              { id: "s22", name: "4.2 Asexual reproduction" },
              { id: "s23", name: "4.3 Types of asexual reproduction (Fission, Budding, Vegetative propagation)" },
              { id: "s24", name: "4.4 Sexual reproduction in Humans" },
              { id: "s25", name: "4.5 Primary and secondary sexual characteristics" },
              { id: "s26", name: "4.6 Male reproductive structures and function" },
              { id: "s27", name: "4.7 Female reproductive structures and Menstrual cycle" },
              { id: "s28", name: "4.8 Fertilization, pregnancy and birth control methods" },
              { id: "s29", name: "4.9 Sexually transmitted infections (STIs): Transmission & Prevention" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Human Health, Nutrition, and Disease",
            subtopics: [
              { id: "s30", name: "5.1 What is food? definitions" },
              { id: "s31", name: "5.2 Nutrition and Nutrients (Carbs, Proteins, Lipids, Vitamins)" },
              { id: "s32", name: "5.3 Balanced diets planning" },
              { id: "s33", name: "5.4 Deficiency diseases list & Malnutrition core concepts" },
              { id: "s34", name: "5.5 Substance abuse and social/medicinal implications" },
              { id: "s35", name: "5.6 Infectious and noninfectious diseases categories" },
              { id: "s36", name: "5.7 Renowned Nutritionists in Ethiopia" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Ecology",
            subtopics: [
              { id: "s37", name: "6.1 Ecology: terms and Biotic-Abiotic components" },
              { id: "s38", name: "6.2 Ecosystems, Biomes, Succession, and Energy flows" },
              { id: "s39", name: "6.3 Complex Ecological relationships and symbiosis" }
            ]
          }
        ]
      },
      {
        id: "english",
        name: "English",
        icon: "BookOpen",
        units: [
          {
            id: "u1",
            name: "Unit 1: Living in Urban Areas",
            subtopics: [
              { id: "s1", name: "1.1 Listening and Reading Skills" },
              { id: "s2", name: "1.2 Vocabulary Development" },
              { id: "s3", name: "1.3 Grammar: Present Simple vs Present Continuous" },
              { id: "s4", name: "1.4 Speaking and Writing Skills" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Study Skills",
            subtopics: [
              { id: "s5", name: "2.1 Listening and Reading Skills" },
              { id: "s6", name: "2.2 Vocabulary Development" },
              { id: "s7", name: "2.3 Grammar lessons (Adverbs, preferences)" },
              { id: "s8", name: "2.4 Speaking and Writing Skills" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Traffic Accident",
            subtopics: [
              { id: "s9", name: "3.1 Listening and Reading Skills" },
              { id: "s10", name: "3.2 Vocabulary Development" },
              { id: "s11", name: "3.3 Grammar (Past Simple vs Past Continuous)" },
              { id: "s12", name: "3.4 Speaking and Writing Skills" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: National Parks",
            subtopics: [
              { id: "s13", name: "4.1 Listening and Reading Skills" },
              { id: "s14", name: "4.2 Vocabulary Development" },
              { id: "s15", name: "4.3 Grammar (Conditionals, modals)" },
              { id: "s16", name: "4.4 Speaking and Writing Skills" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Horticulture",
            subtopics: [
              { id: "s17", name: "5.1 Listening and Reading Skills" },
              { id: "s18", name: "5.2 Vocabulary and Grammar Elements" },
              { id: "s19", name: "5.3 Speaking and Writing Skills" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Poverty in Ethiopia",
            subtopics: [
              { id: "s20", name: "6.1 Listening and Reading Skills" },
              { id: "s21", name: "6.2 Vocabulary Development" },
              { id: "s22", name: "6.3 Grammar Structures & Speaking" },
              { id: "s23", name: "6.4 Writing Skills" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Community Services",
            subtopics: [
              { id: "s24", name: "7.1 Listening: Community Services" },
              { id: "s25", name: "7.2 Reading Skills and Vocabulary" },
              { id: "s26", name: "7.3 Grammar and Speaking Skills" },
              { id: "s27", name: "7.4 Writing Skills" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Communicable Diseases",
            subtopics: [
              { id: "s28", name: "8.1 Listening and Reading Skills" },
              { id: "s29", name: "8.2 Vocabulary Development" },
              { id: "s30", name: "8.3 Grammar: Passive Voice" },
              { id: "s31", name: "8.4 Speaking and Writing Skills" }
            ]
          }
        ]
      },
      {
        id: "geography",
        name: "Geography",
        icon: "Globe",
        units: [
          {
            id: "u1",
            name: "Unit 1: Landforms of Africa",
            subtopics: [
              { id: "s1", name: "1.1 Overview of the World's Major Landforms" },
              { id: "s2", name: "1.2 Location and Related Features of Africa" },
              { id: "s3", name: "1.3 Major Landforms of Africa" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Climate of Africa",
            subtopics: [
              { id: "s4", name: "2.1 Overview of World Climatic Regions and Types" },
              { id: "s5", name: "2.2 Climate Types and Zones of Africa" },
              { id: "s6", name: "2.3 Benefits of Climate for Life of People of Africa" },
              { id: "s7", name: "2.4 Climate Change & Challenges to Africa's Development" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Natural Resource Base of Africa",
            subtopics: [
              { id: "s8", name: "3.1 Overview of Major Natural Resources of the World" },
              { id: "s9", name: "3.2 Major Drainage and Water Resources in Africa" },
              { id: "s10", name: "3.3 Main Types of Soils and Mineral Resources in Africa" },
              { id: "s11", name: "3.4 Major Vegetation and Wildlife of Africa" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Population of Africa",
            subtopics: [
              { id: "s12", name: "4.1 Overview of World Population Growth and Size" },
              { id: "s13", name: "4.2 Africa's Major Demographic Trends" },
              { id: "s14", name: "4.3 Population Structure, Distribution and Density" },
              { id: "s15", name: "4.4 Urban and Rural Settlement Patterns in Africa" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Major Economic and Cultural Activities of Africa",
            subtopics: [
              { id: "s16", name: "5.1 Employment Structure in the World" },
              { id: "s17", name: "5.2 Major Economic Activities in Africa" },
              { id: "s18", name: "5.3 Possible Solutions to Unemployment" },
              { id: "s19", name: "5.4 Africa's Agenda 2063 & Sustainable Development Goals (SDGs)" },
              { id: "s20", name: "5.5 Linguistic and Religious Diversity in Africa" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Human – Natural Environment Interactions",
            subtopics: [
              { id: "s21", name: "6.1 Overview of Global Population Change" },
              { id: "s22", name: "6.2 Human-environment Relationship" },
              { id: "s23", name: "6.3 Indigenous Knowledge in Material/Resource Conservation" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Geographic Issues and Public Concerns in Africa",
            subtopics: [
              { id: "s24", name: "7.1 Unplanned Urbanization and Migration Impacts" },
              { id: "s25", name: "7.2 Coastal Pollution in Africa issues" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Geospatial Information and Data Processing",
            subtopics: [
              { id: "s26", name: "8.1 Basic Concepts of Geospatial Information" },
              { id: "s27", name: "8.2 Sources and Tools of Geographic Data" },
              { id: "s28", name: "8.3 Geographic Data Representations" },
              { id: "s29", name: "8.4 Advances in Mapmaking & the Birth of GIS" },
              { id: "s30", name: "8.5 Making and Interpretation of Graphs, Charts and Diagrams" }
            ]
          }
        ]
      },
      {
        id: "history",
        name: "History",
        icon: "History",
        units: [
          {
            id: "u1",
            name: "Unit 1: The Discipline of History and Human Evolution",
            subtopics: [
              { id: "s1", name: "1.1 Meaning of Prehistory and History" },
              { id: "s2", name: "1.2 The Discipline of History (Importance, Historiography, Dating)" },
              { id: "s3", name: "1.3 The Evolution of Human Beings (Theories & Africa)" },
              { id: "s4", name: "1.4 The Stone Age tool technologies" },
              { id: "s5", name: "1.5 The Emergence of States" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Ancient World Civilizations up to c. 500 AD",
            subtopics: [
              { id: "s6", name: "2.1 Ancient Civilizations of Africa (Egypt, Nubia)" },
              { id: "s7", name: "2.2 Civilizations in Asia (Mesopotamia, Persia, India, China)" },
              { id: "s8", name: "2.3 Ancient Civilization of Latin America (Maya, Inca, Aztecs)" },
              { id: "s9", name: "2.4 Civilizations in Europe (Ancient Greece and Rome)" },
              { id: "s10", name: "2.5 Rise and Spread of Christianity" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Peoples and States in Ethiopia and the Horn to the end of 13th C.",
            subtopics: [
              { id: "s11", name: "3.1 Languages, Religions and Settlement Patterns" },
              { id: "s12", name: "3.2 Pre-Aksumite States and Geographical Setting" },
              { id: "s13", name: "3.3 Aksumite Kingdom political economy" },
              { id: "s14", name: "3.4 Zagwe Dynasty and Sultanate of Shewa" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: The Middle Ages and Early Modern World, C. 500 to 1750s",
            subtopics: [
              { id: "s15", name: "4.1 The Middle Ages in Europe (Feudalism, Byzantine)" },
              { id: "s16", name: "4.2 The Middle Ages in Asia (Islam and Ottoman Empire)" },
              { id: "s17", name: "4.3 Development of Early Capitalism & Age of Exploration" },
              { id: "s18", name: "4.4 The Renaissance and the Reformation" },
              { id: "s19", name: "4.5 The Industrial Revolution origins" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Peoples and States of Africa to 1500",
            subtopics: [
              { id: "s20", name: "5.1 Languages and Peoples of Africa" },
              { id: "s21", name: "5.2 States of North, West, Central, and Southern Africa" },
              { id: "s22", name: "5.3 Africa's Intra/Inter-continental Relations and Trades" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Africa and the Outside World 1500-1880s",
            subtopics: [
              { id: "s23", name: "6.1 Contact with the Outside World & Slavery" },
              { id: "s24", name: "6.2 The Legitimate Trade & White Settlement in South Africa" },
              { id: "s25", name: "6.3 European Explorers and Missionaries" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: States, Principalities, Population Movements & Interactions (13th-16th C.)",
            subtopics: [
              { id: "s26", name: "7.1 Solomonic Dynasty, Muslim Principalities & Adal Wars" },
              { id: "s27", name: "7.2 Central and Southern states political conditions" },
              { id: "s28", name: "7.3 Oromo Population Movements, Gadaa, Moggasa, Guddifacha" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Political, Social and Economic Processes in Ethiopia (Mid-16th-Mid-19th C.)",
            subtopics: [
              { id: "s29", name: "8.1 Regional Peoples & States (Southern, Western, Eastern regions)" },
              { id: "s30", name: "8.2 Gondarine Period & Zemene-Mesafint (Era of Warlords)" },
              { id: "s31", name: "8.3 The Yejju Dynasty & scale of Kingdom of Shewa" }
            ]
          },
          {
            id: "u9",
            name: "Unit 9: The Age of Revolutions 1750s to 1815",
            subtopics: [
              { id: "s32", name: "9.1 Industrial Capitalism effects in Europe" },
              { id: "s33", name: "9.2 The French Revolution and Napoleonic Era" },
              { id: "s34", name: "9.3 American War of Independence & Congress of Vienna" }
            ]
          }
        ]
      },
      {
        id: "economics",
        name: "Economics",
        icon: "TrendingUp",
        units: [
          {
            id: "u1",
            name: "Unit 1: Introducing Economics",
            subtopics: [
              { id: "s1", name: "1.1 Meaning of Economics" },
              { id: "s2", name: "1.2 Branches of Economics" },
              { id: "s3", name: "1.3 Methods and Approaches of Studying Economics" },
              { id: "s4", name: "1.4 Decision Making Units" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Basic Economic Problems and Economic Systems",
            subtopics: [
              { id: "s5", name: "2.1 Scarcity, Choice, and Opportunity Cost" },
              { id: "s6", name: "2.2 Three Central Problems of Economies" },
              { id: "s7", name: "2.3 Types of Economic Systems" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Economic Resources and Markets",
            subtopics: [
              { id: "s8", name: "3.1 Types of Resources and Factor Payments" },
              { id: "s9", name: "3.2 Renewable and Non-renewable Resources" },
              { id: "s10", name: "3.3 Types of Markets in the economy" },
              { id: "s11", name: "3.4 Circular Flow of Economic Activities" },
              { id: "s12", name: "3.5 Land as an Economic Resource in Ethiopia" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Introduction to Demand and Supply",
            subtopics: [
              { id: "s13", name: "4.1 Concept of Demand, Law of Demand" },
              { id: "s14", name: "4.2 Concept of Supply, Law of Supply" },
              { id: "s15", name: "4.3 Market Equilibrium price and quantity" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Introduction to Production and Cost",
            subtopics: [
              { id: "s16", name: "5.1 Production: Inputs and Outputs definitions" },
              { id: "s17", name: "5.2 Periods of Production (Short vs Long run)" },
              { id: "s18", name: "5.3 Costs of Production curves and counts" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Introduction to Money",
            subtopics: [
              { id: "s19", name: "6.1 Definition and Evolution of Money" },
              { id: "s20", name: "6.2 Key Functions of Money" },
              { id: "s21", name: "6.3 Demand and Supply of Money in system" },
              { id: "s22", name: "6.4 Money and Electronic Money (e-money)" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Introduction to Macroeconomics",
            subtopics: [
              { id: "s23", name: "7.1 Definition of Macroeconomic Variables" },
              { id: "s24", name: "7.2 Macroeconomic Goals & core National Concerns" },
              { id: "s25", name: "7.3 Major Macroeconomic Problems (Inflation, Unemployment)" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Basic Entrepreneurship",
            subtopics: [
              { id: "s26", name: "8.1 Enterprise, Entrepreneur and Entrepreneurship definitions" },
              { id: "s27", name: "8.2 Creativity and Innovation in Solving Local Problems" },
              { id: "s28", name: "8.3 Entrepreneurial Attitudes, Behaviours, and Mind-sets" },
              { id: "s29", name: "8.4 Windows of Opportunities, Teamwork and Diversity" },
              { id: "s30", name: "8.5 Finance and Core Promotion of Entrepreneurship" }
            ]
          }
        ]
      },
      {
        id: "civics",
        name: "Citizenship Education",
        icon: "Users",
        units: [
          {
            id: "u1",
            name: "Unit 1: Ethical Values",
            subtopics: [
              { id: "s1", name: "1.1 The meaning of Ethics" },
              { id: "s2", name: "1.2 Major Ethical Values (Trust, Integrity, Justice)" },
              { id: "s3", name: "1.3 Importance of Ethical Values for Citizens" },
              { id: "s4", name: "1.4 Aspects of Applied Ethics" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: The Culture of Using Digital Technology",
            subtopics: [
              { id: "s5", name: "2.1 The Concept & Purpose of Digital Technology" },
              { id: "s6", name: "2.2 Culture and Digital Technology usage" },
              { id: "s7", name: "2.3 Codes of Conduct for using Digital Tools" },
              { id: "s8", name: "2.4 Effective Communication & Challenges of Digital Media" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Constitution and Constitutionalism",
            subtopics: [
              { id: "s9", name: "3.1 Understanding Constitution" },
              { id: "s10", name: "3.2 Understanding Constitutionalism" },
              { id: "s11", name: "3.3 Constitutional historical experiences of Ethiopia" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Understanding Indigenous Knowledge",
            subtopics: [
              { id: "s12", name: "4.1 The Concept of Indigenous Knowledge" },
              { id: "s13", name: "4.2 Role of Indigenous Knowledge in producing Responsible Citizens" },
              { id: "s14", name: "4.3 Role of Indigenous Social Institutions in solving community problems" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Multiculturalism in Ethiopia",
            subtopics: [
              { id: "s15", name: "5.1 Understanding Culture and Multiculturalism concepts" },
              { id: "s16", name: "5.2 Key Pillars of Multicultural societies" },
              { id: "s17", name: "5.3 Major forms of diversity demonstrating multiculturalism in Ethiopia" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: National Unity through Diversity",
            subtopics: [
              { id: "s18", name: "6.1 Unity in Diversity concepts and pillars" },
              { id: "s19", name: "6.2 Elements of Diversity" },
              { id: "s20", name: "6.3 Accommodation of Diversity and management in Ethiopia" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Problem Solving Skills",
            subtopics: [
              { id: "s21", name: "7.1 Meaning and importance of Problem-Solving skills" },
              { id: "s22", name: "7.2 Characteristics of a Good Problem Solver & Skills Improvement" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Ethiopia's Foreign Relations in East Africa",
            subtopics: [
              { id: "s23", name: "8.1 Concepts and Roles of Foreign Relations" },
              { id: "s24", name: "8.2 Core Instruments of Foreign Policy" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "10",
    name: "Grade 10",
    subjects: [
      {
        id: "maths",
        name: "Mathematics",
        icon: "Calculator",
        units: [
          {
            id: "u1",
            name: "Unit 1: Relations and Functions",
            subtopics: [
              { id: "s1", name: "1.1 Relations" },
              { id: "s2", name: "1.2 Functions" },
              { id: "s3", name: "1.3 Applications of Relations and Functions" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Polynomial Functions",
            subtopics: [
              { id: "s4", name: "2.1 Definition of Polynomial Function" },
              { id: "s5", name: "2.2 Operations on polynomial functions" },
              { id: "s6", name: "2.3 Theorem on polynomial functions" },
              { id: "s7", name: "2.4 Zeros of polynomial functions" },
              { id: "s8", name: "2.5 Graphs of polynomial functions" },
              { id: "s9", name: "2.6 Applications" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Exponential and Logarithmic Functions",
            subtopics: [
              { id: "s10", name: "3.1 Exponents and Logarithms" },
              { id: "s11", name: "3.2 The Exponential Functions and Their Graphs" },
              { id: "s12", name: "3.3 The Logarithmic Functions and Their Graphs" },
              { id: "s13", name: "3.4 Solving Exponential and Logarithmic Equations" },
              { id: "s14", name: "3.5 Relation between Exponential and Logarithmic functions" },
              { id: "s15", name: "3.6 Applications" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Trigonometric Functions",
            subtopics: [
              { id: "s16", name: "4.1 Radian Measure of angle" },
              { id: "s17", name: "4.2 Basic Trigonometric Function" },
              { id: "s18", name: "4.3 Trigonometric Identities & Equation" },
              { id: "s19", name: "4.4 Application" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Circles",
            subtopics: [
              { id: "s20", name: "5.1 Symmetrical properties of circles" },
              { id: "s21", name: "5.2 Angle properties of circles" },
              { id: "s22", name: "5.3 Arc length, perimeters and areas of segments and sectors" },
              { id: "s23", name: "5.4 Theorems on angles and arcs determined by lines intersecting inside, on and outside a circle" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Solid Figures",
            subtopics: [
              { id: "s24", name: "6.1 Revision of Cylinders and Prisms" },
              { id: "s25", name: "6.2 Pyramids, cones and Spheres" },
              { id: "s26", name: "6.3 Frustum of pyramids and cones" },
              { id: "s27", name: "6.4 Surface areas and volumes of composed solids" },
              { id: "s28", name: "6.5 Applications" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Coordinate Geometry",
            subtopics: [
              { id: "s29", name: "7.1 Distance between two points" },
              { id: "s30", name: "7.2 Division of a line segment" },
              { id: "s31", name: "7.3 Equation of a line" },
              { id: "s32", name: "7.4 Slopes of parallel and perpendicular lines" },
              { id: "s33", name: "7.5 Equation of a Circle" },
              { id: "s34", name: "7.6 Applications" }
            ]
          }
        ]
      },
      {
        id: "physics",
        name: "Physics",
        icon: "Zap",
        units: [
          {
            id: "u1",
            name: "Unit 1: Vector Quantities",
            subtopics: [
              { id: "s1", name: "1.1 Scalars and Vectors" },
              { id: "s2", name: "1.2 Vector representations" },
              { id: "s3", name: "1.3 Vector addition and subtraction" },
              { id: "s4", name: "1.4 Graphical method of vector addition" },
              { id: "s5", name: "1.5 Vector resolution" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Uniformly Accelerated Motion",
            subtopics: [
              { id: "s6", name: "2.1 Position and Displacement" },
              { id: "s7", name: "2.2 Average velocity and instantaneous velocity" },
              { id: "s8", name: "2.3 Acceleration" },
              { id: "s9", name: "2.4 Equations of motion with constant acceleration" },
              { id: "s10", name: "2.5 Graphical representation of uniformly accelerated motion" },
              { id: "s11", name: "2.6 Relative velocity in one dimension" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Elasticity and Static Equilibrium of Rigid Body",
            subtopics: [
              { id: "s12", name: "3.1 Elasticity and plasticity" },
              { id: "s13", name: "3.2 Density and specific gravity" },
              { id: "s14", name: "3.3 Stress and Strain" },
              { id: "s15", name: "3.4 The Young Modulus" },
              { id: "s16", name: "3.5 Static equilibrium" },
              { id: "s17", name: "3.5.1 First condition of equilibrium" },
              { id: "s18", name: "3.5.2 Second condition of equilibrium" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Static and Current Electricity",
            subtopics: [
              { id: "s19", name: "4.1 Charges in Nature" },
              { id: "s20", name: "4.2 Methods of Charging a Body" },
              { id: "s21", name: "4.3 The electroscope" },
              { id: "s22", name: "4.4 Electrical Discharge" },
              { id: "s23", name: "4.5 Coulomb's law of electrostatics" },
              { id: "s24", name: "4.6 The electric field" },
              { id: "s25", name: "4.7 Electric circuits" },
              { id: "s26", name: "4.8 Current, Voltage, and Ohm's Law" },
              { id: "s27", name: "4.9 Combination of resistors in a circuit" },
              { id: "s28", name: "4.10 Voltmeter and ammeter connection in a circuit" },
              { id: "s29", name: "4.11 Electrical safety in general and local context" },
              { id: "s30", name: "4.12 Electric projects" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Magnetism",
            subtopics: [
              { id: "s31", name: "5.1 Magnet" },
              { id: "s32", name: "5.2 Magnetic Field" },
              { id: "s33", name: "5.3 The Earth's magnetic field and the compass" },
              { id: "s34", name: "5.4 Magnetic field of a current-carrying conductor" },
              { id: "s35", name: "5.5 Magnetic force on a moving charge placed in a uniform magnetic field" },
              { id: "s36", name: "5.6 Magnetic force on a current-carrying wire" },
              { id: "s37", name: "5.7 Magnetic force between two parallel current-carrying wires" },
              { id: "s38", name: "5.8 Applications of magnetism" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Electromagnetic Waves and Geometrical Optics",
            subtopics: [
              { id: "s39", name: "6.1 Electromagnetic (EM) waves" },
              { id: "s40", name: "6.2 EM Spectrum" },
              { id: "s41", name: "6.3 Light as a wave" },
              { id: "s42", name: "6.4 Laws of reflection & refraction" },
              { id: "s43", name: "6.5 Mirrors and lenses" },
              { id: "s44", name: "6.6 Human eye and optical instruments" },
              { id: "s45", name: "6.7 Primary colors of light and human vision" },
              { id: "s46", name: "6.8 Color addition of light" },
              { id: "s47", name: "6.9 Color subtraction of light using filters" }
            ]
          }
        ]
      },
      {
        id: "chemistry",
        name: "Chemistry",
        icon: "FlaskConical",
        units: [
          {
            id: "u1",
            name: "Unit 1: Chemical Reactions and Stoichiometry",
            subtopics: [
              { id: "s1", name: "1.1 Introduction" },
              { id: "s2", name: "1.2 Chemical Equations" },
              { id: "s3", name: "1.3 Types of Chemical Reactions" },
              { id: "s4", name: "1.4 Oxidation and Reduction Reactions" },
              { id: "s5", name: "1.5 Molecular and Formula Mass, Mole concept & Formulas" },
              { id: "s6", name: "1.6 Stoichiometry" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Solutions",
            subtopics: [
              { id: "s7", name: "2.1 Heterogeneous and Homogeneous Mixtures" },
              { id: "s8", name: "2.2 The Solution Process" },
              { id: "s9", name: "2.3 Solubility as an Equilibrium Process" },
              { id: "s10", name: "2.4 Ways of Expressing Concentration of Solution" },
              { id: "s11", name: "2.5 Preparation of Solutions" },
              { id: "s12", name: "2.6 Solution Stoichiometry" },
              { id: "s13", name: "2.7 Describing Reactions in Solution" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Important Inorganic Compounds",
            subtopics: [
              { id: "s14", name: "3.1 Introduction" },
              { id: "s15", name: "3.2 Oxides" },
              { id: "s16", name: "3.3 Acids" },
              { id: "s17", name: "3.4 Bases" },
              { id: "s18", name: "3.5 Salts" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Energy Changes and Electrochemistry",
            subtopics: [
              { id: "s19", name: "4.1 Introduction" },
              { id: "s20", name: "4.2 Energy Changes in Electrochemistry" },
              { id: "s21", name: "4.3 Electrochemical Cells" },
              { id: "s22", name: "4.4 Electrolysis" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Metals and Nonmetals",
            subtopics: [
              { id: "s23", name: "5.1 Introduction" },
              { id: "s24", name: "5.2 General Properties of Metals and Production of Some Metals" },
              { id: "s25", name: "5.3 Production of Some Important Nonmetals" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Hydrocarbons and Their Natural Sources",
            subtopics: [
              { id: "s26", name: "6.1 Introduction" },
              { id: "s27", name: "6.2 Saturated Hydrocarbons: Alkanes (CnH2n+2)" },
              { id: "s28", name: "6.3 Unsaturated Hydrocarbons: Alkenes, Alkynes and Aromatic" },
              { id: "s29", name: "6.4 Aromatic Hydrocarbons: Benzene" },
              { id: "s30", name: "6.5 Natural Sources of Hydrocarbons" }
            ]
          }
        ]
      },
      {
        id: "biology",
        name: "Biology",
        icon: "Dna",
        units: [
          {
            id: "u1",
            name: "Unit 1: Sub-fields of Biology",
            subtopics: [
              { id: "s1", name: "1.1 Sub-fields of Biology" },
              { id: "s2", name: "1.2 Pure and applied fields of biology" },
              { id: "s3", name: "1.3 Major discoveries that revolutionized biology" },
              { id: "s4", name: "1.4 Contributions of discoveries to society & environment" },
              { id: "s5", name: "1.5 Ethiopian biologists and their contributions" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Plants",
            subtopics: [
              { id: "s6", name: "2.1 Characteristics of plants" },
              { id: "s7", name: "2.2 Flowering and non-flowering plants" },
              { id: "s8", name: "2.3 Structure and function of plant parts" },
              { id: "s9", name: "2.4 Reproduction in plants" },
              { id: "s10", name: "2.5 Seeds" },
              { id: "s11", name: "2.6 Seed dispersal and germination" },
              { id: "s12", name: "2.7 Photosynthesis" },
              { id: "s13", name: "2.8 Transport in plants" },
              { id: "s14", name: "2.9 Response in plants" },
              { id: "s15", name: "2.10 Medicinal plants" },
              { id: "s16", name: "2.11 Renowned Ethiopian Botanist" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Biochemical Molecules",
            subtopics: [
              { id: "s17", name: "3.1 Biochemical Molecules Overview" },
              { id: "s18", name: "3.1.1 Inorganic molecule: Water" },
              { id: "s19", name: "3.1.2 Inorganic ions" },
              { id: "s20", name: "3.1.3 Organic molecules" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Cell Reproduction",
            subtopics: [
              { id: "s21", name: "4.1 Cell cycle" },
              { id: "s22", name: "4.2 The Cell division (Mitosis and Meiosis)" },
              { id: "s23", name: "4.3 Renowned Ethiopian Geneticist" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Human Biology",
            subtopics: [
              { id: "s24", name: "5.1 The Digestive System" },
              { id: "s25", name: "5.2 The circulatory and lymphatic system" },
              { id: "s26", name: "5.3 The breathing system" },
              { id: "s27", name: "5.4 The Human Urinary system" },
              { id: "s28", name: "5.5 The immune system" },
              { id: "s29", name: "5.6 Renowned Physicians in Ethiopia" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Ecological Interaction",
            subtopics: [
              { id: "s30", name: "6.1 Trophic Levels: Food chains and webs" },
              { id: "s31", name: "6.1.2 Flow of energy and matter through ecosystem" },
              { id: "s32", name: "6.2 Cycling of Materials in an Ecosystem" }
            ]
          }
        ]
      },
      {
        id: "english",
        name: "English",
        icon: "BookOpen",
        units: [
          {
            id: "u1",
            name: "Unit 1: Population Growth",
            subtopics: [
              { id: "s1", name: "1.1 Listening: Population Explosion" },
              { id: "s2", name: "1.2 Speaking" },
              { id: "s3", name: "1.3 Reading: Population Growth" },
              { id: "s4", name: "1.4 Grammar" },
              { id: "s5", name: "1.5 Writing" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Travel Behaviors",
            subtopics: [
              { id: "s6", name: "2.1 Listening: Travelling and Places" },
              { id: "s7", name: "2.2 Speaking" },
              { id: "s8", name: "2.3 Reading: Travel Behaviors" },
              { id: "s9", name: "2.4 Grammar" },
              { id: "s10", name: "2.5 Writing" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Punctuality",
            subtopics: [
              { id: "s11", name: "3.1 Listening: Punctual Students" },
              { id: "s12", name: "3.2 Speaking" },
              { id: "s13", name: "3.3 Reading: Punctuality" },
              { id: "s14", name: "3.4 Vocabulary" },
              { id: "s15", name: "3.5 Grammar" },
              { id: "s16", name: "3.6 Writing" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Tourist Attractions",
            subtopics: [
              { id: "s17", name: "4.1 Listening: Giving Information for Tourists" },
              { id: "s18", name: "4.2 Speaking" },
              { id: "s19", name: "4.3 Reading: Tourism" },
              { id: "s20", name: "4.4 Vocabulary" },
              { id: "s21", name: "4.5 Grammar" },
              { id: "s22", name: "4.6 Writing" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Honey Processing",
            subtopics: [
              { id: "s23", name: "5.1 Listening: Honey Processing" },
              { id: "s24", name: "5.2 Speaking" },
              { id: "s25", name: "5.3 Reading: The Importance of Honey" },
              { id: "s26", name: "5.4 Vocabulary" },
              { id: "s27", name: "5.5 Grammar" },
              { id: "s28", name: "5.6 Writing" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Migration",
            subtopics: [
              { id: "s29", name: "6.1 Listening" },
              { id: "s30", name: "6.2 Speaking" },
              { id: "s31", name: "6.3 Reading: Migration in Ethiopia" },
              { id: "s32", name: "6.4 Vocabulary" },
              { id: "s33", name: "6.5 Grammar: Tense" },
              { id: "s34", name: "6.6 Writing" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Branding Ethiopia and National Identity",
            subtopics: [
              { id: "s35", name: "7.1 Listening" },
              { id: "s36", name: "7.2 Speaking" },
              { id: "s37", name: "7.3 Reading" },
              { id: "s38", name: "7.4 Vocabulary" },
              { id: "s39", name: "7.5 Grammar" },
              { id: "s40", name: "7.6 Writing" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: The Healing Power of Plants",
            subtopics: [
              { id: "s41", name: "8.1 Listening" },
              { id: "s42", name: "8.2 Speaking" },
              { id: "s43", name: "8.3 Reading: A Traditional Medicine, Moringa Olifera" },
              { id: "s44", name: "8.4 Vocabulary" },
              { id: "s45", name: "8.5 Grammar" },
              { id: "s46", name: "8.6 Writing" }
            ]
          },
          {
            id: "u9",
            name: "Unit 9: Multilingualism",
            subtopics: [
              { id: "s47", name: "9.1 Listening: Multilingualism" },
              { id: "s48", name: "9.2 Speaking" },
              { id: "s49", name: "9.3 Reading: Cognitive Benefits of being Multilingual" },
              { id: "s50", name: "9.4 Writing: Letters Writing" },
              { id: "s51", name: "9.5 Grammar" },
              { id: "s52", name: "9.6 Vocabulary" }
            ]
          },
          {
            id: "u10",
            name: "Unit 10: Digital Vs Satellite Television",
            subtopics: [
              { id: "s53", name: "10.1 Listening" },
              { id: "s54", name: "10.2 Speaking" },
              { id: "s55", name: "10.3 Reading" },
              { id: "s56", name: "10.4 Vocabulary" },
              { id: "s57", name: "10.5 Grammar" },
              { id: "s58", name: "10.6 Writing" }
            ]
          }
        ]
      },
      {
        id: "geography",
        name: "Geography",
        icon: "Globe",
        units: [
          {
            id: "u1",
            name: "Unit 1: Landforms of Africa",
            subtopics: [
              { id: "s1", name: "1.1 Overview of the World's Major Landforms" },
              { id: "s2", name: "1.2 Location and Related Features of Africa" },
              { id: "s3", name: "1.3 Major Landforms of Africa" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Climate of Africa",
            subtopics: [
              { id: "s4", name: "2.1 Overview of World Climatic Regions and Types" },
              { id: "s5", name: "2.2 Climate Types and Zones of Africa" },
              { id: "s6", name: "2.3 Benefits of Climate for Life of People of Africa" },
              { id: "s7", name: "2.4 Climate Change and Challenges to Africa's Development Vision" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Natural Resource Base of Africa",
            subtopics: [
              { id: "s8", name: "3.1 Overview of Major Natural Resources of the World" },
              { id: "s9", name: "3.2 Major Drainage and Water Resources in Africa" },
              { id: "s10", name: "3.3 Main Types of Soils and Mineral Resources in Africa" },
              { id: "s11", name: "3.4 Major Vegetation and Wildlife of Africa" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Population of Africa",
            subtopics: [
              { id: "s12", name: "4.1 Overview of World Population Growth and Size" },
              { id: "s13", name: "4.2 Africa's Major Demographic Trends" },
              { id: "s14", name: "4.3 Population Structure" },
              { id: "s15", name: "4.4 Distribution and Density of Africa's Population" },
              { id: "s16", name: "4.5 Urban and Rural Settlement Patterns in Africa" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Major Economic and Cultural Activities of Africa",
            subtopics: [
              { id: "s17", name: "5.1 Overview of Employment Structure in the World" },
              { id: "s18", name: "5.2 Major Economic Activities in Africa" },
              { id: "s19", name: "5.3 Possible Solutions to the Problem of Unemployment" },
              { id: "s20", name: "5.4 Africa's Agenda 2063 and Its Implications" },
              { id: "s21", name: "5.5 Agenda 2063 Vis-À-Vis Sustainable Development Goals (SDGs)" },
              { id: "s22", name: "5.6 Linguistic and Religious Diversity in Africa" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Human – Natural Environment Interactions",
            subtopics: [
              { id: "s23", name: "6.1 Overview of Global Population Change" },
              { id: "s24", name: "6.2 Human-environment Relationship" },
              { id: "s25", name: "6.3 Indigenous Knowledge in Conservation of Natural Resources" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Geographic Issues and Public Concerns in Africa",
            subtopics: [
              { id: "s26", name: "7.1 Unplanned Urbanization" },
              { id: "s27", name: "7.2 Migration – Factors and Impacts on Africa" },
              { id: "s28", name: "7.3 Coastal Pollution in Africa" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Geospatial Information and Data Processing",
            subtopics: [
              { id: "s29", name: "8.1 Basic Concepts of Geospatial Information" },
              { id: "s30", name: "8.2 Sources and Tools of Geographic Data" },
              { id: "s31", name: "8.3 Geographic Data Representations" },
              { id: "s32", name: "8.4 Advances in Mapmaking and Birth of GIS" },
              { id: "s33", name: "8.5 Making and Interpretation of Graphs, Charts and Diagrams" }
            ]
          }
        ]
      },
      {
        id: "history",
        name: "History",
        icon: "History",
        units: [
          {
            id: "u1",
            name: "Unit 1: Development of Capitalism and Nationalism 1815-1914",
            subtopics: [
              { id: "s1", name: "1.1 Features of Capitalism" },
              { id: "s2", name: "1.2 Features of Nationalism and Formation of Nation States" },
              { id: "s3", name: "1.2.1 Unification of Italy" },
              { id: "s4", name: "1.2.2 Unification of Germany" },
              { id: "s5", name: "1.2.3 The American Civil War" },
              { id: "s6", name: "1.2.4 Nationalism and the 'Eastern Question'" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Africa & the Colonial Experience (1880s - 1960s)",
            subtopics: [
              { id: "s7", name: "2.1 General Background to Colonialism" },
              { id: "s8", name: "2.2 The Motives of European Colonialism" },
              { id: "s9", name: "2.3 Scramble for Africa and the Berlin Conference" },
              { id: "s10", name: "2.3.1 Berlin Conference: 1884-1885" },
              { id: "s11", name: "2.4 Colonial Policies and Administration" },
              { id: "s12", name: "2.4.1 Company Rule" },
              { id: "s13", name: "2.4.2 Direct Rule and Assimilation" },
              { id: "s14", name: "2.4.3 Indirect Rule" },
              { id: "s15", name: "2.4.4 Settlers Rule" },
              { id: "s16", name: "2.5 Early African Resistance Movements Against Colonialism" },
              { id: "s17", name: "2.5.1 Resistance in West Africa" },
              { id: "s18", name: "2.5.2 Resistances in East and South Africa" },
              { id: "s19", name: "2.6 Impacts of Colonial Rule on Africa" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Social, Economic & Political Developments in Ethiopia mid 19thc to 1941",
            subtopics: [
              { id: "s20", name: "3.1 Long Distance Trade in 19th Century & Cottage Industry" },
              { id: "s21", name: "3.2 The Making of Modern Ethiopian State 1855-1913" },
              { id: "s22", name: "3.3 External Aggressions and Unity in Defense of National Sovereignty" },
              { id: "s23", name: "3.4 Power Struggle among the Ruling Elites, 1906 - 1935" },
              { id: "s24", name: "3.5 Fascist Italian Aggression and Patriotic Resistance" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Society and Politics in the Age of World Wars 1914-1945",
            subtopics: [
              { id: "s25", name: "4.1 The First World War: Causes and Consequence" },
              { id: "s26", name: "4.2 The October 1917 Russian Revolution" },
              { id: "s27", name: "4.3 The League of Nations" },
              { id: "s28", name: "4.4 The Worldwide Economic Crisis" },
              { id: "s29", name: "4.5 Rise of Fascism in Italy, Nazism in Germany & Militarism in Japan" },
              { id: "s30", name: "4.6 The Second World War: 1939-45" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Global and Regional Developments Since 1945",
            subtopics: [
              { id: "s31", name: "5.1 The United Nations Organization" },
              { id: "s32", name: "5.2 Rise of Superpowers and Cold War" },
              { id: "s33", name: "5.3 Situations in Asia During the Cold War" },
              { id: "s34", name: "5.4 Non-Aligned Movement /NAM/" },
              { id: "s35", name: "5.5 The Arab-Israeli Conflict" },
              { id: "s36", name: "5.6 The Collapse of the Soviet Union" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Ethiopia: Internal Developments and External Influences 1941 to 1991",
            subtopics: [
              { id: "s37", name: "6.1 Administrative Reforms & Socio-Economic Conditions" },
              { id: "s38", name: "6.2 Early Opposition Movements against Imperial Rule" },
              { id: "s39", name: "6.3 The Ethiopian Revolution and Fall of Monarchy" },
              { id: "s40", name: "6.4 The Ethio-Somalia War, question of Eritrea, and Fall of Derg" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Africa Since 1960",
            subtopics: [
              { id: "s41", name: "7.1 Rise of Independent States in Africa" },
              { id: "s42", name: "7.2 Struggle for Economic Independence" },
              { id: "s43", name: "7.3 Major Issues in Contemporary Africa" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Post- 1991 Developments in Ethiopia",
            subtopics: [
              { id: "s44", name: "8.1 Transitional Government of Ethiopia (TGE) & 1995 Constitution" },
              { id: "s45", name: "8.2 Hydro-Political History of Nile (Abay) Basin & Development Issues" }
            ]
          },
          {
            id: "u9",
            name: "Unit 9: Indigenous Knowledge and Heritages of Ethiopia",
            subtopics: [
              { id: "s46", name: "9.1 Indigenous Knowledge Values and characteristics" },
              { id: "s47", name: "9.2 Heritages of Ethiopia (Meaning, Types, and Values)" }
            ]
          }
        ]
      },
      {
        id: "economics",
        name: "Economics",
        icon: "TrendingUp",
        units: [
          {
            id: "u1",
            name: "Unit 1: Theory of Consumer Behaviour",
            subtopics: [
              { id: "s1", name: "1.1 The Concept of Utility" },
              { id: "s2", name: "1.2 The Cardinal Utility Theory" },
              { id: "s3", name: "1.3 The Consumer Maximization Problem" },
              { id: "s4", name: "1.4 Introduction to the Ordinal Utility Theory" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Theories of Demand and Supply",
            subtopics: [
              { id: "s5", name: "2.1 Theory of Demand" },
              { id: "s6", name: "2.2 Theory of Supply" },
              { id: "s7", name: "2.3 Market Equilibrium" },
              { id: "s8", name: "2.4 Elasticities of Demand and Supply" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Theories of Production and Cost",
            subtopics: [
              { id: "s9", name: "3.1 Theory of Production" },
              { id: "s10", name: "3.2 Theory of Cost" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Market Structure",
            subtopics: [
              { id: "s11", name: "4.1 Perfectly Competitive Markets" },
              { id: "s12", name: "4.2 Pure Monopoly Market" },
              { id: "s13", name: "4.3 Monopolistically Competitive Market" },
              { id: "s14", name: "4.4 Oligopoly Market" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Banking and Finance",
            subtopics: [
              { id: "s15", name: "5.1 Introduction to Financial Intermediaries" },
              { id: "s16", name: "5.2 Introduction to Financial Markets" },
              { id: "s17", name: "5.3 Introduction to Financial Institutions" },
              { id: "s18", name: "5.4 Historical Development of Banks in Ethiopia" },
              { id: "s19", name: "5.5 Micro-finance Institutions" },
              { id: "s20", name: "5.6 Electronic Banking (e-banking)" },
              { id: "s21", name: "5.7 Indigenous Financial Institutions" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Economic Growth",
            subtopics: [
              { id: "s22", name: "6.1 Review of Macroeconomic Variables" },
              { id: "s23", name: "6.2 Definition and Measurement of Economic Growth" },
              { id: "s24", name: "6.3 Sources of Economic Growth" },
              { id: "s25", name: "6.4 Weaknesses of Using GDP / GDP Per Capita" },
              { id: "s26", name: "6.5 The Business Cycle and Its Phases" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: The Ethiopian Economy",
            subtopics: [
              { id: "s27", name: "7.1 Components of Gross Domestic Product (GDP)" },
              { id: "s28", name: "7.2 Real GDP Vs Nominal GDP" },
              { id: "s29", name: "7.3 The Agricultural Sector in the Ethiopian Economy" },
              { id: "s30", name: "7.4 The Industrial Sector in the Ethiopian Economy" },
              { id: "s31", name: "7.5 The Service Sector in the Ethiopian Economy" },
              { id: "s32", name: "7.6 Agriculture versus Industrial Development" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Business Startups and Innovation",
            subtopics: [
              { id: "s33", name: "8.1 Innovation" },
              { id: "s34", name: "8.2 Business Startups" },
              { id: "s35", name: "8.3 Types of Businesses Organizations" },
              { id: "s36", name: "8.4 Business Feasibility Analysis" }
            ]
          }
        ]
      },
      {
        id: "civics",
        name: "Citizenship Education",
        icon: "Users",
        units: [
          {
            id: "u1",
            name: "Unit 1: Democracy and Democratization",
            subtopics: [
              { id: "s1", name: "1.1 The concept of democracy and democratization" },
              { id: "s2", name: "1.2 Definitions and actors of democratization process" },
              { id: "s3", name: "1.3 Institutionalizing democracy" },
              { id: "s4", name: "1.4 The role of democracy for social transformation" },
              { id: "s5", name: "1.5 Democratic values" },
              { id: "s6", name: "1.6 Aspects of democracy" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Citizens in the Digital Technology Age",
            subtopics: [
              { id: "s7", name: "2.1 Implications of digital technology on citizens" },
              { id: "s8", name: "2.2 The ethics of using digital technology" },
              { id: "s9", name: "2.3 Opportunities of digital technology for young citizens" },
              { id: "s10", name: "2.4 Impacts of unethical use of digital technology on young citizens" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Understanding Good Governance",
            subtopics: [
              { id: "s11", name: "3.1 The concept of good governance" },
              { id: "s12", name: "3.2 Elements of good governance" },
              { id: "s13", name: "3.3 The role of good governance" },
              { id: "s14", name: "3.4 Challenges for good governance" },
              { id: "s15", name: "3.5 Impacts of lack of good governance" },
              { id: "s16", name: "3.6 Understanding and fighting corruption" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Peace & Indigenous Conflict Resolution Mechanisms",
            subtopics: [
              { id: "s17", name: "4.1 The concepts of peace" },
              { id: "s18", name: "4.2 Impacts of absence of peace" },
              { id: "s19", name: "4.3 The notion of peace building" },
              { id: "s20", name: "4.4 Indigenous conflict resolution mechanisms" },
              { id: "s21", name: "4.5 Roles of indigenous social institutions in sustainable peace" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Federalism in Ethiopia",
            subtopics: [
              { id: "s22", name: "5.1 The meaning of federalism" },
              { id: "s23", name: "5.2 Types of federalism" },
              { id: "s24", name: "5.3 Key features of federalism" },
              { id: "s25", name: "5.4 Advantage and disadvantage of federalism" },
              { id: "s26", name: "5.5 Roles of federalism in accommodating diversity in Ethiopia" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Human Rights",
            subtopics: [
              { id: "s27", name: "6.1 The concept of human right" },
              { id: "s28", name: "6.2 Citizens and state obligations in realizing human rights" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Patriotism",
            subtopics: [
              { id: "s29", name: "7.1 The meaning of patriotism" },
              { id: "s30", name: "7.2 Types of patriotism" },
              { id: "s31", name: "7.3 The bases of patriotism" },
              { id: "s32", name: "7.4 The importance of patriotism" },
              { id: "s33", name: "7.5 Duties expected of patriots" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Globalization and Global Issues",
            subtopics: [
              { id: "s34", name: "8.1 The meaning of globalization" },
              { id: "s35", name: "8.2 Advantages and disadvantages of globalization" },
              { id: "s36", name: "8.3 Fighting the negative impact of globalization" },
              { id: "s37", name: "8.4 Major global issues" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "11",
    name: "Grade 11",
    subjects: [
      {
        id: "maths",
        name: "Mathematics",
        icon: "Calculator",
        units: [
          {
            id: "u1",
            name: "Unit 1: Relations and Functions",
            subtopics: [
              { id: "s1", name: "1.1 Relations" },
              { id: "s2", name: "1.2 Inverse of Relations and Their Graphs" },
              { id: "s3", name: "1.3 Types of Functions" },
              { id: "s4", name: "1.4 Composition of Functions" },
              { id: "s5", name: "1.5 Inverse Functions and their Graphs" },
              { id: "s6", name: "1.6 Applications of Relations and Functions" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Rational Expressions and Rational Functions",
            subtopics: [
              { id: "s7", name: "2.1 Rational Expressions" },
              { id: "s8", name: "2.2 Rational Equations and Rational Inequalities" },
              { id: "s9", name: "2.3 Rational Functions and Their Graphs" },
              { id: "s10", name: "2.4 Applications" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Matrices",
            subtopics: [
              { id: "s11", name: "3.1 The Concepts of a Matrix" },
              { id: "s12", name: "3.2 Operations on Matrices" },
              { id: "s13", name: "3.3 Special Types of Matrices" },
              { id: "s14", name: "3.4 Elementary Row Operations of Matrices" },
              { id: "s15", name: "3.5 Systems of Linear Equations with Two or Three Variables" },
              { id: "s16", name: "3.6 Solutions of Systems of Linear Equations" },
              { id: "s17", name: "3.7 Inverse of a Square Matrix" },
              { id: "s18", name: "3.8 Applications" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Determinants and Their Properties",
            subtopics: [
              { id: "s19", name: "4.1 Determinants of Matrices of Order 2" },
              { id: "s20", name: "4.2 Minors and Cofactors of Elements of Matrices" },
              { id: "s21", name: "4.3 Determinants of Matrices of Order 3" },
              { id: "s22", name: "4.4 Properties of Determinants" },
              { id: "s23", name: "4.5 Inverse of a Square Matrix of Order 2 and 3" },
              { id: "s24", name: "4.6 Solutions of Systems of Linear Equations Using Cramer’s Rule" },
              { id: "s25", name: "4.7 Applications" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Vectors",
            subtopics: [
              { id: "s26", name: "5.1 Revision on Vectors and Scalars" },
              { id: "s27", name: "5.2 Representation of Vectors" },
              { id: "s28", name: "5.3 Vector Product" },
              { id: "s29", name: "5.4 Application of Scalar and Cross Product" },
              { id: "s30", name: "5.5 Application of Vectors" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Transformations of the Plane",
            subtopics: [
              { id: "s31", name: "6.1 Introduction" },
              { id: "s32", name: "6.2 Translation" },
              { id: "s33", name: "6.3 Reflection" },
              { id: "s34", name: "6.4 Rotation" },
              { id: "s35", name: "6.5 Applications" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Statistics",
            subtopics: [
              { id: "s36", name: "7.1 Types of Data" },
              { id: "s37", name: "7.2 Introduction to Grouped Data" },
              { id: "s38", name: "7.3 Graphical Representation of Grouped Data" },
              { id: "s39", name: "7.4 Measures of Central Tendency and Their Interpretation" },
              { id: "s40", name: "7.5 Real-life Application of Statistics" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Probability",
            subtopics: [
              { id: "s41", name: "8.1 Introduction" },
              { id: "s42", name: "8.2 Fundamental Principle of Counting" },
              { id: "s43", name: "8.3 Permutations and Combinations" },
              { id: "s44", name: "8.4 Binomial Theorem" },
              { id: "s45", name: "8.5 Random Experiments and Their Outcomes" },
              { id: "s46", name: "8.6 Events" },
              { id: "s47", name: "8.7 Probability of an Event" },
              { id: "s48", name: "8.8 Real-life Application of Probability" }
            ]
          }
        ]
      },
      {
        id: "physics",
        name: "Physics",
        icon: "Zap",
        units: [
          {
            id: "u1",
            name: "Unit 1: Physics and Human Society",
            subtopics: [
              { id: "s1", name: "1.1 Importance of Physics to Society" },
              { id: "s2", name: "1.2 Physics Communities and Their Roles" },
              { id: "s3", name: "1.3 Making of Physics Knowledge" },
              { id: "s4", name: "1.4 The Mission of Physics and Career Awareness" },
              { id: "s5", name: "1.5 Current Status of Physics" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Vectors",
            subtopics: [
              { id: "s6", name: "2.1 Vectors and Types of Vectors" },
              { id: "s7", name: "2.2 Graphical Method of Addition of Vectors in Two Dimensions (2-D)" },
              { id: "s8", name: "2.3 Algebraic Method of Addition of Vectors in Two Dimensions (2-D)" },
              { id: "s9", name: "2.4 Product of Vectors" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Motion in One and Two Dimensions",
            subtopics: [
              { id: "s10", name: "3.1 Uniformly Accelerated Motion in 1D" },
              { id: "s11", name: "3.2 Equations of Uniformly Accelerated Motion in 1D" },
              { id: "s12", name: "3.3 Graphical Representation of Uniformly Accelerated Motion in 1D" },
              { id: "s13", name: "3.4 Vertical Motion" },
              { id: "s14", name: "3.5 Uniform Circular Motion" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Dynamics",
            subtopics: [
              { id: "s15", name: "4.1 The Concept of Force and Newton’s Laws of Motion" },
              { id: "s16", name: "4.2 Frictional Force" },
              { id: "s17", name: "4.3 The First Condition of Equilibrium" },
              { id: "s18", name: "4.4 Work, Energy and Power" },
              { id: "s19", name: "4.5 Conservation of Mechanical Energy" },
              { id: "s20", name: "4.6 Impulse and Linear Momentum" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Heat Conduction and Calorimetry",
            subtopics: [
              { id: "s21", name: "5.1 The Concept of Heat" },
              { id: "s22", name: "5.2 Heat Transfer Mechanisms" },
              { id: "s23", name: "5.3 Heat Capacity and Specific Heat Capacity" },
              { id: "s24", name: "5.4 Thermal Expansion" },
              { id: "s25", name: "5.5 Change of Phase" },
              { id: "s26", name: "5.6 Calorimetry" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Electrostatics and Electric Circuit",
            subtopics: [
              { id: "s27", name: "6.1 Coulomb’s Law" },
              { id: "s28", name: "6.2 Electric Fields" },
              { id: "s29", name: "6.3 Electric Potential" },
              { id: "s30", name: "6.4 Electric Current, Resistance and Ohm’s Law" },
              { id: "s31", name: "6.5 Capacitors and Capacitance" },
              { id: "s32", name: "6.6 Electric Circuits in Our Surroundings" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Nuclear Physics",
            subtopics: [
              { id: "s33", name: "7.1 The Nucleus" },
              { id: "s34", name: "7.2 Radioactivity" },
              { id: "s35", name: "7.3 Use of Nuclear Radiation" },
              { id: "s36", name: "7.4 Nuclear Reaction and Energy Production" },
              { id: "s37", name: "7.5 Safety Rules Against Hazards of Nuclear Radiation" }
            ]
          }
        ]
      },
      {
        id: "chemistry",
        name: "Chemistry",
        icon: "FlaskConical",
        units: [
          {
            id: "u1",
            name: "Unit 1: Atomic Structure and Periodic Table",
            subtopics: [
              { id: "s1", name: "1.1 Introduction" },
              { id: "s2", name: "1.2 Dalton’s Atomic Theory and the Modern Atomic Theory" },
              { id: "s3", name: "1.3 Early Experiments to Characterize the Atom" },
              { id: "s4", name: "1.4 Make-up of the Nucleus" },
              { id: "s5", name: "1.5 Electromagnetic Radiation and Atomic Spectra" },
              { id: "s6", name: "1.6 The Quantum Mechanical Model of the Atom" },
              { id: "s7", name: "1.7 Electronic Configurations and Orbital Diagrams" },
              { id: "s8", name: "1.8 Electronic Configurations and the Periodic Table" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Chemical Bonding",
            subtopics: [
              { id: "s9", name: "2.1 Introduction to Chemical Bonding" },
              { id: "s10", name: "2.2 Ionic Bonds" },
              { id: "s11", name: "2.3 Covalent Bonds and Molecular Geometry" },
              { id: "s12", name: "2.4 Metallic Bonding" },
              { id: "s13", name: "2.5 Chemical Bonding Theories" },
              { id: "s14", name: "2.6 Types of Crystal" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Physical States of Matter",
            subtopics: [
              { id: "s15", name: "3.1 Introduction" },
              { id: "s16", name: "3.2 Kinetic Theory and Properties of Matter" },
              { id: "s17", name: "3.3 The Gaseous State" },
              { id: "s18", name: "3.4 The Liquid State" },
              { id: "s15", name: "3.5 The Solid State" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Chemical Kinetics",
            subtopics: [
              { id: "s20", name: "4.1 Introduction" },
              { id: "s21", name: "4.2 The Rate of a Reaction" },
              { id: "s22", name: "4.3 Factors Affecting the Rate of a Chemical Reaction" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Chemical Equilibrium",
            subtopics: [
              { id: "s23", name: "5.1 Introduction" },
              { id: "s24", name: "5.2 Chemical Equilibrium Concepts" },
              { id: "s25", name: "5.3 Equilibrium Expression and Constant" },
              { id: "s26", name: "5.4 Applications of Equilibrium Constant" },
              { id: "s27", name: "5.5 Le-Chatelier’s Principle" },
              { id: "s28", name: "5.6 Equilibrium and Industry" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Oxygen-Containing Organic Compounds",
            subtopics: [
              { id: "s29", name: "6.1 Introduction" },
              { id: "s30", name: "6.2 Alcohols and Ethers" },
              { id: "s31", name: "6.3 Aldehydes and Ketones" },
              { id: "s32", name: "6.4 Carboxylic Acids" },
              { id: "s33", name: "6.5 Esters" },
              { id: "s34", name: "6.6 Fats and Oils" }
            ]
          }
        ]
      },
      {
        id: "biology",
        name: "Biology",
        icon: "Dna",
        units: [
          {
            id: "u1",
            name: "Unit 1: Biology and Technology",
            subtopics: [
              { id: "s1", name: "1.1 Learning from nature" },
              { id: "s2", name: "1.2 Biology and technology integration" },
              { id: "s3", name: "1.3 Impacts of biology and technology on society" },
              { id: "s4", name: "1.4 Ethical issues in biology" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Animals",
            subtopics: [
              { id: "s5", name: "2.1 Characteristics of animals" },
              { id: "s6", name: "2.2 Invertebrates and Vertebrates" },
              { id: "s7", name: "2.3 Reproduction in Animals" },
              { id: "s8", name: "2.4 The economic importance of animals (insects)" },
              { id: "s9", name: "2.5 Animal Behavior" },
              { id: "s10", name: "2.6 Homeostasis in animals" },
              { id: "s11", name: "2.7 Renowned zoologists in Ethiopia" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Enzymes",
            subtopics: [
              { id: "s12", name: "3.1 What are enzymes?" },
              { id: "s13", name: "3.2 Properties and functions of enzymes" },
              { id: "s14", name: "3.3 Protein structures" },
              { id: "s15", name: "3.4 Enzyme substrate models & transition state" },
              { id: "s16", name: "3.5 Enzyme regulation Classification, Kinetics & Applications" },
              { id: "s17", name: "3.6 traditional malting & Renowned Biochemists" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Genetics",
            subtopics: [
              { id: "s18", name: "4.1 The genetic materials & DNA/RNA Structure" },
              { id: "s19", name: "4.2 DNA replication & process of cell division" },
              { id: "s20", name: "4.3 Protein synthesis & Mendelian inheritance" },
              { id: "s21", name: "4.4 Sex determination & Non-Mendelian inheritance" },
              { id: "s22", name: "4.5 Human pedigree analysis, disorders & counseling" },
              { id: "s23", name: "4.6 Gene therapy, breeding & bioinformatics" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: The Human Body Systems",
            subtopics: [
              { id: "s24", name: "5.1 Human Musculoskeletal Systems" },
              { id: "s25", name: "5.2 The reproductive system & contraception" },
              { id: "s26", name: "5.3 Causes of infertility & Sexually Transmitted Infections" },
              { id: "s27", name: "5.4 Harmful traditional practices & Family planning" },
              { id: "s28", name: "5.5 Effects of drug and substance abuse" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Population and Natural Resources",
            subtopics: [
              { id: "s29", name: "6.1 Population size, density and dispersal" },
              { id: "s30", name: "6.2 Exponential and logistic growth" },
              { id: "s31", name: "6.3 Demographic structure & population regulation" },
              { id: "s32", name: "6.4 Natural resources conservation in Ethiopia" },
              { id: "s33", name: "6.5 Impact of traffic accident on wild and domestic animals" },
              { id: "s34", name: "6.6 Impact of human activities & Indigenous practices" }
            ]
          }
        ]
      },
      {
        id: "history",
        name: "History",
        icon: "History",
        units: [
          {
            id: "u1",
            name: "Unit 1: History, Historiography, and Human Evolution",
            subtopics: [
              { id: "s1", name: "1.1 History and Historiography" },
              { id: "s2", name: "1.2 Origin of Human Beings" },
              { id: "s3", name: "1.3 Emergence of State" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Major Spots of Ancient World Civilizations",
            subtopics: [
              { id: "s4", name: "2.1 Ancient Civilizations of Africa" },
              { id: "s5", name: "2.2 Civilizations in Asia" },
              { id: "s6", name: "2.3 Civilizations in Europe" },
              { id: "s7", name: "2.4 Civilizations in Latin America" },
              { id: "s8", name: "2.5 The Rise and Spread of Christianity" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Ethiopia and the Horn to the end of 13th Century",
            subtopics: [
              { id: "s9", name: "3.1 Languages, Religions and Peoples" },
              { id: "s10", name: "3.2 Pre-Aksumite States and their setting" },
              { id: "s11", name: "3.3 The Aksumite Kingdom" },
              { id: "s12", name: "3.4 The Sultanate of Shewa, Zagwe Dynasty and Damot" },
              { id: "s13", name: "3.5 The Bete-Israel (Ethiopian Jews)" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: The Middle Ages and Early Modern World",
            subtopics: [
              { id: "s14", name: "4.1 The European Middle Ages" },
              { id: "s15", name: "4.2 Main Features of the Middle Ages" },
              { id: "s16", name: "4.3 The Middle Ages in Asia" },
              { id: "s17", name: "4.4 Development of Early Capitalism: 1500-1789" },
              { id: "s18", name: "4.5 Age of Exploration & Globalization" },
              { id: "s19", name: "4.6 The Renaissance and Reformation" },
              { id: "s20", name: "4.7 Scientific Revolution and Enlightenment" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Peoples and States of Africa to 1500",
            subtopics: [
              { id: "s21", name: "5.1 Ancient and Medieval African States" },
              { id: "s22", name: "5.2 North Africa & Spread of Islam" },
              { id: "s23", name: "5.3 States in West Africa" },
              { id: "s24", name: "5.4 Central and Eastern Africa" },
              { id: "s25", name: "5.5 Southern Africa & Relationships among Regions" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Africa and the Outside World: 1500-1880s",
            subtopics: [
              { id: "s26", name: "6.1 Medieval African States" },
              { id: "s27", name: "6.2 Contacts with the Outside World" },
              { id: "s28", name: "6.3 Slavery and Slave Trade in Africa & Legitimate Trade" },
              { id: "s29", name: "6.4 The White Settlement in South Africa" },
              { id: "s30", name: "6.5 European Explorers and Missionaries: 1770-1870" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: States, Principalities and Movements in Ethiopia",
            subtopics: [
              { id: "s31", name: "7.1 Christian Highland Kingdom & Solomonic Dynasty" },
              { id: "s32", name: "7.2 Expansion of Islam and Muslim Sultanates" },
              { id: "s33", name: "7.3 Conditions of Southern and Central States" },
              { id: "s34", name: "7.4 Relationship with Adal & Population Movements" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Ethiopia: Mid 16th to Mid-19th Century",
            subtopics: [
              { id: "s35", name: "8.1 Peoples and States of Southern, Western and Eastern Ethiopia" },
              { id: "s36", name: "8.2 Instability Versus Consolidation, 1559-1855" }
            ]
          },
          {
            id: "u9",
            name: "Unit 9: The Age of Revolutions, 1789 to 1815",
            subtopics: [
              { id: "s37", name: "9.1 The Industrial Revolution and political effects" },
              { id: "s38", name: "9.2 The American War of Independence & French Revolution" },
              { id: "s39", name: "9.3 The Period of Napoleon Bonaparte" }
            ]
          }
        ]
      },
      {
        id: "geography",
        name: "Geography",
        icon: "Globe",
        units: [
          {
            id: "u1",
            name: "Unit 1: Formation of the Continents",
            subtopics: [
              { id: "s1", name: "1.1 Formation of the continents and oceans" },
              { id: "s2", name: "1.2 Geological timescale" },
              { id: "s3", name: "1.3 Distribution of the continents and oceans" },
              { id: "s4", name: "1.4 Changing position of the continents and oceans" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Climate Classification and Regions of Our World",
            subtopics: [
              { id: "s5", name: "2.1 Criteria for climate classification" },
              { id: "s6", name: "2.2 Köppen's climate classification" },
              { id: "s7", name: "2.3 World climate regions & influencing factors" },
              { id: "s8", name: "2.4 Local/indigenous climate classification of Ethiopia" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Natural Resources and Conflicts Over Resources",
            subtopics: [
              { id: "s9", name: "3.1 Functions and management of land & resources under pressure" },
              { id: "s10", name: "3.2 Land resource depletion and degradation" },
              { id: "s11", name: "3.3 Transboundary rivers & Regional cooperation" },
              { id: "s12", name: "3.4 Water use in Ethiopia, Sudan and Egypt & Conflicts" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Global Population Dynamics and Challenges",
            subtopics: [
              { id: "s13", name: "4.1 The growth of world population & accelerate factors" },
              { id: "s14", name: "4.2 International migrations" },
              { id: "s15", name: "4.3 Population policies" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Geography and Economic Development",
            subtopics: [
              { id: "s16", name: "5.1 Effects of geographic location on development" },
              { id: "s17", name: "5.2 Climate extremes, poverty & landlocked countries disadvantages" },
              { id: "s18", name: "5.3 Intraregional trade in Africa" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Major Global Environmental Changes",
            subtopics: [
              { id: "s19", name: "6.1 Persistent environmental problems & Poverty-Nexus" },
              { id: "s20", name: "6.2 Environmental degradation and sustainable development" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Geographic Issues and Public Concerns",
            subtopics: [
              { id: "s21", name: "7.1 Population related concerns of our contemporary world" },
              { id: "s22", name: "7.2 Land degradation, desertification, drought & famine" },
              { id: "s23", name: "7.3 Deforestation & Worldwide Digital Divide" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Geo-spatial Information and Data Processing",
            subtopics: [
              { id: "s24", name: "8.1 Representations of relief features on topographic maps" },
              { id: "s25", name: "8.2 Basic concepts of Geographical Information System (GIS)" },
              { id: "s26", name: "8.3 ArcMap and main tools" }
            ]
          }
        ]
      },
      {
        id: "english",
        name: "English",
        icon: "BookOpen",
        units: [
          {
            id: "u1",
            name: "Unit 1: Environmental Hazards",
            subtopics: [
              { id: "s1", name: "1A Listening & 1B Speaking Skills" },
              { id: "s2", name: "1C Reading & 1D Vocabulary Skills" },
              { id: "s3", name: "1E Grammar & 1F Writing Skills" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Civilization",
            subtopics: [
              { id: "s4", name: "2A Listening & 2B Speaking Skills" },
              { id: "s5", name: "2C Reading & 2D Vocabulary Skills" },
              { id: "s6", name: "2E Grammar & 2F Writing Skills" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Causes of Road Traffic Accidents",
            subtopics: [
              { id: "s7", name: "3A Listening & 3B Speaking Skills" },
              { id: "s8", name: "3C Reading & 3D Vocabulary" },
              { id: "s9", name: "3E Grammar & 3F Writing Skills" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: People and Natural Resources",
            subtopics: [
              { id: "s10", name: "4A Listening & 4B Speaking" },
              { id: "s11", name: "4C Reading & 4D Vocabulary" },
              { id: "s12", name: "4E Grammar & 4F Writing Skills" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Irrigation",
            subtopics: [
              { id: "s13", name: "5A Listening & 5B Speaking" },
              { id: "s14", name: "5C Reading & 5D Vocabulary" },
              { id: "s15", name: "5E Grammar & 5F Writing Skills" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Global Warming",
            subtopics: [
              { id: "s16", name: "6A Listening & 6B Speaking" },
              { id: "s17", name: "6C Reading & 6D Vocabulary" },
              { id: "s18", name: "6E Grammar & 6F Writing Skills" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Patriotism",
            subtopics: [
              { id: "s19", name: "7A Listening & 7B Speaking" },
              { id: "s20", name: "7C Reading & 7D Vocabulary" },
              { id: "s21", name: "7E Grammar & 7F Writing Skills" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Efficiency of Health Services",
            subtopics: [
              { id: "s22", name: "8A Listening & 8B Speaking" },
              { id: "s23", name: "8C Reading & 8D Vocabulary" },
              { id: "s24", name: "8E Grammar & 8F Writing Skills" }
            ]
          },
          {
            id: "u9",
            name: "Unit 9: Indigenous Conflict Resolution",
            subtopics: [
              { id: "s25", name: "9A Listening & 9B Speaking" },
              { id: "s26", name: "9C Reading & 9D Vocabulary" },
              { id: "s27", name: "9E Grammar & 9F Writing Skills" }
            ]
          },
          {
            id: "u10",
            name: "Unit 10: Artificial Intelligence",
            subtopics: [
              { id: "s28", name: "10A Listening & 10B Speaking" },
              { id: "s29", name: "10C Reading & 10D Vocabulary" },
              { id: "s30", name: "10E Grammar & 10F Writing Skills" }
            ]
          }
        ]
      },
      {
        id: "economics",
        name: "Economics",
        icon: "TrendingUp",
        units: [
          {
            id: "u1",
            name: "Unit 1: Theory of Consumer Behavior and Demand",
            subtopics: [
              { id: "s1", name: "1.1 Review of Cardinal Utility Approach" },
              { id: "s2", name: "1.2 Ordinal Utility Theory and Preferences" },
              { id: "s3", name: "1.3 The Budget Line or Price Line" },
              { id: "s4", name: "1.4 Optimum of the Consumer & Demand Curve" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Market Structure & Decision of Firms",
            subtopics: [
              { id: "s5", name: "2.1 Review of Market Structures" },
              { id: "s6", name: "2.2 Perfect Competition Market" },
              { id: "s7", name: "2.3 Pure Monopoly Market" },
              { id: "s8", name: "2.4 Monopolistic Competition Market & Oligopoly" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: National Income Accounting",
            subtopics: [
              { id: "s9", name: "3.1 Nature of National Income Account and its Importance" },
              { id: "s10", name: "3.2 Concept of Gross Domestic Product & GNP" },
              { id: "s11", name: "3.3 Measuring National Income & Circular Flow" },
              { id: "s12", name: "3.4 General Price Measures, GDP Deflator, and CPI" },
              { id: "s13", name: "3.5 GDP and Income Distribution" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Consumption, Saving and Investment",
            subtopics: [
              { id: "s14", name: "4.1 Consumption function, APC & MPC" },
              { id: "s15", name: "4.2 Saving function, APS & MPS & Relationship" },
              { id: "s16", name: "4.3 Investment types, determinants, and growth role" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Trade and Finance",
            subtopics: [
              { id: "s17", name: "5.1 Overview of Domestic Trade & Basis of International Trade" },
              { id: "s18", name: "5.2 Balance of Payment Components" },
              { id: "s19", name: "5.3 Trade Policies & Exchange Rate" },
              { id: "s20", name: "5.4 Regional Integration and Globalization" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Economic Development",
            subtopics: [
              { id: "s21", name: "6.1 Economic Growth and Economic Development" },
              { id: "s22", name: "6.2 Measures of Productivity & HDI" },
              { id: "s23", name: "6.3 Capability Approach & Sustainable Development" },
              { id: "s24", name: "6.4 MDGs and SDGs" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Main Sectors, Sectorial Policies and Strategies of Ethiopia",
            subtopics: [
              { id: "s25", name: "7.1 Agricultural Sector Policies & Problems" },
              { id: "s26", name: "7.2 Industrial Sector Policies, Problems, and Remedies" },
              { id: "s27", name: "7.3 Service Sector Policies (Education, Health, Transport)" }
            ]
          }
        ]
      },
      {
        id: "agriculture",
        name: "Agriculture",
        icon: "Leaf",
        units: [
          {
            id: "u1",
            name: "Unit 1: Introduction to Crop Production",
            subtopics: [
              { id: "s1", name: "1.1 Definition of common terms & Domesticated crops" },
              { id: "s2", name: "1.2 Status, Classification of plants, and Cropping systems" },
              { id: "s3", name: "1.3 Indigenous knowledge in crop production" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Field Crops Production and Management",
            subtopics: [
              { id: "s4", name: "2.1 Cereal crops production and management" },
              { id: "s5", name: "2.2 Pulse crops production and management" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Industrial Crops Production and Management",
            subtopics: [
              { id: "s6", name: "3.1 Oil crops production and management" },
              { id: "s7", name: "3.2 Fiber and Sugar crops production & management" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Introduction to Farm Animals",
            subtopics: [
              { id: "s8", name: "4.1 Farm animal species & Importance of animal production" },
              { id: "s9", name: "4.2 Constraints & animal production systems" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Animal Feeds and Feeding Practices",
            subtopics: [
              { id: "s10", name: "5.1 Feed Resources in Ethiopia & classification" },
              { id: "s11", name: "5.2 Nutritional requirements & formulation" },
              { id: "s12", name: "5.3 Conservation & compounded feed manufacturing" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Animal Genetics and Breeding Practices",
            subtopics: [
              { id: "s13", name: "6.1 Introduction, breed improvement & reproduction" },
              { id: "s14", name: "6.2 Animal identification and records" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Farm Animals Housing",
            subtopics: [
              { id: "s15", name: "7.1 Significance and types of animal houses" },
              { id: "s16", name: "7.2 Guidelines for site selection and construction" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Basic Animal Health and Disease Control",
            subtopics: [
              { id: "s17", name: "8.1 Major diseases, parasites, and effects" },
              { id: "s18", name: "8.2 Prevention and control of common diseases" }
            ]
          },
          {
            id: "u9",
            name: "Unit 9: Dairy Cattle Production and Management",
            subtopics: [
              { id: "s19", name: "9.1 Breeds, Selection, Feeding & Milk Processing" },
              { id: "s20", name: "9.2 Dairy housing, diseases controls, and profitability" }
            ]
          },
          {
            id: "u10",
            name: "Unit 10: Introduction to Natural Resources",
            subtopics: [
              { id: "s21", name: "10.1 Definition, types and importance of natural resources" },
              { id: "s22", name: "10.2 Causes and consequences of resource degradation" }
            ]
          },
          {
            id: "u11",
            name: "Unit 11: Management of Natural Resources",
            subtopics: [
              { id: "s23", name: "11.1 soil, water, forest and wildlife management" },
              { id: "s24", name: "11.2 Indigenous knowledge in resource management" }
            ]
          },
          {
            id: "u12",
            name: "Unit 12: Concepts of Biodiversity",
            subtopics: [
              { id: "s25", name: "12.1 Definition, scope and values of biodiversity" },
              { id: "s26", name: "12.2 Threats and conservation status in Ethiopia" }
            ]
          },
          {
            id: "u13",
            name: "Unit 13: Climate Change Adaptation and Mitigation",
            subtopics: [
              { id: "s27", name: "13.1 Climate change, variability & and effects" },
              { id: "s28", name: "13.2 adaptation strategies in Ethiopia & Indigenous knowledge" }
            ]
          },
          {
            id: "u14",
            name: "Unit 14: Mechanized Farming",
            subtopics: [
              { id: "s29", name: "14.1 Introduction & Types of farm tools and equipment" },
              { id: "s30", name: "14.2 Uses of farm tools and equipment" }
            ]
          },
          {
            id: "u15",
            name: "Unit 15: Introduction to Human Nutrition",
            subtopics: [
              { id: "s31", name: "15.1 basic definitions, nutrient functions & food groups" },
              { id: "s32", name: "15.2 Food security, agriculture linkage, and malnutrition in Ethiopia" }
            ]
          },
          {
            id: "u16",
            name: "Unit 16: Diversified Food Production and Consumption",
            subtopics: [
              { id: "s33", name: "16.1 Diversified food production & dietary strategies" },
              { id: "s34", name: "16.2 Nutrient enrichment & indigenous knowledge" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "12",
    name: "Grade 12",
    subjects: [
      {
        id: "maths",
        name: "Mathematics",
        icon: "Calculator",
        units: [
          {
            id: "u1",
            name: "Unit 1: Sequences and Series",
            subtopics: [
              { id: "s1", name: "1.1 Sequences (Arithmetic & Geometric)" },
              { id: "s2", name: "1.2 Sigma Notation and Partial Sums" },
              { id: "s3", name: "1.3 Infinite Series (Convergence & Divergence)" },
              { id: "s4", name: "1.4 Applications of Sequences and Series" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Limit and Continuity",
            subtopics: [
              { id: "s5", name: "2.1 Limit of a Function and Limit Theorems" },
              { id: "s6", name: "2.2 One-Sided and Infinite Limits" },
              { id: "s7", name: "2.3 Continuity of a Function" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: New Introduction to Differential Calculus",
            subtopics: [
              { id: "s8", name: "3.1 Derivatives & Rules of Differentiation" },
              { id: "s9", name: "3.2 Higher Order Derivatives and Chain Rule" },
              { id: "s10", name: "3.3 Applications of Derivatives" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Introduction to Integral Calculus",
            subtopics: [
              { id: "s11", name: "4.1 Indefinite Integrals & Substitution Method" },
              { id: "s12", name: "4.2 Definite Integrals and Fundamental Theorems" },
              { id: "s13", name: "4.3 Applications of Integrals (Area & Volume)" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Three-Dimensional Geometry and Vectors",
            subtopics: [
              { id: "s14", name: "5.1 Coordinates in 3D Space" },
              { id: "s15", name: "5.2 Vectors in 3D Space, Dot and Cross Products" },
              { id: "s16", name: "5.3 Equations of Lines and Planes in Space" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Mathematical Induction, Probability, and Game Theory",
            subtopics: [
              { id: "s17", name: "6.1 Principle of Mathematical Induction" },
              { id: "s18", name: "6.2 Probability Distributions (Binomial & Normal)" },
              { id: "s19", name: "6.3 Basic Concepts of Game Theory" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Mathematical Applications in Business",
            subtopics: [
              { id: "s20", name: "7.1 Base Concepts in Business Math" },
              { id: "s21", name: "7.2 Time Value of Money (Simple & Compound Interest)" },
              { id: "s22", name: "7.3 Saving, Investing & Borrowing" },
              { id: "s23", name: "7.4 Taxation & Business Applications" }
            ]
          }
        ]
      },
      {
        id: "physics",
        name: "Physics",
        icon: "Zap",
        units: [
          {
            id: "u1",
            name: "Unit 1: Application of Physics in Other Fields",
            subtopics: [
              { id: "s1", name: "1.1 Physics and Other Sciences & Engineering" },
              { id: "s2", name: "1.2 Medical Physics & Diagnostic Imaging" },
              { id: "s3", name: "1.3 Physics in Defense Technology & Communications" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Two-dimensional Motion",
            subtopics: [
              { id: "s4", name: "2.1 Projectile Motion (Trajectory, Range, Height)" },
              { id: "s5", name: "2.2 Rotational Motion Kinematics & Dynamics" },
              { id: "s6", name: "2.3 Planetary Motion, Kepler’s Laws, and Universal Gravitation" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Fluid Mechanics",
            subtopics: [
              { id: "s7", name: "3.1 Fluid Statics, Density, and Pressure" },
              { id: "s8", name: "3.2 Archimedes’ Principle & Buoyancy" },
              { id: "s9", name: "3.3 Fluid Flow & Bernoulli’s Equation" },
              { id: "s10", name: "3.4 Safety and High-Pressure Systems" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Electromagnetism",
            subtopics: [
              { id: "s11", name: "4.1 Magnets, Magnetic Fields, and Current Interaction" },
              { id: "s12", name: "4.2 Electromagnetic Induction & Faraday’s Laws" },
              { id: "s13", name: "4.3 Lenz’s Law and Magnetic Inductance" },
              { id: "s14", name: "4.4 AC Generators, Transformers, and Safety" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Basics of Electronics",
            subtopics: [
              { id: "s15", name: "5.1 Semiconductors, Diodes, and Rectification" },
              { id: "s16", name: "5.2 Transistors and Applications" },
              { id: "s17", name: "5.3 Integrated Circuits (ICs), Logic Gates, and Circuits" }
            ]
          }
        ]
      },
      {
        id: "chemistry",
        name: "Chemistry",
        icon: "FlaskConical",
        units: [
          {
            id: "u1",
            name: "Unit 1: Acid-Base Equilibria",
            subtopics: [
              { id: "s1", name: "1.1 Acid-Base Concepts (Arrhenius, Bronsted-Lowry, Lewis)" },
              { id: "s2", name: "1.2 Ionic Equilibria of Weak Acids & Bases" },
              { id: "s3", name: "1.3 Common Ion Effect & Buffer Solutions" },
              { id: "s4", name: "1.4 Hydrolysis of Salts" },
              { id: "s5", name: "1.5 Acid-Base Indicators and Titration Curves" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Electrochemistry",
            subtopics: [
              { id: "s6", name: "2.1 Galvanic (Voltaic) Cells & Redox Balancing" },
              { id: "s7", name: "2.2 Electrode Potential, SHE & Nernst Equation" },
              { id: "s8", name: "2.3 Electrolytic Cells & Faraday’s Laws of Electrolysis" },
              { id: "s9", name: "2.4 Electroplating and Industrial Applications" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Industrial Chemistry",
            subtopics: [
              { id: "s10", name: "3.1 Natural Resources & Chemical Industries" },
              { id: "s11", name: "3.2 Manufacturing of Ammonia, Nitric & Sulphuric Acids" },
              { id: "s12", name: "3.3 Pesticides, Herbicides, Sodium Carbonate and Hydroxide" },
              { id: "s13", name: "3.4 Manufacturing Glass, Cement, Sugar, Tannery in Ethiopia" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Polymers",
            subtopics: [
              { id: "s14", name: "4.1 Introduction to Polymers & Classifications" },
              { id: "s15", name: "4.2 Addition and Condensation Polymerization" },
              { id: "s16", name: "4.3 Synthesized & Natural Polymers (Nylon, Polyester, Polyethylene)" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Introduction to Environmental Chemistry",
            subtopics: [
              { id: "s17", name: "5.1 Components and Natural Cycles in the Environment" },
              { id: "s18", name: "5.2 Environmental Pollution (Air, Water, Land)" },
              { id: "s19", name: "5.3 Global Warming, Climate Change & Green Chemistry" }
            ]
          }
        ]
      },
      {
        id: "biology",
        name: "Biology",
        icon: "Dna",
        units: [
          {
            id: "u1",
            name: "Unit 1: Application of Biology",
            subtopics: [
              { id: "s1", name: "1.1 Application in Conservation of Natural Resources" },
              { id: "s2", name: "1.2 Food security and nutrition issues" },
              { id: "s3", name: "1.3 Sustainable Development & Biotechnology Applications" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Microorganisms",
            subtopics: [
              { id: "s4", name: "2.1 Eubacteria & Archaea (Structure, Shapes, Reproduction)" },
              { id: "s5", name: "2.2 Fungi (Characteristics, Ecology, Types & Economics)" },
              { id: "s6", name: "2.3 Protozoa & Viruses characteristics, mode of transmission & control" },
              { id: "s7", name: "2.4 Normal Microbiota & Renowned Microbiologists in Ethiopia" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Energy Transformation",
            subtopics: [
              { id: "s8", name: "3.1 Cellular Metabolism Overview" },
              { id: "s9", name: "3.2 Photosynthesis, Pigments, Light & Calvin Cycle" },
              { id: "s10", name: "3.2 Contributions of Photosynthesis for continuous of life" },
              { id: "s11", name: "3.3 Cellular Respiration (Glycolysis, Krebs, ETC, Sites)" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Evolution",
            subtopics: [
              { id: "s12", name: "4.1 Evolution Definition, Lamarckism and Darwinism" },
              { id: "s13", name: "4.2 The evidence for evolution (Fossils & Molecular)" },
              { id: "s14", name: "4.3 Natural selection, mutations, Speciation and human evolution" },
              { id: "s15", name: "4.4 Renowned Anthropologists/Evolutionists in Ethiopia" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Human Body System",
            subtopics: [
              { id: "s16", name: "5.1 The Nervous System (Neurons, Impulse, Brain)" },
              { id: "s17", name: "5.2 Sense Organs (Skin, Tongue, Nose, Eye, Ear)" },
              { id: "s18", name: "5.3 The Endocrine System & Glands" },
              { id: "s19", name: "5.4 Homeostasis & Structure and function of human kidney" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Climate Change",
            subtopics: [
              { id: "s20", name: "6.1 Climate Change: Definition, Causes and Effects" },
              { id: "s21", name: "6.2 Effects on biodiversity, agriculture and forest" },
              { id: "s22", name: "6.3 Climate change and natural disasters" },
              { id: "s23", name: "6.4 International Conventions (UNFCCC, Kyoto Protocol)" }
            ]
          }
        ]
      },
      {
        id: "history",
        name: "History",
        icon: "History",
        units: [
          {
            id: "u1",
            name: "Unit 1: Development of Capitalism and Nationalism from 1815 to 1914",
            subtopics: [
              { id: "s1", name: "1.1 Development of Capitalism and Industrial Revolution" },
              { id: "s2", name: "1.2 Nationalism and Unification of Italy and Germany" },
              { id: "s3", name: "1.3 American Civil War & The Eastern Question" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Africa and the Colonial Experience (1880s – 1960s)",
            subtopics: [
              { id: "s4", name: "2.1 The Era of 'Legitimate Trade' and Colonial Empires" },
              { id: "s5", name: "2.2 African Resistance against Colonial Expansion" },
              { id: "s6", name: "2.3 Colonial Administration and the Colonial States" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Developments in Ethiopia, Mid-19th C. to 1941",
            subtopics: [
              { id: "s7", name: "3.1 Long Distance Trade and Peoples’ Interaction" },
              { id: "s8", name: "3.2 Power Rivalry and Consolidating Central Government" },
              { id: "s9", name: "3.3 Territorial Expansion, Battle of Adwa, power struggles" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Society and Politics in the Age of World Wars, 1914 - 1945",
            subtopics: [
              { id: "s10", name: "4.1 World War I & Russian Revolution of 1917" },
              { id: "s11", name: "4.2 Interwar Period: Capitalist Economy, Fascism & Nazism" },
              { id: "s12", name: "4.3 World War II" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Global and Regional Developments Since 1945",
            subtopics: [
              { id: "s13", name: "5.1 Aftermath and Consequences of WW II & United Nations" },
              { id: "s14", name: "5.2 Post-War Global Recovery & Cold War Realities" },
              { id: "s15", name: "5.3 Situations in Asia during Cold War & Middle East" },
              { id: "s16", name: "5.4 Dissolution of the Communist Bloc" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Ethiopia: Developments from 1941 to 1991",
            subtopics: [
              { id: "s17", name: "6.1 Restoration of Imperial Rule and Autocracy" },
              { id: "s18", name: "6.2 The 1974 Revolution, Derg regime rise & Reforms" },
              { id: "s19", name: "6.3 Fall of the Derg Military Regime" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Africa since the 1960s",
            subtopics: [
              { id: "s20", name: "7.1 Road to Independence & Rise of Independent African States" },
              { id: "s21", name: "7.2 Politics, Economy, and Society & The Cold War" },
              { id: "s22", name: "7.3 Pan-Africanism, OAU and African Union" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Post 1991 Developments in Ethiopia",
            subtopics: [
              { id: "s23", name: "8.1 Transitional Government & 1995 Federal Constitution" },
              { id: "s24", name: "8.2 Socio-Economic developments & Peace Keeping Roles" }
            ]
          },
          {
            id: "u9",
            name: "Unit 9: Indigenous Knowledge Systems and Heritages of Ethiopia",
            subtopics: [
              { id: "s25", name: "9.1 Indigenous Knowledge: Definition and Features" },
              { id: "s26", name: "9.2 Indigenous knowledge and Development" }
            ]
          }
        ]
      },
      {
        id: "geography",
        name: "Geography",
        icon: "Globe",
        units: [
          {
            id: "u1",
            name: "Unit 1: Major Geological Processes Associated with Plate Tectonics",
            subtopics: [
              { id: "s1", name: "1.1 Continental Drift & Plate Tectonics Theory" },
              { id: "s2", name: "1.2 Plate Boundaries & Major Geological Processes associated" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Climate Change",
            subtopics: [
              { id: "s3", name: "2.1 Basic Concepts & Global Trends" },
              { id: "s4", name: "2.2 Natural & Human Induced Climate Change & Consequences" },
              { id: "s5", name: "2.3 Mitigation, Adaptation and Green Economy (CRGE) of Ethiopia" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Management of Conflict Over Resources",
            subtopics: [
              { id: "s6", name: "3.1 Concept of Sustainable Development" },
              { id: "s7", name: "3.2 Resource Use Policies & Related Conflicts" },
              { id: "s8", name: "3.3 Governance of Natural Resources & Indigenous Resolution Practices" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Population Policies, Programs and the Environment",
            subtopics: [
              { id: "s9", name: "4.1 Theories of Population Growth and Development" },
              { id: "s10", name: "4.2 Population Policies, programs, & environment health" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Challenges of Economic Development",
            subtopics: [
              { id: "s11", name: "5.1 Multiple Faces of Poverty and Implication" },
              { id: "s12", name: "5.2 Advantages & Disadvantages of Globalization" },
              { id: "s13", name: "5.3 Imbalances Between Regions, Corruption & Global Health Crises" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Solutions to Environmental and Sustainability Problems",
            subtopics: [
              { id: "s14", name: "6.1 Environmental Problems & Sustainability Challenges" },
              { id: "s15", name: "6.2 Environmental Education and Movements" },
              { id: "s16", name: "6.3 Environmentally Friendly Indigenous Practices" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Contemporary Global Geographic Issues & Concerns",
            subtopics: [
              { id: "s17", name: "7.1 Climate Change & Desertification" },
              { id: "s18", name: "7.2 Drought & Famine" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Geographical Enquiry and Map Making",
            subtopics: [
              { id: "s19", name: "8.1 Fundamentals of Research in Geography" },
              { id: "s20", name: "8.2 GIS Data and Map Making Using GIS" }
            ]
          }
        ]
      },
      {
        id: "english",
        name: "English",
        icon: "BookOpen",
        units: [
          {
            id: "u1",
            name: "Unit 1: Sustainable Development",
            subtopics: [
              { id: "s1", name: "1A Listening & 1B Speaking Skills" },
              { id: "s2", name: "1C Reading & 1D Vocabulary Skills" },
              { id: "s3", name: "1E Grammar & 1F Writing Skills" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Time Management",
            subtopics: [
              { id: "s4", name: "2A Listening & 2B Speaking Skills" },
              { id: "s5", name: "2C Reading & 2D Vocabulary Skills" },
              { id: "s6", name: "2E Grammar & 2F Writing Skills" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Evidence on Traffic Accident",
            subtopics: [
              { id: "s7", name: "3A Listening & 3B Speaking Skills" },
              { id: "s8", name: "3C Reading & 3D Vocabulary" },
              { id: "s9", name: "3E Grammar & 3F Writing Skills (Narrative)" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Natural Resource Management",
            subtopics: [
              { id: "s10", name: "4A Listening & 4B Speaking Skills" },
              { id: "s11", name: "4C Reading & 4D Vocabulary Skills" },
              { id: "s12", name: "4E Grammar & 4F Writing Skills" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Mechanized Agriculture",
            subtopics: [
              { id: "s13", name: "5A Listening & 5B Speaking Skills" },
              { id: "s14", name: "5C Reading & 5D Vocabulary Skills" },
              { id: "s15", name: "5E Grammar & 5F Writing Skills" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Green Economies",
            subtopics: [
              { id: "s16", name: "6A Listening & 6B Speaking Skills" },
              { id: "s17", name: "6C Reading & 6D Vocabulary Skills" },
              { id: "s18", name: "6E Grammar & 6F Writing Skills" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: National Pride",
            subtopics: [
              { id: "s19", name: "7A Listening & 7B Speaking Skills" },
              { id: "s20", name: "7C Reading & 7D Vocabulary Skills" },
              { id: "s21", name: "7E Grammar & 7F Writing Skills" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Telemedicine",
            subtopics: [
              { id: "s22", name: "8A Listening & 8B Speaking Skills" },
              { id: "s23", name: "8C Reading & 8D Vocabulary Skills" },
              { id: "s24", name: "8E Grammar & 8F Writing Skills" }
            ]
          },
          {
            id: "u9",
            name: "Unit 9: Conflict Management",
            subtopics: [
              { id: "s25", name: "9A Listening & 9B Speaking Skills" },
              { id: "s26", name: "9C Reading & 9D Vocabulary Skills" },
              { id: "s27", name: "9E Grammar & 9F Writing Skills" }
            ]
          },
          {
            id: "u10",
            name: "Unit 10: Robotics",
            subtopics: [
              { id: "s28", name: "10A Listening & 10B Speaking Skills" },
              { id: "s29", name: "10C Reading & 10D Vocabulary" },
              { id: "s30", name: "10E Grammar & 10F Writing Skills" }
            ]
          }
        ]
      },
      {
        id: "economics",
        name: "Economics",
        icon: "TrendingUp",
        units: [
          {
            id: "u1",
            name: "Unit 1: Fundamental Concepts of Macroeconomics",
            subtopics: [
              { id: "s1", name: "1.1 Focus Areas and Definition of Macroeconomics" },
              { id: "s2", name: "1.2 Key Challenges: Growth, Inflation, Unemployment, Trade" },
              { id: "s3", name: "1.3 Schools of Thought (Classical, Keynesian, Monetarist)" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Aggregate Demand & Aggregate Supply Analysis",
            subtopics: [
              { id: "s4", name: "2.1 Aggregate Demand and AD Curve Shifts" },
              { id: "s5", name: "2.2 Aggregate Supply (Short run SRAS & Long run LRAS)" },
              { id: "s6", name: "2.3 Equilibrium and Shocks of AD and AS" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Market Failure and Consumer Protection",
            subtopics: [
              { id: "s7", name: "3.1 Market Failure Types & Solutions" },
              { id: "s8", name: "3.2 Public Goods & Externalities" },
              { id: "s9", name: "3.3 Asymmetric Information & Consumer Protection" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Macroeconomic Policy Instruments",
            subtopics: [
              { id: "s10", name: "4.1 Policy Instruments Overview & Types" },
              { id: "s11", name: "4.2 Fiscal Policy Tools and Action" },
              { id: "s12", name: "4.3 Monetary Policy Tools and Transmission" },
              { id: "s13", name: "4.4 Income, Wage, and Foreign Exchange Rate Policies" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Tax Theory and Practice",
            subtopics: [
              { id: "s14", name: "5.1 Taxes Definitions, Objectives, Principles and Classifications" },
              { id: "s15", name: "5.2 Tax Equity Approaches (Benefits vs Ability-to-pay)" },
              { id: "s16", name: "5.3 Tax System, Structure, Accounting & Admin Issues in Ethiopia" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Poverty and Inequality",
            subtopics: [
              { id: "s17", name: "6.1 Concept of Poverty, Types, & Measurements" },
              { id: "s18", name: "6.2 Concept of Inequality and its Measurements" },
              { id: "s19", name: "6.3 Overview of Poverty and Inequalities in Ethiopia" },
              { id: "s20", name: "6.4 Role of Indigenous Knowledge in Reducing Poverty" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Macroeconomic Reforms in Ethiopia",
            subtopics: [
              { id: "s21", name: "7.1 Historical Review of National plans (Imperial, Derg, EPRDF)" },
              { id: "s22", name: "7.2 Overview of Homegrown Economic Reforms & Fiscal Decentralization" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Economy, Environment and Climate Change",
            subtopics: [
              { id: "s23", name: "8.1 Economy and the Environment Coexistence" },
              { id: "s24", name: "8.2 Global Warming & Climate Change Indicators" },
              { id: "s25", name: "8.3 Green Economy, Green Growth, & Climate action in Ethiopia" }
            ]
          }
        ]
      },
      {
        id: "agriculture",
        name: "Agriculture",
        icon: "Leaf",
        units: [
          {
            id: "u1",
            name: "Unit 1: Vegetable Crops Production and Management",
            subtopics: [
              { id: "s1", name: "1.1 Importance, problems and prospects in Ethiopia" },
              { id: "s2", name: "1.2 Environmental factors and classifications" },
              { id: "s3", name: "1.3 Vegetable production systems & management principles" }
            ]
          },
          {
            id: "u2",
            name: "Unit 2: Fruit Crops Production and Management",
            subtopics: [
              { id: "s4", name: "2.1 Importance & propagation principles" },
              { id: "s5", name: "2.2 Orchard nurseries establishment, management & postharvest" }
            ]
          },
          {
            id: "u3",
            name: "Unit 3: Root and Tuber Crops Production and Management",
            subtopics: [
              { id: "s6", name: "3.1 Concept, classifications & importance of root and tubers" },
              { id: "s7", name: "3.2 Harvesting and post-harvest handling of root/tuber crops" }
            ]
          },
          {
            id: "u4",
            name: "Unit 4: Coffee, Tea And Spices Production and Management",
            subtopics: [
              { id: "s8", name: "4.1 History, origin, importance, and requirements" },
              { id: "s9", name: "4.2 Propagation, nursery management, field establishment & harvesting" }
            ]
          },
          {
            id: "u5",
            name: "Unit 5: Introduction to Plant Biotechnology",
            subtopics: [
              { id: "s10", name: "5.1 Tissue culture & benefits in crop production" },
              { id: "s11", name: "5.2 Genetic engineering & GMO crops applications" }
            ]
          },
          {
            id: "u6",
            name: "Unit 6: Beef Cattle Production and Management",
            subtopics: [
              { id: "s12", name: "6.1 Beef breeds, selection, feeds & housing" },
              { id: "s13", name: "6.2 Beef diseases control & meat processing" }
            ]
          },
          {
            id: "u7",
            name: "Unit 7: Sheep and Goat Production and Management",
            subtopics: [
              { id: "s14", name: "7.1 Breeds, selection, feeding & housing of sheep and goats" },
              { id: "s15", name: "7.2 Disease control, milk and meat processing" }
            ]
          },
          {
            id: "u8",
            name: "Unit 8: Camel Production and Management",
            subtopics: [
              { id: "s16", name: "8.1 Breeding, select types, nutrition, feeds & camel housing" },
              { id: "s17", name: "8.2 Camel disease control & milk/meat processing" }
            ]
          },
          {
            id: "u9",
            name: "Unit 9: Poultry Production and Management",
            subtopics: [
              { id: "s18", name: "9.1 Poultry breeds, feeds, housing & incubation" },
              { id: "s19", name: "9.2 Brooding & rearing layers and broilers management" }
            ]
          },
          {
            id: "u10",
            name: "Unit 10: Fishery Production and Management",
            subtopics: [
              { id: "s20", name: "10.1 Aquaculture, fish anatomy & fish feeds" },
              { id: "s21", name: "10.2 Culture techniques, rearing, fishing & product handling" }
            ]
          },
          {
            id: "u11",
            name: "Unit 11: Apiculture",
            subtopics: [
              { id: "s22", name: "11.1 Bee biology, colony management, queen rearing & processing" },
              { id: "s23", name: "11.2 Hive products & apiculture diseases/pests" }
            ]
          },
          {
            id: "u12",
            name: "Unit 12: Nursery and Plantation Technology",
            subtopics: [
              { id: "s24", name: "12.1 Nursery design, layout, seedling production from seed" },
              { id: "s25", name: "12.2 Plantation forest establishment and management" }
            ]
          },
          {
            id: "u13",
            name: "Unit 13: Basics of Agro-Forestry Systems and Practices",
            subtopics: [
              { id: "s26", name: "13.1 Agroforestry definitions, structures and technologies" },
              { id: "s27", name: "13.2 Environmental significance & tree species selection" }
            ]
          },
          {
            id: "u14",
            name: "Unit 14: Soil and Water Conservation",
            subtopics: [
              { id: "s28", name: "14.1 Soil properties, erosion causes & impacts" },
              { id: "s29", name: "14.2 Mechanical & biological soil and water conservation practices" }
            ]
          },
          {
            id: "u15",
            name: "Unit 15: Gender and Human Nutrition",
            subtopics: [
              { id: "s30", name: "15.1 Gender terminologies, roles in agriculture" },
              { id: "s31", name: "15.2 Empowering women in agriculture for nutrition security" }
            ]
          },
          {
            id: "u16",
            name: "Unit 16: Safe Food Production and Postharvest Handling",
            subtopics: [
              { id: "s32", name: "16.1 Food safety hazards, sources of contaminants" },
              { id: "s33", name: "16.2 Post-harvest handling & quality preservation" }
            ]
          },
          {
            id: "u17",
            name: "Unit 17: Application of Information & Communication Tech in Agriculture",
            subtopics: [
              { id: "s34", name: "17.1 Roles, systems & applications of ICT in farming" },
              { id: "s35", name: "17.2 Digital agriculture, drawbacks and potential remedies" }
            ]
          }
        ]
      }
    ]
  }
];

export const ENTRANCE_EXAMS_DATA: EntranceExamNode[] = [
  {
    id: "euee_full_natural",
    subject: "Full Natural Sciences Stream Exam",
    years: ["2017 E.C (2025 GC)", "2016 E.C (2024 GC)", "2015 E.C (2023 GC)", "2014 E.C (2022 GC)", "2013 E.C (2021 GC)"],
    stream: "natural"
  },
  {
    id: "euee_full_social",
    subject: "Full Social Sciences Stream Exam",
    years: ["2017 E.C (2025 GC)", "2016 E.C (2024 GC)", "2015 E.C (2023 GC)", "2014 E.C (2022 GC)", "2013 E.C (2021 GC)"],
    stream: "social"
  },
  {
    id: "euee_maths_nat",
    subject: "Mathematics (Natural)",
    years: ["2017 E.C (2025 GC)", "2016 E.C (2024 GC)", "2015 E.C (2023 GC)", "2014 E.C (2022 GC)", "2013 E.C (2021 GC)", "2012 E.C (2020 GC)"],
    stream: "natural"
  },
  {
    id: "euee_maths_soc",
    subject: "Mathematics (Social)",
    years: ["2017 E.C (2025 GC)", "2016 E.C (2024 GC)", "2015 E.C (2023 GC)", "2014 E.C (2022 GC)", "2013 E.C (2021 GC)", "2012 E.C (2020 GC)"],
    stream: "social"
  },
  {
    id: "euee_physics",
    subject: "Physics",
    years: ["2017 E.C (2025 GC)", "2016 E.C (2024 GC)", "2015 E.C (2023 GC)", "2014 E.C (2022 GC)", "2013 E.C (2021 GC)"],
    stream: "natural"
  },
  {
    id: "euee_chemistry",
    subject: "Chemistry",
    years: ["2017 E.C (2025 GC)", "2016 E.C (2024 GC)", "2015 E.C (2023 GC)", "2014 E.C (2022 GC)", "2013 E.C (2021 GC)"],
    stream: "natural"
  },
  {
    id: "euee_biology",
    subject: "Biology",
    years: ["2017 E.C (2025 GC)", "2016 E.C (2024 GC)", "2015 E.C (2023 GC)", "2014 E.C (2022 GC)", "2013 E.C (2021 GC)"],
    stream: "natural"
  },
  {
    id: "euee_english",
    subject: "English",
    years: ["2017 E.C (2025 GC)", "2016 E.C (2024 GC)", "2015 E.C (2023 GC)", "2014 E.C (2022 GC)", "2013 E.C (2021 GC)"],
    stream: "both"
  },
  {
    id: "euee_civics",
    subject: "Civics & Ethical Education",
    years: ["2017 E.C (2025 GC)", "2016 E.C (2024 GC)", "2015 E.C (2023 GC)", "2014 E.C (2022 GC)", "2013 E.C (2021 GC)"],
    stream: "both"
  },
  {
    id: "euee_aptitude",
    subject: "Scholastic Aptitude Test (SAT)",
    years: ["2017 E.C (2025 GC)", "2016 E.C (2024 GC)", "2015 E.C (2023 GC)", "2014 E.C (2022 GC)", "2013 E.C (2021 GC)"],
    stream: "both"
  },
  {
    id: "euee_geography",
    subject: "Geography",
    years: ["2017 E.C (2025 GC)", "2016 E.C (2024 GC)", "2015 E.C (2023 GC)", "2014 E.C (2022 GC)", "2013 E.C (2021 GC)"],
    stream: "social"
  },
  {
    id: "euee_history",
    subject: "History",
    years: ["2017 E.C (2025 GC)", "2016 E.C (2024 GC)", "2015 E.C (2023 GC)", "2014 E.C (2022 GC)", "2013 E.C (2021 GC)"],
    stream: "social"
  },
  {
    id: "euee_economics",
    subject: "Economics",
    years: ["2017 E.C (2025 GC)", "2016 E.C (2024 GC)", "2015 E.C (2023 GC)", "2014 E.C (2022 GC)", "2013 E.C (2021 GC)"],
    stream: "social"
  }
];

export const PRELOADED_QUIZZES: Record<string, any> = {
  "maths_s5": {
    title: "Linear Equations in One Variable (Grade 9)",
    grade: "Grade 9",
    subject: "Mathematics",
    unit: "Unit 2: Equations and Inequalities",
    subtopic: "Linear Equations in One Variable",
    questions: [
      {
        question: "Solve the linear equation for x: 3(x - 4) = 2x + 5.",
        options: ["x = 9", "x = 17", "x = 1", "x = -17"],
        correctAnswerIndex: 1,
        explanation: "Expanding the left side: 3x - 12 = 2x + 5. Subtract 2x from both sides: x - 12 = 5. Add 12 to both sides: x = 17."
      },
      {
        question: "For what value of k will the equation 4x - k = 2(2x - 3) have infinitely many solutions?",
        options: ["k = 3", "k = -3", "k = 6", "k = -6"],
        correctAnswerIndex: 2,
        explanation: "Expanding the right side: 4x - k = 4x - 6. For this to have infinitely many solutions, the coordinates must be identical on both sides. Hence, -k = -6, leading to k = 6."
      },
      {
        question: "If 2a + 5 = 15, what is the value of 4a - 3?",
        options: ["17", "20", "23", "37"],
        correctAnswerIndex: 0,
        explanation: "First solve 2a + 5 = 15 => 2a = 10 => a = 5. Then substitute a into 4a - 3: 4(5) - 3 = 20 - 3 = 17."
      },
      {
        question: "Solve: (2x / 3) - 4 = 2.",
        options: ["x = 9", "x = 15", "x = 6", "x = 3"],
        correctAnswerIndex: 0,
        explanation: "Add 4 to both sides: 2x / 3 = 6. Multiply by 3: 2x = 18. Divide by 2: x = 9."
      },
      {
        question: "Which of the following is equivalent to 5 - 2(3x - 1) = 4?",
        options: ["7 - 6x = 4", "3 - 6x = 4", "5 - 6x - 2 = 4", "3x - 1 = 2"],
        correctAnswerIndex: 0,
        explanation: "Distribute -2: 5 - 6x + 2 = 4. Combine like terms: 7 - 6x = 4."
      },
      {
        question: "Evaluate x if 0.4x + 1.2 = 3.2.",
        options: ["x = 5", "x = 10", "x = 2", "x = 8"],
        correctAnswerIndex: 0,
        explanation: "Subtract 1.2: 0.4x = 2.0. Divide by 0.4: x = 2 / 0.4 = 5."
      },
      {
        question: "An equation of the form ax + b = 0 with a != 0 is guaranteed to have how many solutions in the set of real numbers?",
        options: ["No solution", "Exactly one solution", "Infinitely many solutions", "Two solutions"],
        correctAnswerIndex: 1,
        explanation: "Since a is nonzero, we can solve uniquely as x = -b/a, which yields exactly one real solution."
      },
      {
        question: "Solve the equation: x + 5 = x + 2.",
        options: ["x = 0", "All real numbers", "x = -3", "No solution"],
        correctAnswerIndex: 3,
        explanation: "Subtracting x from both sides yields 5 = 2, which is a mathematical contradiction (false statement). Thus, it has no solution."
      },
      {
        question: "Solve for y: -(2/5)y = 8.",
        options: ["y = -20", "y = -16", "y = 20", "y = -10"],
        correctAnswerIndex: 0,
        explanation: "Multiply both sides by -5: 2y = -40. Divide by 2: y = -20."
      },
      {
        question: "If a linear equation has the form 0x = 0, what is the set of solutions?",
        options: ["Empty set", "Only 0", "Set of all real numbers", "Not defined"],
        correctAnswerIndex: 2,
        explanation: "Since any real number multiplied by 0 equals 0, the equation 0 = 0 is always true. Thus, all real numbers are solutions."
      }
    ]
  },
  "physics_s4": {
    title: "Fundamental and Derived Quantities",
    grade: "Grade 9",
    subject: "Physics",
    unit: "Unit 2: Physical Quantities and Measurement",
    subtopic: "Fundamental and Derived Physical Quantities",
    questions: [
      {
        question: "Which of the following physical quantities is an SI fundamental (base) quantity?",
        options: ["Force", "Velocity", "Thermodynamic Temperature", "Electric Charge"],
        correctAnswerIndex: 2,
        explanation: "The 7 SI base quantities are length, mass, time, electric current, thermodynamic temperature, amount of substance, and luminous intensity. Temperature is base, while force and velocity are derived, and electric charge is derived (current * time)."
      },
      {
        question: "Which SI unit corresponding to a fundamental quantity is defined based on the Planck constant?",
        options: ["Kilogram", "Second", "Meter", "Kelvin"],
        correctAnswerIndex: 0,
        explanation: "In the 2019 redefinition of SI base units, the kilogram is defined in terms of the Planck constant (h)."
      },
      {
        question: "The Unit of force, Newton (N), can be expressed in base SI units as:",
        options: ["kg m s^-1", "kg m s^-2", "kg m^2 s^-2", "g cm s^-2"],
        correctAnswerIndex: 1,
        explanation: "From F = ma, unit of Force = mass * acceleration = kg * m/s^2 = kg m s^-2."
      },
      {
        question: "Which of the following is a derived quantity?",
        options: ["Luminous Intensity", "Electric Current", "Electric Resistance", "Amount of Substance"],
        correctAnswerIndex: 2,
        explanation: "Electric Resistance is derived (Ohms = Volts/Ampere), while luminous intensity (candela), electric current (ampere), and amount of substance (mole) are fundamental."
      },
      {
        question: "Which SI unit is defined using the speed of light in a vacuum?",
        options: ["Meter", "Second", "Kilogram", "Ampere"],
        correctAnswerIndex: 0,
        explanation: "The meter is defined as the distance traveled by light in vacuum during a time interval of 1/299,792,458 of a second."
      },
      {
        question: "Identify the base SI unit of electric current.",
        options: ["Volt", "Ohm", "Coulomb", "Ampere"],
        correctAnswerIndex: 3,
        explanation: "The SI base unit of electric current is the Ampere (A)."
      },
      {
        question: "Which of the following quantities is dimensionless?",
        options: ["Refractive Index", "Frequency", "Density", "Acceleration"],
        correctAnswerIndex: 0,
        explanation: "Refractive index is the ratio of speeds (c/v), which makes it a ratio of identical units, resulting in a dimensionless quantity."
      },
      {
        question: "The derived SI unit for Pressure, the Pascal (Pa), is equivalent to:",
        options: ["N m", "N / m", "N / m^2", "kg / m s"],
        correctAnswerIndex: 2,
        explanation: "Pressure = Force / Area, so its unit is Newton per square meter (N/m^2)."
      },
      {
        question: "What is the SI unit of luminous intensity?",
        options: ["Lumen", "Lux", "Candela", "Watt"],
        correctAnswerIndex: 2,
        explanation: "The SI base unit of luminous intensity is the Candela (cd)."
      },
      {
        question: "Which fundamental quantity has the unit 'Mole'?",
        options: ["Mass", "Amount of Substance", "Luminous Intensity", "Electric Current"],
        correctAnswerIndex: 1,
        explanation: "The mole is the SI base unit representing the amount of substance."
      }
    ]
  }
};
