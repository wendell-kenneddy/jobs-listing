import { handleJobs } from './listJobs.js';
import { jobs } from './jobs.js';
import { handleTagsListing } from './listTags.js';
import { handleFilter } from './filter.js';

export const app = {
  toPrintArray: [...jobs],

  init() {
    handleJobs.printJobs(this.toPrintArray);
    handleTagsListing.printTags();
    handleFilter.watchClearTags();
  },

  reload() {
    handleJobs.clearMainContainer();
    handleTagsListing.clearTagsContainer();
    this.init();
  }
};

app.init();
