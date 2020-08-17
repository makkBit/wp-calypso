/**
 * External dependencies
 */
import page from 'page';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { addItems } from 'wp-calypso-client/lib/cart/actions';
import { hasDomainInCart } from 'wp-calypso-client/lib/cart-values/cart-items';
import { GSUITE_BASIC_SLUG } from 'wp-calypso-client/lib/gsuite/constants';
import GSuiteUpsellCard from './gsuite-upsell-card';
import HeaderCake from 'wp-calypso-client/components/header-cake';
import { getSelectedSiteSlug } from 'wp-calypso-client/state/ui/selectors';

const GSuiteUpgrade = ( { cart, domain, selectedSiteSlug } ) => {
	const handleAddEmailClick = ( cartItems ) => {
		addItems( cartItems );

		page( `/checkout/${ selectedSiteSlug }` );
	};

	const handleGoBack = () => {
		page( `/domains/add/${ selectedSiteSlug }` );
	};

	const handleSkipClick = () => {
		page( `/checkout/${ selectedSiteSlug }` );
	};

	useEffect( () => {
		if ( cart && cart.hasLoadedFromServer && ! hasDomainInCart( cart, domain ) ) {
			// Should we handle this more gracefully?
			page( `/domains/add/${ selectedSiteSlug }` );
		}
	}, [ cart, domain, selectedSiteSlug ] );

	const translate = useTranslate();

	return (
		<div>
			<HeaderCake onClick={ handleGoBack }>
				{ translate( 'Register %(domain)s', { args: { domain } } ) }
			</HeaderCake>

			<GSuiteUpsellCard
				domain={ domain }
				productSlug={ GSUITE_BASIC_SLUG }
				onSkipClick={ handleSkipClick }
				onAddEmailClick={ handleAddEmailClick }
			/>
		</div>
	);
};

export default connect( ( state ) => ( {
	selectedSiteSlug: getSelectedSiteSlug( state ),
} ) )( GSuiteUpgrade );
