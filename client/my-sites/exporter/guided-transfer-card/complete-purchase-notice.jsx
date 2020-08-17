/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { getSiteSlug } from 'wp-calypso-client/state/sites/selectors';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Notice from 'wp-calypso-client/components/notice';
import NoticeAction from 'wp-calypso-client/components/notice/notice-action';
import { guidedTransferItem } from 'wp-calypso-client/lib/cart-values/cart-items';
import { addItem } from 'wp-calypso-client/lib/cart/actions';
import page from 'page';

const redirectToCart = ( siteSlug ) => () => {
	addItem( guidedTransferItem() );
	page( `/checkout/${ siteSlug }` );
};

const CompletePurchaseNotice = ( { translate, siteSlug } ) => (
	<Notice
		status="is-warning"
		showDismiss={ false }
		text={ translate(
			"It looks like you've started a Guided Transfer. " +
				'We just need your payment to confirm the transfer and ' +
				"then we'll get started!"
		) }
	>
		<NoticeAction onClick={ redirectToCart( siteSlug ) }>{ translate( 'Continue' ) }</NoticeAction>
	</Notice>
);

const mapStateToProps = ( state ) => ( {
	siteSlug: getSiteSlug( state, getSelectedSiteId( state ) ),
} );

export default connect( mapStateToProps )( localize( CompletePurchaseNotice ) );
