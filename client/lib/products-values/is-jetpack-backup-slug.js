/**
 * External dependencies
 */
import { includes } from 'lodash';
import { JETPACK_BACKUP_PRODUCTS } from 'wp-calypso-client/lib/products-values/constants';

export function isJetpackBackupSlug( productSlug ) {
	return includes( JETPACK_BACKUP_PRODUCTS, productSlug );
}
