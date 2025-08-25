import { Box,SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Hero from "./components/Hero";
import About from "./components/About";
import MyWork from "./components/MyWork";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SplashCursor from "./components/animated_components/components/SplashCursor";
import { useColorMode } from "./styles/colorMode";
import LightRays from "./components/animated_components/components/LightRays";
import Navbar from "./components/Navbar";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { PiCat } from "react-icons/pi";

function SectionWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }, []);
  return (
    <Box ref={ref} component="section" sx={{ py: { xs: 6, md: 10 } }}>
      {children}
    </Box>
  );
}

export default function App() {
  const { mode, toggleColorMode } = useColorMode();
  const [cursorOn, setCursorOn] = useState(false);

  return (
    <>
      <Box id="top" />
      <Navbar />
      {cursorOn && <SplashCursor />}
      {/* <LightRays raysOrigin="bottom-center"></LightRays> */}

      <Box>
        <Hero />
        <About />
        <MyWork />
        <Contact />
        <Footer />
      </Box>

      <SpeedDial
        ariaLabel="Quick actions"
        icon={<PiCat size={30}/>}
        direction="up"
        sx={{
          position: "fixed",
          bottom: { xs: 12, md: 16 },
          right: { xs: 12, md: 16 },
          zIndex: (t) => t.zIndex.appBar + 2,
          "& .MuiFab-root": {
        width: { xs: 38, md: 48 },
        height: { xs: 38, md: 48 },
          },
        }}
        FabProps={{
          size: "medium",
        }}
      >
        <SpeedDialAction
          key="toggle-theme"
          icon={mode === "dark" ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          tooltipTitle={mode === "dark" ? "Light mode" : "Dark mode"}
          onClick={toggleColorMode}
          sx={{
        "& .MuiSvgIcon-root": {
          fontSize: { xs: 20, md: 24 },
        },
          }}
        />
        <SpeedDialAction
          key="toggle-cursor"
          icon={<AutoAwesomeIcon color={cursorOn ? "primary" : undefined} fontSize="small" />}
          tooltipTitle={cursorOn ? "Disable Splash Cursor" : "Enable Splash Cursor"}
          onClick={() => setCursorOn((v) => !v)}
          sx={{
        "& .MuiSvgIcon-root": {
          fontSize: { xs: 20, md: 24 },
        },
          }}
        />
      </SpeedDial>
    </>
  );
}
