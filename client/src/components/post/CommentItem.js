import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div id="comment1" className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
          <a href="profile.html">

              {/* <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              /> */}
            </a>
            <br />
            <p className="text-center">
            <p className="bg-info">
            <p className="font-weight-bold">
                {comment.username} 
                </p>
                </p>
            </p>
          </div>
          <div className="col-md-10 position-relative" >
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button 
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-danger btn-xs position-absolute"
                
                //className="btn btn-danger"
              >
              {/* <p className='text-right'> */}
                <i className="fas fa-times" />
                {/* </p> */}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);