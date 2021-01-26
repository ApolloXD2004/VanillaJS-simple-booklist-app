// Book Class :Respresents A Book

class Book {
    constructor(title,author,isbn){
        this.title = title
        this.author= author
        this.isbn = isbn

    }
}

//UI class handles ui taks

class UI{

    static showAlert(message,className){
        
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div,form)
        //vanish in 3 second
        setTimeout(()=>
            document.querySelector('.alert').remove(),3000
        )

    }

    static deleteBook(el){
        if (el.classList.contains('delete')){
            el.parentElement.parentElement.remove()
        }


    }

    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list')
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        
        `
        list.appendChild(row)
        
    }



    static displayBooks(){
     
        const books  = Store.getBooks()

        books.forEach(book=>{
            UI.addBookToList(book)
        })
    }
}

//store class takes care of storage

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books = []


        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books

    }

    static addBook(book){
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books',JSON.stringify(books))

    }

    static removeBook(isbn){
        const books = Store.getBooks()
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books))
    }
}


//events display book
document.addEventListener('DOMContentLoaded',UI.displayBooks)

//event to add a book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    //get form value
    //prevent actual submit

    e.preventDefault()
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value


    //validation
    if(title==='' || author==='' || isbn ===''){
        UI.showAlert('Enter All The Fields','danger')
    }else{
        
    const book = new Book(title,author,isbn)

    console.log(book)
    UI.addBookToList(book)

    Store.addBook(book)

    //clear fields
    UI.showAlert('Book Created','success')

    UI.clearFields()
    

    }

    //instantitate book

})


//event remove a book

document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteBook((e.target))
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert('Book Deleted','danger')
})