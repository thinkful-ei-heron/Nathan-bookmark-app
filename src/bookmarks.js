import $ from 'jquery';

import store1 from './store';
import api from './api';

const generateItemElement = function (mark) {
  let expand = '';
  let markEither = `<div class="mark">${mark.rating}</div>`;
  if(mark.expanded){
    markEither = ``;
    expand = `
    <button class="bookmark-item-delete js-item-delete">
          <span class="button-label">delete</span>
    </button>
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
  let result = `
                  <li class="js-item-element" id="${mark.id}">
                    <div class="mark-opener">${mark.title} ${markEither}</div>
                    ${expand}
                  </li>`;  
  return result;
};

const generateBookmarkString = function (bookmarks) {
  const items = bookmarks.map((mark) => generateItemElement(mark));
  return items.join('');
};

const filter = function () { 
  $('#filter').on('change', event => {
    const result = $(event.target).children(':selected').val(); 
    console.log(result);
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

const newBookmarkSubmit = function () {
  $('#show-bookmarks').submit(function (event) {
    event.preventDefault();
    console.log('here');
    const title = $('.bookmark-title').val();
    const url   = $('.bookmark-url').val();
    const desc  = $('.bookmark-description').val();
    const rating = parseInt($('input[name]:checked').val()); 
    const newMark = {title, url, desc, rating};

    $('.bookmark-title').val('');
    $('.bookmark-url').val('');
    $('.bookmark-description').val('');

    api.createBookmark(newMark)
      .then((item) => {
        store1.addMark(item);
        store1.toggleAdd();
        render();
      }) 
      .catch((e) => {
        store1.setError(e.message);
        //renderError();                       FIX THIS! 
      })

  });
}

const bookmarkClicked = function (){
  $(`#list-bookmark`).on('click','.mark-opener', event =>{
    const id = getItemId(event.currentTarget);
    const result = store1.findById(id);
    store1.findAndUpdate(id, {expanded: !result.expanded});
    render();
  });
};

const DeleteBookmarkClicked = function () { 
  $(`#list-bookmark`).on('click', '.bookmark-item-delete', event =>{
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
    render();
  });
};

const getItemId = function(item) {
  return $(item).closest('.js-item-element').attr('id');
};



const render = function () {
  let form = ``;
  let marks = [...store1.store.bookmarks];

  if(store1.store.adding){
    form = 
    `<form class="bookmark-form">
      <fieldset class='set'>
      <label for="bookmark-title">Title: </label>
      <input type="text" class="bookmark-title" name="bookmark-title"/> 
      <label for ="bookmark-url">URL: </label> 
      <input type="url" class="bookmark-url" name="bookmark-url"/>
      <label for="bookmark-description">Description: </label> 
      <textarea type="text" class="bookmark-description" name="bookmark-description">
      </textarea> 
      <section id="bookmark-rating"> 
          <input id="rate5" class="rate" name="rate" type="radio" value="1">
          <label for="rate5" class="star fa fa-star-o fa-lg"></label>
          <input id="rate4" class="rate" name="rate" type="radio" value="2">
          <label for="rate4" class="star fa fa-star-o fa-lg"></label>
          <input id="rate3" class="rate" name="rate" type="radio" value="3">
          <label for="rate3" class="star fa fa-star-o fa-lg"></label>
          <input id="rate2" class="rate" name="rate" type="radio" value="4">
          <label for="rate2" class="star fa fa-star-o fa-lg"></label>
          <input id="rate1" class="rate" name="rate" type="radio" value="5">
          <label for="rate1" class="star fa fa-star-o fa-lg"></label>
      </section>
      <button class="bookmark-cancel" type ="button">Cancel</button> 
      <button class="bookmark-create" type="submit">Create</button>
      </fieldset>
    </form>`
  }

  $('#show-bookmarks').html(form);
  if(store1.store.adding){
    bookmarkCanceled();
  }
  const markList = generateBookmarkString(marks);
  $(`#list-bookmark`).html(markList);
  
  if(store1.store.bookmarks.find((item) => item.expanded)) {     //CHANGE THIS
        bookmarkUrl();        // displays link when expanded 
    }
};

const bookmarkUrl = function(){
  $('.js-item-toggle').on('click', event =>{
    const id = getItemId(event.currentTarget);
    const mark = store1.findById(id);
    window.open(mark.url);
    
  })
};

const bindEventListeners = function (){
  filter();
  newBookmarkSubmit();
  bookmarkClicked();
  DeleteBookmarkClicked();
  toggleAddingClick();

};


export default {
  render,
  bindEventListeners
};