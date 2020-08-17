/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal Dependencies
 */
import { CompactCard } from '@automattic/components';
import EmptyContent from 'wp-calypso-client/components/empty-content';
import Main from 'wp-calypso-client/components/main';
import MeSidebarNavigation from 'wp-calypso-client/me/sidebar-navigation';
import PageViewTracker from 'wp-calypso-client/lib/analytics/page-view-tracker';
import PendingListItem from './pending-list-item';
import PurchasesHeader from '../purchases/purchases-list/header';
import PurchasesSite from '../purchases/purchases-site';
import { getCurrentUserId } from 'wp-calypso-client/state/current-user/selectors';
import { getHttpData, requestHttpData } from 'wp-calypso-client/state/data-layer/http-data';
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { errorNotice } from 'wp-calypso-client/state/notices/actions';
import Banner from 'wp-calypso-client/components/banner';
import { convertToCamelCase } from 'wp-calypso-client/state/data-layer/utils';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import getPrimarySiteId from 'wp-calypso-client/state/selectors/get-primary-site-id';
import { getSiteSlug } from 'wp-calypso-client/state/sites/selectors';
import { getStatsPathForTab } from 'wp-calypso-client/lib/route';

/**
 * Style dependencies
 */
import './style.scss';

export const requestId = ( userId ) => `pending-payments:${ userId }`;

const requestPendingPayments = ( userId ) => {
	return requestHttpData(
		requestId( userId ),
		http( {
			path: '/me/pending-payments',
			apiVersion: '1',
			method: 'GET',
		} ),
		{
			fromApi: () => ( pending ) => [ [ requestId( userId ), convertToCamelCase( pending ) ] ],
			freshness: -Infinity,
		}
	);
};

export class PendingPayments extends Component {
	componentDidMount = () => {
		requestPendingPayments( this.props.userId );
	};

	componentDidUpdate( prevProps ) {
		const prevResponse = prevProps.response;

		const { showErrorNotice, response, translate } = this.props;

		// Only show once when changing from non failure to failure
		if ( prevResponse && prevResponse.state !== 'failure' && response.state === 'failure' ) {
			showErrorNotice( translate( "We've encountered a problem. Please try again later." ) );
		}
	}

	render() {
		const { response, pendingPayments, translate, siteSlug } = this.props;

		let content;

		if ( response.state !== 'success' ) {
			// intentionally includes error states
			content = <PurchasesSite isPlaceholder={ true } />;
		} else if ( pendingPayments.length === 0 ) {
			content = (
				<CompactCard className="pending-payments__no-content">
					<EmptyContent
						title={ translate( 'Looking to upgrade?' ) }
						line={ translate(
							'Our plans give your site the power to thrive. Find the plan that works for you.'
						) }
						action={ translate( 'Upgrade now' ) }
						actionURL={ '/plans' }
						illustration={ '/calypso/images/illustrations/illustration-nosites.svg' }
					/>
				</CompactCard>
			);
		} else if ( pendingPayments.length > 0 ) {
			content = (
				<React.Fragment>
					<Banner
						callToAction={ translate( 'Back to My Sites' ) }
						description={ translate(
							'Your payment initiation has been confirmed. We are currently waiting for the funds to clear, this transfer process can take up to one week to complete.'
						) }
						event="pending-payment-confirmation"
						icon="star"
						href={ getStatsPathForTab( 'day', siteSlug ) }
						title={ translate( 'Thank you! Your payment is being processed.' ) }
					/>
					<div>
						{ pendingPayments.map( ( purchase ) => (
							<PendingListItem key={ purchase.orderId } { ...purchase } />
						) ) }
					</div>
				</React.Fragment>
			);
		}

		return (
			<Main className="pending-payments">
				<PageViewTracker path="/me/purchases/pending" title="Pending Payments" />
				<MeSidebarNavigation />
				<PurchasesHeader section="pending" />
				{ content }
			</Main>
		);
	}
}

PendingPayments.propTypes = {
	userId: PropTypes.number.isRequired,
	pendingPayments: PropTypes.array.isRequired,
	response: PropTypes.object,
	showErrorNotice: PropTypes.func,
};

export default connect(
	( state ) => {
		const userId = getCurrentUserId( state );
		const response = getHttpData( requestId( userId ) );
		const siteId = getSelectedSiteId( state ) || getPrimarySiteId( state );

		return {
			userId,
			pendingPayments: Object.values( response.data || [] ),
			response: response,
			siteSlug: getSiteSlug( state, siteId ),
		};
	},
	( dispatch ) => ( {
		showErrorNotice: ( error, options ) =>
			dispatch(
				errorNotice( error, Object.assign( {}, options, { id: 'pending-payments-tab' } ) )
			),
	} )
)( localize( PendingPayments ) );
