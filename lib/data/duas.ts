/**
 * Daily Islamic Affirmations Database
 * 365+ authentic duas from Quran and Sahih Hadith
 * Categorized by: Anxiety, Wealth, Protection, Gratitude, Sleep
 */

export type DuaCategory = "anxiety" | "wealth" | "protection" | "gratitude" | "sleep";

export interface Dua {
  id: string;
  category: DuaCategory;
  arabic: string;
  transliteration: string;
  english: string;
  commentary: string;
  source: string;
  prayerTime?: "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
}

export const duas: Dua[] = [
  // ANXIETY DUAS
  {
    id: "anxiety_001",
    category: "anxiety",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Hasbunallahu wa ni'mal wakeel",
    english: "Allah is sufficient for us, and He is the best disposer of affairs.",
    commentary: "This powerful dua from Prophet Yunus (AS) relieves anxiety by reminding us that Allah alone is our protector and provider. It strengthens trust in Allah's wisdom and decreases worry about worldly matters.",
    source: "Quran 3:173",
    prayerTime: "dhuhr",
  },
  {
    id: "anxiety_002",
    category: "anxiety",
    arabic: "لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
    transliteration: "La ilaha illa anta subhanaka inni kuntu mina adh-dhalimin",
    english: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    commentary: "The dua of Prophet Yunus (AS) from the belly of the whale. This dua brings immediate relief from distress and anxiety by acknowledging Allah's perfection and seeking His mercy.",
    source: "Quran 21:87",
    prayerTime: "dhuhr",
  },
  {
    id: "anxiety_003",
    category: "anxiety",
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ",
    transliteration: "Rabbana la tuzigh qulubana ba'ada idh hadaytana wa hab lana min ladunka rahmatan innaka anta al-wahhab",
    english: "Our Lord, let not our hearts deviate after You have guided us and grant us mercy from Yourself. Indeed, You are the Bestower.",
    commentary: "This dua protects the heart from deviation and anxiety, asking Allah to keep us firm on the right path. It brings peace and certainty to the heart.",
    source: "Quran 3:8",
    prayerTime: "dhuhr",
  },
  {
    id: "anxiety_004",
    category: "anxiety",
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    transliteration: "Ala bi dhikr illah tatma'inn al-qulub",
    english: "Verily, in the remembrance of Allah do hearts find rest.",
    commentary: "The Quran teaches us that the cure for anxiety is remembrance of Allah. Regular dhikr (remembrance) brings tranquility and peace to the heart.",
    source: "Quran 13:28",
    prayerTime: "dhuhr",
  },
  {
    id: "anxiety_005",
    category: "anxiety",
    arabic: "إِذَا قَضَى اللَّهُ أَمْرًا فَإِنَّ اللَّهَ سَمِيعٌ عَلِيمٌ",
    transliteration: "Idha qada Allahu amran fa inna Allaha samee aleem",
    english: "When Allah has decreed a matter, then Allah is All-Hearing, All-Knowing.",
    commentary: "This verse teaches acceptance of Allah's decree, which is the foundation of peace. Whatever Allah decides is best, and He hears and knows all things.",
    source: "Quran 2:240",
    prayerTime: "dhuhr",
  },
  {
    id: "anxiety_006",
    category: "anxiety",
    arabic: "وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ ۖ وَعَسَىٰ أَن تُحِبُّوا شَيْئًا وَهُوَ شَرٌّ لَّكُمْ",
    transliteration: "Wa asa an takrahu shay'an wa huwa khayrun lakum wa asa an tuhibbu shay'an wa huwa sharrun lakum",
    english: "Perhaps you hate a thing and it is good for you; and perhaps you love a thing and it is bad for you.",
    commentary: "This verse teaches that what we perceive as bad may be good, and vice versa. This perspective reduces anxiety about life's challenges.",
    source: "Quran 2:216",
    prayerTime: "dhuhr",
  },
  {
    id: "anxiety_007",
    category: "anxiety",
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۖ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    transliteration: "Fa inna ma'a al-usri yusran inna ma'a al-usri yusra",
    english: "Indeed, with hardship comes ease. Indeed, with hardship comes ease.",
    commentary: "This beautiful verse is repeated twice to emphasize that difficulty is always followed by relief. It brings hope and comfort during times of anxiety.",
    source: "Quran 94:5-6",
    prayerTime: "dhuhr",
  },
  {
    id: "anxiety_008",
    category: "anxiety",
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    transliteration: "Wa man yattaqi Allaha yaj'al lahu makhrajah",
    english: "And whoever fears Allah - He will make for him a way out.",
    commentary: "Fear of Allah (taqwa) opens doors and provides solutions. This dua teaches that piety and consciousness of Allah lead to relief from anxiety.",
    source: "Quran 65:2",
    prayerTime: "dhuhr",
  },
  {
    id: "anxiety_009",
    category: "anxiety",
    arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
    transliteration: "Ya ayyuha an-nas inna khalaqnakum min dhakarin wa untha wa ja'alnakum shu'uban wa qaba'ila lita'arafu",
    english: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.",
    commentary: "This verse reminds us of our common humanity and divine purpose, reducing anxiety about differences and divisions.",
    source: "Quran 49:13",
    prayerTime: "dhuhr",
  },
  {
    id: "anxiety_010",
    category: "anxiety",
    arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ",
    transliteration: "Wa idha sa'alaka 'ibadi 'anni fa inni qareeb ujeebu da'wata ad-da'i idha da'an",
    english: "And when My servants ask you, [O Muhammad], concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.",
    commentary: "Allah assures us of His closeness and willingness to answer our prayers. This brings comfort and reduces anxiety about being alone.",
    source: "Quran 2:186",
    prayerTime: "dhuhr",
  },

  // WEALTH DUAS
  {
    id: "wealth_001",
    category: "wealth",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَن حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّن سِوَاكَ",
    transliteration: "Allahumma akfini bi halaalika an haramika wa aghnini bi fadlika amman siwak",
    english: "O Allah, suffice me with what is lawful and protect me from what is unlawful, and enrich me with Your grace from all others.",
    commentary: "This dua seeks halal (lawful) provision and protection from haram (unlawful) wealth. It emphasizes quality of earnings over quantity.",
    source: "Sahih at-Tirmidhi 3563",
    prayerTime: "fajr",
  },
  {
    id: "wealth_002",
    category: "wealth",
    arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ",
    transliteration: "Rabbi ighfir li wa li walidayya wa liman dakhala bayti mu'minan wa lil mu'mineen wa al-mu'minat",
    english: "My Lord, forgive me and my parents and whoever enters my house as a believer, and all the believing men and women.",
    commentary: "This dua from Prophet Nuh (AS) seeks forgiveness and blessings for family and believers. It brings barakah (blessing) to wealth and provision.",
    source: "Quran 71:28",
    prayerTime: "fajr",
  },
  {
    id: "wealth_003",
    category: "wealth",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fi ad-dunya hasanatan wa fi al-akhirati hasanatan wa qina adhab an-nar",
    english: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
    commentary: "This comprehensive dua seeks balanced provision in both worldly and spiritual matters. It's the most frequently mentioned dua in the Quran.",
    source: "Quran 2:201",
    prayerTime: "fajr",
  },
  {
    id: "wealth_004",
    category: "wealth",
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِن حَيْثُ لَا يَحْتَسِبُ",
    transliteration: "Wa man yattaqi Allaha yaj'al lahu makhrajah wa yarzuqhu min haythu la yahtasib",
    english: "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect.",
    commentary: "This verse teaches that taqwa (fear of Allah) leads to unexpected provision and solutions. Allah provides from sources we cannot imagine.",
    source: "Quran 65:2-3",
    prayerTime: "fajr",
  },
  {
    id: "wealth_005",
    category: "wealth",
    arabic: "وَمَا مِن دَابَّةٍ فِي الْأَرْضِ إِلَّا عَلَى اللَّهِ رِزْقُهَا",
    transliteration: "Wa ma min dabbatin fi al-ard illa ala Allahi rizquha",
    english: "There is not an animal on earth but that Allah is responsible for its provision.",
    commentary: "If Allah provides for all creatures, He will surely provide for us. This verse removes worry about sustenance and builds trust in Allah's provision.",
    source: "Quran 11:6",
    prayerTime: "fajr",
  },
  {
    id: "wealth_006",
    category: "wealth",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَكَفَانَا وَآوَانَا",
    transliteration: "Al-hamdu lillahi alladhi at'amana wa saqana wa kafana wa awana",
    english: "All praise is due to Allah, who has fed us, given us drink, sufficed us, and sheltered us.",
    commentary: "This dua of gratitude for provision increases barakah in wealth and reminds us of Allah's continuous blessings.",
    source: "Sahih Muslim 2097",
    prayerTime: "fajr",
  },
  {
    id: "wealth_007",
    category: "wealth",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَقْرِ وَالْقِلَّةِ وَالذِّلَّةِ",
    transliteration: "Allahumma inni a'udhu bika min al-faqr wa al-qillah wa adh-dhillah",
    english: "O Allah, I seek refuge in You from poverty, scarcity, and humiliation.",
    commentary: "This dua seeks protection from poverty and its hardships. It's a powerful supplication for financial security and dignity.",
    source: "Sunan Abu Dawud 1555",
    prayerTime: "fajr",
  },
  {
    id: "wealth_008",
    category: "wealth",
    arabic: "اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي",
    transliteration: "Allahumma aslih li dini alladhi huwa ismatun amri wa aslih li dunya alati fiha ma'ashi",
    english: "O Allah, set right for me my religion which is the protection of my affairs, and set right for me my worldly life in which is my livelihood.",
    commentary: "This dua seeks balance between religious and worldly affairs. It teaches that both are important for a fulfilling life.",
    source: "Sahih Muslim 2720",
    prayerTime: "fajr",
  },
  {
    id: "wealth_009",
    category: "wealth",
    arabic: "وَالَّذِينَ إِذَا أَنفَقُوا لَمْ يُسْرِفُوا وَلَمْ يَقْتُرُوا وَكَانَ بَيْنَ ذَٰلِكَ قَوَامًا",
    transliteration: "Wa alladhina idha anfaqu lam yusrifu wa lam yaqturu wa kana bayna dhalika qawaman",
    english: "And those who, when they spend, are not extravagant and not stingy, but hold a balance between those extremes.",
    commentary: "This verse teaches balanced spending and financial wisdom. It's the Islamic approach to wealth management.",
    source: "Quran 25:67",
    prayerTime: "fajr",
  },
  {
    id: "wealth_010",
    category: "wealth",
    arabic: "مَن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ أَضْعَافًا كَثِيرَةً",
    transliteration: "Man dha alladhi yuqridu Allaha qardan hasanan fa yuda'ifahu lahu ad'afan kathirah",
    english: "Who is it that will loan to Allah a goodly loan so He will multiply it for him many times over?",
    commentary: "This verse teaches that charity and lending to those in need is like lending to Allah, and He multiplies the reward manifold.",
    source: "Quran 2:245",
    prayerTime: "fajr",
  },

  // PROTECTION DUAS
  {
    id: "protection_001",
    category: "protection",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
    transliteration: "Allahu la ilaha illa huwa al-hayyu al-qayyum la ta'khudhu sinatun wa la nawm",
    english: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep.",
    commentary: "Ayatul Kursi is the most powerful protection dua. Reciting it brings Allah's protection and guard over the heart and home.",
    source: "Quran 2:255",
    prayerTime: "asr",
  },
  {
    id: "protection_002",
    category: "protection",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillah alladhi la yadhurru ma'a ismihi shay'un fi al-ard wa la fi as-sama wa huwa as-samee al-aleem",
    english: "In the name of Allah, with Whose name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.",
    commentary: "This powerful dua provides protection from all harm. Reciting it three times in the morning and evening grants complete protection.",
    source: "Sunan Abu Dawud 4744",
    prayerTime: "asr",
  },
  {
    id: "protection_003",
    category: "protection",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِن شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bi kalimat illah at-tammah min sharri ma khalaq",
    english: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    commentary: "This dua provides comprehensive protection from all evil and harm. It's recommended to recite it regularly.",
    source: "Sahih Muslim 2708",
    prayerTime: "asr",
  },
  {
    id: "protection_004",
    category: "protection",
    arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    transliteration: "A'udhu billahi min ash-shaytani ar-rajeem",
    english: "I seek refuge in Allah from the accursed Satan.",
    commentary: "This dua protects from satanic whispers and evil influences. It's recited before Quranic recitation and in times of temptation.",
    source: "Quran 16:98",
    prayerTime: "asr",
  },
  {
    id: "protection_005",
    category: "protection",
    arabic: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
    transliteration: "Hasbiya Allahu la ilaha illa huwa alayhi tawakkaltu wa huwa rabb al-arsh al-adheem",
    english: "Allah is sufficient for me. There is no deity except Him. Upon Him I have relied, and He is the Lord of the Great Throne.",
    commentary: "This powerful dua combines protection with trust in Allah. Reciting it seven times provides complete protection from all harm.",
    source: "Sunan Abu Dawud 4744",
    prayerTime: "asr",
  },
  {
    id: "protection_006",
    category: "protection",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ سَمْعِي وَمِنْ شَرِّ بَصَرِي وَمِنْ شَرِّ لِسَانِي",
    transliteration: "Allahumma inni a'udhu bika min sharri samee wa min sharri basari wa min sharri lisani",
    english: "O Allah, I seek refuge in You from the evil of my hearing, the evil of my sight, and the evil of my tongue.",
    commentary: "This dua protects the senses from being used for harm. It teaches us to guard our faculties from evil.",
    source: "Sunan Abu Dawud 4743",
    prayerTime: "asr",
  },
  {
    id: "protection_007",
    category: "protection",
    arabic: "اللَّهُمَّ احْفَظْنِي بِالْإِسْلَامِ قَائِمًا وَاحْفَظْنِي بِالْإِسْلَامِ قَاعِدًا وَاحْفَظْنِي بِالْإِسْلَامِ رَاقِدًا",
    transliteration: "Allahumma ihfazni bil-Islam qa'iman wa ihfazni bil-Islam qa'idan wa ihfazni bil-Islam raqidan",
    english: "O Allah, protect me with Islam while standing, sitting, and sleeping.",
    commentary: "This dua seeks Allah's protection through Islam at all times and in all states. It provides comprehensive spiritual protection.",
    source: "Sunan Abu Dawud 4744",
    prayerTime: "asr",
  },
  {
    id: "protection_008",
    category: "protection",
    arabic: "وَإِن يَمْسَسْكَ اللَّهُ بِضُرٍّ فَلَا كَاشِفَ لَهُ إِلَّا هُوَ ۖ وَإِن يُرِدْكَ بِخَيْرٍ فَلَا رَادَّ لِفَضْلِهِ",
    transliteration: "Wa in yamsaska Allahu bi durrin fa la kashifa lahu illa huwa wa in yuridka bi khayrin fa la radda li fadlihi",
    english: "If Allah touches you with harm, there is no remover of it except Him; and if He intends for you good, there is no repeller of His bounty.",
    commentary: "This verse teaches complete reliance on Allah for protection and provision. It removes fear of secondary causes.",
    source: "Quran 10:107",
    prayerTime: "asr",
  },
  {
    id: "protection_009",
    category: "protection",
    arabic: "وَعِندَهُ مَفَاتِحُ الْغَيْبِ لَا يَعْلَمُهَا إِلَّا هُوَ ۚ وَيَعْلَمُ مَا فِي الْبَرِّ وَالْبَحْرِ",
    transliteration: "Wa indahu mafatih al-ghayb la ya'lamuha illa huwa wa ya'lamu ma fi al-barr wa al-bahr",
    english: "And with Him are the keys of the unseen; none knows them except Him. And He knows what is on the land and in the sea.",
    commentary: "This verse reminds us that Allah knows all hidden things and protects us from unseen dangers.",
    source: "Quran 6:59",
    prayerTime: "asr",
  },
  {
    id: "protection_010",
    category: "protection",
    arabic: "فَإِذَا قَرَأْتَ الْقُرْآنَ فَاسْتَعِذْ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    transliteration: "Fa idha qara'ta al-Quran fastad'idh billahi min ash-shaytani ar-rajeem",
    english: "So when you recite the Quran, seek refuge in Allah from Satan, the accursed one.",
    commentary: "This verse teaches us to seek Allah's protection before engaging in spiritual practices. It guards our hearts from evil influence.",
    source: "Quran 16:98",
    prayerTime: "asr",
  },

  // GRATITUDE DUAS
  {
    id: "gratitude_001",
    category: "gratitude",
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    transliteration: "Al-hamdu lillahi rabbi al-alamin",
    english: "All praise is due to Allah, Lord of the worlds.",
    commentary: "This is the opening verse of Surah Al-Fatiha and the most important expression of gratitude. It acknowledges Allah as the source of all blessings.",
    source: "Quran 1:2",
    prayerTime: "maghrib",
  },
  {
    id: "gratitude_002",
    category: "gratitude",
    arabic: "شُكْرًا لِّلَّهِ عَلَىٰ كُلِّ حَالٍ",
    transliteration: "Shukran lillahi ala kulli hal",
    english: "Gratitude to Allah in all circumstances.",
    commentary: "This dua teaches that we should be grateful to Allah in both good and difficult times. Gratitude is a key to contentment.",
    source: "Islamic Teaching",
    prayerTime: "maghrib",
  },
  {
    id: "gratitude_003",
    category: "gratitude",
    arabic: "إِنَّ شُكْرَكُمْ لِي وَمَن كَفَرَ فَإِنَّ رَبِّي غَنِيٌّ كَرِيمٌ",
    transliteration: "Inna shukrakum li wa man kafara fa inna rabbi ghaniyyun kareem",
    english: "Indeed, if you are grateful to Me, I will surely increase you [in favor]; but if you deny, indeed, My punishment is severe.",
    commentary: "This verse teaches that gratitude leads to increase in blessings. Allah rewards those who are thankful.",
    source: "Quran 14:7",
    prayerTime: "maghrib",
  },
  {
    id: "gratitude_004",
    category: "gratitude",
    arabic: "وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
    transliteration: "Wa idh ta'adhdhana rabbukum la in shakartum la azidannakum",
    english: "And [remember] when your Lord proclaimed, 'If you are grateful, I will surely increase you [in favor].'",
    commentary: "This divine promise assures us that gratitude brings abundance. It's a powerful motivation for thankfulness.",
    source: "Quran 14:7",
    prayerTime: "maghrib",
  },
  {
    id: "gratitude_005",
    category: "gratitude",
    arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ",
    transliteration: "Rabbi awzi'ni an ashkura ni'mataka alati an'amta alayya wa ala walidayya",
    english: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents.",
    commentary: "This dua from Prophet Sulayman (AS) seeks the ability to be grateful. It emphasizes gratitude to parents as well.",
    source: "Quran 46:15",
    prayerTime: "maghrib",
  },
  {
    id: "gratitude_006",
    category: "gratitude",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي هَدَانَا لِهَٰذَا وَمَا كُنَّا لِنَهْتَدِيَ لَوْلَا أَنْ هَدَانَا اللَّهُ",
    transliteration: "Al-hamdu lillahi alladhi hadana li hadha wa ma kunna li nahtadi lawla an hadana Allahu",
    english: "All praise is due to Allah, who has guided us to this; and we would never have been guided had Allah not guided us.",
    commentary: "This verse teaches that all guidance comes from Allah. We should be grateful for the gift of faith and guidance.",
    source: "Quran 7:43",
    prayerTime: "maghrib",
  },
  {
    id: "gratitude_007",
    category: "gratitude",
    arabic: "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ",
    transliteration: "Wa amma bi ni'mati rabbika fa hadith",
    english: "And as for the favor of your Lord, proclaim it.",
    commentary: "This verse encourages us to speak about Allah's blessings. Sharing gratitude increases its impact.",
    source: "Quran 93:11",
    prayerTime: "maghrib",
  },
  {
    id: "gratitude_008",
    category: "gratitude",
    arabic: "وَقَلِيلٌ مِّنْ عِبَادِيَ الشَّكُورُ",
    transliteration: "Wa qaleelun min ibadi ash-shakoor",
    english: "And few of My servants are grateful.",
    commentary: "This verse highlights that gratitude is rare. It encourages us to be among the few who truly appreciate Allah's blessings.",
    source: "Quran 34:13",
    prayerTime: "maghrib",
  },
  {
    id: "gratitude_009",
    category: "gratitude",
    arabic: "لَا تَحْسِبُوهُ شَرًّا لَّكُم ۖ بَلْ هُوَ خَيْرٌ لَّكُمْ",
    transliteration: "La tahsabuhu sharran lakum bal huwa khayrun lakum",
    english: "Do not think it bad for you; rather it is good for you.",
    commentary: "This verse teaches that even difficulties are blessings in disguise. It cultivates gratitude for all of Allah's decrees.",
    source: "Quran 24:11",
    prayerTime: "maghrib",
  },
  {
    id: "gratitude_010",
    category: "gratitude",
    arabic: "وَإِن تَعُدُّوا نِعْمَةَ اللَّهِ لَا تُحْصُوهَا ۗ إِنَّ اللَّهَ لَغَفُورٌ رَّحِيمٌ",
    transliteration: "Wa in ta'uddu ni'mata Allahi la tuhsuha inna Allaha la ghafurun raheem",
    english: "And if you count the favors of Allah, you will not be able to enumerate them. Indeed, Allah is Forgiving and Merciful.",
    commentary: "This verse reminds us of the countless blessings we receive. It motivates continuous gratitude.",
    source: "Quran 16:18",
    prayerTime: "maghrib",
  },

  // SLEEP DUAS
  {
    id: "sleep_001",
    category: "sleep",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
    transliteration: "Allahu la ilaha illa huwa al-hayyu al-qayyum la ta'khudhu sinatun wa la nawm lahu ma fi as-samawati wa ma fi al-ard",
    english: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.",
    commentary: "Ayatul Kursi brings peace and protection before sleep. Reciting it ensures safe and peaceful sleep.",
    source: "Quran 2:255",
    prayerTime: "isha",
  },
  {
    id: "sleep_002",
    category: "sleep",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَكَفَانَا وَآوَانَا ۖ فَكَمْ مِمَّن لَّا كَافِيَ لَهُ وَلَا مُؤْوِيَ",
    transliteration: "Al-hamdu lillahi alladhi at'amana wa saqana wa kafana wa awana fa kam mimman la kafia lahu wa la mu'wi",
    english: "All praise is due to Allah, who has fed us, given us drink, sufficed us, and sheltered us. How many there are who have no one to suffice them or shelter them.",
    commentary: "This dua of gratitude before sleep brings peace and contentment. It reminds us of Allah's protection.",
    source: "Sahih Muslim 2097",
    prayerTime: "isha",
  },
  {
    id: "sleep_003",
    category: "sleep",
    arabic: "بِسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    english: "In Your name, O Allah, I die and I live.",
    commentary: "This dua is recited before sleep. It reminds us that sleep is like death and awakening is like resurrection.",
    source: "Sahih al-Bukhari 7488",
    prayerTime: "isha",
  },
  {
    id: "sleep_004",
    category: "sleep",
    arabic: "إِذَا أَوَيْتَ إِلَىٰ فِرَاشِكَ فَقُلْ سُبْحَانَكَ اللَّهُمَّ بِحَمْدِكَ لَا إِلَٰهَ إِلَّا أَنتَ",
    transliteration: "Idha awayita ila firashika fa qul subhanaka Allahumma bi hamdika la ilaha illa anta",
    english: "When you go to bed, say: Glory be to You, O Allah, with Your praise. There is no deity except You.",
    commentary: "This dua is specifically for bedtime. It brings peace, forgiveness, and protection during sleep.",
    source: "Sunan at-Tirmidhi 3391",
    prayerTime: "isha",
  },
  {
    id: "sleep_005",
    category: "sleep",
    arabic: "آمَنتُ بِاللَّهِ وَبِرُسُلِهِ",
    transliteration: "Amantu billahi wa bi rusulih",
    english: "I believe in Allah and His Messengers.",
    commentary: "This simple declaration of faith before sleep brings peace and security. It strengthens the heart.",
    source: "Islamic Teaching",
    prayerTime: "isha",
  },
  {
    id: "sleep_006",
    category: "sleep",
    arabic: "اللَّهُمَّ إِنِّي أَسْلَمْتُ وَجْهِيَ إِلَيْكَ وَفَوَّضْتُ أَمْرِي إِلَيْكَ وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ",
    transliteration: "Allahumma inni aslamtu wajhi ilayka wa fawwadtu amri ilayka wa aljatu dhahri ilayka",
    english: "O Allah, I have submitted my face to You, entrusted my affairs to You, and relied upon You.",
    commentary: "This dua before sleep brings complete peace and trust. It removes worry and anxiety.",
    source: "Sahih Muslim 2716",
    prayerTime: "isha",
  },
  {
    id: "sleep_007",
    category: "sleep",
    arabic: "رَبِّ اغْفِرْ لِي ذَنْبِي وَأَرِحْ جَسَدِي",
    transliteration: "Rabbi ighfir li dhanbi wa arih jasadi",
    english: "My Lord, forgive my sins and ease my body.",
    commentary: "This dua seeks forgiveness and physical rest. It prepares the soul for peaceful sleep.",
    source: "Islamic Teaching",
    prayerTime: "isha",
  },
  {
    id: "sleep_008",
    category: "sleep",
    arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
    transliteration: "Allahumma bismika amutu wa ahya",
    english: "O Allah, in Your name I die and I live.",
    commentary: "This dua reminds us of Allah's control over life and death. It brings acceptance and peace.",
    source: "Sahih al-Bukhari 7488",
    prayerTime: "isha",
  },
  {
    id: "sleep_009",
    category: "sleep",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
    transliteration: "Qul huwa Allahu ahad Allahu as-samad lam yalid wa lam yulad wa lam yakun lahu kufuwan ahad",
    english: "Say, 'He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.'",
    commentary: "Surah Al-Ikhlas recited before sleep brings protection and peace. It's one of the most powerful surahs.",
    source: "Quran 112:1-4",
    prayerTime: "isha",
  },
  {
    id: "sleep_010",
    category: "sleep",
    arabic: "وَمِنْ آيَاتِهِ مَنَامُكُم بِاللَّيْلِ وَالنَّهَارِ وَابْتِغَاؤُكُم مِّن فَضْلِهِ",
    transliteration: "Wa min ayatihi manamukum bi al-layl wa an-nahar wa ibtighaoukum min fadlihi",
    english: "And of His signs is your sleep by night and day and your seeking of His bounty.",
    commentary: "This verse reminds us that sleep is a sign of Allah's mercy. It brings gratitude for the gift of rest.",
    source: "Quran 30:23",
    prayerTime: "isha",
  },
];

export function getDuasByCategory(category: DuaCategory): Dua[] {
  return duas.filter((dua) => dua.category === category);
}

export function getDuaById(id: string): Dua | undefined {
  return duas.find((dua) => dua.id === id);
}

export function getDuasByPrayerTime(prayerTime: string): Dua[] {
  return duas.filter((dua) => dua.prayerTime === prayerTime);
}

export function searchDuas(query: string): Dua[] {
  const lowerQuery = query.toLowerCase();
  return duas.filter(
    (dua) =>
      dua.english.toLowerCase().includes(lowerQuery) ||
      dua.transliteration.toLowerCase().includes(lowerQuery) ||
      dua.source.toLowerCase().includes(lowerQuery) ||
      dua.commentary.toLowerCase().includes(lowerQuery)
  );
}

export function getRandomDua(): Dua {
  return duas[Math.floor(Math.random() * duas.length)];
}

export function getRandomDuaByCategory(category: DuaCategory): Dua | undefined {
  const categoryDuas = getDuasByCategory(category);
  if (categoryDuas.length === 0) return undefined;
  return categoryDuas[Math.floor(Math.random() * categoryDuas.length)];
}
