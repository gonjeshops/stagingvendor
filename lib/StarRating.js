import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 !== 0; // Check if there's a half star

  const stars = Array.from({ length: fullStars }).map((_, index) => (
    <FaStar key={index} />
  ));

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" />);
  }

  return <div className="flex items-center">{stars}</div>;
};

export default StarRating;