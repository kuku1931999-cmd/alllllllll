import { db } from "./db";
import { 
  sections, articles, routines, remedies, tips,
  type Section, type Article, type Routine, type Remedy, type Tip,
  type InsertSection, type InsertArticle, type InsertRoutine, type InsertRemedy, type InsertTip
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Sections
  getSections(): Promise<Section[]>;
  createSection(section: InsertSection): Promise<Section>;

  // Articles
  getArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;

  // Routines
  getRoutines(): Promise<Routine[]>;
  createRoutine(routine: InsertRoutine): Promise<Routine>;

  // Remedies
  getRemedies(): Promise<Remedy[]>;
  createRemedy(remedy: InsertRemedy): Promise<Remedy>;

  // Tips
  getTips(): Promise<Tip[]>;
  createTip(tip: InsertTip): Promise<Tip>;
}

export class DatabaseStorage implements IStorage {
  // Sections
  async getSections(): Promise<Section[]> {
    return await db.select().from(sections);
  }
  async createSection(section: InsertSection): Promise<Section> {
    const [newSection] = await db.insert(sections).values(section).returning();
    return newSection;
  }

  // Articles
  async getArticles(): Promise<Article[]> {
    return await db.select().from(articles);
  }
  async getArticle(id: number): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article;
  }
  async createArticle(article: InsertArticle): Promise<Article> {
    const [newArticle] = await db.insert(articles).values(article).returning();
    return newArticle;
  }

  // Routines
  async getRoutines(): Promise<Routine[]> {
    return await db.select().from(routines);
  }
  async createRoutine(routine: InsertRoutine): Promise<Routine> {
    const [newRoutine] = await db.insert(routines).values(routine).returning();
    return newRoutine;
  }

  // Remedies
  async getRemedies(): Promise<Remedy[]> {
    return await db.select().from(remedies);
  }
  async createRemedy(remedy: InsertRemedy): Promise<Remedy> {
    const [newRemedy] = await db.insert(remedies).values(remedy).returning();
    return newRemedy;
  }

  // Tips
  async getTips(): Promise<Tip[]> {
    return await db.select().from(tips);
  }
  async createTip(tip: InsertTip): Promise<Tip> {
    const [newTip] = await db.insert(tips).values(tip).returning();
    return newTip;
  }
}

export const storage = new DatabaseStorage();
