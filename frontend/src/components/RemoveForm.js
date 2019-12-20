import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeArticle } from '../states/actions';

function mapDispatchToProps(dispatch) {
    return {
        removeArticle: article => dispatch(removeArticle(article))
    };
}

class RemoveFormComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { title } = this.state;
        this.props.removeArticle({ title });
        this.setState({ title: '' })
    }

    render() {
        const { title } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={this.handleChange}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        )
    }
}

const RemoveForm = connect(
    null,
    mapDispatchToProps
)(RemoveFormComponent);

export default RemoveForm;