export const useSizeBanner = (width: number): number => {
  let output: number = width

  if (width > 575) output = 920
  else if (width < 576) output = 720

  return output
}