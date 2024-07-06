

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