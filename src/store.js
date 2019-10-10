const store = {
  bookmarks: [],
  error : null,
  filter : 0,
  adding : false
};

const findById = function(id){
  const result = this.store.bookmarks.find(mark => mark.id === id);
  return this.store.bookmarks.find(mark => mark.id === id);
};

const addMark = function (mark) {

  Object.assign(mark, {expanded: false})
  this.store.bookmarks.push(mark);
};

const findAndDelete = function(id){
  this.store.bookmarks = this.store.bookmarks.filter (mark => mark.id !== id);
};

const toggleAdd = function(){
  this.store.adding = !this.store.adding;
};

const findAndUpdate = function(id, newMark){
  let updatedStore = this.findById(id);
  Object.assign(updatedStore, newMark);   
  };

const setError = function (error){
  this.store.error = error;
};

const sort = function (items){
  switch (items){
    case 'highRate':
      store.bookmarks.sort(function(a, b){
        return b.rating - a.rating;
      });
      break;
    case 'lowRate': 
      store.bookmarks.sort(function(a, b){
        return a.rating - b.rating;
      });
      break;
    case 'aToZ':
      store.bookmarks.sort(function (a, b){
        const title1 = a.title.toLowerCase();
        const title2 = b.title.toLowerCase();
        return ((title1<title2) ? -1: ((title1>title2)? 1:0));
      });
      break;
    case 'zToA':
      store.bookmarks.sort(function(a, b){
        const title1 = b.title.toLowerCase();
        const title2 = a.title.toLowerCase();
        return ((title1<title2) ? -1: ((title1>title2)? 1:0));
      });
      break;
  }
}


export default {
  store,
  setError,
  sort,
  toggleAdd,
  findById,
  addMark,
  findAndDelete,
  findAndUpdate
};