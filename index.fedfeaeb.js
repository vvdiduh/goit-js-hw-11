const e={searchForm:document.querySelector("#search-form"),loadMoreBtn:document.querySelector(".load-more"),gallery:document.querySelector(".gallery")},t=new class{fetchArticles(){return fetch(`https://pixabay.com/api/?key=32083000-0930ed6e251f9a7620e985678&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).then((e=>(this.page+=1,e.hits)))}resetPage(){this.page=1}get query(){return this.searchQuery}set query(e){this.searchQuery=e}constructor(){this.searchQuery="",this.page=1}};function r(e){return e.map((({webformatURL:e,largeImageURL:t,tags:r,likes:n,views:a,comments:s,downloads:o})=>`\n        <div class="photo-card">\n            <img src="${e}" alt="${r}" loading="lazy"/> \n            <div class="info">\n                <p class="info-item">\n                    <b>Likes ${n}</b>\n                </p>\n                <p class="info-item">\n                    <b>Views ${a}</b>\n                </p>\n                <p class="info-item">\n                    <b>Comments ${s}</b>\n                </p>\n                <p class="info-item">\n                    <b>Downloads ${o}</b>\n                </p>\n            </div>\n        </div>`))}e.loadMoreBtn.style.opacity="0",e.searchForm.addEventListener("submit",(function(n){if(n.preventDefault(),function(){e.gallery.innerHTML=""}(),t.query=n.currentTarget.searchQuery.value,""===t.query)return;t.resetPage(),t.fetchArticles().then((t=>{e.gallery.insertAdjacentHTML("beforeend",r(t))})),e.loadMoreBtn.style.opacity="1"})),e.loadMoreBtn.addEventListener("click",(function(){t.fetchArticles().then((t=>{e.gallery.insertAdjacentHTML("beforeend",r(t))}))}));
//# sourceMappingURL=index.fedfeaeb.js.map