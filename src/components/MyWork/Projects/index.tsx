import { Box, Card, CardActions, CardContent, CardHeader, Container, Grid, Button, Typography } from '@mui/material'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projects from '../../../data/projects.json'
import { shouldReduceMotion } from '../../../utils/motion'
import footer from '../../../data/footer.json'

gsap.registerPlugin(ScrollTrigger)

type Project = {
  title: string
  description: string
  link: string
}

const items = projects as Project[]
const githubUrl = (() => {
  const f: any = footer as any
  const hit = f?.socials?.find((s: any) => String(s?.kind ?? s?.label ?? '').toLowerCase().includes('github'))
  return hit?.url || 'https://github.com/Nikunjkanteliya'
})()

export default function Projects() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const reduce = shouldReduceMotion()
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card')
      cards.forEach((el, i) => {
        const from = { autoAlpha: 0, y: 20 }
        const to = reduce
          ? { autoAlpha: 1, y: 0, duration: 0 }
          : {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: i * 0.05,
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
            }
        gsap.fromTo(el, from, to as any)
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <Box ref={rootRef} component="section" aria-labelledby="projects-heading" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography id="projects-heading" variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Projects
        </Typography>
        <Grid container spacing={2}>
          {items.map((p, idx) => (
            <Grid key={`${p.title}-${idx}`} item xs={12} sm={6} md={4}>
              <Card
                className="project-card"
                variant="outlined"
                tabIndex={0}
                sx={{
                  height: '100%',
                  display:'flex',
                 flexDirection: 'column',
                 justifyContent:'space-between',
                  transform: 'translateY(0) scale(1)',
                  transition: (t) =>
                    t.transitions.create(['transform', 'box-shadow', 'border-color', 'background-color'], {
                      duration: 200,
                      easing: t.transitions.easing.easeOut,
                    }),
                  '&:hover, &:focus-visible': {
                    transform: 'translateY(-4px) scale(1.01)',
                    boxShadow: 6,
                    borderColor: 'primary.main',
                    backgroundColor: (t) =>
                      t.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  },
                  outline: 'none',
                }}
              >
                <CardHeader title={p.title} titleTypographyProps={{ fontWeight: 700 }} />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {p.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button component="a" href={p.link} target="_blank" rel="noopener noreferrer" size="small">
                    Visit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            component="a"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="See more projects on GitHub"
          >
            to see more...
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
