import { useLanguage } from "@/hooks/use-language";
import { useRoutines } from "@/hooks/use-content";
import { motion } from "framer-motion";
import { Sun, Moon, Clock, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Routines() {
  const { t, language } = useLanguage();
  const { data: routines, isLoading } = useRoutines();

  // Helper to get routines by frequency/type
  const morningRoutines = routines?.filter(r => r.frequency === 'morning') || [];
  const eveningRoutines = routines?.filter(r => r.frequency === 'evening') || [];
  
  // Use fallback data if API is empty for better preview
  const demoRoutines = [
    {
      id: 1,
      titleEn: "Morning Glow",
      titleAr: "إشراقة الصباح",
      frequency: "morning",
      stepsEn: ["Cleanse with lukewarm water", "Apply Vitamin C serum", "Moisturize", "Apply SPF 50+"],
      stepsAr: ["غسل الوجه بماء فاتر", "تطبيق سيروم فيتامين سي", "الترطيب", "واقي شمس ٥٠+"]
    },
    {
      id: 2,
      titleEn: "Night Repair",
      titleAr: "عناية المساء",
      frequency: "evening",
      stepsEn: ["Double cleanse", "Exfoliate (2x week)", "Retinol serum", "Heavy moisturizer", "Eye cream"],
      stepsAr: ["تنظيف مزدوج", "تقشير (مرتين أسبوعياً)", "سيروم ريتينول", "مرطب كثيف", "كريم للعين"]
    }
  ];

  const displayMorning = morningRoutines.length ? morningRoutines : demoRoutines.filter(r => r.frequency === 'morning');
  const displayEvening = eveningRoutines.length ? eveningRoutines : demoRoutines.filter(r => r.frequency === 'evening');

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-serif">
            {t("Daily Routines", "الروتين اليومي")}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            {t(
              "Consistent habits for healthy, radiant skin.",
              "عادات مستمرة لبشرة صحية ومشرقة."
            )}
          </p>
        </div>

        <Tabs defaultValue="morning" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 h-16 rounded-full bg-white p-2 shadow-sm mb-12">
            <TabsTrigger 
              value="morning" 
              className="rounded-full text-base data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700 data-[state=active]:shadow-none transition-all"
            >
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5" />
                {t("Morning Routine", "روتين الصباح")}
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="evening" 
              className="rounded-full text-base data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 data-[state=active]:shadow-none transition-all"
            >
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5" />
                {t("Evening Routine", "روتين المساء")}
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="morning">
            <div className="grid gap-8">
              {displayMorning.map((routine) => (
                <RoutineCard key={routine.id} routine={routine} type="morning" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="evening">
            <div className="grid gap-8">
              {displayEvening.map((routine) => (
                <RoutineCard key={routine.id} routine={routine} type="evening" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function RoutineCard({ routine, type }: { routine: any, type: 'morning' | 'evening' }) {
  const { t, language } = useLanguage();
  const steps = language === 'en' ? (routine.stepsEn as string[]) : (routine.stepsAr as string[]);
  
  const theme = type === 'morning' 
    ? { bg: 'bg-orange-50', border: 'border-orange-100', icon: 'text-orange-500', stepBg: 'bg-white' } 
    : { bg: 'bg-indigo-50', border: 'border-indigo-100', icon: 'text-indigo-500', stepBg: 'bg-white' };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-3xl p-8 md:p-12 ${theme.bg} border ${theme.border} relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {language === 'en' ? routine.titleEn : routine.titleAr}
            </h3>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>{steps.length * 2} {t("mins", "دقائق")}</span>
            </div>
          </div>
          <div className={`p-3 rounded-full bg-white shadow-sm ${theme.icon}`}>
            {type === 'morning' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`flex items-center gap-4 p-4 rounded-xl ${theme.stepBg} shadow-sm border border-transparent hover:border-${type === 'morning' ? 'orange' : 'indigo'}-200 transition-colors`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${type === 'morning' ? 'bg-orange-100 text-orange-600' : 'bg-indigo-100 text-indigo-600'}`}>
                {idx + 1}
              </div>
              <p className="font-medium text-gray-700">{step}</p>
              <CheckCircle2 className={`w-5 h-5 ml-auto opacity-20 ${type === 'morning' ? 'text-orange-500' : 'text-indigo-500'}`} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
