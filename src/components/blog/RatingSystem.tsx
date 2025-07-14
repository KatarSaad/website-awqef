import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCreateRating, useRatingsForPost } from "@/hooks/api/useContent";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { CreateRatingDto } from "@/api/generated/models/CreateRatingDto";
import { Star, StarHalf, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

interface RatingSystemProps {
  postId: number;
  allowRating?: boolean;
}

export const RatingSystem: React.FC<RatingSystemProps> = ({
  postId,
  allowRating = true,
}) => {
  const { t } = useLanguage();
  const { user } = useAuthContext();
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const { data: ratingsResult, isLoading } = useRatingsForPost(postId);
  const createRatingMutation = useCreateRating();

  const ratings = ratingsResult || [];

  // Calculate statistics
  const totalRatings = ratings.length;
  const averageRating =
    totalRatings > 0
      ? ratings.reduce(
          (sum: number, rating: { value: number }) => sum + rating.value,
          0
        ) / totalRatings
      : 0;

  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const starCount = i + 1;
    const count = ratings.filter(
      (r: { value: number }) => r.value === starCount
    ).length;
    const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
    return { stars: starCount, count, percentage };
  }).reverse();

  const handleRatingSubmit = async (rating: number) => {
    try {
      if (!user?.id) {
        console.error("User ID is required to submit a rating");
        return;
      }

      const ratingData: CreateRatingDto = {
        postId,
        value: rating,
        userId: user.id,
      };

      await createRatingMutation.mutateAsync(ratingData);
      setUserRating(rating);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const StarRating = ({
    rating,
    size = 20,
    interactive = false,
    onRate,
  }: {
    rating: number;
    size?: number;
    interactive?: boolean;
    onRate?: (rating: number) => void;
  }) => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, i) => {
          const starValue = i + 1;
          const isFilled = rating >= starValue;
          const isHalfFilled = rating >= starValue - 0.5 && rating < starValue;
          const isHovered = interactive && hoveredRating >= starValue;

          return (
            <motion.button
              key={i}
              className={`${
                interactive ? "cursor-pointer hover:scale-110" : ""
              } transition-transform`}
              whileHover={interactive ? { scale: 1.1 } : {}}
              whileTap={interactive ? { scale: 0.9 } : {}}
              onMouseEnter={() => interactive && setHoveredRating(starValue)}
              onMouseLeave={() => interactive && setHoveredRating(0)}
              onClick={() => interactive && onRate?.(starValue)}
              disabled={!interactive}
            >
              {isFilled || isHovered ? (
                <Star
                  size={size}
                  className="fill-secondary-400 text-secondary-400"
                />
              ) : isHalfFilled ? (
                <StarHalf
                  size={size}
                  className="fill-secondary-400 text-secondary-400"
                />
              ) : (
                <Star size={size} className="text-primary-100" />
              )}
            </motion.button>
          );
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-primary">
          <Star size={20} />
          <span>{t("content.ratings")}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overall Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {averageRating.toFixed(1)}
              </div>
              <StarRating rating={averageRating} />
              <div className="text-sm text-gray-500 mt-1">
                {totalRatings} {t("content.ratings")}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users size={16} />
              <span>{totalRatings}</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp size={16} />
              <span>{averageRating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        {totalRatings > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">
              {t("blog.analytics.engagement")}
            </h4>
            {ratingDistribution.map((dist) => (
              <div key={dist.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm">{dist.stars}</span>
                  <Star
                    size={14}
                    className="fill-secondary-400 text-secondary-400"
                  />
                </div>
                <Progress value={dist.percentage} className="flex-1 h-2" />
                <span className="text-sm text-gray-500 w-12 text-right">
                  {dist.count}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* User Rating Input */}
        {allowRating && (
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">{t("blog.rating")}</h4>
            <div className="flex items-center space-x-4">
              <StarRating
                rating={hoveredRating || userRating}
                interactive={true}
                onRate={handleRatingSubmit}
                size={24}
              />
              {userRating > 0 && (
                <span className="text-sm text-gray-600">
                  {t("blog.yourRating")}: {userRating}/5
                </span>
              )}
            </div>
            {createRatingMutation.isPending && (
              <p className="text-sm text-gray-500 mt-2">
                {t("common.sending")}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
