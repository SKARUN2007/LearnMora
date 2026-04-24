"use client";

import { useState } from "react";
import styles from "./ReviewSystem.module.css";

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export default function ReviewSystem({ courseId }: { courseId: string }) {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      user: "Sarah Jenkins",
      rating: 5,
      comment: "This certification directly helped me negotiate a 15% salary bump.",
      date: "Oct 12, 2025",
      verified: true
    },
    {
      id: "2",
      user: "Michael T.",
      rating: 4,
      comment: "Excellent technical depth, though the final project took longer than expected.",
      date: "Sep 28, 2025",
      verified: true
    }
  ]);
  
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return;
    
    setReviews([{
      id: Date.now().toString(),
      user: "Learnmora User",
      rating,
      comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      verified: false
    }, ...reviews]);
    
    setOpen(false);
    setComment("");
  };

  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className={styles.reviewSystem}>
      <div className={styles.header}>
        <div className={styles.overview}>
          <span className={styles.avg}>{avgRating}</span>
          <div className={styles.stars}>{"★".repeat(Math.round(parseFloat(avgRating)))}{"☆".repeat(5 - Math.round(parseFloat(avgRating)))}</div>
          <span className={styles.count}>({reviews.length} Verified Reviews)</span>
        </div>
        <button className={styles.writeBtn} onClick={() => setOpen(!open)}>
          Write a Review
        </button>
      </div>

      {open && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.ratingSelect}>
            <span>Rating:</span>
            {[1, 2, 3, 4, 5].map(num => (
              <button 
                type="button" 
                key={num}
                className={rating >= num ? styles.starActive : styles.star}
                onClick={() => setRating(num)}
              >
                ★
              </button>
            ))}
          </div>
          <textarea 
            placeholder="Share your experience and ROI..."
            className={styles.textarea}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" className={styles.submitBtn}>Post Review</button>
        </form>
      )}

      <div className={styles.list}>
        {reviews.map(review => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <div className={styles.userGroup}>
                <div className={styles.avatar}>{review.user.substring(0, 1)}</div>
                <div className={styles.userInfo}>
                  <strong className={styles.userName}>{review.user}</strong>
                  <span className={styles.date}>{review.date}</span>
                </div>
              </div>
              <div className={styles.reviewStars}>
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
              </div>
            </div>
            {review.verified && <div className={styles.verifiedBadge}>✓ Verified Alumni</div>}
            <p className={styles.comment}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
