import { useLanguage } from "@/hooks/use-language";
import { useSections, useTips, useArticles, useRoutines } from "@/hooks/use-content";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Star, Heart, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { t, language } = useLanguage();
  const { data: sectionsData } = useSections();
  const { data: tipsData } = useTips();
  const { data: articlesData } = useArticles();
  
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  // Placeholder images for when no data/image is available
  // Using Unsplash source URLs for demonstration as requested
  const heroImage = "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2000&auto=format&fit=crop";
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-pink-200/30 blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-white backdrop-blur-sm shadow-sm text-sm text-gray-600 mb-6">
              <Sparkles className="w-3 h-3 text-primary" />
              {t("Welcome to your beauty haven", "مرحباً بك في عالم جمالك")}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900">
              {t("Natural Beauty,", "الجمال الطبيعي،")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                {t("Refined Elegance", "وأناقة راقية")}
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
              {t(
                "Discover expert skincare tips, daily routines, and natural remedies tailored for your unique glow.",
                "اكتشفي نصائح العناية بالبشرة، الروتين اليومي، والوصفات الطبيعية المصممة لإشراقتك الفريدة."
              )}
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Link href="/articles">
                <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                  {t("Start Reading", "ابدأ القراءة")}
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base bg-white/50 backdrop-blur-sm hover:bg-white transition-all">
                  {t("Our Story", "قصتنا")}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              {/* woman applying skincare cream */}
              <img 
                src={heroImage} 
                alt="Beauty" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="font-bold text-gray-800">{t("100% Natural", "١٠٠٪ طبيعي")}</p>
                <p className="text-xs text-gray-500">{t("Handpicked remedies", "وصفات مختارة بعناية")}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Tips Ticker */}
      {tipsData && tipsData.length > 0 && (
        <div className="bg-primary/5 py-4 overflow-hidden border-y border-primary/10">
          <div className="container mx-auto px-4 flex items-center gap-4">
            <span className="font-bold text-primary whitespace-nowrap px-3 py-1 bg-white rounded-full text-xs uppercase tracking-wider shadow-sm">
              {t("Quick Tip", "نصيحة سريعة")}
            </span>
            <p className="text-sm md:text-base text-gray-700 font-medium">
              {language === 'en' ? tipsData[0].contentEn : tipsData[0].contentAr}
            </p>
          </div>
        </div>
      )}

      {/* Health & Beauty Articles */}
      <section id="articles-section" className="py-24 bg-purple-50/50 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t("Health & Beauty Articles", "مقالات الصحة والجمال")}
            </h2>
            <p className="text-gray-500">
              {t("Practical tips and expert advice for your wellness journey.", "نصائح عملية واستشارات الخبراء لرحلة العافية الخاصة بك.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {t("Skincare Basics", "أساسيات العناية بالبشرة")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "Consistency is the foundation of any good routine. Learn the essential steps to keep your skin healthy and glowing every day.",
                  "الاستمرارية هي أساس أي روتين جيد. تعرفي على الخطوات الأساسية للحفاظ على صحة بشرتك وتوهجها كل يوم."
                )}
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {t("Hair Health Secrets", "أسرار صحة الشعر")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "Discover the impact of nutrition and natural oils on hair strength. Simple changes can make a big difference in volume and shine.",
                  "اكتشفي تأثير التغذية والزيوت الطبيعية على قوة الشعر. تغييرات بسيطة يمكن أن تحدث فرقاً كبيراً في الكثافة واللمعان."
                )}
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {t("Mindful Wellness", "العافية الواعية")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "Beauty begins from within. Understanding the link between mental health and physical appearance is key to true elegance.",
                  "الجمال يبدأ من الداخل. فهم الارتباط بين الصحة النفسية والمظهر الخارجي هو مفتاح الأناقة الحقيقية."
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t("Latest Stories", "أحدث المقالات")}</h2>
              <p className="text-gray-500 max-w-2xl">
                {t(
                  "Explore our collection of articles on skincare, makeup, and wellness.",
                  "تصفحي مجموعتنا من المقالات حول العناية بالبشرة، المكياج، والعافية."
                )}
              </p>
            </div>
            <Link href="/articles" className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline">
              {t("View All", "عرض الكل")} <Arrow className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {articlesData?.slice(0, 3).map((article, i) => (
              <SectionCard
                key={article.id}
                title={language === 'en' ? article.titleEn : article.titleAr}
                description={language === 'en' ? article.summaryEn : article.summaryAr}
                image={article.imageUrl || `https://images.unsplash.com/photo-1571781926291-280553facd7d?w=800&auto=format&fit=crop&q=60`}
                href={`/articles/${article.id}`}
                delay={i * 0.1}
              />
            ))}
            
            {(!articlesData || articlesData.length === 0) && (
               [1, 2, 3].map((_, i) => (
                 <div key={i} className="h-[400px] rounded-2xl bg-gray-100 animate-pulse" />
               ))
            )}
          </div>
          
          <div className="mt-8 md:hidden text-center">
            <Link href="/articles">
              <Button variant="ghost" className="text-primary hover:bg-primary/5">
                {t("View All Articles", "عرض كل المقالات")} <Arrow className="w-4 h-4 mx-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories / Sections */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
           <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-200 rounded-full blur-3xl" />
           <div className="absolute top-1/2 right-0 w-64 h-64 bg-pink-200 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t("Beauty Essentials", "أساسيات الجمال")}</h2>
            <p className="text-gray-500">
              {t(
                "Everything you need to build your perfect self-care regimen.",
                "كل ما تحتاجينه لبناء روتين العناية المثالي الخاص بك."
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Daily Routine Card */}
            <Link href="/routines" className="group">
              <div className="relative h-80 rounded-2xl overflow-hidden cursor-pointer">
                {/* woman washing face */}
                <img 
                  src="https://pixabay.com/get/g7f05b1bfdcbeefe27c99a65defc7a3cb3cefa825d36b0fa98d211ceda2672ea964faab218d89970965ab94f5e2da26811e0cad5613f4ca15d70c922c6fbf58be_1280.jpg" 
                  alt="Routines" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-bold mb-2">{t("Daily Routines", "الروتين اليومي")}</h3>
                  <p className="opacity-90 text-sm mb-4">{t("Step-by-step guides for AM & PM", "خطوات يومية للصباح والمساء")}</p>
                  <div className="flex items-center gap-2 text-sm font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {t("View Routines", "عرض الروتين")} <Arrow className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Natural Remedies Card */}
            <Link href="/remedies" className="group">
              <div className="relative h-80 rounded-2xl overflow-hidden cursor-pointer">
                {/* natural ingredients herbs */}
                <img 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=60" 
                  alt="Remedies" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-bold mb-2">{t("Natural Remedies", "وصفات طبيعية")}</h3>
                  <p className="opacity-90 text-sm mb-4">{t("Homemade masks and treatments", "أقنعة وعلاجات منزلية")}</p>
                  <div className="flex items-center gap-2 text-sm font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {t("View Recipes", "عرض الوصفات")} <Arrow className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Founder Card */}
            <Link href="/about" className="group md:col-span-2 lg:col-span-1">
              <div className="relative h-80 rounded-2xl overflow-hidden cursor-pointer">
                {/* elegant woman portrait */}
                <img 
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=60" 
                  alt="About" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-bold mb-2">{t("Meet the Founder", "قصة المؤسس")}</h3>
                  <p className="opacity-90 text-sm mb-4">{t("Our vision for authentic beauty", "رؤيتنا للجمال الحقيقي")}</p>
                  <div className="flex items-center gap-2 text-sm font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {t("Read Story", "اقرأ القصة")} <Arrow className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
             {/* circles pattern overlay */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 translate-y-1/2" />
             
             <div className="relative z-10 max-w-2xl mx-auto">
               <Star className="w-8 h-8 mx-auto mb-6 text-yellow-200 fill-yellow-200" />
               <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
                 {t("Join our Beauty Community", "انضمي لمجتمع الجمال")}
               </h2>
               <p className="text-white/80 mb-8 text-lg">
                 {t(
                   "Subscribe to get weekly beauty tips, new articles, and exclusive natural recipes delivered to your inbox.",
                   "اشتركي للحصول على نصائح أسبوعية، مقالات جديدة، ووصفات طبيعية حصرية في بريدك الإلكتروني."
                 )}
               </p>
               <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                 <input 
                   type="email" 
                   placeholder={t("Enter your email", "أدخلي بريدك الإلكتروني")}
                   className="px-6 py-4 rounded-full bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 w-full"
                 />
                 <Button size="lg" className="rounded-full h-auto py-4 px-8 bg-gray-900 text-white hover:bg-gray-800 border-none">
                   {t("Subscribe", "اشتراك")}
                 </Button>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
