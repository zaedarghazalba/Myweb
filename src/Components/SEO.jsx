import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Component for managing meta tags dynamically
 * @param {Object} props - SEO properties
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - SEO keywords
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.type - Page type (website, article, profile)
 */
const SEO = ({
  title = "Zaedar Ghazalba - Junior Programmer & Web Developer",
  description = "Portfolio Zaedar Ghazalba - Junior Programmer specializing in Web & Mobile Development, QA Testing, and Graphic Design. Experienced in React, Laravel, Kotlin, and Python.",
  keywords = "Zaedar Ghazalba, Junior Programmer, Web Developer, Mobile Developer, QA Tester, Graphic Designer, React Developer, Laravel Developer, Portfolio Indonesia",
  ogImage = `${window.location.origin}/logo512.png`,
  type = "website",
  author = "Zaedar Ghazalba"
}) => {
  const location = useLocation();
  const url = window.location.origin + location.pathname;
  const fullTitle = title.includes('Zaedar Ghazalba') ? title : `${title} | Zaedar Ghazalba`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Remove existing meta tags
    const metaTags = [
      'description',
      'keywords',
      'author',
      'og:title',
      'og:description',
      'og:image',
      'og:url',
      'og:type',
      'og:site_name',
      'twitter:card',
      'twitter:title',
      'twitter:description',
      'twitter:image',
      'twitter:creator'
    ];

    metaTags.forEach(name => {
      const existing = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (existing) {
        existing.remove();
      }
    });

    // Create and append new meta tags
    const metaData = [
      // Basic meta tags
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: author },

      // Open Graph tags
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'Zaedar Ghazalba Portfolio' },

      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:creator', content: '@zeedargh' }
    ];

    metaData.forEach(({ name, property, content }) => {
      const meta = document.createElement('meta');
      if (name) meta.setAttribute('name', name);
      if (property) meta.setAttribute('property', property);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    });

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Add structured data (JSON-LD)
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Zaedar Ghazalba",
      "url": window.location.origin,
      "image": ogImage,
      "sameAs": [
        "https://github.com/zaedarghazalba",
        "https://www.linkedin.com/in/zaedar-ghazalba-908aa3275/",
        "https://instagram.com/zeedargh"
      ],
      "jobTitle": "Junior Programmer",
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      },
      "alumniOf": "Indonesia",
      "email": "zaedaralba11202@gmail.com",
      "description": description,
      "knowsAbout": [
        "Web Development",
        "Mobile Development",
        "QA Testing",
        "Graphic Design",
        "React",
        "Laravel",
        "Kotlin",
        "Python",
        "JavaScript"
      ]
    };

    scriptTag.textContent = JSON.stringify(structuredData);
  }, [title, description, keywords, ogImage, type, author, url, fullTitle]);

  return null;
};

export default SEO;
