import { Box, Button, Container, Link, Stack, TextField, Typography, Alert } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import contact from '../../data/contact.json';
import footer from '../../data/footer.json';
import { shouldReduceMotion } from '../../utils/motion';
import { useForm, ValidationError } from '@formspree/react'; // <-- same as second snippet [1]

gsap.registerPlugin(ScrollTrigger);

type ContactData = {
  heading: string;
  friendlyMessage: string;
  form?: {
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitText: string;
  };
};

type FooterInfo = { email?: string; signoff?: string };

const data = contact as ContactData;
const footerInfo = footer as FooterInfo;

export default function Contact() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  // Remove custom status machine; rely on Formspree state instead. [1]
  const [state, handleSubmit] = useForm('xdovlepp'); // <-- your Formspree form id [1]

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduce = shouldReduceMotion();
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>('.contact-col');
      targets.forEach((el, i) => {
        const from = { autoAlpha: 0, y: 24 };
        const to = reduce
          ? { autoAlpha: 1, y: 0, duration: 0 }
          : {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: i * 0.05,
              scrollTrigger: { trigger: el, start: 'top 85%' },
            };
        gsap.fromTo(el, from, to as any);
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Optional: clear inputs on success (Formspree exposes state.succeeded). [1]
  useLayoutEffect(() => {
    if (state.succeeded) {
      setName('');
      setEmail('');
      setMessage('');
    }
  }, [state.succeeded]);

  return (
    <Box id="contact" ref={rootRef} component="section" aria-labelledby="contact-heading" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 3, md: 4 }}>
          <Typography id="contact-heading" variant="overline" color="text.secondary">
            {data.heading}
          </Typography>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 3, md: 4 }}>
            <Stack className="contact-col" spacing={2} sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight={700} sx={{ maxWidth: 700 }}>
                {data.friendlyMessage}
              </Typography>

              <Box aria-live="polite">
                {state.succeeded && (
                  <Alert severity="success" role="status">
                    Thank you for submitting your response!
                  </Alert>
                )}
                {state.errors   && (
                  <Alert severity="error" role="alert">
                    Something went wrong. Please contact{' '}
                    {footerInfo.email ? <Link href={`mailto:${footerInfo.email}`}>{footerInfo.email}</Link> : 'via email.'}
                  </Alert>
                )}
              </Box>
            </Stack>

            <Box
              className="contact-col"
              component="form"
              // Remove custom Netlify handling; Formspree handles submission. [1]
              onSubmit={handleSubmit}
              sx={{ flex: 1 }}
            >
              <Stack spacing={2}>
                <TextField
                  name="name"
                  label={data.form?.nameLabel}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="medium"
                  fullWidth
                  required
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} /> {/* [1] */}

                <TextField
                  name="email"
                  type="email"
                  label={data.form?.emailLabel}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="medium"
                  fullWidth
                  required
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} /> {/* [1] */}

                <TextField
                  name="message"
                  label={data.form?.messageLabel}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  size="medium"
                  fullWidth
                  multiline
                  minRows={4}
                  required
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} /> {/* [1] */}

                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="large"
                    aria-label={data.form?.submitText}
                    disabled={state.submitting} // <-- use Formspree submitting flag [1]
                  >
                    {state.submitting ? 'Sending…' : data.form?.submitText}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
