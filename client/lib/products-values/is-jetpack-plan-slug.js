/**
 * Internal dependencies
 */
import { GROUP_JETPACK } from 'wp-calypso-client/lib/plans/constants';
import { planMatches } from 'wp-calypso-client/lib/plans';

export function isJetpackPlanSlug( productSlug ) {
	return planMatches( productSlug, { group: GROUP_JETPACK } );
}
