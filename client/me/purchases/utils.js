/**
 * Internal dependencies
 */
import config from 'wp-calypso-client/config';
import { addCardDetails, editCardDetails } from './paths';
import {
	isExpired,
	isIncludedWithPlan,
	isOneTimePurchase,
	isPaidWithCreditCard,
} from 'wp-calypso-client/lib/purchases';
import { isDomainTransfer } from 'wp-calypso-client/lib/products-values';

function isDataLoading( props ) {
	return ! props.hasLoadedSites || ! props.hasLoadedUserPurchasesFromServer;
}

function canEditPaymentDetails( purchase ) {
	if ( ! config.isEnabled( 'upgrades/credit-cards' ) ) {
		return false;
	}
	return (
		! isExpired( purchase ) &&
		! isOneTimePurchase( purchase ) &&
		! isIncludedWithPlan( purchase ) &&
		! isDomainTransfer( purchase )
	);
}

function getEditCardDetailsPath( siteSlug, purchase ) {
	if ( isPaidWithCreditCard( purchase ) ) {
		const {
			payment: { creditCard },
		} = purchase;

		return editCardDetails( siteSlug, purchase.id, creditCard.id );
	}
	return addCardDetails( siteSlug, purchase.id );
}

export { canEditPaymentDetails, getEditCardDetailsPath, isDataLoading };
