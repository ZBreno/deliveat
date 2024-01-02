export const QueryKeysCategories = {
  all: ["categories"] as const,
  item: (uuid: string) => [...QueryKeysCategories.all, uuid] as const,
};

export const QueryKeysUsers = {
  all: ["stories"] as const,
  all_establishment: ["establishment"] as const,
  item: (uuid: string) => [...QueryKeysUsers.all, uuid] as const,
  item_establishment: (uuid: string) =>
    [...QueryKeysUsers.all_establishment, uuid] as const,
};

export const QueryKeysTickets = {
  all: ["tickets"] as const,
  item: (uuid: string) => [...QueryKeysTickets.all, uuid] as const,
};

export const QueryKeysOrders = {
  all: ["orders"] as const,
  item: (uuid: string) => [...QueryKeysOrders.all, uuid] as const,
};

export const QueryKeysProducts = {
  all: ["products"] as const,
  item: (uuid: string) => [...QueryKeysProducts.all, uuid] as const,
};
