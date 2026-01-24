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
