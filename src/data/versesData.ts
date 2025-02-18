export interface Verse {
  id: string;
  partialVerse: string;
  missingWords: string[];
  difficulty: 'easy' | 'hard';
  source: string;
}

export const verses: Verse[] = [
  // רמה קלה
  {
    id: 'e1',
    partialVerse: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם',
    missingWords: ['ואת', 'הארץ'],
    difficulty: 'easy',
    source: 'בראשית א, א'
  },
  {
    id: 'e2',
    partialVerse: 'וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר',
    missingWords: ['ויהי', 'אור'],
    difficulty: 'easy',
    source: 'בראשית א, ג'
  },
  {
    id: 'e3',
    partialVerse: 'שִׁיר לַמַּעֲלוֹת אֶשָּׂא עֵינַי אֶל הֶהָרִים',
    missingWords: ['מאין', 'יבוא', 'עזרי'],
    difficulty: 'easy',
    source: 'תהלים קכא, א'
  },
  {
    id: 'e4',
    partialVerse: 'אָנֹכִי ה\' אֱלֹהֶיךָ אֲשֶׁר הוֹצֵאתִיךָ מֵאֶרֶץ מִצְרַיִם',
    missingWords: ['מבית', 'עבדים'],
    difficulty: 'easy',
    source: 'שמות כ, ב'
  },
  {
    id: 'e5',
    partialVerse: 'טוֹב לִי תוֹרַת פִּיךָ',
    missingWords: ['מאלפי', 'זהב', 'וכסף'],
    difficulty: 'easy',
    source: 'תהלים קיט, עב'
  },
  
  // רמה קשה
  {
    id: 'h1',
    partialVerse: 'אִם עֲוֹנוֹת תִּשְׁמׇר יָהּ אֲדֹנָי',
    missingWords: ['מי', 'יעמוד'],
    difficulty: 'hard',
    source: 'תהלים קל, ג'
  },
  {
    id: 'h2',
    partialVerse: 'תּוֹרֵי זָהָב נַעֲשֶׂה לָּךְ',
    missingWords: ['עם', 'נקודות', 'הכסף'],
    difficulty: 'hard',
    source: 'שיר השירים א, יא'
  },
  {
    id: 'h3',
    partialVerse: 'הֲלוֹא צִוִּיתִיךָ חֲזַק וֶאֱמָץ אַל תַּעֲרֹץ וְאַל תֵּחָת כִּי עִמְּךָ ה\' אֱלֹהֶיךָ',
    missingWords: ['בכל', 'אשר', 'תלך'],
    difficulty: 'hard',
    source: 'יהושע א, ט'
  },
  {
    id: 'h4',
    partialVerse: 'וַיַּחֲלֹם וְהִנֵּה סֻלָּם מֻצָּב אַרְצָה וְרֹאשׁוֹ מַגִּיעַ הַשָּׁמָיְמָה וְהִנֵּה מַלְאֲכֵי אֱלֹהִים',
    missingWords: ['עולים', 'ויורדים', 'בו'],
    difficulty: 'hard',
    source: 'בראשית כח, יב'
  },
  {
    id: 'e6',
    partialVerse: 'אַל יִתֵּן לַמּוֹט רַגְלֶךָ',
    missingWords: ['אל', 'ינום', 'שומרך'],
    difficulty: 'easy',
    source: 'תהלים קכא, ג'
  },
  {
    id: 'e7',
    partialVerse: 'הִנֵּה לֹא יָנוּם וְלֹא יִישָׁן',
    missingWords: ['שומר', 'ישראל'],
    difficulty: 'easy',
    source: 'תהלים קכא, ד'
  },
  {
    id: 'e8',
    partialVerse: 'יְהוָה שֹׁמְרֶךָ יְהוָה צִלְּךָ',
    missingWords: ['על', 'יד', 'ימינך'],
    difficulty: 'easy',
    source: 'תהלים קכא, ה'
  },
  {
    id: 'e9',
    partialVerse: 'יוֹמָם הַשֶּׁמֶשׁ לֹא יַכֶּכָּה',
    missingWords: ['וירח', 'בלילה'],
    difficulty: 'easy',
    source: 'תהלים קכא, ו'
  },
  {
    id: 'e10',
    partialVerse: 'יְהוָה יִשְׁמָרְךָ מִכָּל רָע',
    missingWords: ['ישמור', 'את', 'נפשך'],
    difficulty: 'easy',
    source: 'תהלים קכא, ז'
  },
  {
    id: 'e11',
    partialVerse: 'יְהוָה יִשְׁמָר צֵאתְךָ וּבוֹאֶךָ',
    missingWords: ['מעתה', 'ועד', 'עולם'],
    difficulty: 'easy',
    source: 'תהלים קכא, ח'
  },

  {
    id: 'e12',
    partialVerse: 'הַאֲזִינוּ הַשָּׁמַיִם וַאֲדַבֵּרָה',
    missingWords: ['ותשמע', 'הארץ', 'אמרי', 'פי'],
    difficulty: 'easy',
    source: 'דברים לב, א'
  },
  {
    id: 'e13',
    partialVerse: 'יַעֲרֹף כַּמָּטָר לִקְחִי',
    missingWords: ['תיזל', 'כטל', 'אמרתי'],
    difficulty: 'easy',
    source: 'דברים לב, ב'
  },
  {
    id: 'e14',
    partialVerse: 'כִּשְׂעִירִם עֲלֵי⁠ דֶשֶׁא',
    missingWords: ['וכרביבים', 'עלי', 'עשב'],
    difficulty: 'easy',
    source: 'דברים לב, ב'
  },
  {
    id: 'e15',
    partialVerse: 'כִּי שֵׁם ה\' אֶקְרָא',
    missingWords: ['הבו', 'גודל', 'לאלוהינו'],
    difficulty: 'easy',
    source: 'דברים לב, ג'
  },
  {
    id: 'e16',
    partialVerse: 'הַצּוּר תָּמִים פׇּעֳלוֹ',
    missingWords: ['כי', 'כל', 'דרכיו', 'משפט'],
    difficulty: 'easy',
    source: 'דברים לב, ד'
  },
  {
    id: 'e17',
    partialVerse: 'אֵל אֱמוּנָה וְאֵין עָוֶל',
    missingWords: ['צדיק', 'וישר', 'הוא'],
    difficulty: 'easy',
    source: 'דברים לב, ד'
  },
  {
    id: 'e18',
    partialVerse: 'שִׁחֵת לוֹ לֹא בָּנָיו מוּמָם',
    missingWords: ['דור', 'עקש', 'ופתלתול'],
    difficulty: 'easy',
    source: 'דברים לב, ה'
  },
  {
    id: 'e19',
    partialVerse: 'הַ⁠לה\' תִּגְמְלוּ⁠ זֹאת',
    missingWords: ['עם', 'נבל', 'ולא', 'חכם'],
    difficulty: 'easy',
    source: 'דברים לב, ו'
  },
  {
    id: 'e20',
    partialVerse: 'הֲלוֹא⁠ הוּא אָבִיךָ קָּנֶךָ',
    missingWords: ['הוא', 'עשך', 'ויכוננך'],
    difficulty: 'easy',
    source: 'דברים לב, ו'
  },
  {
    id: 'e21',
    partialVerse: 'זְכֹר יְמוֹת עוֹלָם',
    missingWords: ['בינו', 'שנות', 'דור', 'ודור'],
    difficulty: 'easy',
    source: 'דברים לב, ז'
  },
  {
    id: 'e22',
    partialVerse: 'שְׁאַל אָבִיךָ וְיַגֵּדְךָ',
    missingWords: ['זקניך', 'ויאמרו', 'לך'],
    difficulty: 'easy',
    source: 'דברים לב, ז'
  },
  {
    id: 'e23',
    partialVerse: 'בְּהַנְחֵל עֶלְיוֹן גּוֹיִם',
    missingWords: ['בהפרידו', 'בני', 'אדם'],
    difficulty: 'easy',
    source: 'דברים לב, ח'
  },
  {
    id: 'e24',
    partialVerse: 'יַצֵּב גְּבֻלֹת עַמִּים',
    missingWords: ['למספר', 'בני', 'ישראל'],
    difficulty: 'easy',
    source: 'דברים לב, ח'
  },
  {
    id: 'e25',
    partialVerse: 'כִּי חֵלֶק ה\' עַמּוֹ',
    missingWords: ['יעקב', 'חבל', 'נחלתו'],
    difficulty: 'easy',
    source: 'דברים לב, ט'
  },
  {
    id: 'e26',
    partialVerse: 'יִמְצָאֵהוּ בְּאֶרֶץ מִדְבָּר',
    missingWords: ['ובתהו', 'ילל', 'ישימון'],
    difficulty: 'easy',
    source: 'דברים לב, י'
  },
  {
    id: 'e27',
    partialVerse: 'יְסֹבְבֶנְהוּ יְבוֹנְנֵהוּ',
    missingWords: ['יצרנהו', 'כאישון', 'עינו'],
    difficulty: 'easy',
    source: 'דברים לב, י'
  },

  {
    id: 'h5',
    partialVerse: 'וַיִּירָא וַיֹּאמַר מַה נּוֹרָא הַמָּקוֹם הַזֶּה אֵין זֶה כִּי אִם בֵּית אֱלֹהִים',
    missingWords: ['וזה', 'שער', 'השמים'],
    difficulty: 'hard',
    source: 'בראשית כח, יז'
  }
];

export const getVersesByDifficulty = (difficulty: 'easy' | 'hard'): Verse[] => {
  return verses.filter(verse => verse.difficulty === difficulty);
};