export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-27";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const token = process.env.SANITY_WRITE_TOKEN;

function assertValue(undefined, errorMessage) {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
