/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import type { Assertion, AsymmetricMatchersContaining } from 'vitest'

interface CustomMatchers<R = void> {
	toBeInTheDocument(): R
	toHaveClass(className: string | string[]): R
	toHaveTextContent(text: string | RegExp): R
	toBeVisible(): R
	toBeDisabled(): R
	toBeEnabled(): R
	toBeEmptyDOMElement(): R
	toHaveAttribute(attr: string, value?: string): R
}

declare module 'vitest' {
	interface Assertion<T = any> extends CustomMatchers<T> {}
	interface AsymmetricMatchersContaining extends CustomMatchers {}
}
