import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import about from "../../data/about.json";
import { shouldReduceMotion } from "../../utils/motion";
import Carousel from "../animated_components/components/Carousel";

gsap.registerPlugin(ScrollTrigger);

type TimelineItem = { year: string; event: string };

type AboutData = {
  story: string;
  skills: string[];
  timeline?: TimelineItem[];
};

const data = about as AboutData;

export default function About() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduce = shouldReduceMotion();
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(".about-reveal");
      elements.forEach((el, i) => {
        const from = { autoAlpha: 0, y: 24 };
        const to = reduce
          ? { autoAlpha: 1, y: 0, duration: 0 }
          : {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: i * 0.05,
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            };
        gsap.fromTo(el, from, to as any);
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box
      id="about"
      ref={rootRef}
      component="section"
      aria-labelledby="about-heading"
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 4, md: 6 }}>
          <Stack spacing={1.5} className="about-reveal">
            <Typography
              id="about-heading"
              variant="overline"
              color="text.secondary"
            >
              About Me
            </Typography>
            <Typography variant="h4" fontWeight={700} lineHeight={1.2}>
              A little bit of my story
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: "75ch" }}
            >
              {data.story}
            </Typography>
          </Stack>

          <Box className="about-reveal" sx={{overflow:"hidden"}}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Tech stack
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{
                mt:3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Carousel></Carousel>
            </Grid>
          </Box>

          {data.timeline && data.timeline.length > 0 && (
            <Stack spacing={2} className="about-reveal">
              <Typography variant="h6" fontWeight={700}>
                Timeline
              </Typography>
              <Stack spacing={2} sx={{ position: "relative" }}>
                {data.timeline.map((item, idx) => (
                  <Stack
                    key={`${item.year}-${idx}`}
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                  >
                    <Box sx={{ pt: 0.5, color: "primary.main" }}>
                      <FiberManualRecordIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {item.year}
                      </Typography>
                      <Typography variant="body1">{item.event}</Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
