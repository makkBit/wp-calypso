/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { identity } from 'lodash';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import classNames from 'classnames';
import debugFactory from 'debug';
import Gridicon from 'wp-calypso-client/components/gridicon';

/**
 * Internal Dependencies
 */
import config from 'wp-calypso-client/config';
import { recordTracksEvent } from 'wp-calypso-client/state/analytics/actions';
import getGlobalKeyboardShortcuts from 'wp-calypso-client/lib/keyboard-shortcuts/global';
import { Button, RootChild } from '@automattic/components';
import { isWithinBreakpoint } from '@automattic/viewport';
import HappychatButton from 'wp-calypso-client/components/happychat/button';
import isHappychatOpen from 'wp-calypso-client/state/happychat/selectors/is-happychat-open';
import hasActiveHappychatSession from 'wp-calypso-client/state/happychat/selectors/has-active-happychat-session';
import AsyncLoad from 'wp-calypso-client/components/async-load';
import {
	showInlineHelpPopover,
	hideInlineHelpPopover,
} from 'wp-calypso-client/state/inline-help/actions';
import isInlineHelpPopoverVisible from 'wp-calypso-client/state/inline-help/selectors/is-inline-help-popover-visible';
import isInlineHelpVisible from 'wp-calypso-client/state/selectors/is-inline-help-visible';

/**
 * Style dependencies
 */
import './style.scss';

/**
 * Module variables
 */
const globalKeyBoardShortcutsEnabled = config.isEnabled( 'keyboard-shortcuts' );
const globalKeyboardShortcuts = globalKeyBoardShortcutsEnabled
	? getGlobalKeyboardShortcuts()
	: null;
const debug = debugFactory( 'calypso:inline-help' );

const InlineHelpPopover = ( props ) => (
	<AsyncLoad
		{ ...props }
		require="wp-calypso-client/blocks/inline-help/popover"
		placeholder={ null }
	/>
);

const InlineHelpDialog = ( props ) => (
	<AsyncLoad
		{ ...props }
		require="wp-calypso-client/blocks/inline-help/dialog"
		placeholder={ null }
	/>
);

class InlineHelp extends Component {
	static propTypes = {
		translate: PropTypes.func,
		isPopoverVisible: PropTypes.bool.isRequired,
	};

	static defaultProps = {
		translate: identity,
		isPopoverVisible: false,
	};

	state = {};

	componentDidMount() {
		if ( globalKeyboardShortcuts ) {
			globalKeyboardShortcuts.showInlineHelp = this.showInlineHelp;
		}
	}

	componentWillUnmount() {
		if ( globalKeyboardShortcuts ) {
			globalKeyboardShortcuts.showInlineHelp = null;
		}
	}

	componentDidUpdate( prevProps ) {
		if ( ! prevProps.isHappychatOpen && this.props.isHappychatOpen ) {
			this.closeInlineHelp();
		}
	}

	preloaded = false;

	// Preload the async chunk on mouse hover or touch start
	preload = () => {
		if ( ! this.preloaded ) {
			asyncRequire( 'wp-calypso-client/blocks/inline-help/popover' );
			this.preloaded = true;
		}
	};

	toggleInlineHelp = () => {
		if ( this.props.isPopoverVisible ) {
			this.closeInlineHelp();
		} else {
			this.showInlineHelp();
		}
	};

	showInlineHelp = () => {
		debug( 'showing inline help.' );
		this.props.recordTracksEvent( 'calypso_inlinehelp_show', { location: 'inline-help-popover' } );
		this.props.showInlineHelpPopover();
	};

	closeInlineHelp = () => {
		debug( 'hiding inline help.' );
		this.props.recordTracksEvent( 'calypso_inlinehelp_close', { location: 'inline-help-popover' } );
		this.props.hideInlineHelpPopover();
	};

	handleHelpButtonClicked = () => {
		this.toggleInlineHelp();
	};

	inlineHelpToggleRef = ( node ) => {
		this.inlineHelpToggle = node;
	};

	// @TODO: Instead of prop drilling this should be done via redux
	setDialogState = ( { showDialog, videoLink = null, dialogType } ) =>
		this.setState( {
			showDialog,
			videoLink,
			dialogType,
		} );

	closeDialog = () => this.setState( { showDialog: false } );

	render() {
		// If the Customer Home Support Search is present then
		// we do not want to render the InlineLine Help FAB at all
		// otherwise there will be x2 Support Search UIs present on
		// the page.
		// see https://github.com/Automattic/wp-calypso/issues/38860
		if ( ! this.props.isInlineHelpVisible ) {
			return null;
		}
		const { translate, isPopoverVisible } = this.props;
		const { showDialog, videoLink, dialogType } = this.state;
		const inlineHelpButtonClasses = {
			'inline-help__button': true,
			'is-active': isPopoverVisible,
		};

		return (
			<div className="inline-help">
				<Button
					className={ classNames( inlineHelpButtonClasses ) }
					onClick={ this.handleHelpButtonClicked }
					onTouchStart={ this.preload }
					onMouseEnter={ this.preload }
					borderless
					title={ translate( 'Help' ) }
					ref={ this.inlineHelpToggleRef }
				>
					<Gridicon icon="help-outline" size={ 36 } />
				</Button>
				{ isPopoverVisible && (
					<InlineHelpPopover
						context={ this.inlineHelpToggle }
						onClose={ this.closeInlineHelp }
						setDialogState={ this.setDialogState }
					/>
				) }
				{ isWithinBreakpoint( '<660px' ) && isPopoverVisible && (
					<RootChild>
						<div className="inline-help__mobile-overlay"></div>
					</RootChild>
				) }
				{ showDialog && (
					<InlineHelpDialog
						dialogType={ dialogType }
						videoLink={ videoLink }
						onClose={ this.closeDialog }
					/>
				) }
				{ this.props.isHappychatButtonVisible && config.isEnabled( 'happychat' ) && (
					<HappychatButton className="inline-help__happychat-button" allowMobileRedirect />
				) }
			</div>
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		isHappychatButtonVisible: hasActiveHappychatSession( state ),
		isHappychatOpen: isHappychatOpen( state ),
		isPopoverVisible: isInlineHelpPopoverVisible( state ),
		isInlineHelpVisible: isInlineHelpVisible( state ),
	};
};

const mapDispatchToProps = {
	recordTracksEvent,
	showInlineHelpPopover,
	hideInlineHelpPopover,
};

export default connect( mapStateToProps, mapDispatchToProps )( localize( InlineHelp ) );
