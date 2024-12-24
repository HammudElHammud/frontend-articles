export function getSelectedIds(selectedCategories, article) {
    let result = {
        article_id: null,
        category_id: null,
        source_id: null,
    };

    selectedCategories.forEach(category => {
        switch (category.key) {
            case 'article':
                result.article_id = article.id;
                break;
            case 'category':
                result.category_id = article.category_id;
                break;
            case 'source':
                result.source_id = article.source_id;
                break;
            default:
                break;
        }
    });

    return result;
};