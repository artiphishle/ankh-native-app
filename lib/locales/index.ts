/**
 * Locales
 */

import { I18n } from 'i18n-js'

import Arabic from '@/lib/locales/ar'
import German from '@/lib/locales/de'
import English from '@/lib/locales/en'
import Turkish from '@/lib/locales/tr'

const Locales = new I18n({
  ar: Arabic,
  de: German,
  en: English,
  tr: Turkish,
})

Locales.enableFallback = true

export default Locales
