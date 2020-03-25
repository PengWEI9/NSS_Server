import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Auto Control System'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
