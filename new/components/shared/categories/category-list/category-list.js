import React, { Component } from 'react';

import Category from '../category/category';

import './category-list.css';

class CategoryList extends Component {
    render() {
        return (
            <div className='category-list'>
               {this.props.list.map((category, index)=>{
                   return (<Category key={index} onClick={this.props.onClick} category={category}/>)
               })}
            </div>
        );
    }
}

export default CategoryList;