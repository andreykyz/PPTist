# CHANGELOG

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- **i18n internationalization (Supports Chinese, English, Russian)**
  - Added vue-i18n@9 support with full translations
  - Created `src/i18n/` with locale files (`zh.ts`, `en.ts`, `ru.ts`)
  - Added LanguageSwitcher component in EditorHeader
  - Migrated 400+ UI strings across 85+ Vue files
  - Config-driven labels (animations, charts, fonts, symbols, hotkeys) now use i18n
  - Message/error/warning strings fully internationalized
  - Language preference persisted in localStorage
  - Auto-detects browser locale on first visit

### Changed

- EditorHeader: added language switcher dropdown (next to GitHub link)
- All toolbar tabs, tooltips, labels replaced with i18n keys
- All export dialog labels, placeholders, tips replaced with i18n keys
- All canvas tool labels, placeholders replaced with i18n keys
- All screen/presentation mode labels replaced with i18n keys
- All search, AIPPT, notes, markup, select, image lib panels replaced with i18n keys
- All mobile UI labels replaced with i18n keys
- Config files (`element.ts`, `hotkey.ts`) reference i18n keys instead of hardcoded Chinese
- Services and hooks (`axios.ts`, `useSearch.ts`, `useLink.ts`, `useImport.ts`, `useExport.ts`) use i18n for error messages

### Added (docs)

- Multiple translated doc files (`doc/*_zn.md`, `doc/frontend_api.md`, `doc/AI_PPT_SCHEMA.md`)
- Translated README files
