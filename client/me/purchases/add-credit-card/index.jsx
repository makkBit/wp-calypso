/**
 * External dependencies
 */
import { connect } from 'react-redux';
import page from 'page';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { addStoredCard } from 'wp-calypso-client/state/stored-cards/actions';
import { recordTracksEvent } from 'wp-calypso-client/lib/analytics/tracks';
import { concatTitle } from 'wp-calypso-client/lib/react-helpers';
import { createCardToken } from 'wp-calypso-client/lib/store-transactions';
import CreditCardForm from 'wp-calypso-client/blocks/credit-card-form';
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import HeaderCake from 'wp-calypso-client/components/header-cake';
import Main from 'wp-calypso-client/components/main';
import titles from 'wp-calypso-client/me/purchases/titles';
import { billingHistory } from 'wp-calypso-client/me/purchases/paths';
import PageViewTracker from 'wp-calypso-client/lib/analytics/page-view-tracker';
import { StripeHookProvider } from 'wp-calypso-client/lib/stripe';

function AddCreditCard( props ) {
	const createAddCardToken = ( ...args ) => createCardToken( 'card_add', ...args );
	const goToBillingHistory = () => page( billingHistory );
	const recordFormSubmitEvent = () => recordTracksEvent( 'calypso_add_credit_card_form_submit' );

	return (
		<Main>
			<PageViewTracker path="/me/purchases/add-credit-card" title="Purchases > Add Credit Card" />
			<DocumentHead title={ concatTitle( titles.purchases, titles.addCreditCard ) } />

			<HeaderCake onClick={ goToBillingHistory }>{ titles.addCreditCard }</HeaderCake>
			<StripeHookProvider configurationArgs={ { needs_intent: true } }>
				<CreditCardForm
					createCardToken={ createAddCardToken }
					recordFormSubmitEvent={ recordFormSubmitEvent }
					saveStoredCard={ props.addStoredCard }
					successCallback={ goToBillingHistory }
					showUsedForExistingPurchasesInfo={ true }
				/>
			</StripeHookProvider>
		</Main>
	);
}

AddCreditCard.propTypes = {
	addStoredCard: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
	addStoredCard,
};

export default connect( null, mapDispatchToProps )( AddCreditCard );
