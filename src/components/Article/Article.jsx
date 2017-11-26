import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Article extends Component {
  static defaultProps = {
    authUid: null,
    userUid: null,
  }
  static propTypes = {
    authUid: PropTypes.string,
    articleTitle: PropTypes.string.isRequired,
    articleSubject: PropTypes.string.isRequired,
    userUid: PropTypes.string,
    articleId: PropTypes.string.isRequired,
    deleteArticleAction: PropTypes.func.isRequired,
  }
  handleDelete = id => () => {
    const { deleteArticleAction } = this.props;
    deleteArticleAction(id);
  }
  renderFooter() {
    const { authUid, userUid, articleId } = this.props;
    if (authUid === userUid) {
      return (
        <div>
          <button className="btn btn-danger" onClick={this.handleDelete(articleId)}>Delete</button>
        </div>
      );
    }
    return null;
  }
  render() {
    const { articleTitle, articleSubject, articleId } = this.props;
    return (
      <div className="mb-2">
        <li className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h2 className="mb-1">{articleTitle}</h2>
          </div>
          <p className="mb-1 text-left">{articleSubject}</p>
          {this.renderFooter()}
        </li>
      </div>
    );
  }
}

export default Article;
