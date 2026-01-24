import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // === API Routes ===

  // Sections
  app.get(api.sections.list.path, async (req, res) => {
    const sections = await storage.getSections();
    res.json(sections);
  });

  // Articles
  app.get(api.articles.list.path, async (req, res) => {
    const articles = await storage.getArticles();
    res.json(articles);
  });

  app.get(api.articles.get.path, async (req, res) => {
    const article = await storage.getArticle(Number(req.params.id));
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  });

  // Routines
  app.get(api.routines.list.path, async (req, res) => {
    const routines = await storage.getRoutines();
    res.json(routines);
  });

  // Remedies
  app.get(api.remedies.list.path, async (req, res) => {
    const remedies = await storage.getRemedies();
    res.json(remedies);
  });

  // Tips
  app.get(api.tips.list.path, async (req, res) => {
    const tips = await storage.getTips();
    res.json(tips);
  });

  // === Seeding ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const sections = await storage.getSections();
  if (sections.length === 0) {
    // 1. Sections
    await storage.createSection({
      key: "about",
      titleEn: "About Toma Beauty",
      titleAr: "عن توما بيوتي",
      contentEn: "Toma Beauty is your ultimate destination for everything related to beauty, skincare, and self-care. We believe that true beauty comes from within, and our mission is to empower you with natural, effective, and simple routines to enhance your natural glow.",
      contentAr: "توما بيوتي هي وجهتك المثالية لكل ما يتعلق بالجمال، العناية بالبشرة، والعناية الذاتية. نؤمن بأن الجمال الحقيقي ينبع من الداخل، ومهمتنا هي تمكينك من خلال روتين طبيعي وفعال وبسيط لتعزيز إشراقتك الطبيعية.",
      imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?auto=format&fit=crop&q=80"
    });

    await storage.createSection({
      key: "founder",
      titleEn: "Meet the Founder",
      titleAr: "تعرف على المؤسسة",
      contentEn: "Our founder is passionate about holistic wellness and sustainable beauty. With years of experience in the beauty industry, she created Toma Beauty to share her knowledge and inspire women everywhere to embrace their unique beauty.",
      contentAr: "مؤسستنا شغوفة بالعافية الشاملة والجمال المستدام. مع سنوات من الخبرة في صناعة التجميل، أنشأت توما بيوتي لمشاركة معرفتها وإلهام النساء في كل مكان لاحتضان جمالهن الفريد.",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80"
    });

    // 2. Articles
    await storage.createArticle({
      titleEn: "The Ultimate Guide to Hydration",
      titleAr: "الدليل الشامل للترطيب",
      summaryEn: "Why keeping your skin hydrated is the key to a youthful glow.",
      summaryAr: "لماذا يعتبر الحفاظ على ترطيب بشرتك مفتاح الإشراق الشبابي.",
      contentEn: "Drinking water is not enough. You need to use the right moisturizers for your skin type...",
      contentAr: "شرب الماء وحده لا يكفي. تحتاجين إلى استخدام المرطبات المناسبة لنوع بشرتك...",
      category: "skincare",
      imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "5 Mistakes You Are Making with Your Hair",
      titleAr: "5 أخطاء ترتكبينها بحق شعرك",
      summaryEn: "Are you damaging your hair without knowing it?",
      summaryAr: "هل تقومين بإتلاف شعرك دون أن تعلمي؟",
      contentEn: "From over-washing to using too much heat, here are common pitfalls...",
      contentAr: "من الغسيل المفرط إلى استخدام الحرارة الزائدة، إليك الأخطاء الشائعة...",
      category: "haircare",
      imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "The Benefits of Rose Water",
      titleAr: "فوائد ماء الورد",
      summaryEn: "A natural toner that has been used for centuries.",
      summaryAr: "تونر طبيعي يستخدم منذ قرون.",
      contentEn: "Rose water helps maintain the skin's pH balance and controls excess oil...",
      contentAr: "يساعد ماء الورد في الحفاظ على توازن درجة حموضة البشرة ويتحكم في الزيوت الزائدة...",
      category: "skincare",
      imageUrl: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "Sunscreen: Your Best Anti-Aging Tool",
      titleAr: "واقي الشمس: أفضل أداة لمكافحة الشيخوخة",
      summaryEn: "Protecting your skin from UV rays is non-negotiable.",
      summaryAr: "حماية بشرتك من الأشعة فوق البنفسجية أمر غير قابل للتفاوض.",
      contentEn: "90% of skin aging is caused by the sun. Here is how to choose the right one...",
      contentAr: "90% من شيخوخة الجلد سببها الشمس. إليك كيفية اختيار النوع المناسب...",
      category: "skincare",
      imageUrl: "https://images.unsplash.com/photo-1556229162-5c63ed9c4ffb?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "Nighttime Skincare Essentials",
      titleAr: "أساسيات العناية بالبشرة ليلاً",
      summaryEn: "How to maximize your skin's repair phase while you sleep.",
      summaryAr: "كيفية تعظيم مرحلة إصلاح بشرتك أثناء النوم.",
      contentEn: "Your skin regenerates at night. Using retinoids and thick creams can help...",
      contentAr: "تتجدد بشرتك في الليل. استخدام الرتينويدات والكريمات السميكة يمكن أن يساعد...",
      category: "skincare",
      imageUrl: "https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "Natural Oils for Healthy Hair",
      titleAr: "الزيوت الطبيعية لشعر صحي",
      summaryEn: "From Argan to Coconut, find the best oil for your hair type.",
      summaryAr: "من الأرغان إلى جوز الهند، ابحثي عن أفضل زيت لنوع شعرك.",
      contentEn: "Oiling your hair can provide deep nourishment and prevent breakage...",
      contentAr: "تزييت شعرك يمكن أن يوفر تغذية عميقة ويمنع التقصف...",
      category: "haircare",
      imageUrl: "https://images.unsplash.com/photo-1626015155682-198129e97911?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "The Importance of Scalp Health",
      titleAr: "أهمية صحة فروة الرأس",
      summaryEn: "Healthy hair starts at the root.",
      summaryAr: "الشعر الصحي يبدأ من الجذور.",
      contentEn: "Scalp exfoliation and massage can stimulate growth and reduce dandruff...",
      contentAr: "تقشير فروة الرأس وتدليكها يمكن أن يحفز النمو ويقلل من القشرة...",
      category: "haircare",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13df772ad5?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "Clean Beauty: What You Need to Know",
      titleAr: "الجمال النظيف: ما تحتاجين لمعرفته",
      summaryEn: "A guide to understanding safe ingredients in your products.",
      summaryAr: "دليل لفهم المكونات الآمنة في منتجاتك.",
      contentEn: "Avoid parabens and sulfates. Look for natural alternatives...",
      contentAr: "تجنبي البارابين والكبريتات. ابحثي عن بدائل طبيعية...",
      category: "lifestyle",
      imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "Mindful Beauty: Stress and Your Skin",
      titleAr: "الجمال الواعي: التوتر وبشرتك",
      summaryEn: "How your mental state affects your physical appearance.",
      summaryAr: "كيف تؤثر حالتك النفسية على مظهرك الجسدي.",
      contentEn: "Cortisol can break down collagen. Learn how to de-stress for better skin...",
      contentAr: "الكورتيزول يمكن أن يحطم الكولاجين. تعلمي كيفية تخفيف التوتر لبشرة أفضل...",
      category: "lifestyle",
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "The Power of Facial Massage",
      titleAr: "قوة تدليك الوجه",
      summaryEn: "Natural lifting and lymphatic drainage techniques.",
      summaryAr: "تقنيات الشد الطبيعي والتصريف اللمفاوي.",
      contentEn: "Using a Gua Sha or your fingers can help define your features...",
      contentAr: "استخدام الجواشا أو أصابعك يمكن أن يساعد في تحديد ملامحك...",
      category: "skincare",
      imageUrl: "https://images.unsplash.com/photo-1591343395582-99bf4ebc046c?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "Natural Homemade Beauty Products",
      titleAr: "منتجات التجميل الطبيعية المصنوعة في المنزل – جمال آمن وصحي",
      summaryEn: "A guide to safe and healthy DIY beauty products.",
      summaryAr: "دليل لمنتجات تجميل منزلية الصنع آمنة وصحية.",
      contentEn: "In recent years, awareness has increased about the dangers of chemicals in commercial cosmetics, such as synthetic fragrances and parabens. Homemade products are safe, effective, and low-cost.",
      contentAr: "في السنوات الأخيرة زاد الوعي بأضرار المواد الكيميائية الموجودة في كثير من مستحضرات التجميل التجارية، مثل العطور الصناعية والبارابين. لذلك اتجه الكثيرون إلى استخدام منتجات التجميل المصنوعة في المنزل، لما تتميز به من أمان وفعالية وتكلفة منخفضة.",
      category: "skincare",
      imageUrl: "https://images.unsplash.com/photo-1601612620450-5eecebbd03ae?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "Natural Face Masks from Your Kitchen",
      titleAr: "أقنعة الوجه الطبيعية – عناية فعالة من مطبخك",
      summaryEn: "Treat your skin problems with ingredients you already have.",
      summaryAr: "عالجي مشاكل بشرتك بمكونات موجودة بالفعل في مطبخك.",
      contentEn: "Natural face masks are one of the most common ways to care for your skin, treating issues like dryness, dullness, and acne. Consistency gives your skin a natural glow.",
      contentAr: "تُعد أقنعة الوجه الطبيعية من أكثر طرق العناية بالبشرة شيوعًا، لأنها تعالج مشاكل عديدة مثل الجفاف، البهتان، والحبوب. الاستمرار في استخدامها يمنح البشرة إشراقًا ونضارة طبيعية.",
      category: "skincare",
      imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "Hair Care with Natural Recipes",
      titleAr: "العناية بالشعر باستخدام وصفات طبيعية منزلية",
      summaryEn: "Protect your hair from daily damage with simple natural solutions.",
      summaryAr: "احمي شعرك من الأضرار اليومية بحلول طبيعية بسيطة.",
      contentEn: "Hair is exposed daily to damaging factors like heat and pollution. Natural recipes are an ideal solution to strengthen hair and stimulate growth without damage.",
      contentAr: "يتعرض الشعر يوميًا لعوامل تضر به مثل الحرارة، الصبغات، والتلوث. لذلك تُعد الوصفات الطبيعية حلًا مثاليًا لتقوية الشعر وتحفيز نموه دون إتلافه.",
      category: "haircare",
      imageUrl: "https://images.unsplash.com/photo-1527799822367-a233b70b516e?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "Natural Homemade Soap",
      titleAr: "الصابون الطبيعي المنزلي – نظافة آمنة للبشرة",
      summaryEn: "A safe alternative to commercial soaps containing harsh chemicals.",
      summaryAr: "بديل آمن للصابون التجاري الذي يحتوي على مواد كيميائية قاسية.",
      contentEn: "Homemade natural soap is one of the best alternatives to commercial soap. It gently cleanses the skin and preserves its natural oils, with added beneficial ingredients like herbs and essential oils.",
      contentAr: "يُعد الصابون الطبيعي المصنوع في المنزل من أفضل البدائل للصابون التجاري الذي يحتوي غالبًا على مواد كيميائية تسبب الجفاف والتهيج. الصابون الطبيعي ينظف البشرة بلطف ويحافظ على الزيوت الطبيعية فيها، كما يمكن إضافة مكونات مفيدة مثل الأعشاب والزيوت العطرية.",
      category: "skincare",
      imageUrl: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "Natural Lip Balm",
      titleAr: "بلسم الشفاه الطبيعي – حماية وترطيب دائم",
      summaryEn: "Deep hydration and protection for soft, smooth lips.",
      summaryAr: "ترطيب عميق وحماية لشفاه ناعمة وسلسة.",
      contentEn: "Lips are exposed to dryness and cracking due to weather and unsuitable products. Natural lip balm provides deep hydration and restores softness without synthetic materials.",
      contentAr: "تتعرض الشفاه للجفاف والتشقق بسبب الطقس واستخدام مستحضرات غير مناسبة. بلسم الشفاه الطبيعي يمنح ترطيبًا عميقًا ويعيد للشفاه نعومتها دون مواد صناعية.",
      category: "skincare",
      imageUrl: "https://images.unsplash.com/photo-1617350410111-f9b2d878701e?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "Natural Oils for Skin and Hair",
      titleAr: "الزيوت الطبيعية للعناية بالبشرة والشعر",
      summaryEn: "Vitamins and fatty acids for a healthy, radiant look.",
      summaryAr: "فيتامينات وأحماض دهنية لمظهر صحي ومشرق.",
      contentEn: "Natural oils have been used since ancient times for beauty care, containing beneficial vitamins and fatty acids. Regular use helps moisturize the skin and strengthen the hair.",
      contentAr: "الزيوت الطبيعية تُستخدم منذ القدم في العناية بالجمال، لما تحتويه من فيتامينات وأحماض دهنية مفيدة. الاستخدام المنتظم للزيوت يساعد على ترطيب البشرة وتقوية الشعر ومنحه لمعانًا صحيًا.",
      category: "haircare",
      imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80"
    });

    await storage.createArticle({
      titleEn: "Homemade Natural Deodorant",
      titleAr: "مزيل عرق طبيعي منزلي – انتعاش بلا مواد ضارة",
      summaryEn: "Stay fresh without irritating chemicals.",
      summaryAr: "حافظي على انتعاشك بدون مواد كيميائية مهيجة.",
      contentEn: "Most commercial deodorants contain substances that may cause skin irritation. A homemade natural alternative helps control odor and leaves a fresh feeling without harm.",
      contentAr: "تحتوي معظم مزيلات العرق التجارية على مواد قد تسبب تهيج الجلد. المزيل الطبيعي المنزلي يساعد على التحكم في الرائحة ويترك إحساسًا بالانتعاش دون ضرر.",
      category: "lifestyle",
      imageUrl: "https://images.unsplash.com/photo-1556228578-8c7c0f44bb0b?auto=format&fit=crop&q=80"
    });

    // 3. Routines
    await storage.createRoutine({
      titleEn: "Morning Glow Routine",
      titleAr: "روتين إشراقة الصباح",
      frequency: "morning",
      stepsEn: ["Cleanse with a gentle foam", "Apply Vitamin C serum", "Moisturize", "Apply Sunscreen (SPF 50)"],
      stepsAr: ["اغسلي وجهك بغسول لطيف", "ضعي سيروم فيتامين سي", "رطبي بشرتك", "ضعي واقي الشمس (SPF 50)"]
    });

    await storage.createRoutine({
      titleEn: "Evening Restoration",
      titleAr: "روتين المساء المرمم",
      frequency: "evening",
      stepsEn: ["Double cleanse to remove makeup", "Apply Retinol or Night Cream", "Use Eye Cream"],
      stepsAr: ["تنظيف مزدوج لإزالة المكياج", "ضعي الريتينول أو كريم الليل", "استخدمي كريم العين"]
    });

    // 4. Remedies
    await storage.createRemedy({
      titleEn: "Honey & Turmeric Mask",
      titleAr: "قناع العسل والكركم",
      ingredientsEn: ["1 tbsp Honey", "1 pinch Turmeric", "1 tsp Yogurt"],
      ingredientsAr: ["ملعقة كبيرة عسل", "رشة كركم", "ملعقة صغيرة زبادي"],
      instructionsEn: "Mix all ingredients. Apply to face for 15 mins. Rinse with warm water.",
      instructionsAr: "اخلطي جميع المكونات. ضعيها على الوجه لمدة 15 دقيقة. اشطفيه بالماء الدافئ.",
      benefitsEn: "Brightens skin and reduces inflammation.",
      benefitsAr: "يفتح البشرة ويقلل الالتهاب."
    });

    // 5. Tips
    await storage.createTip({
      contentEn: "Always apply sunscreen, even on cloudy days!",
      contentAr: "ضعي واقي الشمس دائمًا، حتى في الأيام الغائمة!",
      category: "skincare"
    });
    await storage.createTip({
      contentEn: "Drink at least 2 liters of water daily for clear skin.",
      contentAr: "اشربي ما لا يقل عن 2 لتر من الماء يوميًا لبشرة صافية.",
      category: "health"
    });
  }
}
