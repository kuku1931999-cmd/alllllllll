import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { Section, Article, Routine, Remedy, Tip } from "@shared/schema";

export function useSections() {
  return useQuery({
    queryKey: [api.sections.list.path],
    queryFn: async () => {
      const res = await fetch(api.sections.list.path);
      if (!res.ok) throw new Error("Failed to fetch sections");
      return api.sections.list.responses[200].parse(await res.json());
    },
  });
}

export function useArticles() {
  return useQuery({
    queryKey: [api.articles.list.path],
    queryFn: async () => {
      const res = await fetch(api.articles.list.path);
      if (!res.ok) throw new Error("Failed to fetch articles");
      return api.articles.list.responses[200].parse(await res.json());
    },
  });
}

export function useArticle(id: number) {
  return useQuery({
    queryKey: [api.articles.get.path, id],
    queryFn: async () => {
      // Manual URL construction since we don't have buildUrl helper in this context yet
      // but in a real app, I'd use the helper.
      const url = api.articles.get.path.replace(':id', id.toString());
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch article");
      return api.articles.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useRoutines() {
  return useQuery({
    queryKey: [api.routines.list.path],
    queryFn: async () => {
      const res = await fetch(api.routines.list.path);
      if (!res.ok) throw new Error("Failed to fetch routines");
      return api.routines.list.responses[200].parse(await res.json());
    },
  });
}

export function useRemedies() {
  return useQuery({
    queryKey: [api.remedies.list.path],
    queryFn: async () => {
      const res = await fetch(api.remedies.list.path);
      if (!res.ok) throw new Error("Failed to fetch remedies");
      return api.remedies.list.responses[200].parse(await res.json());
    },
  });
}

export function useTips() {
  return useQuery({
    queryKey: [api.tips.list.path],
    queryFn: async () => {
      const res = await fetch(api.tips.list.path);
      if (!res.ok) throw new Error("Failed to fetch tips");
      return api.tips.list.responses[200].parse(await res.json());
    },
  });
}
