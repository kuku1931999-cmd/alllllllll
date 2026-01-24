import { useLanguage } from "@/hooks/use-language";
import { useArticles } from "@/hooks/use-content";
import { SectionCard } from "@/components/SectionCard";
import { motion } from "framer-motion";

export default function Articles() {
  const { t, language } = useLanguage();
  const { data: articles, isLoading } = useArticles();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-serif">
            {t("Beauty Articles", "مقالات الجمال")}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            {t(
              "Expert advice, trends, and tips to enhance your natural glow.",
              "نصائح الخبراء، أحدث الصيحات، وإرشادات لتعزيز إشراقتك الطبيعية."
            )}
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[400px] rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles?.map((article, i) => (
              <SectionCard
                key={article.id}
                title={language === 'en' ? article.titleEn : article.titleAr}
                description={language === 'en' ? article.summaryEn : article.summaryAr}
                image={article.imageUrl || `https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80`}
                href={`/articles/${article.id}`}
                delay={i * 0.05}
              />
            ))}
            {articles?.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-500">
                {t("No articles found yet.", "لا توجد مقالات بعد.")}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
