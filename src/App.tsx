import { useEffect, useState } from "react";
import useStore from "./stores/exhibition";
import { Box, Typography } from "@mui/material";
const BASE_URL = import.meta.env.VITE_CMS_ASSETS_BASE_URL;

function App() {
  const init = useStore((state) => state.init);
  const artwork = useStore((state) => state.artwork);
  const bannerText = useStore((state) => state.bannerText);
  useEffect(() => {
    init();
  }, []);
  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {bannerText !== "" && (
        <Box
          position={"absolute"}
          padding={"16px"}
          maxWidth={"66%"}
          left={0}
          top={0}
          sx={{ backgroundColor: "rgba(0,0,0,0.8)" }}
          display={"flex"}
          flexDirection={"column"}
          gap={3}

        >
          <Typography variant="body1" fontSize={"24px"}>{bannerText}</Typography>
        </Box>
      )}
      {artwork && (
        <>
          <img
            src={`${BASE_URL}/${artwork.image.filename_disk}`}
            alt="artwork"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          ></img>
          <Box
            position={"absolute"}
            padding={"16px"}
            right={0}
            bottom={0}
            maxWidth={"66%"}
            sx={{ backgroundColor: "rgba(0,0,0,0.8)" }}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
          >
            <Typography variant="body1" fontSize={"24px"}>{artwork.prompt}</Typography>
            <Box textAlign={"right"}>
              <Typography variant="h6" fontSize={"36px"}>{artwork.artist}</Typography>
              <Typography variant="body2" fontSize={"24px"}>{artwork.genAI}</Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default App;
