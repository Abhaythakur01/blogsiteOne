import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: import.meta.env.PROD,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Fetch all blog posts
export async function getPosts() {
  return sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage,
      "author": author->{
        name,
        image
      },
      "categories": categories[]->{
        title,
        slug
      }
    }
  `);
}

// Fetch single post by slug
export async function getPost(slug: string) {
  return sanityClient.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      body,
      publishedAt,
      mainImage,
      "author": author->{
        name,
        image,
        bio
      },
      "categories": categories[]->{
        title,
        slug
      }
    }
  `,
    { slug }
  );
}

// Fetch all categories
export async function getCategories() {
  return sanityClient.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description
    }
  `);
}

// Fetch posts by category
export async function getPostsByCategory(categorySlug: string) {
  return sanityClient.fetch(
    `
    *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage,
      "author": author->{
        name,
        image
      },
      "categories": categories[]->{
        title,
        slug
      }
    }
  `,
    { categorySlug }
  );
}

// Fetch all authors
export async function getAuthors() {
  return sanityClient.fetch(`
    *[_type == "author"] | order(name asc) {
      _id,
      name,
      slug,
      image,
      bio
    }
  `);
}

// Fetch author by slug
export async function getAuthor(slug: string) {
  return sanityClient.fetch(
    `
    *[_type == "author" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      image,
      bio
    }
  `,
    { slug }
  );
}

// Fetch posts by author
export async function getPostsByAuthor(authorSlug: string) {
  return sanityClient.fetch(
    `
    *[_type == "post" && author->slug.current == $authorSlug] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage,
      "author": author->{
        name,
        image
      },
      "categories": categories[]->{
        title,
        slug
      }
    }
  `,
    { authorSlug }
  );
}
