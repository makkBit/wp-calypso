/**
 * External dependencies
 */
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import CartStore from 'wp-calypso-client/lib/cart/store';
import { fetchUsers } from 'wp-calypso-client/lib/users/actions';
import { getCurrentUser } from 'wp-calypso-client/state/current-user/selectors';
import { getPlansBySite } from 'wp-calypso-client/state/sites/plans/selectors';
import { getSelectedSite } from 'wp-calypso-client/state/ui/selectors';
import {
	getDomainsBySiteId,
	isRequestingSiteDomains,
} from 'wp-calypso-client/state/sites/domains/selectors';
import { getProductsList } from 'wp-calypso-client/state/products-list/selectors';
import NameserversStore from 'wp-calypso-client/lib/domains/nameservers/store';
import { fetchNameservers } from 'wp-calypso-client/lib/domains/nameservers/actions';
import PageViewTracker from 'wp-calypso-client/lib/analytics/page-view-tracker';
import QueryContactDetailsCache from 'wp-calypso-client/components/data/query-contact-details-cache';
import QueryProductsList from 'wp-calypso-client/components/data/query-products-list';
import QuerySitePlans from 'wp-calypso-client/components/data/query-site-plans';
import QuerySiteDomains from 'wp-calypso-client/components/data/query-site-domains';
import StoreConnection from 'wp-calypso-client/components/data/store-connection';
import UsersStore from 'wp-calypso-client/lib/users/store';
import WapiDomainInfoStore from 'wp-calypso-client/lib/domains/wapi-domain-info/store';
import { fetchWapiDomainInfo } from 'wp-calypso-client/lib/domains/wapi-domain-info/actions';

function getStateFromStores( props ) {
	return {
		cart: CartStore.get(),
		context: props.context,
		domains: props.selectedSite ? props.domains : null,
		isRequestingSiteDomains: props.isRequestingSiteDomains,
		nameservers: NameserversStore.getByDomainName( props.selectedDomainName ),
		products: props.products,
		selectedDomainName: props.selectedDomainName,
		selectedSite: props.selectedSite,
		sitePlans: props.sitePlans,
		user: props.currentUser,
		users: UsersStore.getUsers( { siteId: get( props.selectedSite, 'ID' ) } ),
		wapiDomainInfo: WapiDomainInfoStore.getByDomainName( props.selectedDomainName ),
	};
}

class DomainManagementData extends React.Component {
	static propTypes = {
		analyticsPath: PropTypes.string,
		analyticsTitle: PropTypes.string,
		context: PropTypes.object.isRequired,
		domains: PropTypes.array,
		isRequestingSiteDomains: PropTypes.bool,
		needsCart: PropTypes.bool,
		needsContactDetails: PropTypes.bool,
		needsDns: PropTypes.bool,
		needsDomains: PropTypes.bool,
		needsDomainInfo: PropTypes.bool,
		needsNameservers: PropTypes.bool,
		needsPlans: PropTypes.bool,
		needsProductsList: PropTypes.bool,
		needsUsers: PropTypes.bool,
		productsList: PropTypes.object,
		selectedDomainName: PropTypes.string,
		selectedSite: PropTypes.object,
		sitePlans: PropTypes.object,
	};

	componentDidMount() {
		this.loadData( {} );
	}

	componentDidUpdate( prevProps ) {
		this.loadData( prevProps );
	}

	loadData( prevProps ) {
		const { needsUsers, selectedDomainName, selectedSite } = this.props;

		if ( this.props.needsDomainInfo ) {
			fetchWapiDomainInfo( selectedDomainName );
		}

		if ( this.props.needsNameservers ) {
			fetchNameservers( selectedDomainName );
		}

		if (
			needsUsers &&
			( prevProps.needsUsers !== needsUsers || prevProps.selectedSite !== selectedSite )
		) {
			fetchUsers( { siteId: selectedSite.ID, number: 1000 } );
		}
	}

	render() {
		const {
			needsCart,
			needsContactDetails,
			needsDomains,
			needsDomainInfo,
			needsNameservers,
			needsPlans,
			needsProductsList,
			needsUsers,
			selectedSite,
		} = this.props;

		const stores = [];
		if ( needsCart ) {
			stores.push( CartStore );
		}
		if ( needsDomainInfo ) {
			stores.push( WapiDomainInfoStore );
		}
		if ( needsNameservers ) {
			stores.push( NameserversStore );
		}
		if ( needsUsers ) {
			stores.push( UsersStore );
		}

		return (
			<div>
				<PageViewTracker path={ this.props.analyticsPath } title={ this.props.analyticsTitle } />
				{ selectedSite && needsContactDetails && <QueryContactDetailsCache /> }
				{ selectedSite && needsDomains && <QuerySiteDomains siteId={ selectedSite.ID } /> }
				{ selectedSite && needsPlans && <QuerySitePlans siteId={ selectedSite.ID } /> }
				{ needsProductsList && <QueryProductsList /> }

				<StoreConnection
					component={ this.props.component }
					context={ this.props.context }
					currentUser={ this.props.currentUser }
					domains={ this.props.domains }
					getStateFromStores={ getStateFromStores }
					isRequestingSiteDomains={ this.props.isRequestingSiteDomains }
					products={ this.props.productsList }
					selectedDomainName={ this.props.selectedDomainName }
					selectedSite={ selectedSite }
					sitePlans={ this.props.sitePlans }
					stores={ stores }
				/>
			</div>
		);
	}
}

export default connect( ( state ) => {
	const selectedSite = getSelectedSite( state );
	const siteId = get( selectedSite, 'ID', null );

	return {
		currentUser: getCurrentUser( state ),
		domains: getDomainsBySiteId( state, siteId ),
		isRequestingSiteDomains: isRequestingSiteDomains( state, siteId ),
		productsList: getProductsList( state ),
		sitePlans: getPlansBySite( state, selectedSite ),
		selectedSite,
	};
} )( DomainManagementData );
