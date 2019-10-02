const store = {
  bookmarks: [],
  error : null,
  filter : 0,
  adding : false
};

const findById = function(id){
  return this.store.find(mark => mark.id === id);
};

const addMark = function (mark) {
  object.assign(mark, {expanded: false})
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
      breakl
    case 'aToZ':
      return store.bookmarks.toLowerCase().sort();
      break;
    case 'zToA':
      const result = store.bookmarks.toLowerCase().sort();
      return const.reverse();
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