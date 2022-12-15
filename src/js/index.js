import PhotosApiService from './photos'

const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more')
}

const photosApiService = new PhotosApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', loadMore)

// fetchPhoto('cat')

// function fetchPhoto(value) {
//     return
// }

function loadMore() {
    photosApiService.fetchArticles();
}

function onSearch(e) {
    e.preventDefault();

    photosApiService.query = e.currentTarget.searchQuery.value;
    console.log();

    photosApiService.fetchArticles();
}

// function markupList(photos) {
//     return photos.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//         return `
//         <div class="photo-card">
//             <img src="" alt="" loading="lazy"/> 
//             <div class="info">
//                 <p class="info-item">
//                     <b>Likes</b>
//                 </p>
//                 <p class="info-item">
//                     <b>Views</b>
//                 </p>
//                 <p class="info-item">
//                     <b>Comments</b>
//                 </p>
//                 <p class="info-item">
//                     <b>Downloads</b>
//                 </p>
//             </div>
//         </div>`
//     })
    
// }