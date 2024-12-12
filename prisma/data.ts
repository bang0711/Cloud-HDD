export const departments = [
  { name: "Emergency" },
  { name: "Anaesthetics" },
  { name: "Surgery" },
  { name: "Laboratory" },
  { name: "Pediatrics" },
  { name: "Neurology" },
  { name: "Ophthalmology" },
  { name: "Otorhinolaryngology" },
  { name: "Cardiology" },
  { name: "Gastroenterology" },
  { name: "Gynaecology" },
  { name: "Orthopedics" },
];

export const allergens = [
  // Food allergens
  {
    allergen: "Balsam of Peru",
    symptoms:
      "Redness, swelling, itching, dermatitis reactions, stomatitis, cheilitis, pruritus, hand eczema, rhinitis, conjunctivitis, and blisters.",
    category: "Food",
  },
  {
    allergen: "Buckwheat",
    symptoms:
      "Asthma, rhinitis, pruritus, gastrointestinal disturbances, urticaria, angioedema, shock, anaphylaxis",
    category: "Food",
  },
  {
    allergen: "Celery",
    symptoms:
      "Abdominal pain, nausea, vomiting, oral allergy syndrome, urticaria, neck or facial swelling, severe asthma symptoms, exercise-induced anaphylaxis, potentially fatal anaphylactic shocks",
    category: "Food",
  },
  {
    allergen: "Egg",
    symptoms: "Anaphylaxis, swelling, sometimes flatulence and vomiting",
    category: "Food",
  },
  {
    allergen: "Fish",
    symptoms:
      "Respiratory reactions, anaphylaxis, oral allergy syndrome, sometimes vomiting",
    category: "Food",
  },
  {
    allergen: "Fruit",
    symptoms:
      "Mild itching, rash, generalized urticaria, oral allergy syndrome, abdominal pain, vomiting, anaphylaxis",
    category: "Food",
  },
  {
    allergen: "Garlic",
    symptoms: "Dermatitis, asymmetrical fissure",
    category: "Food",
  },
  {
    allergen: "Oats",
    symptoms: "Dermatitis, respiratory problems, anaphylaxis",
    category: "Food",
  },
  {
    allergen: "Maize",
    symptoms:
      "Hives, pallor, confusion, dizziness, stomach pain, swelling, vomiting, indigestion, diarrhea, cough, tightness in throat",
    category: "Food",
  },
  {
    allergen: "Milk",
    symptoms:
      "Skin rash, hives, vomiting, diarrhea, constipation, stomach pain, flatulence, colitis, nasal congestion, dermatitis, blisters, migraine, anaphylaxis",
    category: "Food",
  },
  {
    allergen: "Mustard",
    symptoms:
      "Eczema, rash, hives, facial swelling, other skin reactions, oral allergy syndrome, conjunctivitis",
    category: "Food",
  },
  {
    allergen: "Peanut",
    symptoms: "Anaphylaxis and swelling, sometimes vomiting",
    category: "Food",
  },
  {
    allergen: "Poultry Meat",
    symptoms:
      "Hives, swelling, nausea, vomiting, diarrhea, severe oral allergy syndrome, shortness of breath, rarely anaphylactic shock",
    category: "Food",
  },
  {
    allergen: "Red Meat",
    symptoms:
      "Hives, swelling, dermatitis, stomach pain, nausea, vomiting, dizziness, fainting, shortness of breath, anaphylaxis",
    category: "Food",
  },
  {
    allergen: "Rice",
    symptoms: "Sneezing, runny nose, itching, stomachache, eczema.",
    category: "Food",
  },
  {
    allergen: "Sesame",
    symptoms:
      "Possible respiratory, skin, and gastrointestinal reactions which can trigger serious systemic anaphylactic responses.",
    category: "Food",
  },
  {
    allergen: "Shellfish",
    symptoms:
      "Respiratory symptoms, anaphylaxis, oral allergy syndrome, gastrointestinal symptoms, rhinitis, conjunctivitis",
    category: "Food",
  },
  {
    allergen: "Soy",
    symptoms:
      "Anaphylaxis, asthma exacerbation, rhinitis, allergic conjunctivitis, hives, atopic dermatitis, swelling, diarrhea, nausea, vomiting",
    category: "Food",
  },
  {
    allergen: "Sulfites",
    symptoms:
      "Hives, rash, redness of skin, headache, burning behind eyes, asthma-like breathing difficulties, anaphylaxis",
    category: "Food",
  },
  {
    allergen: "Tartrazine",
    symptoms: "Skin irritation, hives, rash",
    category: "Food",
  },
  {
    allergen: "Tree nut",
    symptoms: "Anaphylaxis, swelling, rash, hives, sometimes vomiting",
    category: "Food",
  },
  {
    allergen: "Wheat",
    symptoms:
      "Eczema, hives, asthma, hay fever, oral allergy syndrome, angioedema, abdominal cramps, celiac disease, exercise-induced anaphylaxis",
    category: "Food",
  },

  // Medical allergens
  {
    allergen: "Tetracycline",
    symptoms:
      "Severe headache, dizziness, blurred vision, fever, chills, body aches, flu symptoms, dark colored urine",
    category: "Medical",
  },
  {
    allergen: "Dilantin",
    symptoms: "Swollen glands, easy bruising or bleeding, fever, sore throat",
    category: "Medical",
  },
  {
    allergen: "Tegretol",
    symptoms:
      "Shortness of breath, wheezing or difficulty breathing, swelling of the face, lips, tongue, hives",
    category: "Medical",
  },
  {
    allergen: "Penicillin",
    symptoms:
      "Diarrhea, hypersensitivity, nausea, rash, neurotoxicity, urticaria",
    category: "Medical",
  },
  {
    allergen: "Cephalosporins",
    symptoms: "Maculopapular, serum-sickness–like reactions, and anaphylaxis.",
    category: "Medical",
  },
  {
    allergen: "Sulfonamides",
    symptoms:
      "Urinary tract disorders, haemopoietic disorder, Stevens–Johnson syndrome",
    category: "Medical",
  },
  {
    allergen: "Non-steroidal anti-inflammatories",
    symptoms: "Swollen eyes, lips, or tongue, difficulty swallowing",
    category: "Medical",
  },
  {
    allergen: "Intravenous contrast dye",
    symptoms: "Anaphylactoid reactions and contrast-induced nephropathy",
    category: "Medical",
  },
  {
    allergen: "Local anesthetics",
    symptoms:
      "Urticaria and rash, dyspnea, wheezing, flushing, cyanosis, tachycardia",
    category: "Medical",
  },

  // Environmental allergens
  {
    allergen: "Pollen",
    symptoms:
      "Sneezing, irritation of the nose, nasal congestion, minor fatigue",
    category: "Environmental",
  },
  {
    allergen: "Cat",
    symptoms: "Sneezing, itchy swollen eyes, rash, congestion, wheezing",
    category: "Environmental",
  },
  {
    allergen: "Dog",
    symptoms:
      "Rash, sneezing, congestion, wheezing, vomiting from coughing, itchy welts.",
    category: "Environmental",
  },
  {
    allergen: "Insect sting",
    symptoms: "Hives, wheezing, possible anaphylaxis",
    category: "Environmental",
  },
  {
    allergen: "Mold",
    symptoms:
      "Sneeze, coughing, itchy, discharge from the nose, respiratory irritation, congested feeling",
    category: "Environmental",
  },
  {
    allergen: "Perfume",
    symptoms:
      "Itchy eyes, runny nose, sore throat, headaches, muscle/joint pain, asthma attack",
    category: "Environmental",
  },
  {
    allergen: "Cosmetics",
    symptoms:
      "Contact dermatitis, irritant contact dermatitis, conjunctivitis, sneezing",
    category: "Environmental",
  },
  {
    allergen: "Semen",
    symptoms:
      "Burning, pain and swelling, swelling or blisters, vaginal redness, fever, runny nose, extreme fatigue",
    category: "Environmental",
  },
  {
    allergen: "Latex",
    symptoms: "Contact dermatitis, hypersensitivity",
    category: "Environmental",
  },
  {
    allergen: "Water",
    symptoms:
      "Epidermal itching, swelling of the oral cavity after drinking water, anaphylaxis",
    category: "Environmental",
  },
  {
    allergen: "Cold stimuli",
    symptoms: "Hives, itching",
    category: "Environmental",
  },
  {
    allergen: "House dust mite",
    symptoms: "Asthma",
    category: "Environmental",
  },
  {
    allergen: "Nickel",
    symptoms: "Allergic contact dermatitis, dyshidrotic eczema",
    category: "Environmental",
  },
  {
    allergen: "Gold",
    symptoms: "Allergic contact dermatitis",
    category: "Environmental",
  },
  {
    allergen: "Chromium",
    symptoms: "Allergic contact dermatitis",
    category: "Environmental",
  },
  {
    allergen: "Cobalt chloride",
    symptoms: "Allergic contact dermatitis",
    category: "Environmental",
  },
  {
    allergen: "Formaldehyde",
    symptoms: "Allergic contact dermatitis",
    category: "Environmental",
  },
  {
    allergen: "Photographic developers",
    symptoms: "Allergic contact dermatitis",
    category: "Environmental",
  },
  {
    allergen: "Fungicide",
    symptoms: "Allergic contact dermatitis, fever, anaphylaxis",
    category: "Environmental",
  },

  // Contact allergens
  {
    allergen: "Dimethylaminopropylamine (DMAPA)",
    symptoms: "Eyelid dermatitis",
    category: "Contact",
  },
  {
    allergen: "Latex",
    symptoms:
      "Ethylene-ripened fruits, allergic contact dermatitis, hypersensitivity",
    category: "Contact",
  },
  {
    allergen: "Paraphenylenediamine (PPD)",
    symptoms:
      "Eyelid dermatitis, black hair dye, color developer, scuba gear, henna",
    category: "Contact",
  },
  {
    allergen: "Glyceryl monothioglycolate",
    symptoms: "Eyelid dermatitis, permanent hair waving solutions",
    category: "Contact",
  },
  {
    allergen: "Toluenesulfonamide formaldehyde",
    symptoms: "Eyelid dermatitis, nail polish",
    category: "Contact",
  },
  {
    allergen: "Tennis ball felt waterproofing agent (Nano Titanium dioxide)",
    symptoms:
      "Weight gain in middle-aged subjects, physical contact in hypersensitive patients only",
    category: "Contact",
  },
];

