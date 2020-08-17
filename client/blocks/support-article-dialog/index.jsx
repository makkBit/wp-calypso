/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import AsyncLoad from 'wp-calypso-client/components/async-load';
import isInlineSupportArticleVisible from 'wp-calypso-client/state/selectors/is-inline-support-article-visible';

function SupportArticleDialogLoader( { isVisible } ) {
	return (
		isVisible && (
			<AsyncLoad
				require="wp-calypso-client/blocks/support-article-dialog/dialog"
				placeholder={ null }
			/>
		)
	);
}

export default connect( ( state ) => ( {
	isVisible: isInlineSupportArticleVisible( state ),
} ) )( SupportArticleDialogLoader );
