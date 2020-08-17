/**
 * External dependencies
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import { includes } from 'lodash';

/**
 * Internal dependencies
 */
import accept from 'wp-calypso-client/lib/accept';
import AuthorSelector from 'wp-calypso-client/blocks/author-selector';
import canCurrentUser from 'wp-calypso-client/state/selectors/can-current-user';
import { Card } from '@automattic/components';
import FormFieldset from 'wp-calypso-client/components/forms/form-fieldset';
import FormLabel from 'wp-calypso-client/components/forms/form-label';
import FormSettingExplanation from 'wp-calypso-client/components/forms/form-setting-explanation';
import Gravatar from 'wp-calypso-client/components/gravatar';
import isJetpackSiteConnected from 'wp-calypso-client/state/selectors/is-jetpack-site-connected';
import isJetpackSiteInDevelopmentMode from 'wp-calypso-client/state/selectors/is-jetpack-site-in-development-mode';
import isJetpackUserConnectionOwner from 'wp-calypso-client/state/selectors/is-jetpack-user-connection-owner';
import getJetpackConnectionOwner from 'wp-calypso-client/state/selectors/get-jetpack-connection-owner';
import OwnershipInformation from './ownership-information';
import QueryJetpackConnection from 'wp-calypso-client/components/data/query-jetpack-connection';
import QueryJetpackUserConnection from 'wp-calypso-client/components/data/query-jetpack-user-connection';
import SettingsSectionHeader from 'wp-calypso-client/my-sites/site-settings/settings-section-header';
import { changeOwner } from 'wp-calypso-client/state/jetpack/connection/actions';
import { getCurrentUser } from 'wp-calypso-client/state/current-user/selectors';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { isCurrentUserCurrentPlanOwner } from 'wp-calypso-client/state/sites/plans/selectors';
import { isCurrentPlanPaid, isJetpackSite } from 'wp-calypso-client/state/sites/selectors';
import { recordTracksEvent } from 'wp-calypso-client/state/analytics/actions';
import { transferPlanOwnership } from 'wp-calypso-client/state/sites/plans/actions';

class SiteOwnership extends Component {
	renderPlaceholder() {
		return (
			<Card className="manage-connection__card site-settings__card is-placeholder">
				<div />
			</Card>
		);
	}

	isUserExcludedFromSelector = ( user ) => {
		const { currentUser } = this.props;
		return (
			user.linked_user_ID === false ||
			user.linked_user_ID === currentUser.ID ||
			! includes( user.roles, 'administrator' )
		);
	};

	transformUser( user ) {
		return { ...user.linked_user_info, ...{ ID: user.ID } };
	}

	onSelectConnectionOwner = ( user ) => {
		const { translate } = this.props;
		const message = (
			<Fragment>
				<p>
					{ translate( 'Are you sure you want to transfer site ownership to {{user /}}?', {
						components: {
							user: <strong>{ user.display_name || user.name }</strong>,
						},
					} ) }
				</p>
				<p>
					{ translate(
						'Note: you cannot undo this action. ' +
							'Going forward, only the new Site Owner can initiate a transfer.'
					) }
				</p>
			</Fragment>
		);

		accept(
			message,
			( accepted ) => {
				if ( accepted ) {
					this.props.changeOwner( this.props.siteId, user.ID, user.name );
					this.props.recordTracksEvent( 'calypso_jetpack_connection_ownership_changed' );
				}
			},
			translate( 'Transfer ownership' ),
			translate( 'Keep ownership' ),
			{ isScary: true }
		);
	};

	onSelectPlanOwner = ( user ) => {
		const { translate } = this.props;
		const message = (
			<Fragment>
				<p>
					{ translate( 'Are you sure you want to change the Plan Purchaser to {{user /}}?', {
						components: {
							user: <strong>{ user.display_name || user.name }</strong>,
						},
					} ) }
				</p>
				<p>
					{ translate(
						'Note: you cannot undo this action. ' +
							'Going forward, only the new Plan Purchaser can initiate a change.'
					) }
				</p>
			</Fragment>
		);

		accept(
			message,
			( accepted ) => {
				if ( accepted ) {
					this.props.transferPlanOwnership( this.props.siteId, user.linked_user_ID );
					this.props.recordTracksEvent( 'calypso_jetpack_plan_ownership_changed' );
				}
			},
			translate( 'Yes, change the plan purchaser' ),
			translate( 'Cancel' ),
			{ isScary: true }
		);
	};

	renderCurrentUser() {
		const { currentUser } = this.props;

		return (
			<div className="manage-connection__user">
				<Gravatar user={ currentUser } size={ 24 } />
				<span className="manage-connection__user-name">{ currentUser.display_name }</span>
			</div>
		);
	}

