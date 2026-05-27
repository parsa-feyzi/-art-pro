import { Article } from '@/lib/types';
import ArticleBox from '../article-box'
import { memo } from 'react';
import Collapsible from '@/components/ui/collapsible';

interface Props {
    title: string | string[] | undefined;
    articles: Article[]
}


const BlogBodyArticlesRenderer = memo(({ articles, title }: Props) => {
    return (
        <Collapsible>
            {
                title ?
                    (
                        articles
                            .filter(article => article.title?.toLowerCase().includes((title as string)?.toLowerCase()))
                            .map((article) => <ArticleBox key={article._id} {...article} />)
                    ) :
                    (
                        articles.map((article) => <ArticleBox key={article._id} {...article} />)
                    )
            }
        </Collapsible>
    )
})

export default BlogBodyArticlesRenderer