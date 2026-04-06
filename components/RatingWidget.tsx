'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'sckde_user_rating'
const INITIAL_VOTES = 4564
const INITIAL_TOTAL_SCORE = 21451 // ~4.7 average

export default function RatingWidget() {
  const [userRating, setUserRating] = useState<number | null>(null)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [totalVotes, setTotalVotes] = useState(INITIAL_VOTES)
  const [totalScore, setTotalScore] = useState(INITIAL_TOTAL_SCORE)
  const [hasVoted, setHasVoted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      setUserRating(data.rating)
      setHasVoted(true)
      setTotalVotes(INITIAL_VOTES + 1)
      setTotalScore(INITIAL_TOTAL_SCORE + data.rating)
    }
    setIsLoaded(true)
  }, [])

  const handleRate = (rating: number) => {
    if (hasVoted) return

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ rating, timestamp: Date.now() }))

    setUserRating(rating)
    setHasVoted(true)
    setTotalVotes(prev => prev + 1)
    setTotalScore(prev => prev + rating)
  }

  const averageRating = totalVotes > 0 ? (totalScore / totalVotes).toFixed(1) : '0.0'

  const renderStar = (index: number) => {
    const filled = hoverRating >= index || (!hoverRating && userRating && userRating >= index)
    const isInteractive = !hasVoted

    return (
      <button
        key={index}
        type="button"
        onClick={() => handleRate(index)}
        onMouseEnter={() => isInteractive && setHoverRating(index)}
        onMouseLeave={() => isInteractive && setHoverRating(0)}
        disabled={hasVoted}
        className={`text-3xl md:text-4xl transition-transform ${
          isInteractive ? 'hover:scale-110 cursor-pointer' : 'cursor-default'
        }`}
        aria-label={`Rate ${index} stars`}
      >
        <svg
          className={`w-8 h-8 md:w-10 md:h-10 ${filled ? 'text-yellow-400' : 'text-yellow-400/40'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    )
  }

  if (!isLoaded) {
    return (
      <div className="bg-amber-50 py-8 px-4">
        <div className="text-center">
          <div className="h-6 w-32 bg-amber-100 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-10 w-48 bg-amber-100 rounded mx-auto mb-2 animate-pulse" />
          <div className="h-6 w-24 bg-amber-100 rounded mx-auto animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-amber-50 py-8 px-4">
      <div className="text-center">
        <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4">
          Rate Sckde.com
        </h3>

        <div className="flex justify-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map(renderStar)}
        </div>

        <div className="flex items-baseline justify-center gap-1 mb-1">
          <span className="text-2xl md:text-3xl font-bold text-slate-800">
            {averageRating}
          </span>
          <span className="text-lg text-slate-500">/ 5</span>
        </div>

        <p className="text-sm text-slate-800">
          {totalVotes.toLocaleString()} votes
        </p>

        {hasVoted && (
          <p className="text-xs text-slate-500 mt-2">
            Thanks for rating!
          </p>
        )}
      </div>
    </div>
  )
}
