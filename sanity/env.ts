export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-20'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || (() => {
    console.warn('Environment variable NEXT_PUBLIC_SANITY_DATASET is not set, using default "production"');
    return 'production';
  })()

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || (() => {
    console.warn('Environment variable NEXT_PUBLIC_SANITY_PROJECT_ID is not set, using default "demo"');
    return 'demo';
  })()

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
