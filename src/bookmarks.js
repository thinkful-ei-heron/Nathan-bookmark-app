import $ from 'jquery';

import store1 from './store';
import api from './api';

const generateItemElement = function (mark) {
  let expand = '';
  let markEither = `<span class="bookmark-item">${mark.name}</span>`;
  if(store1.expand){
    markEither = `<button class="bookmark-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>`;
    markExpanded = `
      <div class="bookmark-visit-controls">
        <button class="visit js-item-toggle">
          <span class="button-label">Visit Site</span>
        </button>
        <span class="bookmark-rating">${mark.rating}</span>
        <section class="description">
          <div>${mark.desc}</div> 
        </section>
      </div>`;
  }

  let result = `<li class="bookmark-element" bookmark-id="${bookmark.id}">
                  <span class="mark">${mark.title} ${markEither}</span>
                    ${markExpanded}
               </li>`;  

  return result;
};

const generateBookmarkString = function (bookmarks) {
  const items = bookmarks.map((mark) => generateItemElement(mark));
  return items.join('');
};

const filter = function () { 
  $('.filter').on("change", event => {
    const result = ${event.target}.children(':selected').val 
    store1.sort(result);
    render();
  });
}

const toggleAddingClick = function (){
  $('.new-bookmark').click(()=> {
    store1.toggleAdd();
    render();
  });
};

// MAKE CHANGES HERE!!!!
const newBookmarkSubmit = function () {
  $('#show-bookmarks').submit(function (event){
    event.preventDefault();
    const name  = $('.bookmark-name').val();
    const url   = $('.bookmark-url').val();
    const desc  = $('.bookmark-description').val();
    const rating = $('.bookmark-rating').val(); 
    const newMark = {title, url, desc, rating};

    $('.bookmark-name').val('');
    $('.bookmark-url').val('');
    $('.bookmark-description').val('');

    api.createBookmark(newMark)
      .then((item) => {
        store1.addItem(item);
        store1.toggleAdd();
        render();
      }) 
      .catch((e) => {
        store1.setError(e.message);
      })

  })
}

const bookmarkClicked = function (){
  $(`list-bookmark`).on('click', '.mark', event => {
    const id = getItemId(event.currentTarget);
    const result = store.findById(id);
    store1.findAndUpdate(id, {expanded: !item.expanded});
    render();
  });
};

const DeleteBookmarkClicked = function () { 
  $(`list-bookmark`).on('click', '.bookmark-item-delete', event =>{
    const id = getItemId(event.currentTarget);
    api.deleteBookmark(id)
      .then(() => {
        store1.findAndDelete(id);
        render(); 
      })
      .catch((e) => {
        console.log(e);
        store1.store.setError(e.message);
      });
  });
};

const bookmarkCanceled = function() {
  $('.bookmark-cancel').on('click', () => {
    store1.toggleAdd();
    render;
  });
};

const getItemId = function(item) {
  return $(item)
    closest('.js-item-element')
    .data('item-id');
};



const render = function () {
  let form = ``;
  let marks = [...store1.store.bookmarks];

  if(store1.store.adding){
    form = 
    `<label for="bookmark-name">Name: </label>
     <input type="text" class="bookmark-name" name="bookmark-name"/> 
     <label for ="bookmark-url">URL: </label> 
     <input type="text" class="bookmark-url" name="bookmark-url"/>
     <label for="bookmark-description">Description: </label> 
     <textarea type="text" class="bookmark-description" name="bookmark-description">
     </textarea> 
     <section id="bookmark-rating"> 
      <fieldset class='set'>
        <input id="rate5" class="rate" name="rate" type="radio">
        <label for="rate5" class="star fa fa-star-o fa-lg"></label>
        <input id="rate4" class="rate" name="rate" type="radio">
        <label for="rate4" class="star fa fa-star-o fa-lg"></label>
        <input id="rate3" class="rate" name="rate" type="radio">
        <label for="rate3" class="star fa fa-star-o fa-lg"></label>
        <input id="rate2" class="rate" name="rate" type="radio">
        <label for="rate2" class="star fa fa-star-o fa-lg"></label>
        <input id="rate1" class="rate" name="rate" type="radio">
        <label for="rate1" class="star fa fa-star-o fa-lg"></label>
      </fieldset>
     </section>
     <button class="bookmark-cancel" type ="button">Cancel</button> 
     <button type="submit">Create</button>
     `
  }

  ${'#show-bookmarks'}.html(form);
  if(store1.store.adding){
    bookmarkCanceled();
  }

  const markList = generateBookmarkString(marks);

  $(`#list-bookmark`).html(markList);
};


const bindEventListeners = function (){
  filter();
};


export default {
  render,
  bindEventListeners
};