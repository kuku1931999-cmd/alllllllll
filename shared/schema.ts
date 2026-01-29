import { pgTable, text, serial, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// جدول المستخدمين (كان مفقوداً وهو سبب فشل الـ Build)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Static sections like "About", "Founder"
export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  contentEn: text("content_en").notNull(),
  contentAr: text("content_ar").notNull(),
  imageUrl: text("image_url"),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  summaryEn: text("summary_en").notNull(),
  summaryAr: text("summary_ar").notNull(),
  contentEn: text("content_en").notNull(),
  contentAr: text("content_ar").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  published: boolean("published").default(true),
});

export const routines = pgTable("routines", {
  id: serial("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  frequency: text("frequency").notNull(),
  stepsEn: jsonb("steps_en").notNull(),
  stepsAr: jsonb("steps_ar").notNull(),
});

export const remedies = pgTable("remedies", {
  id: serial("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  ingredientsEn: jsonb("ingredients_en").notNull(),
  ingredientsAr: jsonb("ingredients_ar").notNull(),
  instructionsEn: text("instructions_en").notNull(),
  instructionsAr: text("instructions_ar").notNull(),
  benefitsEn: text("benefits_en").notNull(),
  benefitsAr: text("benefits_ar").notNull(),
  notesEn: text("notes_en"),
  notesAr: text("notes_ar"),
});

export const tips = pgTable("tips", {
  id: serial("id").primaryKey(),
  contentEn: text("content_en").notNull(),
  contentAr: text("content_ar").notNull(),
  category: text("category").notNull(),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  replitId: text("replit_id").notNull().unique(),
  username: text("username").notNull(),
});

// Schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertSectionSchema = createInsertSchema(sections).omit({
  id: true,
});
export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
});
export const insertRoutineSchema = createInsertSchema(routines).omit({
  id: true,
});
export const insertRemedySchema = createInsertSchema(remedies).omit({
  id: true,
});
export const insertTipSchema = createInsertSchema(tips).omit({ id: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Section = typeof sections.$inferSelect;
export type InsertSection = z.infer<typeof insertSectionSchema>;
export type Article = typeof articles.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Routine = typeof routines.$inferSelect;
export type InsertRoutine = z.infer<typeof insertRoutineSchema>;
export type Remedy = typeof remedies.$inferSelect;
export type InsertRemedy = z.infer<typeof insertRemedySchema>;
export type Tip = typeof tips.$inferSelect;
export type InsertTip = z.infer<typeof insertTipSchema>;
