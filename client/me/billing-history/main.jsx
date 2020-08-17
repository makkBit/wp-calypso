/**
 * External dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { Card } from '@automattic/components';
import MeSidebarNavigation from 'wp-calypso-client/me/sidebar-navigation';
import config from 'wp-calypso-client/config';
import CreditCards from 'wp-calypso-client/me/purchases/credit-cards';
import PurchasesHeader from '../purchases/purchases-list/header';
import BillingHistoryTable from './billing-history-table';
import Main from 'wp-calypso-client/components/main';
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import PageViewTracker from 'wp-calypso-client/lib/analytics/page-view-tracker';
import QueryBillingTransactions from 'wp-calypso-client/components/data/query-billing-transactions';

/**
 * Style dependencies
 */
import './style.scss';

const BillingHistory = ( { translate } ) => (
	<Main className="billing-history">
		<DocumentHead title={ translate( 'Billing History' ) } />
		<PageViewTracker path="/me/purchases/billing" title="Me > Billing History" />
		<MeSidebarNavigation />
		<QueryBillingTransactions />
		<PurchasesHeader section={ 'billing' } />
		<Card className="billing-history__receipts">
			<BillingHistoryTable />
		</Card>
		{ config.isEnabled( 'upgrades/credit-cards' ) && <CreditCards /> }
	</Main>
);

export default localize( BillingHistory );
