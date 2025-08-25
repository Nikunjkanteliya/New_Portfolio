import { AppBar, Box, Tab, Tabs, Toolbar } from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'

const tabs = [
  { label: 'Home', href: '#top' },
  { label: 'My Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const barRef = useRef<HTMLDivElement | null>(null)
  const [value, setValue] = useState(0)
  const [isManualScrolling, setIsManualScrolling] = useState(false)

  // Determine active tab by hash
  const activeIndex = useMemo(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    const i = tabs.findIndex(t => t.href === hash)
    return i >= 0 ? i : 0
  }, [typeof window !== 'undefined' ? window.location.hash : ''])

  useEffect(() => setValue(activeIndex), [activeIndex])

  useEffect(() => {
    if (!barRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.navbar-container', { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' })
    }, barRef)
    return () => ctx.revert()
  }, [])

  // Update active tab on manual scroll
  useEffect(() => {
    const links = tabs.map(t => t.href)
    const getTop = (hash: string) => {
      if (hash === '#top') return 0
      const el = document.querySelector(hash) as HTMLElement | null
      if (!el) return Number.POSITIVE_INFINITY
      return el.getBoundingClientRect().top + window.scrollY
    }
    let ticking = false
    const update = () => {
      ticking = false
      if (isManualScrolling) return // skip while smooth scroll in progress

      const threshold = window.innerHeight * 0.35
      const y = window.scrollY + threshold
      const workTop = getTop('#work')
      const contactTop = getTop('#contact')
      let idx = 0
      if (y >= contactTop) idx = 2
      else if (y >= workTop) idx = 1
      else idx = 0
      setValue(prev => {
        if (prev !== idx) {
          const href = links[idx]
          try { history.replaceState(null, '', href) } catch {}
        }
        return idx
      })
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // initialize
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isManualScrolling])

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    const href = tabs[newValue].href
    const el = document.querySelector(href === '#top' ? 'body' : href)

    // disable scroll listener temporarily
    setIsManualScrolling(true)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', href)

    // re-enable after smooth scroll duration (~800ms)
    setTimeout(() => setIsManualScrolling(false), 800)
  }

  return (
    <AppBar
      ref={barRef}
      position="fixed"
      elevation={0}
      color="transparent"
      sx={{
        top: 12,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        zIndex: (t) => t.zIndex.appBar + 1,
      }}
    >
      <Toolbar disableGutters sx={{ width: '100%', justifyContent: 'center' }} className="navbar-container">
        <Box
          sx={(theme) => ({
            pointerEvents: 'auto',
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(22,22,26,0.6)' : 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: 999,
            border: '1px solid',
            borderColor: theme.palette.divider,
            px: { xs: 1, sm: 1.5 },
            py: { xs: 0.5, sm: 0.75 },
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
          })}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            textColor="inherit"
            TabIndicatorProps={{ style: { display: 'none' } }}
            sx={{
              minHeight: 'unset',
              '& .MuiTab-root': {
                minHeight: 'unset',
                minWidth: { xs: 80, sm: 120 },
                px: { xs: 1.25, sm: 2 },
                color: 'text.secondary',
                transition: 'color .2s ease, transform .2s ease, background-color .2s ease',
                borderRadius: 999,
                WebkitTapHighlightColor: 'transparent',
                '&:hover': {
                  bgcolor: (t) => (t.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                  color: 'text.primary',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                  bgcolor: (t) => (t.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'),
                },
              },
              '& .MuiTab-root.Mui-selected': {
                color: 'primary.main',
                fontWeight: 700,
                transform: 'scale(1.02)',
                bgcolor: (t) => (t.palette.mode === 'dark' ? 'rgba(0,255,106,0.08)' : 'rgba(0,255,106,0.08)'),
              },
            }}
          >
            {tabs.map((t, i) => (
              <Tab
                key={t.href}
                disableRipple
                disableFocusRipple
                label={
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, position: 'relative' }}>
                    {value === i && (
                      <Box
                        className="active-dot"
                        sx={{
                          width: 8,
                          height: 8,
                          mb: 0.3,
                          borderRadius: '50%',
                          bgcolor: '#00FF6A',
                          boxShadow: '0 0 8px 2px rgba(0,255,106,0.7)',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }}
                      />
                    )}
                    <span>{t.label}</span>
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>
      </Toolbar>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: .85; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </AppBar>
  )
}
