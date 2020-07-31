class Book{
  constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;

  }
}

class UI{
  addBookToList(book){
    const list = document.getElementById('book-list');

    //   //create element
      const row = document.createElement("tr")
    //
       //insert row
       row.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><span class = "fa fa-remove"></span></td>

       `;
        list.appendChild(row);

  }
  showAlert(message, className){
      //create div
           const errordiv = document.createElement("div");

        //   //add class
           errordiv.className  = `alert ${"alarm"}`;

    //add text
      errordiv.appendChild(document.TextNode(message));
    //    //
    //    //   //get parent
       const container = document.querySelector('.alarm');
    //    //
    //    //   //get form
    const form = document.querySelector('#book-form');
    //    //
    //    //   //insert alert
     container.insertBefore(errordiv, heading);
    //    //
    //    //   //time out
    setTimeout(function () {
        document.querySelector(".alert").remove();
      },3000);
     }


  deleteBook(target){
    if (target.className ==="fa fa-remove") {
        target.parentElement.parentElement.remove();
    }
  };
  clearFields(){
    document.getElementById('title').value ="",
        document.getElementById('author').value = "",
        document.getElementById('isbn').value = "";

  }
}

//ls
class Store {
  static getBooks(){
    let books;
    if (localStorage.getItem("books")===null) {
      books =[];
    }else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
const books = Store.getBooks();

books.forEach(function (book) {
  const ui = new UI;

  ///addBook to ui list
  ui.addBookToList(book);
});
  }
  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn){
    const books = Store.getBooks();

    books.forEach(function (book,index) {
      if (book.isbn ===isbn) {
        books.splice(index,1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}
//dom load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//eventlisteners

document.getElementById('book-form').addEventListener("submit", function (e) {

//get form value
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

// instantiate book
const book = new Book(title, author, isbn);

//instantiate ui
const ui = new UI();

//validate

if (title === ""  ||  author ==="" || isbn ==="") {
  //error alert
    ui.showAlert("Please fill in the filled", "error");
}else {
  //add book list
  ui.addBookToList(book);

   //Add to ls
   Store.addBook(book);

    //showAlert success
  ui.addBookToList("Book Added", "success");


  //clear fields
  ui.clearFields();

}



  e.preventDefault();
});
//addEventListener for delete
document.getElementById('book-list').addEventListener("click", function (e) {

  //instantiate ui
  const ui = new UI();
ui.deleteBook(e.target);

//remove from ls
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

//ui.showAlert("book remove", "success");

  e.preventDefault();
});
