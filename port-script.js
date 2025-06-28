console.log("Checking if script is running...");

// PORTFOLIO FILTERS

function filterSelection(category) {
    let items = document.getElementsByClassName('portfolio-item');
    for (let i = 0; i < items.length; i++) {
        if (category === 'all' || items[i].classList.contains(category)) {
            items[i].style.display = 'block';
        } else {
            items[i].style.display = 'none';
        }
    }
  }
  
  
  
  
  
  // VIDEO LIGHTBOX
  
  class LightBoxVideo {
    constructor() {
        this.videos = {};
        this.lightBoxVideo();
    }

    lightBoxVideo = () => {
        this.setEvents();
        this.setMutationObserver();
    }

    setMutationObserver = () => {
        const observer = new MutationObserver(mutation => {
            const imageMutations = mutation.filter((m) => {
                return m.attributeName === "src" && m.target.className === 'lb-image'
            });
            
            const overlayDisplay = window.getComputedStyle(document.querySelector('.lightboxOverlay'), null).display;
            if("none" === overlayDisplay) {
                this.removeVideoElement();
            }
            
            if(imageMutations.length > 0) {
                if(this.videos[imageMutations[0].target.src]) {
                    this.removeVideoElement();
                    this.setVideoElement(this.videos[imageMutations[0].target.src]);
                }
            }
        });

        observer.observe(document.body, {
            childList: false,
            attributes: true,
            subtree: true,
            characterData: false
        });
    }
    setEvents = () => {
        const videoLinks = this.findVideoLinks();
        console.log('Video Links:', videoLinks);  // Log video links
    
        videoLinks.forEach((link) => {
            console.log('Link href:', link.href);  // Log href
            console.log('Link data-href:', link.dataset.href);  // Log data-href
    
            if (!link.href || !link.dataset.href) {
                console.error('Invalid element or missing href properties:', link);
                return;
            }
    
            this.videos[link.href] = link;
            link.addEventListener('click', (e) => {
                this.removeVideoElement();
                this.setVideoElement(e.currentTarget); // Pass the <a> element instead of <img>
            });
        });
    }

    setVideoElement = (element) => {
        const lightbox = document.querySelector('.lightbox')
        const container = lightbox.querySelector('.lb-container');

        const videoElement = this.createVideoElement(element);
        container.prepend(videoElement);
    }

    removeVideoElement = () => {
        const lightbox = document.querySelector('.lightbox')
        const container = lightbox.querySelector('.lb-container');
        const video = container.querySelector('video');

        if(video) {
            container.removeChild(video);
        }
    }

    createVideoElement = (element) => {
        if (!element || !element.href || !element.dataset || !element.dataset.href) {
            console.error('Invalid element or missing href properties:', element);
            return null;
        }
   
        const video = document.createElement('video');
        console.log("Created video element:", video);
   
        // Set the poster URL based on element.href
        video.setAttribute('poster', element.href);
        video.setAttribute('controls', 'true');
   
        const source = document.createElement('source');
        source.setAttribute('src', element.dataset.href);
        source.setAttribute('type', 'video/mp4');
        
        video.append(source);
        console.log("Video element with source added:", video);
   
        return video;
    }

    findVideoLinks = () => {
        // Select only <a> tags with data-lightbox and data-href
        const hrefs = document.querySelectorAll('a[data-lightbox][data-href]');
        const regex = /\.(mp4|mov|flv|wmv)$/;  // Regex to match video formats
        
        if (hrefs.length === 0) {
            return [];
        }
    
        return Array.from(hrefs).filter((href) => {
            return href.dataset.href && href.dataset.href.match(regex);
        });
    }
    
}


window.addEventListener('DOMContentLoaded', () => {
  new LightBoxVideo();
});