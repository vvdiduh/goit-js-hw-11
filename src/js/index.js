import PhotosApiService from './photos'
import axios from 'axios';


const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
    searchBtn: document.querySelector('.serchBtn-js'),
    serchValue: document.querySelector('.searh-value-js')
}
const photosApiService = new PhotosApiService();

let photosQuntity = 0;

refs.searchBtn.disabled = true;
refs.loadMoreBtn.style.opacity = '0';
refs.serchValue.addEventListener('input', activeInput)
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', loadMore);

function loadMore() {
    photosApiService.fetchArticles()
        .then(photos => {
            refs.gallery.insertAdjacentHTML('beforeend', markupList(photos));
            photosQuntity += photos.length;
            // console.log('more', photosQuntity);
        });
}

function onSearch(e) {
    e.preventDefault();
    clearGallery();
    const searchValue = e.currentTarget.searchQuery.value.trim();
    const lengthSearchValue = searchValue.length;
    photosApiService.query = searchValue.trim();
    if (photosApiService.query.length === 0) {
        return
    }
    console.log(photosApiService.query.length);
    photosApiService.resetPage();
    photosApiService.fetchArticles()
        .then(photos => {
            refs.gallery.insertAdjacentHTML('beforeend', markupList(photos))
            photosQuntity += photos.length;
            // console.log(photosQuntity);
            if (photos.length < 40) {
                refs.loadMoreBtn.style.opacity = '0';
            }     
            else {
                refs.loadMoreBtn.style.opacity = '1';
            }
        });
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}

function activeInput(e) {
    let langthValue = '';
    langthValue = e.currentTarget.value;
    // console.log(langthValue.length);
    if (langthValue.length > 0) {
        refs.searchBtn.disabled = false;
    } else {
        refs.searchBtn.disabled = true;
    }
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