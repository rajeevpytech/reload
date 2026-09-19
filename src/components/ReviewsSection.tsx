import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle, MessageSquarePlus, X } from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  productId: string;
  reviews: Review[];
  rating: number;
  reviewsCount: number;
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  rating,
  reviewsCount,
  onAddReview
}) => {
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(5);
  const [authorName, setAuthorName] = useState<string>('Rajeev Sharma');
  const [comment, setComment] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setErrorMsg('Please write your review feedback.');
      return;
    }

    onAddReview({
      author: authorName.trim() || 'Customer',
      rating: userRating,
      comment: comment.trim(),
      verifiedBuyer: true
    });

    setComment('');
    setErrorMsg('');
    setSuccessMsg('Thank you! Your verified review has been published.');
    setTimeout(() => {
      setShowReviewForm(false);
      setSuccessMsg('');
    }, 2000);
  };

  return (
    <div className="p-3.5 bg-[#141414] rounded border border-[#222222] space-y-3">
      {/* Summary Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-[#DFC07B] fill-[#DFC07B]" />
            Ratings & Client Reviews
          </h4>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-bold text-white">{rating.toFixed(1)}</span>
            <div className="flex text-[#DFC07B] text-xs">
              {'★★★★★'}
            </div>
            <span className="text-[10px] text-gray-400">({reviewsCount} verified reviews)</span>
          </div>
        </div>

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="px-3 py-1.5 bg-[#1C1C1C] hover:bg-[#252525] border border-[#C5A059]/40 text-[#DFC07B] text-[11px] font-semibold rounded flex items-center gap-1 transition-colors"
        >
          <MessageSquarePlus className="w-3.5 h-3.5" />
          <span>Write Review</span>
        </button>
      </div>

      {/* Write Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmit} className="p-3 bg-[#181818] rounded border border-[#2F2F2F] space-y-2.5 animate-fade-in">
          <div className="flex items-center justify-between pb-1 border-b border-[#262626]">
            <span className="text-xs font-bold text-[#DFC07B] uppercase tracking-wider">
              Share Your Experience
            </span>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}
          {successMsg && <p className="text-green-400 text-xs font-medium">{successMsg}</p>}

          {/* Star Selector */}
          <div>
            <span className="text-[10px] uppercase text-gray-400 block mb-1">Your Rating</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setUserRating(s)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`w-5 h-5 ${
                      s <= userRating ? 'text-[#DFC07B] fill-[#DFC07B]' : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase text-gray-400 block mb-1">Your Name</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full bg-[#111111] border border-[#2E2E2E] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase text-gray-400 block mb-1">Detailed Review</label>
            <textarea
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How does the fabric, fit, drape and craftsmanship feel?"
              className="w-full bg-[#111111] border border-[#2E2E2E] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#C5A059] hover:bg-[#DFC07B] text-black font-bold text-xs uppercase tracking-wider rounded transition-colors shadow"
          >
            Submit Verified Review
          </button>
        </form>
      )}

      {/* Review List */}
      <div className="space-y-2.5 pt-1">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-2.5 bg-[#171717] rounded border border-[#222222] space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#262626] border border-[#C5A059]/30 flex items-center justify-center text-[10px] font-bold text-[#DFC07B]">
                  {rev.author.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-white">{rev.author}</span>
                {rev.verifiedBuyer && (
                  <span className="flex items-center gap-0.5 text-[9px] text-green-400 font-medium">
                    <CheckCircle className="w-2.5 h-2.5" />
                    Verified Buyer
                  </span>
                )}
              </div>
              <span className="text-[10px] text-gray-500">{rev.date}</span>
            </div>

            <div className="flex text-[#DFC07B] text-[11px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < rev.rating ? 'fill-[#DFC07B]' : 'text-gray-700'}`}
                />
              ))}
            </div>

            <p className="text-xs text-gray-300 leading-relaxed pt-0.5">{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
