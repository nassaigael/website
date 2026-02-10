import NewsFeaturedCard from './NewsFeaturedCard';
import NewsListCard from './NewsListCard';
import NewsGridCard from './NewsGridCard';
import { type NewsArticle } from '../../data/news';

interface NewsCardProps {
  article: NewsArticle;
  index: number;
  viewMode?: 'grid' | 'list' | 'featured';
}

const NewsCard = ({ article, index, viewMode = 'grid' }: NewsCardProps) => {
  switch (viewMode) {
    case 'featured':
      return <NewsFeaturedCard article={article} index={index} />;
    case 'list':
      return <NewsListCard article={article} index={index} />;
    case 'grid':
    default:
      return <NewsGridCard article={article} index={index} />;
  }
};

export default NewsCard;