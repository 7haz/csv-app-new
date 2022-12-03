import create from "zustand";

const useFileStore = create(set => ({
  list: [],
  add: item => set(st => ({ list: [...st.list, item] })),
  remove: target_sku => set(st => ({ list: st.list.filter(i => i.sku !== target_sku) })),
}));

export default useFileStore;