import styles from "./Post.module.css";

import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Comment } from "./Comment";
import { Avatar } from "./Avatar";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Comments {
  id: string;
  name: string;
  avatarUrl: string;
  content: string;
  publishedAt: Date;
  likes: number;
}

interface NewComment {
  id: string;
  name: string;
  avatarUrl: string;
  publishedAt: Date;
  content: string;
  likes: number;
}

interface Content {
  type: string;
  content: string;
}

export interface PostType {
  id: string;
  author: Author;
  content: Content[];
  publishedAt: Date;
  comments: Comments[];
}

interface PostProps {
  post: PostType;
  userName: string;
  userPicture: string;
}

export function Post({ post, userName, userPicture }: PostProps) {
  const [commentList, setCommentList] = useState(post.comments);
  const [newCommentText, setNewcommentText] = useState("");

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(post.publishedAt);

  const toNowDate = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    const newComment: NewComment = {
      id: uuidv4(),
      name: userName,
      avatarUrl: `https://github.com/${userPicture}.png`,
      content: newCommentText,
      publishedAt: new Date(),
      likes: 0,
    };
    setCommentList([...commentList, newComment]);
    setNewcommentText("");
  }

  function handleCommentText(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewcommentText(event.target.value);
  }

  function customInvalidMessage(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Não é possivel publicar um comentário em branco!");
  }

  function deleteComment(commentId: string) {
    const listWithoutDeleted = commentList.filter((comment) => comment.id !== commentId);
    setCommentList(listWithoutDeleted);
  }

  const isNewCommentEmpty = newCommentText.length == 0;

  return (
    <article className={styles.post}>
      {/* HEADER */}
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} border />
          <div className={styles.profileInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <div>
          <time title={formattedDate} dateTime={post.publishedAt.toString()}>
            {toNowDate}
          </time>
        </div>
      </header>

      {/* CONTENT */}
      <div className={styles.content}>
        {post.content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={uuidv4()}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={uuidv4()}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      {/* FORM */}
      <form onSubmit={handleCreateNewComment} className={styles.form}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="commentText"
          placeholder="Escreva um comentário..."
          onChange={handleCommentText}
          value={newCommentText}
          required
          onInvalid={customInvalidMessage}
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      {/* COMMENTS */}
      <div className={styles.commentList}>
        {commentList.map((comment) => {
          return (
            <Comment
              key={comment.id}
              id={comment.id}
              name={comment.name}
              src={comment.avatarUrl}
              publishedAt={comment.publishedAt}
              content={comment.content}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
