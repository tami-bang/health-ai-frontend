'use client'

import { useState, useEffect } from 'react'

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
}

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowSize.width < BREAKPOINTS.md
  const isTablet = windowSize.width >= BREAKPOINTS.md && windowSize.width < BREAKPOINTS.lg
  const isDesktop = windowSize.width >= BREAKPOINTS.lg

  const breakpoint = (() => {
    if (windowSize.width < BREAKPOINTS.sm) return 'xs'
    if (windowSize.width < BREAKPOINTS.md) return 'sm'
    if (windowSize.width < BREAKPOINTS.lg) return 'md'
    if (windowSize.width < BREAKPOINTS.xl) return 'lg'
    if (windowSize.width < BREAKPOINTS['2xl']) return 'xl'
    return '2xl'
  })()

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    breakpoint,
    isSmallScreen: isMobile,
    isLargeScreen: isDesktop,
  }
}
