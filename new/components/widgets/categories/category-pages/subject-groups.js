import React, { Component } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import Link from 'components/widgets/link/link';
import { tp } from '../../../../i18n';
import CategoryList from '../category-list/category-list';
import Spinner from '../../../widgets/spinner/spinner';
import SubjectService from '../../../../services/subject.service';

class CategorySubjects extends Component {

    constructor() {
        super();

        this.state = {
            subjects: [],
            isLoading: true
        }
    }

    componentWillMount() {
        this.fetchSubjectGroups();
    }

    async fetchSubjectGroups() {
        let subjectGroups = await SubjectService.getSubjectGroups();

        subjectGroups = subjectGroups.map((subjectGroup) => {
            const defaultSubject = subjectGroup.subjects[0];

            return {
                imageUrl: subjectGroup.imageUrl,
                title: tp(subjectGroup, 'title'),
                href: '/talks/subjects/' + subjectGroup.id + '-' + subjectGroup.slug
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
