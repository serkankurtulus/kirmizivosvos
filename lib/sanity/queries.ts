// GROQ Queries for Sanity CMS

// Site Settings
export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;

// Hero Slides (ordered)
export const heroSlidesQuery = `*[_type == "heroSlide"] | order(order asc)`;

// Latest Album
export const latestAlbumQuery = `*[_type == "album" && isLatest == true][0]{
  ...,
  tracks[]->{...}
}`;

// All Albums (for discography)
export const albumsQuery = `*[_type == "album"] | order(order asc){
  ...,
  tracks[]->{...}
}`;

// Single Album by slug
export const albumBySlugQuery = `*[_type == "album" && slug.current == $slug][0]{
  ...,
  tracks[]->{...}
}`;

// Band Members (ordered)
export const bandMembersQuery = `*[_type == "bandMember"] | order(order asc)`;

// Active Tours (sorted by date)
export const toursQuery = `*[_type == "tour" && isActive == true] | order(date asc)`;

// Gallery Images (ordered)
export const galleryImagesQuery = `*[_type == "galleryImage"] | order(order asc)`;

// News Posts (recent first)
export const newsPostsQuery = `*[_type == "newsPost"] | order(date desc)`;

// Single News Post by slug
export const newsPostBySlugQuery = `*[_type == "newsPost" && slug.current == $slug][0]`;

// Page Content (singleton)
export const pageContentQuery = `*[_type == "pageContent"][0]`;

// Combined home page query (efficient single query)
export const homePageQuery = `{
  "siteSettings": *[_type == "siteSettings"][0],
  "heroSlides": *[_type == "heroSlide"] | order(order asc),
  "latestAlbum": *[_type == "album" && isLatest == true][0]{
    ...,
    tracks[]->{...}
  },
  "albums": *[_type == "album"] | order(order asc)[0...4],
  "bandMembers": *[_type == "bandMember"] | order(order asc),
  "tours": *[_type == "tour" && isActive == true] | order(date asc),
  "galleryImages": *[_type == "galleryImage"] | order(order asc)[0...9],
  "newsPosts": *[_type == "newsPost"] | order(date desc)[0...2],
  "pageContent": *[_type == "pageContent"][0]
}`;
