import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_CMS_BASE_URL;

const ws = new WebSocket(import.meta.env.VITE_CMS_WS_URL);
ws.addEventListener("open", (event) => {
  console.log("opened ws connection", event);
  ws.send(
    JSON.stringify({
      type: "auth",
      access_token: import.meta.env.VITE_CMS_ACCESS_TOKEN,
    })
  );
});
ws.addEventListener("message", (event) => {
  try {
    const data = JSON.parse(event.data);
    if (data.type === "ping") {
      ws.send(
        JSON.stringify({
          type: "pong",
        })
      );
    } else if (data.type === "auth") {
      if (data.status === "ok") {
        const collections = ["artworks"];
        collections.forEach((collection) => {
          ws.send(
            JSON.stringify({
              type: "subscribe",
              collection,
              query: {
                fields: ["*.*"],
              },
            })
          );
        });
      }
    } else if (data.type === "subscription") {
      if (data.event === "update") {
        // useStore.getState().update(data.data);
      }
    } else {
      console.log("got message", event.data);
    }
  } catch (error) {}
});
ws.addEventListener("error", (event) => {
  console.log("got error message", event);
});

interface State {
  artworks: any[];
  artwork: any| null;
  init: () => void;
  tick: () => void;
  update: (data: any) => void;
}

const useStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        artworks: [],
        artwork: null,
        init: async () => {
          axios.get(`${BASE_URL}/artworks?fields=*.*&limit=-1`).then((res) => {
            set({ artworks: res?.data?.data });
          });
          setInterval(() => {
            get().tick()
          }, 5000);
        },
        tick: () => {
          const artworks = get().artworks
          const artwork = artworks[Math.floor(Math.random() * artworks.length)];
          if(artwork){
            set({ artwork })
          }
        },
        update: (data: any) => {
          data.forEach((item: any) => {
            // devices
          });
        },
      }),
      {
        name: "exhibition",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => {},
      }
    ),
    { name: "exhibition" }
  )
);

export default useStore;
