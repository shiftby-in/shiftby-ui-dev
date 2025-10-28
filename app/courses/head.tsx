export default function Head() {
  const title = 'Course Catalog | Shiftby'
  const description = 'Browse published courses by level and find the right learning path with Shiftby.'
  const url = '/courses'
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  )
}

