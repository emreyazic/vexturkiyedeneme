import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTranslation<T extends Record<string, any>>(
  content: { TR: T; EN?: any },
  language: 'TR' | 'EN'
): { t: T; isFallback: boolean } {
  const tr = content.TR
  if (language === 'TR') {
    return { t: tr, isFallback: false }
  }
  const en = content.EN || {}
  let isFallback = false

  const merge = (trVal: any, enVal: any): any => {
    if (trVal === null || trVal === undefined) return enVal
    if (typeof trVal === 'object') {
      if (Array.isArray(trVal)) {
        return trVal.map((item, idx) => {
          const enItem = Array.isArray(enVal) ? enVal[idx] : undefined
          if (typeof item === 'string') {
            if (typeof enItem === 'string' && enItem.trim() !== '') return enItem
            isFallback = true
            return item
          }
          if (typeof item === 'object' && item !== null) {
            const mergedItem = {} as any
            for (const k in item) {
              const trV = item[k]
              const enV = enItem ? enItem[k] : undefined
              if (typeof trV === 'string') {
                if (typeof enV === 'string' && enV.trim() !== '') {
                  mergedItem[k] = enV
                } else {
                  isFallback = true
                  mergedItem[k] = trV
                }
              } else {
                mergedItem[k] = merge(trV, enV)
              }
            }
            return mergedItem
          }
          return item
        })
      }
      const merged = {} as any
      for (const key in trVal) {
        const trSub = trVal[key]
        const enSub = enVal ? enVal[key] : undefined
        if (typeof trSub === 'string') {
          if (typeof enSub === 'string' && enSub.trim() !== '') {
            merged[key] = enSub
          } else {
            isFallback = true
            merged[key] = trSub
          }
        } else {
          merged[key] = merge(trSub, enSub)
        }
      }
      return merged
    }
    if (typeof trVal === 'string') {
      if (typeof enVal === 'string' && enVal.trim() !== '') return enVal
      isFallback = true
      return trVal
    }
    return trVal
  }

  const t = merge(tr, en)
  return { t, isFallback }
}