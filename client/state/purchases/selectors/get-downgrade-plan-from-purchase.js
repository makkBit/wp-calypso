/**
 * Internal Dependencies
 */
import { getPlan, findPlansKeys } from 'wp-calypso-client/lib/plans';
import { TYPE_PERSONAL } from 'wp-calypso-client/lib/plans/constants';

import 'wp-calypso-client/state/purchases/init';

export const getDowngradePlanFromPurchase = ( purchase ) => {
	const plan = getPlan( purchase.productSlug );
	if ( ! plan ) {
		return null;
	}

	const newPlanKeys = findPlansKeys( {
		group: plan.group,
		type: TYPE_PERSONAL,
		term: plan.term,
	} );

	return getPlan( newPlanKeys[ 0 ] );
};
