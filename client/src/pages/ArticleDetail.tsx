import { useLanguage } from "@/hooks/use-language";
import { useArticle } from "@/hooks/use-content";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ArticleDetail() {
  const { t, language } = useLanguage();
  const [, params] = useRoute("/articles/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: article, isLoading } = useArticle(id);
  const Arrow = language === 'ar' ? ArrowRight : ArrowLeft;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="h-8 bg-gray-100 w-1/4 mb-8 rounded animate-pulse" />
        <div className="h-[400px] bg-gray-100 rounded-2xl mb-8 animate-pulse" />
        <div className="space-y-4">
          <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-4/6 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">{t("Article not found", "المقال غير موجود")}</h1>
        <Link href="/articles">
          <Button>{t("Back to Articles", "العودة للمقالات")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src={article.imageUrl || "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1600&auto=format&fit=crop"} 
          alt={language === 'en' ? article.titleEn : article.titleAr}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent text-white">
          <div className="container mx-auto">
             <div className="flex items-center gap-4 text-sm md:text-base mb-4 opacity-80">
               <span className="bg-primary/80 px-3 py-1 rounded-full uppercase tracking-widest text-xs font-bold">
                 {article.category}
               </span>
               <div className="flex items-center gap-2">
                 <Calendar className="w-4 h-4" />
                 <span>2024</span>
               </div>
             </div>
             <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight max-w-4xl">
               {language === 'en' ? article.titleEn : article.titleAr}
             </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
        <Link href="/articles" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors">
          <Arrow className="w-4 h-4" />
          {t("Back to Articles", "العودة للمقالات")}
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg prose-purple max-w-none prose-headings:font-serif prose-img:rounded-2xl"
        >
          {/* We are rendering raw text for now, but in a real app this would parse HTML/Markdown */}
          <div className="whitespace-pre-line text-gray-700 leading-loose">
            {language === 'en' ? article.contentEn : article.contentAr}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
