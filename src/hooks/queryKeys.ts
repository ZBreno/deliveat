export const QueryKeysCategories = {
  all: ["categories"] as const,
  item: (uuid: string) => [...QueryKeysCategories.all, uuid] as const,
};
