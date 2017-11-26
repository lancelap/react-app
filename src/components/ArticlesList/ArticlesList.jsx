import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadArticles, deleteArticle } from '../../AC';
import Article from '../Article';
import Loader from '../Loader';

class ArticlesList extends Component {
  static propTypes = {
    articles: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    loadArticlesAction: PropTypes.func.isRequired,
    deleteArticleAction: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { loadArticlesAction } = this.props;
    const { loaded, loading } = this.props.articles;
    if (!loaded && !loading) loadArticlesAction();
  }
  render() {
    const { articles, auth, deleteArticleAction } = this.props;
    const { loading } = articles;
    if (loading) return <Loader />;
    const articleElements = articles.entities.entrySeq().toArray().map((article) => {
      return (
        <Article
          authUid={auth.uid}
          userUid={article[1].get('uid')}
          key={article[0]}
          articleId={article[0]}
          articleTitle={article[1].get('title')}
          articleSubject={article[1].get('subject')}
          deleteArticleAction={deleteArticleAction}
        />
      );
    });
    return (
      <div className="mt-3">
        <ul className="list-group">{ articleElements }</ul>
      </div>
    );
  }
}

export default connect((state) => {
  const { articles, auth } = state;
  return { articles, auth: auth.get('userInfo') };
}, { loadArticlesAction: loadArticles, deleteArticleAction: deleteArticle })(ArticlesList);
