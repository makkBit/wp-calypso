/**
 * External dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Notice from 'wp-calypso-client/components/notice';
import NoticeAction from 'wp-calypso-client/components/notice/notice-action';
import { hasPendingPayment } from 'wp-calypso-client/lib/cart-values';

export const PendingPaymentNotice = ( { translate, cart = {} } ) => {
	if ( ! hasPendingPayment( cart ) ) {
		return null;
	}

	return (
		<Notice
			icon="info-outline"
			isCompact
			status="is-warning"
			text={ translate( 'Processing your payment…', {
				comment: 'Notice to user that a payment is pending',
			} ) }
		>
			<NoticeAction href="/me/purchases/pending">
				{ translate( 'View', { context: 'verb' } ) }
			</NoticeAction>
		</Notice>
	);
};

export default localize( PendingPaymentNotice );
