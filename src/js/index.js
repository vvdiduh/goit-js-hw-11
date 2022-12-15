import PhotosApiService from './photos'

const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery')
}
const photosApiService = new PhotosApiService();

refs.loadMoreBtn.style.opacity = '0';

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', loadMore)

function loadMore() {
    photosApiService.fetchArticles()
        .then(photos => {
            refs.gallery.insertAdjacentHTML('beforeend', markupList(photos)) 
        });
}

function onSearch(e) {
    e.preventDefault();
    clearGallery();
    photosApiService.query = e.currentTarget.searchQuery.value;
    if (photosApiService.query === '') {
        return
    }
    photosApiService.resetPage();
    photosApiService.fetchArticles()
        .then(photos => {
            refs.gallery.insertAdjacentHTML('beforeend', markupList(photos))
        });
    refs.loadMoreBtn.style.opacity = '1';
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}

function markupList(photos) {
    return photos.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
        <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy"/> 
            <div class="info">
                <p class="info-item">
                    <b>Likes ${likes}</b>
                </p>
                <p class="info-item">
                    <b>Views ${views}</b>
                </p>
                <p class="info-item">
                    <b>Comments ${comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads ${downloads}</b>
                </p>
            </div>
        </div>`});
}