	renderCurrentUserDropdown() {
		const { currentUser, siteId } = this.props;
		if ( ! currentUser ) {
			return;
		}

		return (
			<div className="manage-connection__user-dropdown">
				<AuthorSelector
					siteId={ siteId }
					exclude={ this.isUserExcludedFromSelector }
					transformAuthor={ this.transformUser }
					allowSingleUser
					onSelect={ this.onSelectConnectionOwner }
				>
					{ this.renderCurrentUser() }
				</AuthorSelector>
			</div>
		);
	}

	renderConnectionDetails() {
		const {
			connectionOwner,
			siteIsConnected,
			siteIsInDevMode,
			userIsConnectionOwner,
			translate,
		} = this.props;

		if ( siteIsConnected === false ) {
			return translate( 'The site is not connected.' );
		}

		if ( siteIsInDevMode ) {
			return (
				<FormSettingExplanation>
					{ translate(
						'Your site is in Development Mode, so it can not be connected to WordPress.com.'
					) }
				</FormSettingExplanation>
			);
		}

		return (
			<Fragment>
				{ userIsConnectionOwner !== null && (
					<FormSettingExplanation>
						{ userIsConnectionOwner
							? translate( "You are the owner of this site's connection to WordPress.com." )
							: translate(
									"{{strong}}%(connectionOwner)s{{/strong}} owns this site's connection to WordPress.com.",
									{
										args: { connectionOwner },
										components: {
											strong: <strong />,
										},
									}
							  ) }
					</FormSettingExplanation>
				) }
				{ userIsConnectionOwner && this.renderCurrentUserDropdown() }
			</Fragment>
		);
	}

	renderPlanOwnerDropdown() {
		const { siteId } = this.props;

		return (
			<div className="manage-connection__user-dropdown">
				<AuthorSelector
					siteId={ siteId }
					exclude={ this.isUserExcludedFromSelector }
					allowSingleUser
					onSelect={ this.onSelectPlanOwner }
				>
					{ this.renderCurrentUser() }
				</AuthorSelector>
			</div>
		);
	}

	renderPlanDetails() {
		const { currentUser, isCurrentPlanOwner, translate } = this.props;
		if ( ! currentUser ) {
			return;
		}

		return isCurrentPlanOwner ? (
			this.renderPlanOwnerDropdown()
		) : (
			<FormSettingExplanation>
				{ translate( 'Somebody else is the plan purchaser for this site.' ) }
			</FormSettingExplanation>
		);
	}

	renderCardContent() {
		const { isPaidPlan, translate } = this.props;

		return (
			<Card>
				<FormFieldset className="manage-connection__formfieldset">
					<FormLabel>{ translate( 'Site owner' ) }</FormLabel>
					{ this.renderConnectionDetails() }
				</FormFieldset>

				{ isPaidPlan && (
					<Fragment>
						<FormFieldset className="manage-connection__formfieldset has-divider is-top-only">
							<FormLabel>{ translate( 'Plan purchaser' ) }</FormLabel>
							{ this.renderPlanDetails() }
						</FormFieldset>

						<OwnershipInformation />
					</Fragment>
				) }
			</Card>
		);
	}

	render() {
		const { canManageOptions, siteId, siteIsConnected, siteIsJetpack, translate } = this.props;

		if ( ! siteId ) {
			return this.renderPlaceholder();
		}

		if ( ! canManageOptions ) {
			return null;
		}

		return (
			<Fragment>
				{ siteIsJetpack && <QueryJetpackConnection siteId={ siteId } /> }
				{ siteIsJetpack && <QueryJetpackUserConnection siteId={ siteId } /> }

				<SettingsSectionHeader title={ translate( 'Site ownership' ) } />

				{ siteIsConnected === null ? this.renderPlaceholder() : this.renderCardContent() }
			</Fragment>
		);
	}
}

export default connect(
	( state ) => {
		const siteId = getSelectedSiteId( state );
		const isPaidPlan = isCurrentPlanPaid( state, siteId );
		const isCurrentPlanOwner = isPaidPlan && isCurrentUserCurrentPlanOwner( state, siteId );

		return {
			canManageOptions: canCurrentUser( state, siteId, 'manage_options' ),
			connectionOwner: getJetpackConnectionOwner( state, siteId ),
			currentUser: getCurrentUser( state ),
			isCurrentPlanOwner,
			isPaidPlan,
			siteId,
			siteIsConnected: isJetpackSiteConnected( state, siteId ),
			siteIsJetpack: isJetpackSite( state, siteId ),
			siteIsInDevMode: isJetpackSiteInDevelopmentMode( state, siteId ),
			userIsConnectionOwner: isJetpackUserConnectionOwner( state, siteId ),
		};
	},
	{ changeOwner, recordTracksEvent, transferPlanOwnership }
)( localize( SiteOwnership ) );
