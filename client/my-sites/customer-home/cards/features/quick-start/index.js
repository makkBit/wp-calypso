/**
 * External dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';
import { Button, Card } from '@automattic/components';
import { connect } from 'react-redux';
import 'moment-timezone';

/**
 * Internal dependencies
 */
import HappinessEngineersTray from 'wp-calypso-client/components/happiness-engineers-tray';
import CardHeading from 'wp-calypso-client/components/card-heading';
import {
	withAnalytics,
	composeAnalytics,
	recordTracksEvent,
	bumpStat,
} from 'wp-calypso-client/state/analytics/actions';
import { navigate } from 'wp-calypso-client/state/ui/actions';
import { getSelectedSiteId, getSelectedSiteSlug } from 'wp-calypso-client/state/ui/selectors';
import QueryConciergeInitial from 'wp-calypso-client/components/data/query-concierge-initial';
import getConciergeNextAppointment from 'wp-calypso-client/state/selectors/get-concierge-next-appointment';
import { withLocalizedMoment } from 'wp-calypso-client/components/localized-moment';

/**
 * Style dependencies
 */
import './style.scss';

const QuickStart = ( {
	moment,
	nextSession,
	reschedule,
	siteId,
	siteSlug,
	translate,
	viewDetails,
} ) => {
	return (
		<>
			{ siteId && <QueryConciergeInitial siteId={ siteId } /> }
			<Card className="quick-start next-session">
				<HappinessEngineersTray />
				<CardHeading>{ translate( 'Your scheduled Quick Start support session:' ) }</CardHeading>
				<table>
					<thead>
						<tr>
							<th>{ translate( 'Date' ) }</th>
							<th>{ translate( 'Time' ) }</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								{ nextSession ? (
									moment( nextSession.beginTimestamp ).format( 'LL' )
								) : (
									<div className="quick-start__placeholder"></div>
								) }
							</td>
							<td>
								{ nextSession ? (
									moment.tz( nextSession.beginTimestamp, moment.tz.guess() ).format( 'LT z' )
								) : (
									<div className="quick-start__placeholder"></div>
								) }
							</td>
						</tr>
					</tbody>
				</table>
				<div className="quick-start__buttons">
					<Button disabled={ ! nextSession } onClick={ () => viewDetails( siteId, siteSlug ) }>
						{ translate( 'View details' ) }
					</Button>
					<Button
						className={ 'quick-start__reschedule' }
						onClick={ () => reschedule( siteId, siteSlug, nextSession.id ) }
						borderless
						disabled={ ! nextSession }
					>
						{ translate( 'Reschedule' ) }
					</Button>
				</div>
			</Card>
		</>
	);
};

export default connect(
	( state ) => ( {
		siteId: getSelectedSiteId( state ),
		siteSlug: getSelectedSiteSlug( state ),
		nextSession: getConciergeNextAppointment( state ),
	} ),
	( dispatch ) => ( {
		viewDetails: ( siteId, siteSlug ) =>
			dispatch(
				withAnalytics(
					composeAnalytics(
						recordTracksEvent( 'calypso_customer_home_quick_start_view_details_click', {
							site_id: siteId,
						} ),
						bumpStat( 'calypso_customer_home', 'view_quick_start_session_details' )
					),
					navigate( `/me/concierge/${ siteSlug }/book` )
				)
			),
		reschedule: ( siteId, siteSlug, sessionId ) =>
			dispatch(
				withAnalytics(
					composeAnalytics(
						recordTracksEvent( 'calypso_customer_home_quick_start_reschedule_click', {
							site_id: siteId,
						} ),
						bumpStat( 'calypso_customer_home', 'reschedule_quick_start_session' )
					),
					navigate( `/me/concierge/${ siteSlug }/${ sessionId }/cancel` )
				)
			),
	} )
)( localize( withLocalizedMoment( QuickStart ) ) );
