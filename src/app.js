

document.addEventListener('DOMContentLoaded',() => {
    Category.fetchAll(categories => {
        categories.forEach(category => category.renderButton());
    });
});



class Category {
    constructor(data) {
        Object.assign(this, data)
    }


static fetchAll(callback){
    fetch('JSON/categories.json')
    .then(res => res.json())
    .then(data => callback(data.categories.map(cat => new Category(cat))))
    .catch(err => console.error('Error Fetching data'))
}
renderButton() {
    const button = document.createElement('button')
    button.className = 'bg-white p-4 rounded shadow-md text-center cursor-pointer';
    button.textContent = this.name;
    button.onclick = () => CategoryModel.show(this);
    document.querySelector('.grid').appendChild(button)

}
}



class CategoryModel {
    static show(category) {
        const modal = document.getElementById('modal');
        document.getElementById('modal-title').textContent = `${category.name} Books`;
        const modalBooks = document.getElementById('modal-books');

        modalBooks.innerHTML = category.books.map(book => 
        `
        <div class="bg-white p-4 rounded shadow-md text-center">
        <img src="${book.image}" alt="${book.name}" class="w-full h-32 object-cover m-2"/>
        <h3 class="text-xl font-bold"> ${book.name}</h3>
        <p class="text-gray-700 ">${book.author} </p>
        <a href="${book.url}" target="_blank" class="text-blue-500">Read More</a>
        
        </div>
            
            
        `).join('');

        modal.classList.remove("hidden");
        document.getElementById('close-modal').onclick = CategoryModel.close;

    }

    static close() {
        document.getElementById('modal').classList.add('hidden')
    }
}