export const medicines = [
  // Emergency
  {
    name: "Epinephrine",
    effect: "Treatment of severe allergic reactions, cardiac arrest",
    sideEffect: "Palpitations, anxiety",
    price: 25.0,
  },
  {
    name: "Atropine",
    effect: "Treatment of bradycardia, poisoning",
    sideEffect: "Dry mouth, blurred vision",
    price: 15.0,
  },
  {
    name: "Naloxone",
    effect: "Reverses opioid overdose",
    sideEffect: "Rapid heart rate, sweating",
    price: 18.0,
  },
  // Anaesthetics
  {
    name: "Propofol",
    effect: "Induces and maintains anesthesia",
    sideEffect: "Low blood pressure, respiratory depression",
    price: 50.0,
  },
  {
    name: "Lidocaine",
    effect: "Local anesthetic",
    sideEffect: "Dizziness, numbness",
    price: 12.0,
  },
  {
    name: "Fentanyl",
    effect: "Pain relief, anesthetic adjunct",
    sideEffect: "Nausea, respiratory depression",
    price: 75.0,
  },
  // Surgery
  {
    name: "Cefazolin",
    effect: "Prevents infection during surgery",
    sideEffect: "Allergic reactions, diarrhea",
    price: 20.0,
  },
  {
    name: "Heparin",
    effect: "Prevents blood clots during surgery",
    sideEffect: "Bleeding, thrombocytopenia",
    price: 30.0,
  },
  {
    name: "Ketamine",
    effect: "Induction of anesthesia, pain relief",
    sideEffect: "Hallucinations, hypertension",
    price: 40.0,
  },
  // Laboratory
  {
    name: "Glucose",
    effect: "Blood sugar regulation",
    sideEffect: "Hyperglycemia in high doses",
    price: 5.0,
  },
  {
    name: "Saline",
    effect: "Fluid replacement",
    sideEffect: "Overhydration",
    price: 2.5,
  },
  {
    name: "Potassium chloride",
    effect: "Electrolyte replenishment",
    sideEffect: "Hyperkalemia",
    price: 10.0,
  },
  // Pediatrics
  {
    name: "Amoxicillin",
    effect: "Treats bacterial infections",
    sideEffect: "Rash, diarrhea",
    price: 8.0,
  },
  {
    name: "Ibuprofen (Pediatric)",
    effect: "Pain relief, fever reducer",
    sideEffect: "Stomach upset, kidney damage",
    price: 6.0,
  },
  {
    name: "Diphenhydramine",
    effect: "Allergy relief, sleep aid",
    sideEffect: "Drowsiness, dry mouth",
    price: 7.5,
  },
  // Neurology
  {
    name: "Diazepam",
    effect: "Anxiety relief, muscle relaxation",
    sideEffect: "Drowsiness, dizziness",
    price: 20.0,
  },
  {
    name: "Carbamazepine",
    effect: "Treats seizures, neuropathic pain",
    sideEffect: "Dizziness, nausea",
    price: 22.0,
  },
  {
    name: "Levetiracetam",
    effect: "Seizure prevention",
    sideEffect: "Fatigue, mood changes",
    price: 25.0,
  },
  // Ophthalmology
  {
    name: "Timolol",
    effect: "Reduces intraocular pressure",
    sideEffect: "Burning sensation, blurred vision",
    price: 15.0,
  },
  {
    name: "Atropine (Ophthalmic)",
    effect: "Dilates pupils",
    sideEffect: "Dry mouth, blurred vision",
    price: 12.0,
  },
  {
    name: "Prednisolone acetate",
    effect: "Reduces eye inflammation",
    sideEffect: "Increased eye pressure",
    price: 18.0,
  },
  // Otorhinolaryngology
  {
    name: "Fluticasone nasal spray",
    effect: "Reduces nasal inflammation",
    sideEffect: "Nosebleeds, throat irritation",
    price: 10.0,
  },
  {
    name: "Cetirizine",
    effect: "Allergy relief",
    sideEffect: "Drowsiness, dry mouth",
    price: 8.0,
  },
  {
    name: "Amoxicillin-clavulanate",
    effect: "Treats ENT infections",
    sideEffect: "Diarrhea, rash",
    price: 14.0,
  },
  // Cardiology
  {
    name: "Atenolol",
    effect: "Reduces blood pressure, treats angina",
    sideEffect: "Bradycardia, fatigue",
    price: 20.0,
  },
  {
    name: "Lisinopril",
    effect: "Lowers blood pressure, treats heart failure",
    sideEffect: "Cough, hyperkalemia",
    price: 18.0,
  },
  {
    name: "Clopidogrel",
    effect: "Prevents blood clots",
    sideEffect: "Bleeding, rash",
    price: 25.0,
  },
  // Gastroenterology
  {
    name: "Omeprazole",
    effect: "Reduces stomach acid",
    sideEffect: "Headache, diarrhea",
    price: 12.0,
  },
  {
    name: "Metoclopramide",
    effect: "Treats nausea, GERD",
    sideEffect: "Drowsiness, restlessness",
    price: 10.0,
  },
  {
    name: "Lactulose",
    effect: "Treats constipation, hepatic encephalopathy",
    sideEffect: "Bloating, diarrhea",
    price: 15.0,
  },
  // Gynaecology
  {
    name: "Estradiol",
    effect: "Hormone replacement therapy",
    sideEffect: "Breast tenderness, nausea",
    price: 25.0,
  },
  {
    name: "Medroxyprogesterone",
    effect: "Prevents endometrial hyperplasia",
    sideEffect: "Weight gain, mood changes",
    price: 20.0,
  },
  {
    name: "Clomiphene",
    effect: "Treats infertility",
    sideEffect: "Hot flashes, ovarian enlargement",
    price: 30.0,
  },
  // Orthopedics
  {
    name: "Methocarbamol",
    effect: "Muscle relaxation",
    sideEffect: "Drowsiness, dizziness",
    price: 18.0,
  },
  {
    name: "Alendronate",
    effect: "Treats osteoporosis",
    sideEffect: "Esophageal irritation, muscle pain",
    price: 25.0,
  },
  {
    name: "Naproxen",
    effect: "Pain relief, anti-inflammatory",
    sideEffect: "Stomach ulcers, kidney damage",
    price: 12.0,
  },
  // Additional Medicines
  {
    name: "Aspirin",
    effect: "Pain relief, anti-inflammatory, fever reducer",
    sideEffect: "Gastric irritation, bleeding",
    price: 5.0,
  },
  {
    name: "Paracetamol",
    effect: "Pain relief, fever reducer",
    sideEffect: "Liver damage in high doses",
    price: 3.5,
  },
  {
    name: "Ibuprofen",
    effect: "Pain relief, anti-inflammatory, fever reducer",
    sideEffect: "Stomach ulcers, kidney damage",
    price: 4.2,
  },
  {
    name: "Hydrocortisone",
    effect: "Reduces inflammation",
    sideEffect: "Weight gain, mood changes",
    price: 10.0,
  },
  {
    name: "Warfarin",
    effect: "Prevents blood clots",
    sideEffect: "Bleeding, bruising",
    price: 22.0,
  },
  {
    name: "Clindamycin",
    effect: "Treats bacterial infections",
    sideEffect: "Diarrhea, nausea",
    price: 15.0,
  },
  {
    name: "Dexamethasone",
    effect: "Reduces inflammation",
    sideEffect: "Increased appetite, weight gain",
    price: 18.0,
  },
  {
    name: "Gentamicin",
    effect: "Treats serious bacterial infections",
    sideEffect: "Kidney damage, hearing loss",
    price: 30.0,
  },
  {
    name: "Tetracycline",
    effect: "Treats bacterial infections",
    sideEffect: "Photosensitivity, nausea",
    price: 12.0,
  },
  {
    name: "Morphine",
    effect: "Pain relief",
    sideEffect: "Respiratory depression, nausea",
    price: 35.0,
  },
  {
    name: "Furosemide",
    effect: "Diuretic, reduces fluid buildup",
    sideEffect: "Dehydration, electrolyte imbalance",
    price: 8.0,
  },
  {
    name: "Verapamil",
    effect: "Treats high blood pressure, angina",
    sideEffect: "Constipation, dizziness",
    price: 22.0,
  },
  {
    name: "Losartan",
    effect: "Lowers blood pressure",
    sideEffect: "Dizziness, increased potassium levels",
    price: 20.0,
  },
  {
    name: "Spironolactone",
    effect: "Diuretic, treats heart failure",
    sideEffect: "Hyperkalemia, breast tenderness",
    price: 25.0,
  },
  {
    name: "Digoxin",
    effect: "Treats heart failure, arrhythmias",
    sideEffect: "Nausea, dizziness",
    price: 28.0,
  },
  {
    name: "Nitroglycerin",
    effect: "Treats angina",
    sideEffect: "Headache, dizziness",
    price: 18.0,
  },
  {
    name: "Ceftriaxone",
    effect: "Treats bacterial infections",
    sideEffect: "Diarrhea, rash",
    price: 20.0,
  },
  {
    name: "Hydrochlorothiazide",
    effect: "Diuretic, treats high blood pressure",
    sideEffect: "Low potassium, dizziness",
    price: 10.0,
  },
  {
    name: "Simvastatin",
    effect: "Lowers cholesterol",
    sideEffect: "Muscle pain, liver damage",
    price: 15.0,
  },
  {
    name: "Metformin",
    effect: "Treats type 2 diabetes",
    sideEffect: "Nausea, diarrhea",
    price: 12.0,
  },
  {
    name: "Insulin",
    effect: "Lowers blood sugar levels",
    sideEffect: "Hypoglycemia, weight gain",
    price: 35.0,
  },
  {
    name: "Salbutamol",
    effect: "Bronchodilator, treats asthma",
    sideEffect: "Tremor, palpitations",
    price: 10.0,
  },
  {
    name: "Montelukast",
    effect: "Treats asthma, allergies",
    sideEffect: "Headache, abdominal pain",
    price: 15.0,
  },
  {
    name: "Ranitidine",
    effect: "Reduces stomach acid",
    sideEffect: "Headache, dizziness",
    price: 10.0,
  },
  {
    name: "Azithromycin",
    effect: "Treats bacterial infections",
    sideEffect: "Diarrhea, nausea",
    price: 20.0,
  },
  {
    name: "Clotrimazole",
    effect: "Treats fungal infections",
    sideEffect: "Skin irritation, rash",
    price: 8.0,
  },
];
