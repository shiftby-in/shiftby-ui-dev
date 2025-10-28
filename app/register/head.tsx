export default function Head() {
  const title = 'Register for Courses | Shiftby'
  const description = 'Register for Shiftby courses. Provide your details and choose a course to get started.'
  const url = '/register'
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

