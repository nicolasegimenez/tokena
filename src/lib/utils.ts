import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Random image generators for placeholders
export function getRandomAvatarUrl(seed?: string): string {
  const randomSeed = seed || Math.random().toString(36).substring(7)
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`
}

export function getRandomImageUrl(width = 600, height = 400): string {
  const randomId = Math.floor(Math.random() * 1000)
  return `https://picsum.photos/${width}/${height}?random=${randomId}`
}

export function getPlaceholderImage(type: 'avatar' | 'project' | 'generic', seed?: string): string {
  switch (type) {
    case 'avatar':
      return getRandomAvatarUrl(seed)
    case 'project':
      return getRandomImageUrl(600, 400)
    default:
      return getRandomImageUrl()
  }
}
