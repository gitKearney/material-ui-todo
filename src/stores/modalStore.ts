import {create} from "zustand";

export type ModalStoreState = {
  open: boolean;
  todoIndex?: number;
}

export type ModalStoreActions = {
  setOpen: (isOpen: boolean) => void;
  openToIndex: (index: number) => void;
  clearTodoIndex: () => void;
};

export const useModalStore = create<ModalStoreState & ModalStoreActions>()(
  (set) => ({
    open: false,
    todoIndex: undefined,
    setOpen: (isOpen) => set(() => ({open: isOpen})),
    openToIndex: (index) => set(() => ({todoIndex: index, open: true})),
    clearTodoIndex: () => (set(() => ({todoIndex: undefined})))
  })
);