import packageJson from "../../package.json";

import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { Notification } from "../types/notification";
import { ColorMode } from "../types/colorMode";
import { Language } from "../types/language";
import { setLanguage } from "../i18n";

interface State {
  version: string;
  user: string | null;
  colorMode: ColorMode;
  language: Language;
  notifications: Notification[];
  drawerOpen: boolean;
  settingsOpen: boolean;
  init: () => void;
  setUser: (user: string) => void;
  toggleColorMode: () => void;
  toggleDrawerOpen: () => void;
  toggleSettingsOpen: () => void;
  addNotification: (
    status: "info" | "success" | "warning" | "error",
    title: string,
    description: string,
    autoClose?: boolean,
    isMarkdown?: boolean,
    id?: string
  ) => void;
  removeNotification: (id: string) => void;
}

const useStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        version: packageJson.version,
        user: null,
        colorMode: "DARK",
        language: "de-DE",
        drawerOpen: false,
        settingsOpen: false,
        notifications: [],
        init: () => {
          setLanguage("DE")
        },
        setUser: (user: string) => {
          set({
            user,
          });
        },
        toggleSettingsOpen: () => {
          set({
            settingsOpen: !get().settingsOpen,
          });
        },
        toggleColorMode: () => {
          set({
            colorMode: get().colorMode === "LIGHT" ? "DARK" : "LIGHT",
          });
        },
        toggleDrawerOpen: () => {
          set({
            drawerOpen: !get().drawerOpen,
          });
        },
        addNotification: (
          status,
          title,
          description = "",
          autoClose = true,
          isMarkdown = false,
          id = uuidv4()
        ) => {
          const newNotification = {
            id,
            open: true,
            title,
            autoClose,
            description,
            status,
            isMarkdown,
            duration: 5000,
          };
          set(() => ({
            notifications: [
              ...get().notifications.filter((n) => n.id !== id),
              newNotification,
            ],
          }));
        },
        removeNotification: (id: string) => {
          const notifications = [
            ...get().notifications.filter(
              (notification) => notification.id !== id
            ),
          ];
          set(() => ({ notifications }));
        },
      }),
      {
        name: "app",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => {},
      }
    ),
    { name: "app" }
  )
);

export default useStore;
