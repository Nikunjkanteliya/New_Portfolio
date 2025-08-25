import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import Experience from './Experience'
import Projects from './Projects'
import Testimonials from './Testimonials'

export default function MyWork() {
  return (
    <Box id="work" component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 4, md: 6 }}>
          <Stack spacing={1}>
            <Typography variant="overline" color="text.secondary">
              My Work
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              Experience, Projects & Testimonials
            </Typography>
          </Stack>

          <Experience />
          <Divider />
          <Projects />
          <Divider />
          <Testimonials />
        </Stack>
      </Container>
    </Box>
  )
}
