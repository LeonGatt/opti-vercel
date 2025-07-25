import { useCallback, useEffect, useRef, useState } from 'react'

interface UseAutoplayTabsOptions {
  /** Whether autoplay is enabled. Default: true */
  enabled?: boolean
  /** Interval between tab switches in milliseconds. Default: 4000 */
  interval?: number
  /** Whether to pause on hover. Default: true */
  pauseOnHover?: boolean
  /** Whether to pause when user manually selects a tab. Default: true */
  pauseOnInteraction?: boolean
  /** Duration to pause after user interaction in milliseconds. Default: 5000 */
  pauseDuration?: number
}

interface UseAutoplayTabsProps<T> {
  items: T[]
  initialItem?: T | null
  options?: UseAutoplayTabsOptions
}

const DEFAULT_INTERVAL_MS = 4000
const DEFAULT_PAUSE_DURATION_MS = 5000

/**
 * Custom hook for autoplay tabs functionality
 * 
 * @example
 * ```tsx
 * const { activeItem, selectItem, handleMouseEnter, handleMouseLeave } = useAutoplayTabs({
 *   items: tabsData,
 *   options: {
 *     enabled: true,
 *     interval: 3000,
 *     pauseOnHover: true,
 *     pauseOnInteraction: true,
 *     pauseDuration: 5000
 *   }
 * })
 * ```
 */

export function useAutoplayTabs<T extends { id: string }>({
  items,
  initialItem,
  options = {}
}: UseAutoplayTabsProps<T>) {
  const {
    enabled = true,
    interval = DEFAULT_INTERVAL_MS,
    pauseOnHover = true,
    pauseOnInteraction = true,
    pauseDuration = DEFAULT_PAUSE_DURATION_MS
  } = options

  const [activeItem, setActiveItem] = useState<T | null>(() => initialItem || items?.[0] || null)
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const selectItem = useCallback((itemId: string) => {
    const item = items?.find((item) => item.id === itemId)
    if (item) {
      setActiveItem(item)
      
      if (pauseOnInteraction && enabled) {
        // Pause autoplay when user manually selects an item
        setIsAutoplayPaused(true)
        
        // Resume autoplay after specified duration of no interaction
        if (pauseTimeoutRef.current) {
          clearTimeout(pauseTimeoutRef.current)
        }
        pauseTimeoutRef.current = setTimeout(() => {
          setIsAutoplayPaused(false)
        }, pauseDuration)
      }
    }
  }, [items, pauseOnInteraction, enabled, pauseDuration])

  // Autoplay logic
  useEffect(() => {
    if (!enabled || !items?.length || isAutoplayPaused) return

    autoplayIntervalRef.current = setInterval(() => {
      setActiveItem(current => {
        if (!current || !items) return current
        
        const currentIndex = items.findIndex(item => item.id === current.id)
        const nextIndex = (currentIndex + 1) % items.length
        return items[nextIndex]
      })
    }, interval)

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current)
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
    }
  }, [items, isAutoplayPaused, enabled, interval])

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover && enabled) {
      setIsAutoplayPaused(true)
    }
  }, [pauseOnHover, enabled])

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && enabled) {
      setIsAutoplayPaused(false)
    }
  }, [pauseOnHover, enabled])

  return {
    activeItem,
    selectItem,
    handleMouseEnter,
    handleMouseLeave,
    isAutoplayPaused
  }
} 