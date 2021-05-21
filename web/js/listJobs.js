import { handleFilter } from './filter.js';
import { DomUtils } from './utils.js';

export const handleJobs = {
  mainContainer: document.getElementById('jobs'),

  getJob(rawData) {
    if (!rawData) return;

    class Job {
      constructor(rawData) {
        this.company = rawData.company;
        this.logo = rawData.logo;
        this.new = rawData.new;
        this.featured = rawData.featured;
        this.position = rawData.position;
        this.role = rawData.role;
        this.level = rawData.level;
        this.postedAt = rawData.postedAt;
        this.contract = rawData.contract;
        this.location = rawData.location;
        this.languages = rawData.languages;
        this.tools = rawData.tools;
      }

      get tags() {
        return [this.role, this.level, ...this.languages, ...this.tools];
      }

      get contractInfo() {
        return [this.postedAt, this.contract, this.location];
      }

      createCompanyLogoImg() {
        const img = document.createElement('img');
        img.setAttribute('src', this.logo);
        img.setAttribute('alt', `${this.company} logo`);
        img.setAttribute('width', '48');
        img.setAttribute('height', '48');
        img.classList.add('company-logo');
        return img;
      }

      createCompanyPrimaryInfoDiv() {
        const companyPrimaryInfoDiv = DomUtils.createDiv(['company-primary-info']);
        const companyNameDiv = DomUtils.createDiv(['company-name']);
        const companyNameP = DomUtils.createP(this.company);
        const isNewJob = this.new;
        const isFeaturedJob = this.featured;

        companyNameDiv.appendChild(companyNameP);
        companyPrimaryInfoDiv.appendChild(companyNameDiv);

        if (isNewJob) {
          const newJobMarkerDiv = DomUtils.createDiv(['job-marker', 'job-marker-new']);
          const newJobP = DomUtils.createP('NOVO!');
          newJobMarkerDiv.appendChild(newJobP);
          companyPrimaryInfoDiv.appendChild(newJobMarkerDiv);
        }

        if (isFeaturedJob) {
          const featuredJobMarkerDiv = DomUtils.createDiv(['job-marker', 'job-marker-featured']);
          const featuredJobP = DomUtils.createP('EM DESTAQUE!');
          featuredJobMarkerDiv.appendChild(featuredJobP);
          companyPrimaryInfoDiv.appendChild(featuredJobMarkerDiv);
        }

        return companyPrimaryInfoDiv;
      }

      createJobPositionInfoDiv() {
        const jobPositionDiv = DomUtils.createDiv(['job-position-info']);
        const jobPositionP = DomUtils.createP(this.position);
        jobPositionDiv.appendChild(jobPositionP);
        return jobPositionDiv;
      }

      createJobContractDiv() {
        const jobContractDiv = DomUtils.createDiv(['job-contract-info']);

        for (const info of this.contractInfo) {
          const contractInfoP = DomUtils.createP(info);
          jobContractDiv.appendChild(contractInfoP);
        }

        return jobContractDiv;
      }

      createJobTagsDiv() {
        const jobTagsDiv = DomUtils.createDiv(['job-tags']);

        for (const tag of this.tags) {
          const currentJobTagDiv = DomUtils.createDiv(['job-tag']);
          const jobTagP = DomUtils.createP(tag);
          currentJobTagDiv.appendChild(jobTagP);
          currentJobTagDiv.addEventListener('click', handleFilter.addTag)
          jobTagsDiv.appendChild(currentJobTagDiv);
        }

        return jobTagsDiv;
      }

      createJobCardContentDiv() {
        const contentDiv = DomUtils.createDiv(['content-div']);
        const jobInfoWrapper = DomUtils.createDiv(['job-info-wrapper']);
        const companyImage = this.createCompanyLogoImg();
        const companyPrimaryInfo = this.createCompanyPrimaryInfoDiv();
        const jobPositionDiv = this.createJobPositionInfoDiv();
        const jobContractDiv = this.createJobContractDiv();

        contentDiv.appendChild(companyImage);
        jobInfoWrapper.appendChild(companyPrimaryInfo);
        jobInfoWrapper.appendChild(jobPositionDiv);
        jobInfoWrapper.appendChild(jobContractDiv);
        contentDiv.appendChild(jobInfoWrapper);
        return contentDiv;
      }

      createJobCard() {
        const jobCard = DomUtils.createDiv(['floating-card', 'job-card']);
        const jobContent = this.createJobCardContentDiv();
        const hr = document.createElement('hr');
        const jobTags = this.createJobTagsDiv();

        jobCard.appendChild(jobContent);
        jobCard.appendChild(hr);
        jobCard.appendChild(jobTags);
        return jobCard;
      }
    }

    return new Job(rawData);
  },

  clearMainContainer() {
    this.mainContainer.innerHTML = '';
  },

  printJobs(jobs) {
    for (const job of jobs) {
      const jobCard = handleJobs.getJob(job).createJobCard();
      handleJobs.mainContainer.appendChild(jobCard);
    }
  }
};
