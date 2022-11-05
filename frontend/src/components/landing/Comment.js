import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Comment = (props) => {
  const navigate = useNavigate();
  const { postId, slug } = props;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchComments = async () => {
    await axios
      .get("http://localhost:5000/comments/post/" + postId)
      .then((result) => {
        setComments(result.data);
      });
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Post Comment
    axios
      .post("http://localhost:5000/comments", {
        comment: comment,
        post: postId,
      })
      .then((response) => {
        setComment("");
        fetchComments();
        navigate(`/post/${slug}`);
      });
  };
  return (
    <div>
      <section className="mb-5">
        <div className="card bg-light">
          <div className="card-body">
            {/* Comment form */}
            <form onSubmit={handleSubmit} className="mb-4">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Join the discussion and leave a comment!"
                name="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <input
                className="btn btn-primary mt-2"
                type="submit"
                value="Submit Comment"
              />
            </form>

            {/* Comment List */}
            {comments.map((c) => {
              return (
                <div className="d-flex mb-3" key={c._id}>
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-circle"
                      src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                      alt="..."
                    />
                  </div>
                  <div className="ms-3">{c.comment}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Comment;