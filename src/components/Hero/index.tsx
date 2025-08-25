import { Box, Button, Container, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import hero from "../../data/hero.json";
import { shouldReduceMotion } from "../../utils/motion";
import ShinyText from "../animated_components/components/ShinyText";
import "./Hero.css";
import Crosshair from "../animated_components/components/Crosshair";
import { useColorMode } from "@/styles/colorMode";
import LightRays from "../animated_components/components/LightRays";
type HeroData = {
  name: string;
  tagline: string;
  intro: string;
  cta: string;
};

const data = hero as HeroData;

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {mode} = useColorMode();
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduce = shouldReduceMotion();
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [
            ".hero-name",
            ".hero-tagline",
            ".hero-intro",
            ".hero-cta",
            ".scroll-hint",
          ],
          { autoAlpha: 1, y: 0 }
        );
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(".hero-name", { autoAlpha: 0, y: 20, duration: 0.6 })
        .from(".hero-tagline", { autoAlpha: 0, y: 18, duration: 0.5 }, "-=0.2")
        .from(".hero-intro", { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.2")
        .from(".hero-cta", { autoAlpha: 0, y: 10, duration: 0.4 }, "-=0.2");

      gsap.fromTo(
        ".scroll-hint",
        { autoAlpha: 0, y: 0 },
        {
          autoAlpha: 1,
          y: 6,
          duration: 1.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 1.1,
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const onCtaClick = () => {
    const el = document.querySelector("#work");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box
      ref={rootRef}
      component="header"
      role="banner"
      aria-labelledby="hero-heading"
      sx={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <LightRays></LightRays>

      <Box ref={containerRef} style={{ height: "300px", overflow: "hidden" }}>
        <Crosshair
          containerRef={rootRef}
          color={mode === "dark" ? "#ffffff" : "#222222"}
        />
      </Box>
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 2, sm: 2.5, md: 3 }} alignItems="center">
          <Typography
            id="hero-heading"
            className="hero-name"
            variant="h1"
            sx={{
              fontWeight: 800,
              lineHeight: 1.1,
              fontSize: {
                xs: "2.25rem",
                sm: "2.75rem",
                md: "3.5rem",
                lg: "4rem",
              },
            }}
          >
            Hey, I'm {data.name}
          </Typography>

          <Typography
            className="hero-tagline"
            variant="h4"
            color="text.secondary"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
            }}
          >
            {data.tagline}
          </Typography>

          <Typography
            className="hero-intro"
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "65ch" }}
          >
            {data.intro}
          </Typography>

          <Box className="hero-cta" sx={{ width: "100%" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="outlined"
                color="primary"
                size="large"
                component="a"
                href="/resume.pdf"
                download
                aria-label="Download Resume PDF"
              >
                Download Resume
              </Button>

                <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#1565c0", // darker shade of blue
                  "&:hover": {
                  bgcolor: "#0d47a1", // even darker on hover
                  },
                }}
                onClick={onCtaClick}
                aria-label={data.cta}
                >
                <ShinyText
                  text={`${data.cta}`}
                  disabled={false}
                  speed={3}
                  className="custom-class"
                />{" "}
                </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>

      <Box
        className="scroll-hint"
        aria-hidden
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "text.secondary",
        }}
      >
        <KeyboardArrowDownIcon fontSize="large" />
      </Box>
    </Box>
  );
}
