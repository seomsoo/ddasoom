import type { StateCreator } from "zustand";

export const createContractSlice: StateCreator<ContactStore, [], []> = (
  set,
) => ({
  phoneNumbers: [],
  setPhoneNumbers: (phone: EmergencyPhoneNumber) =>
    set((state) => ({
      phoneNumbers: [...state.phoneNumbers, phone],
    })),
});
