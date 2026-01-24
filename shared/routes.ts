import { z } from 'zod';
import { 
  sections, articles, routines, remedies, tips,
  insertSectionSchema, insertArticleSchema, insertRoutineSchema, insertRemedySchema, insertTipSchema 
} from './schema';

export const api = {
  sections: {
    list: {
      method: 'GET' as const,
      path: '/api/sections',
      responses: {
        200: z.array(z.custom<typeof sections.$inferSelect>()),
      },
    },
  },
  articles: {
    list: {
      method: 'GET' as const,
      path: '/api/articles',
      responses: {
        200: z.array(z.custom<typeof articles.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/articles/:id',
      responses: {
        200: z.custom<typeof articles.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  routines: {
    list: {
      method: 'GET' as const,
      path: '/api/routines',
      responses: {
        200: z.array(z.custom<typeof routines.$inferSelect>()),
      },
    },
  },
  remedies: {
    list: {
      method: 'GET' as const,
      path: '/api/remedies',
      responses: {
        200: z.array(z.custom<typeof remedies.$inferSelect>()),
      },
    },
  },
  tips: {
    list: {
      method: 'GET' as const,
      path: '/api/tips',
      responses: {
        200: z.array(z.custom<typeof tips.$inferSelect>()),
      },
    },
  },
};
