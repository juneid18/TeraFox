export default function sitemap() {
  return [
    {
      url: 'https://tera-7nswb2jpi-juneid18s-projects.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://tera-7nswb2jpi-juneid18s-projects.vercel.app/movies',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://tera-7nswb2jpi-juneid18s-projects.vercel.app/genres',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
