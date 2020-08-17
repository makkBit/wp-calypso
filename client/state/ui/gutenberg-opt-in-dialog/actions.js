/**
 * Internal dependencies
 */
import { GUTENBERG_OPT_IN_DIALOG_IS_SHOWING } from 'wp-calypso-client/state/action-types';

export function showGutenbergOptInDialog() {
	return {
		type: GUTENBERG_OPT_IN_DIALOG_IS_SHOWING,
		isShowing: true,
	};
}

export function hideGutenbergOptInDialog() {
	return {
		type: GUTENBERG_OPT_IN_DIALOG_IS_SHOWING,
		isShowing: false,
	};
}
