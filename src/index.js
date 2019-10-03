import $ from 'jquery';
import api from './api';
import store from './store';
import './index.css';
import bookmarks from './bookmarks';

const main = function() {
  api.getBookmarks()
    .then(marks =>{
      marks.forEach( mark => {
        store.addMark(mark);
      });
      bookmarks.render();
    }); 
  bookmarks.bindEventListeners();
  bookmarks.render();
};

$(main);