import { useLanguage } from "@/hooks/use-language";
import { useRemedies } from "@/hooks/use-content";
import { motion } from "framer-motion";
import { Droplet, Leaf, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

export default function Remedies() {
  const { t, language } = useLanguage();
  const { data: remedies, isLoading } = useRemedies();

  // Fallback data
  const demoRemedies = [
    {
      id: 1,
      titleEn: "Honey & Yogurt Mask",
      titleAr: "قناع العسل والزبادي",
      ingredientsEn: ["1 tbsp raw honey", "2 tbsp greek yogurt", "Few drops lemon juice"],
      ingredientsAr: ["١ ملعقة عسل خام", "٢ ملعقة زبادي يوناني", "قطرات من عصير الليمون"],
      instructionsEn: "Mix all ingredients. Apply to clean face. Leave for 15 mins. Rinse with warm water.",
      instructionsAr: "اخلطي جميع المكونات. ضعيها على وجه نظيف. اتركيها ١٥ دقيقة. اغسلي بماء دافئ.",
      benefitsEn: "Moisturizing, brightening, soothing.",
      benefitsAr: "مرطب، مفتح للبشرة، مهدئ."
    },
    {
      id: 2,
      titleEn: "Coffee Body Scrub",
      titleAr: "مقشر القهوة للجسم",
      ingredientsEn: ["1/2 cup ground coffee", "1/4 cup coconut oil", "2 tbsp brown sugar"],
      ingredientsAr: ["١/٢ كوب قهوة مطحونة", "١/٤ كوب زيت جوز هند", "٢ ملعقة سكر بني"],
      instructionsEn: "Mix well. Massage onto damp skin in circular motions. Rinse thoroughly.",
      instructionsAr: "اخلطي جيداً. دلكي على بشرة رطبة بحركات دائرية. اغسلي جيداً.",
      benefitsEn: "Exfoliating, reduces cellulite, softening.",
      benefitsAr: "مقشر، يقلل السيلوليت، منعم."
    }
  ];

  const displayRemedies = remedies?.length ? remedies : demoRemedies;

  return (
    <div className="min-h-screen py-12 bg-green-50/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-green-100 rounded-full text-green-700">
             <Leaf className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-serif">
            {t("Natural Remedies", "وصفات طبيعية")}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            {t(
              "Pure, simple ingredients from your kitchen for radiant beauty.",
              "مكونات نقية وبسيطة من مطبخك لجمال متألق."
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayRemedies.map((remedy, i) => (
            <RemedyCard key={remedy.id} remedy={remedy} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RemedyCard({ remedy, index }: { remedy: any, index: number }) {
  const { t, language } = useLanguage();
  const ingredients = language === 'en' ? (remedy.ingredientsEn as string[]) : (remedy.ingredientsAr as string[]);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all cursor-pointer border border-transparent hover:border-green-100 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Sprout className="w-6 h-6" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">
            {language === 'en' ? remedy.titleEn : remedy.titleAr}
          </h3>
          
          <p className="text-gray-500 text-sm mb-6 line-clamp-2">
            {language === 'en' ? remedy.benefitsEn : remedy.benefitsAr}
          </p>
          
          <div className="flex items-center gap-2 text-sm font-medium text-green-700">
            {t("View Recipe", "عرض الوصفة")}
          </div>
        </motion.div>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            {language === 'en' ? remedy.titleEn : remedy.titleAr}
          </DialogTitle>
          <DialogDescription className="text-base text-gray-500 mt-2">
             {language === 'en' ? remedy.benefitsEn : remedy.benefitsAr}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8 mt-6">
           <div className="bg-green-50/50 p-6 rounded-2xl">
              <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                <Leaf className="w-4 h-4" /> {t("Ingredients", "المكونات")}
              </h4>
              <ul className="space-y-2">
                {ingredients.map((ing, i) => (
                  <li key={i} className="text-gray-700 flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
           </div>
           
           <div>
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <Droplet className="w-4 h-4 text-blue-400" /> {t("Instructions", "طريقة التحضير")}
              </h4>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                 {language === 'en' ? remedy.instructionsEn : remedy.instructionsAr}
              </p>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
