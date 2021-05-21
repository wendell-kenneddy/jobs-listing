import { handleFilter } from "./filter.js";
import { DomUtils } from "./utils.js";

export const handleTagsListing = {
  activeTagsContainer: document.querySelector('.active-tags'),

  createTagDiv() {
    return DomUtils.createDiv(['active-tag']);
  },

  createRemoveTagButton() {
    const button = document.createElement('button');
    button.innerText = 'X';
    return button;
  },

  printTags() {
    for (const tag of handleFilter.tags) {
      const tagDiv = handleTagsListing.createTagDiv();
      const removeTagBtn = handleTagsListing.createRemoveTagButton();
      const tagP = DomUtils.createP(tag);
      removeTagBtn.addEventListener('click', handleFilter.removeTag);
      tagDiv.appendChild(tagP);
      tagDiv.appendChild(removeTagBtn);
      handleTagsListing.activeTagsContainer.appendChild(tagDiv);
    }
  },

  clearTagsContainer() {
    handleTagsListing.activeTagsContainer.innerHTML = '';
  }
};
