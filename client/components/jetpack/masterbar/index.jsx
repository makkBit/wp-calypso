/**
 * External dependencies
 */
import React from 'react';
import { useTranslate } from 'i18n-calypso';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { getDocumentHeadTitle } from 'wp-calypso-client/state/document-head/selectors/get-document-head-title';
import getCurrentRoute from 'wp-calypso-client/state/selectors/get-current-route';
import { useSelector } from 'react-redux';
import Item from 'wp-calypso-client/layout/masterbar/item';
import JetpackLogo from 'wp-calypso-client/components/jetpack-logo';
import Masterbar from 'wp-calypso-client/layout/masterbar/masterbar';
import ProfileDropdown from 'wp-calypso-client/components/jetpack/profile-dropdown';
import { useBreakpoint } from '@automattic/viewport-react';
import useTrackCallback from 'wp-calypso-client/lib/jetpack/use-track-callback';

/**
 * Style dependencies
 */
import './style.scss';

const useOpenClose = () => {
	const [ isOpen, setIsOpen ] = React.useState( false );
	const close = React.useCallback( () => {
		setIsOpen( false );
	}, [ setIsOpen ] );
	const toggle = React.useCallback( () => {
		setIsOpen( ! isOpen );
	}, [ isOpen, setIsOpen ] );
	return { isOpen, close, toggle };
};

const JetpackCloudMasterBar = () => {
	const translate = useTranslate();
	const headerTitle = useSelector( getDocumentHeadTitle );
	const currentRoute = useSelector( getCurrentRoute );
	const isNarrow = useBreakpoint( '<660px' );
	const isExteriorPage = /^\/(?:backup|scan)\/[^/]*$/.test( currentRoute );
	const { isOpen, close, toggle } = useOpenClose();
	const trackedToggle = useTrackCallback( toggle, 'calypso_jetpack_masterbar_profile_toggle' );
	const trackedClose = useTrackCallback( close, 'calypso_jetpack_masterbar_profile_close' );

	return (
		<Masterbar
			className="is-jetpack-cloud-masterbar" // eslint-disable-line wpcalypso/jsx-classname-namespace
		>
			<Item
				className="masterbar__item-home"
				url="/"
				tooltip={ translate( 'Jetpack Cloud Dashboard', {
					comment: 'Jetpack Cloud top navigation bar item',
				} ) }
			>
				<JetpackLogo size={ 28 } full={ ! isNarrow || isExteriorPage } />
			</Item>
			<Item className="masterbar__item-title">{ headerTitle }</Item>
			<Item
				tipTarget="me"
				url="#" // @todo: add a correct URL
				onClick={ trackedToggle }
				icon="user-circle"
				className={ classnames( 'masterbar__item-me', {
					'masterbar__item-me--open': isOpen,
				} ) }
				tooltip={ translate( 'Log out of Jetpack Cloud' ) }
			>
				<ProfileDropdown isOpen={ isOpen } close={ trackedClose } />
			</Item>
		</Masterbar>
	);
};

export default JetpackCloudMasterBar;
