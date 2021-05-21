import { app } from './index.js';
import { jobs } from './jobs.js';

export const handleFilter = {
  tags: [],

  addTag(e) {
    const tag = e.target.innerText;

    if (handleFilter.tags.indexOf(tag) !== -1) return;
    handleFilter.tags.push(tag);
    handleFilter.applyFilter();
  },

  removeTag(e) {
    const tag = e.target.previousElementSibling.innerText;
    const tagIndex = handleFilter.tags.indexOf(tag);
    handleFilter.tags.splice(tagIndex, 1);
    handleFilter.applyFilter();
  },

  filterJobsByTags() {
    const filteredArray = jobs.filter(e => {
      const matchingTags = e.tags.filter(t => {
        if (handleFilter.tags.includes(t)) return t;
      });

      if (matchingTags.length === handleFilter.tags.length) return e;
    });

    return filteredArray;
  },

  applyFilter() {
    if (handleFilter.tags == []) {
      app.toPrintArray == [...jobs];
      app.reload();
      return;
    }

    app.toPrintArray = handleFilter.filterJobsByTags();
    app.reload();
  },

  clearTags() {
    handleFilter.tags = [];
    handleFilter.applyFilter();
  },

  watchClearTags() {
    const clearTagsBtn = document.getElementById('clear-tags-btn');
    clearTagsBtn.addEventListener('click', handleFilter.clearTags)
  }
};
