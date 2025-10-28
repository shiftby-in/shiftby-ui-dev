export default function Head() {
  const title = 'About Shiftby Training'
  const description = 'Learn about Shiftby Training—our mission, vision, and values driving accessible, practical learning.'
  const url = '/about-us'
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

