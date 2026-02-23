import NewsFeaturedCard from './NewsFeaturedCard';
import { type NewsArticle } from '../../data/news';

interface NewsCardProps {
  article: NewsArticle;
  index: number;
  viewMode?: 'grid' | 'list' | 'featured';
}

const NewsCard = ({ article, index }: NewsCardProps) => {
  return <NewsFeaturedCard article={article} index={index} />;
};

export default NewsCard;