/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { getEditedPost } from 'wp-calypso-client/state/posts/selectors';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { getEditorPostId } from 'wp-calypso-client/state/editor/selectors';
import { getPostType } from 'wp-calypso-client/state/post-types/selectors';
import QueryPostTypes from 'wp-calypso-client/components/data/query-post-types';
import { decodeEntities } from 'wp-calypso-client/lib/formatting';

/**
 * Style dependencies
 */
import './style.scss';

function EditorPostType( { translate, siteId, typeSlug, type, isSettings } ) {
	let label;
	if ( 'page' === typeSlug ) {
		if ( isSettings ) {
			label = translate( 'Page Settings' );
		} else {
			label = translate( 'Page', { context: 'noun' } );
		}
	} else if ( 'post' === typeSlug ) {
		if ( isSettings ) {
			label = translate( 'Post Settings' );
		} else {
			label = translate( 'Post', { context: 'noun' } );
		}
	} else if ( type ) {
		if ( isSettings ) {
			label = translate( '%s: Settings', {
				args: type.labels.singular_name,
				comment: "type refers to a post type's singular noun",
			} );
		} else {
			label = type.labels.singular_name;
		}

		label = decodeEntities( label );
	} else {
		label = translate( 'Loading…' );
	}

	const classes = classnames( 'editor-post-type', {
		'is-loading': ! label,
	} );

	return (
		<span className={ classes }>
			{ siteId && 'page' !== typeSlug && 'post' !== typeSlug && (
				<QueryPostTypes siteId={ siteId } />
			) }
			{ label }
		</span>
	);
}

EditorPostType.propTypes = {
	translate: PropTypes.func,
	siteId: PropTypes.number,
	typeSlug: PropTypes.string,
	type: PropTypes.object,
	isSettings: PropTypes.bool,
};

export default connect( ( state ) => {
	const props = {};
	const siteId = getSelectedSiteId( state );
	if ( ! siteId ) {
		return props;
	}

	props.siteId = siteId;
	const post = getEditedPost( state, siteId, getEditorPostId( state ) );
	if ( ! post ) {
		return props;
	}

	return Object.assign( props, {
		typeSlug: post.type,
		type: getPostType( state, siteId, post.type ),
	} );
} )( localize( EditorPostType ) );
