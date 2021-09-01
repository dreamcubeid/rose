export const useSizeBanner = (width: number): number => {
  let output: number = width

  // [540, 720, 900, 1080, 1296, 1512, 1728, 1944, 2048]

  if (width > 1920) output = 2560
  else if (width > 1199 && width < 1920) output = 1920
  else if (width > 991 && width < 1200) output = 1296
  else if (width > 767 && width < 992) output = 1080
  else if (width > 575 && width < 768) output = 900
  else if (width > 479 && width < 576) output = 720
  else if (width < 480) output = 540

  return output
}