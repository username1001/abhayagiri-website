import React, { Component } from 'react';
import { Link } from 'react-router';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import { tp } from '../../../../i18n';
import CategoryList from '../category-list/category-list';
import Spinner from '../../../widgets/spinner/spinner';
import PlaylistService from '../../../../services/playlist.service';

class CategorySubjects extends Component {

    constructor() {
        super();

        this.state = {
            subjects: [],
            isLoading: true
        }
    }

    componentWillMount() {
        this.fetchPlaylists();
    }

    async fetchPlaylists() {
        let subjectGroups = await PlaylistService.getPlaylists();
        
        subjectGroups = subjectGroups.map((subjectGroup) => {
            const defaultSubject = subjectGroup.subjects[0];

            return {
                imagePath: subjectGroup.imageUrl,
                title: tp(subjectGroup, 'title'),
                href: location.pathname + '/' + subjectGroup.id + '-' + subjectGroup.slig + '/' + defaultSubject.id + '-' + defaultSubject.slug
            };
        });

        this.setState({
            subjectGroups: subjectGroups,
            isLoading: false
        })
    }

    render() {
        const lng = this.props.i18n.language;
        return !this.state.isLoading ? <CategoryList list={this.state.subjectGroups} /> : <Spinner />;
    }
}

export default translate('talks')(CategorySubjects);
