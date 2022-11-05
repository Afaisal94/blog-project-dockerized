import { BlogLayout, Comment } from "../../components";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostBySlug } from "../../redux/features/postSlice";

function SingleBlog() {
  const { slug } = useParams();
  const dispatch = useDispatch(); 
  const [postId, setPostId] = useState("");
  const [title, setTitle] = useState("");
  const [createdAt, setCreateAt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const { posts } = useSelector((state) => ({
    ...state.post

  }));
  useEffect(() => {
    dispatch(getPostBySlug(slug));
  }, [dispatch]);

  useEffect(() => {
    if (posts) {
      setPostId(posts._id);
      setTitle(posts.title);
      setCreateAt(posts.createdAt);
      setContent(posts.content);
      setImage(posts.image);
      setCategory(posts.category?.name); 
    }
  }, [posts]);

  
  return (
    <BlogLayout>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <article>
              <header className="mb-4">
                <h1 className="fw-bolder mb-1">{title}</h1>
                <div className="text-muted fst-italic mb-2">
                  {Date(createdAt)}
                </div>
                <span className="badge bg-secondary text-decoration-none link-light">
                  Category : {category}
                </span>
              </header>
              <figure className="mb-4">
                <img className="img-fluid rounded" src={image} alt={title} />
              </figure>

              <section className="mb-5">
                <div
                  className="fs-5 mb-4"
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
              </section>
            </article>

            <Comment postId={postId} slug={slug} />

          </div>
        </div>
      </div>
    </BlogLayout>
  );
}

export default SingleBlog;
