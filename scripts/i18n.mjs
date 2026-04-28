/**
 * Shared i18n table for the downloads pipeline.
 *
 * The runtime UI uses src/lib/i18n/messages/{en,de}.json — those keys describe
 * the website chrome (buttons, labels, headings). The build scripts produce
 * **artifacts** (md/docx/odt files) whose preambles, anchor labels, and
 * blockquote markers need to be in the same language as the bundle the user
 * downloads. This file owns those artifact-side strings.
 *
 * Keep this in sync with src/lib/i18n/languages.ts. When you add a locale to
 * the registry, add a matching entry here so the build scripts can produce its
 * bundle. The shape per-locale is intentionally identical to make adding a new
 * locale a copy-paste-and-translate job.
 */

export const DOWNLOADS_I18N = {
	en: {
		siteName: 'RCOS — Regenerative Community Operating System',
		// Preamble field labels
		generated: 'Generated',
		source: 'Source (latest version)',
		allTemplates: 'All RCOS templates',
		translatedFromEnglish: 'This article is not yet translated to English — showing the English source.',
		// Section labels in the combined core spec
		toc: 'Table of Contents',
		aboutCore: 'About RCOS Core',
		coreSpecTitle: 'RCOS Core Specification — v0.1',
		// <details> flatten labels for non-HTML output
		rationale: 'Rationale',
		instructions: 'Instructions',
		// INDEX listing inside the per-format bundle
		bundleHeading: 'RCOS Templates',
		bundleIntro:
			'This bundle contains every RCOS template, ready to copy and adapt for your community.',
		bundleNote:
			'Each template includes a rationale block (why the section exists) and instructions (how to fill it in).',
		bundleSectionHeading: 'Templates'
	},
	de: {
		siteName: 'RCOS – Regenerative Community Operating System',
		generated: 'Generiert',
		source: 'Quelle (aktuelle Version)',
		allTemplates: 'Alle RCOS-Vorlagen',
		translatedFromEnglish:
			'Dieser Inhalt ist noch nicht ins Deutsche übersetzt – die englische Quelle wird angezeigt.',
		toc: 'Inhaltsverzeichnis',
		aboutCore: 'Über RCOS Core',
		coreSpecTitle: 'RCOS-Kernspezifikation — v0.1',
		rationale: 'Begründung',
		instructions: 'Anleitung',
		bundleHeading: 'RCOS-Vorlagen',
		bundleIntro:
			'Dieses Bündel enthält alle RCOS-Vorlagen, bereit zum Kopieren und Anpassen für eure Gemeinschaft.',
		bundleNote:
			'Jede Vorlage enthält einen Begründungsblock (warum der Abschnitt existiert) und eine Anleitung (wie er ausgefüllt wird).',
		bundleSectionHeading: 'Vorlagen'
	},
	es: {
		siteName: 'RCOS — Sistema Operativo de Comunidad Regenerativa',
		generated: 'Generado',
		source: 'Fuente (versión más reciente)',
		allTemplates: 'Todas las plantillas RCOS',
		translatedFromEnglish:
			'Este contenido aún no está traducido al español; se muestra la fuente en inglés.',
		toc: 'Índice',
		aboutCore: 'Acerca de RCOS Core',
		coreSpecTitle: 'Especificación RCOS Core — v0.1',
		rationale: 'Justificación',
		instructions: 'Instrucciones',
		bundleHeading: 'Plantillas RCOS',
		bundleIntro:
			'Este paquete contiene todas las plantillas RCOS, listas para copiar y adaptar a tu comunidad.',
		bundleNote:
			'Cada plantilla incluye un bloque de justificación (por qué existe la sección) e instrucciones (cómo rellenarla).',
		bundleSectionHeading: 'Plantillas'
	}
};

/** Resolve a locale's strings, falling back to English for unknown codes. */
export function getStrings(locale) {
	return DOWNLOADS_I18N[locale] ?? DOWNLOADS_I18N.en;
}

/** All locales the downloads pipeline knows how to produce artifacts for. */
export const SUPPORTED_LOCALES = Object.keys(DOWNLOADS_I18N);
