export const departments = [
  { name: "Emergency" },
  { name: "Anaesthetics" },
  { name: "Surgery" },
  { name: "Laboratory" },
  { name: "Pediatrics" },
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

export const shifts = [
  {
    dayOfWeek: "Monday",
    time: "Morning Shift",
  },
  {
    dayOfWeek: "Monday",
    time: "Afternoon Shift",
  },
  {
    dayOfWeek: "Monday",
    time: "Night Shift",
  },
  {
    dayOfWeek: "Tuesday",
    time: "Morning Shift",
  },
  {
    dayOfWeek: "Tuesday",
    time: "Afternoon Shift",
  },
  {
    dayOfWeek: "Tuesday",
    time: "Night Shift",
  },
  {
    dayOfWeek: "Wednesday",
    time: "Morning Shift",
  },
  {
    dayOfWeek: "Wednesday",
    time: "Afternoon Shift",
  },
  {
    dayOfWeek: "Wednesday",
    time: "Night Shift",
  },
  {
    dayOfWeek: "Thursday",
    time: "Morning Shift",
  },
  {
    dayOfWeek: "Thursday",
    time: "Afternoon Shift",
  },
  {
    dayOfWeek: "Thursday",
    time: "Night Shift",
  },
  {
    dayOfWeek: "Friday",
    time: "Morning Shift",
  },
  {
    dayOfWeek: "Friday",
    time: "Afternoon Shift",
  },
  {
    dayOfWeek: "Friday",
    time: "Night Shift",
  },
  {
    dayOfWeek: "Saturday",
    time: "Morning Shift",
  },
  {
    dayOfWeek: "Saturday",
    time: "Afternoon Shift",
  },
  {
    dayOfWeek: "Saturday",
    time: "Night Shift",
  },
  {
    dayOfWeek: "Sunday",
    time: "Morning Shift",
  },
  {
    dayOfWeek: "Sunday",
    time: "Afternoon Shift",
  },
  {
    dayOfWeek: "Sunday",
    time: "Night Shift",
  },
];
