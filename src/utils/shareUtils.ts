export const shareNews = (
    platform: string,
    url: string,
    title: string,
    text: string,
    setShowCopyAlert: (show: boolean) => void,
    setShowShareMenu: (show: boolean) => void
) => {
    switch (platform) {
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
            break;
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
            break;
        case 'linkedin':
            window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
            break;
        case 'email': {
            const mailtoLink = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
            window.open(mailtoLink, '_blank');
            break;
        }
        case 'copy':
            navigator.clipboard.writeText(url);
            setShowCopyAlert(true);
            setTimeout(() => setShowCopyAlert(false), 2000);
            break;
    }
    setShowShareMenu(false);
};