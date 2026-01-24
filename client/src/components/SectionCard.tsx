import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

interface SectionCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  delay?: number;
}

export function SectionCard({ title, description, image, href, delay = 0 }: SectionCardProps) {
  const { language } = useLanguage();
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-6 flex-grow line-clamp-3">
          {description}
        </p>
        
        <Link href={href} className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:underline">
          {language === 'ar' ? 'اقرأ المزيد' : 'Read More'} <Arrow className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
