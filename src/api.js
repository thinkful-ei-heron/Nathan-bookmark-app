'use strict';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/nate/bookmarks';

const apiFetch = function (...args) {
  let error; 
  return fetch(...args)
    .then(res => {
      if(!res.ok){
        error = { code: res.status};

        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
      }
    }
    return res.json();
  })
  .then(data => {

    if(error){
      error.message = data.message;
      return Promise.reject(error);
    }
    return data;
  });
};


const getBookmarks = function() {
  return apiFetch(`${BASE_URL}`); 
};

const createBookmark = function(input) { 
  const newItem = JSON.stringify(input);
  return apiFetch(`${BASE_URL}`,{ 
    method: 'POST',
    headers: {'Content-Type' : 'application/json'  },
    body: newItem
  });
}; 

const updateBookmark = function(id, updateData){
  const newUpdate = JSON.stringify(updateData);
  return apiFetch(`${BASE_URL}/${id}`,{
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: newUpdate
  });
};

const deleteBookmark = function(id){
  return apiFetch(`${BASE_URL}/${id}`,{
    method: 'DELETE',
    headers: {'Content-Type' : 'application/json'}
  });
};

export default{
  getBookmarks, 
  createBookmark,
  updateBookmark, 
  deleteBookmark
};