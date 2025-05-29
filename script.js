async function fetchBooks(){
    const res = await fetch('http://localhost:3000/books');
    const books = await res.json();
    const list = document.getElementById('bookList');
    list.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `<p><strong>${book.title}</strong><br> by <br><span>${book.author}</span></p><div><a href="#form"><button id="edit-btn" onclick="editBook(${book.id}, '${book.title}', '${book.author}')">Edit</button></a><button id="del-btn" onclick="deleteBook(${book.id})">Delete</button></div>`;
        list.appendChild(li);
    });
}

async function addBook(){
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();

    if(!title || !author){
        alert('Please enter both title and author.');
        return;
    }

    await fetch('http://localhost:3000/books',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({title,author})
    });
    clearAddFields();
    fetchBooks();  //Refresh list
}

async function deleteBook(id){
    await fetch(`http://localhost:3000/books/${id}`,{
        method: 'DELETE'
    });
    fetchBooks();
}

function editBook(id,title,author){
    document.getElementById('editId').value = id;
    document.getElementById('editTitle').value = title;
    document.getElementById('editAuthor').value = author;
}

async function updateBook(){
   const id =  document.getElementById('editId').value;
   const title = document.getElementById('editTitle').value.trim();
   const author = document.getElementById('editAuthor').value.trim();

   if(!title || !author || !id){
    alert('Please press edit button in the book card in Book List and Please enter valid book ID, title, and author.');
    return;
   }

   await fetch(`http://localhost:3000/books/${id}`,{
       method: 'PUT',
       headers: {'Content-Type':'application/json'},
       body: JSON.stringify({title,author})
   });
   clearEditFields();
   fetchBooks();
}

function clearAddFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
}

function clearEditFields(){
    document.getElementById('editId').value = '';
    document.getElementById('editTitle').value = '';
    document.getElementById('editAuthor').value = '';
}

fetchBooks();  //Load books on page load