import { Injectable, inject } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  updateMetadata(config: { title: string; description: string; image?: string; type?: string }) {
    const { title, description, image, type = 'website' } = config;

    this.title.setTitle(title);

    // Basic meta tags
    const tags: MetaDefinition[] = [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
    ];

    if (image) {
      tags.push(
        { property: 'og:image', content: image },
        { name: 'twitter:image', content: image },
        { name: 'twitter:card', content: 'summary_large_image' }
      );
    }

    // Update and adding meta tags
    for (const tag of tags) {
      this.meta.updateTag(tag);
    }
  }
}