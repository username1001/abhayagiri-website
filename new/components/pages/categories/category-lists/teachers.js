import React, { Component } from 'react';
import { Link } from 'react-router';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import { tp } from '../../../../i18n';
import CategoryList from '../category-list/category-list';
import AuthorService from '../../../../services/author.service';

class CategoryTeachers extends Component {

    constructor() {
        super();

        this.state = {
            teachers: []
        }
    }

    componentWillMount() {
        this.fetchTeachers();
    }

    async fetchTeachers() {
        let teachers = await AuthorService.getAuthors({});

        teachers = teachers.map((teacher) => {
            return {
                imagePath: teacher.imageUrl,
                title: tp(teacher, 'title'),
                href: '/new/talks/by-teacher/' + teacher.id
            };
        });

        this.setState({
            teachers: teachers
        })
    }

    render() {
        const lng = this.props.i18n.language;
        return <CategoryList list={this.state.teachers}/>;
    }
}

export default translate('talks')(CategoryTeachers);
