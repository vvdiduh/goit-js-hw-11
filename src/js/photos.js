import axios from 'axios';

export default class PhotosApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchArticles() {
        return axios.get(`https://pixabay.com/api/?key=32083000-0930ed6e251f9a7620e985678&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
        .then((response) => {
            // if (!response.ok) {
            //     throw new Error(response.status);
            // }
            // console.log(response.data.hits)
            return response
        })
        .then(photos => {
            this.page += 1;
            console.log(photos.hits)
            return photos.data.hits;
        });
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}