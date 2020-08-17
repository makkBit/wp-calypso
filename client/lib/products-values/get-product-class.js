/**
 * Internal dependencies
 */
import { isJetpackBackupSlug } from 'wp-calypso-client/lib/products-values/is-jetpack-backup-slug';

export function getProductClass( productSlug ) {
	if ( isJetpackBackupSlug( productSlug ) ) {
		return 'is-jetpack-backup';
	}

	return '';
}
