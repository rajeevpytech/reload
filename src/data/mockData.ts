import { Product, CategoryItem, InstagramLook, OrderRecord } from '../types';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'shirt',
    name: 'Shirt',
    slug: 'shirt',
    storyImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2fnovcEbTrvUexaR6MZkE4i0FUHBauxc01tEU1EDN1QLfIZQmqFiJ193Hi_9wWls8mT062ZH9fxzN0vmUiEKgmdytd8FniyUMXqjUl2aw7V2v9pvOtm5o0MiduXmewZLkOHFKNEU_WO9Yj5SAiIOQXqO-zXfYO9gqyUpgMG9P3FMz4WrJ83kboyms_jYxGoGllYyyWbG71RHzMtzU98izWo122_v6oBHSCHUwfXNJlYSC8_nX9w7x',
    tileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo4uK8EbYRM1nzE4fd-bNgyNeK4KGMq49KdqHIowPKdxETfiHE-NkbiigsgyXk52sDgrV_nNDPv3TcTPpFmezDC4wekM9BO5wdpZxZf2JHCnUiZlhHOr3ZjnbT9c7X9AITA7Ve7ZEW3Sty_w20juMUYZ_y_SWO-QlHQ_2XLkYw5FKWJF2iBb4QbufzAw9Dffz6upUcscmwtyCHCd_lf92tLE_FDkR2hh0m1_oOdrdcDzzzfmZihVId',
    itemCount: 42,
    tagline: 'Tailored silhouettes & luxury cotton blends'
  },
  {
    id: 'tshirt',
    name: 'T-Shirt',
    slug: 'tshirt',
    storyImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkXTpqgjcX4Qjo7Iq_FEUMYNm8Wjv004BAPO-n-u4K1hqXT551IbRRDkOvLejZbIFGTAkWSzPYnGhyWQn7L-yooq_cEUHO3fA5XNJJZF1a0QilX0qgdnrFW385hKj9U5oI3g9mho2gR9xebmDPh2lhnf6SSZadCFdSRgpzRHB0zMzqokREBruRo6YkmvrXK1EgWhbeQsd69Il5auZfxm-n5w07BGj4t5m8WO69kP8e3uuJrHdZlxDV',
    tileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzEtkxdddAVoTEFwri3S8xz7v7GDJN45Vr5kpOVyQBfxogoWCcPmXcx333jdTZoIIVHKWQJsxfm7R-VCifvjQhFCbYa_8PK9nN87q78muz6uHUsxZoyelRK9eJCWGwUGokh9ecgpCma-aYfoRE_mT7g0pGSBFgQqVtw2Zh2JHx6Z6aoXA1Ylw0LXVD7Pa6Aba6O_gfvxS0BGokP05eqeUgIG4WmCb-KZRScRaIrKOikB-AumXSbkMt',
    itemCount: 58,
    tagline: 'Heavyweight organic cotton & drop-shoulder fits'
  },
  {
    id: 'pants',
    name: 'Pants',
    slug: 'pants',
    storyImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBoscs2a3OKkoxb4Fh42LDx4Qi6088CJecFMGLniYwUm1rJgmnskZS_UlBJ7KyWYIJjpPs-D7KyHxRhopqDQ-eiYyID-gaeCKGMSGfCwXw7WzIwhJSB-6XyqzQBW-gJ2AbQYvMK4bJMrVZjl7Gn5Pqk6F2evfjLGkuvXiXcgLAUgyzIDxsF2VdVx_je7kMnYCuT190xvHtE3EZE_N4sybZy2KO5gK1xDCcTKxnQL-cHXmLelLPdIUB',
    tileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArzF45XwUIk_YFuJ4nJTe14jCSXvLaqcOBtocsM01bR1MsalgxS4zJodju-N7ze82CCNX-71S1tAbc22dEUHL2xCK-si61h6lmZ5TrMr18cL0ziTRVWsgnW54mT5O4qDfxDMRFVNUWdfrqQFdkZg1P8KOPcS7nzLrMSbojEK4HpH4Rv1YlBCRbsTrB8DLx3bF_85QIiQcNKd9pA67UG7lX5xMNvH7LmGFR2Fgz9Ll3HLW6g2YBCyMI',
    itemCount: 36,
    tagline: 'Tailored trousers, pleats & relaxed cargos'
  },
  {
    id: 'kurta',
    name: 'Kurta',
    slug: 'kurta',
    storyImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMnEt3UwnoB9UIJ42TDPUrUaltSa2Az_fhs3RFx2IE5gpzmKFJ6UhJksfEvrQpVFppkUZcU1zwGFeTggjNU5epj7dlpZV0DrBTa0_OTeO0dpr0muGgh2pqbUT7Ps2M76hjaq6UHUzOf6w_YQCr0iKArW1r-ndZMQ5bHzwICM5SJfIMUMdM58EXLTtSf4IJE_297c-enwWaPk0GwR9OQgZcSB6SHZJohRQXag-xMzXvDLHOuWg3DqiX',
    tileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfnHEhMJsHgnwyKn_GLcfwYgaDrCUcIqThemyoBQoCgrISqkPEFa_LojxNghHULAndQLQMXmFFHVsND3U-U5jRw7JvCE0F10S6DeS1oDm6Z7VyYf6nOz5x9b1Vn2ldl1LYcHdmuU53UpuH5H4h-0Hetb6PJ5NVtSSs39sywUlJ_dUP1oe7uyV6dfegNpDde_qu1Pb2nAV4RrE54yY48j6-Vi__d2CzMc5cqd5VXE7oPdvh_y5MbhaU',
    itemCount: 29,
    tagline: 'Heritage craftsmanship with contemporary cuts'
  },
  {
    id: 'tracksuit',
    name: 'Tracksuit',
    slug: 'tracksuit',
    storyImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZyP-ZYgp80flo6kwd1t5XLDrVNkKjAUNj9A7OZsvND3AqUXgz3WHtVP3NGTPFlV1OFWuglqgg0takBpMtofF7GMY1MCQwPYlXHfriEi_RGj4NzGoXaBabl0WiJePI-YaP_4idmL_81sWGgGOYZxMan-VpFftfEFtnA69EL7uSIpOh6R2iDCSL8kI5upyjnUeVe5ZfmEqvzrxEFIV6nE29hFFs5FfxsWHW0kwkCscbnj0tUXHS7ivQ',
    tileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHnjZ_lP5yP0kbXLTMN3vTcAlFbwXE_c6L5FFUDz3jDFGXzWM9Mr5zbyrJ4ksJcLJdJo7RsT7Era6cgAR07kmqCCXOy1pVGyaFtwPneWqYHhetvbsCE3h_qemGUh45WSvzCh2kd6ZNQxM4RY7-_M1FTXg2CsGg7QTrDH6cHG-7sk8fBxT-lcCsYBCxPAkGcPVSJClnYc1ymc6l7NuuYnuaKcJ_LNsSBuKabRO4jfxTaC0qrxIfjBFP',
    itemCount: 18,
    tagline: 'Elevated athleisure & refined street co-ords'
  },
  {
    id: 'hoodie',
    name: 'Hoodie',
    slug: 'hoodie',
    storyImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmXd5Oxbn2jUPeuqp9oTJf4cfyw7KaHdb4hWIQrRMD9mQ6IzBSdQzdNuPKX0wmLn2i5BiLxttyoG-7CRtkLMAYaJMiRokM4Im2xaxb9lBMFsalfGi8GjRKGbNfkeqCtQiP4--58oDQw5tqDd3klePbfeqcXblq0DP1-tZXlKtsCpxur2eqkbQ25UxwpfnN1IwVjQ-eCLEAPYZcqoAuKFXkzQmogXMOjmA-C8QfckWaLc7i9w17fCr-',
    tileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNI_p8mSJx5DPWY66msMwICoPG_s7jgr8F7VBa2ewkHlV4IJ9nfmeUFhZbYZxixrftMZY4-xuheYuqAYVYFwdYjWmJX9MvecXjayd5CiyOQypK5Qg6Q7nvDosoAEuVxmNts2ag65KKqfX7JI4BqKRqv1NjyhUduS19SFPpHn9VybnFAiFDeR9WEtBQLfPz7czTnQHlqn9D2XS1ArdJ0l1V7Y91L9d5_xAgOmR6OTWWSPUf_7hfS4w6',
    itemCount: 24,
    tagline: 'Heavy french terry & minimal branding'
  },
  {
    id: 'jacket',
    name: 'Jacket',
    slug: 'jacket',
    storyImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXEJsIklhNezUOeV6AzY4N595A9Mw8cPRMArzsq6BAh1UGOcouQ2QTuFr3kVOblTHoAISwyL4t7peMITd4803RGeOaJwZzbFpNHCexxa7Lbu1TotbblOuiXcBuebrkkobPRabULc6eVw0n74_3n8Q3DVyeXkIMLF_T5udEPgS0eM9sCqosoqRyYoTiuPZlaAKo4QNICE_58vEGthESFdknGIgupmLVDE31obikUdQYL7OgnhA9GJWx',
    tileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArWk7XkgTm5zTlatFm5uQ1pXoByaEed5b-lCbUzoaBdeqwtA2wre5SvQ5hr8Rh7jKXLM6BoP7erdzkj4ClLN6rNoPH-5RgU-cgMojvNAH0-5Cu-kc6kLmJ4Bf0qA9U-dD2p3TK3qiB92BbJTcVdBOXJyqKz1e6jXltkTTlLE5__WJGYSaO8AtQMwcIFKjdDj_YDHXh6Pc_rfuEGp_AcYd6jd4fAnu9OyAZcyMjga1frD2T0oB3kX28',
    itemCount: 31,
    tagline: 'Technical puffers, overshirts & trench styles'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-tracksuit-black',
    name: 'Black Striped Tracksuit',
    category: 'tracksuit',
    categoryLabel: 'Tracksuits',
    price: 2299,
    originalPrice: 3499,
    discountPercentage: 34,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADL9EKWWrZDuII0OVZ5mb0bgwZr04SO4WnGit807Fzzb_BVkx3FjAzCa2v1AVP1U8e6ccj8i9_KRaHCSJEtdiTbSTI9dFm6g8_EFVQCGBlZUvxa2FK5wu47auVPkaDTbD0kLweGQUTZrBAFtwF8xmmSEyH244S9M7QihK_iEnz_iHu1GvblJvIMyfe1aWABmOwhl1YhauqHSc7X-Yk5gJLYrPLufm4-G9R2LAM6bl3BHthFaHNXm8G',
    additionalImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZyP-ZYgp80flo6kwd1t5XLDrVNkKjAUNj9A7OZsvND3AqUXgz3WHtVP3NGTPFlV1OFWuglqgg0takBpMtofF7GMY1MCQwPYlXHfriEi_RGj4NzGoXaBabl0WiJePI-YaP_4idmL_81sWGgGOYZxMan-VpFftfEFtnA69EL7uSIpOh6R2iDCSL8kI5upyjnUeVe5ZfmEqvzrxEFIV6nE29hFFs5FfxsWHW0kwkCscbnj0tUXHS7ivQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHnjZ_lP5yP0kbXLTMN3vTcAlFbwXE_c6L5FFUDz3jDFGXzWM9Mr5zbyrJ4ksJcLJdJo7RsT7Era6cgAR07kmqCCXOy1pVGyaFtwPneWqYHhetvbsCE3h_qemGUh45WSvzCh2kd6ZNQxM4RY7-_M1FTXg2CsGg7QTrDH6cHG-7sk8fBxT-lcCsYBCxPAkGcPVSJClnYc1ymc6l7NuuYnuaKcJ_LNsSBuKabRO4jfxTaC0qrxIfjBFP'
    ],
    description: 'Constructed from dual-knit breathable performance fabric with signature white pinstripe accents along the sleeves and pants. Includes full-zip funnel jacket and tapered sweatpants with metallic zippers.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: '85% Technical Cotton, 15% Elastane',
    fit: 'Athletic Tapered Fit',
    rating: 4.8,
    reviewsCount: 142,
    isNewArrival: true,
    isFeatured: true
  },
  {
    id: 'prod-puffer-green',
    name: 'Puffer Jacket Green',
    category: 'jacket',
    categoryLabel: 'Jackets',
    price: 2499,
    originalPrice: 3999,
    discountPercentage: 38,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvAU47N-Nw1KB3V2LawlNGkclaMnijjHlGyXo5V1boezjPCa9rgq_KQvqgZIHLeEah3kqytXtVsDwNt5pvv_eRdLLzzt1QX75JX-5fhGVqxwee2C454enqHcQGN-YGKSo7hIs2T4wFquBLKrGkNH_x505dw5UF4KcrhQOD7Wb537jDLLszoHAkYqWVi22-voAI3UV-JErfPg4rjCmD4gEhzclczvCcYsogSSqhVTZOmnXZN9NZTmhQ',
    additionalImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCXEJsIklhNezUOeV6AzY4N595A9Mw8cPRMArzsq6BAh1UGOcouQ2QTuFr3kVOblTHoAISwyL4t7peMITd4803RGeOaJwZzbFpNHCexxa7Lbu1TotbblOuiXcBuebrkkobPRabULc6eVw0n74_3n8Q3DVyeXkIMLF_T5udEPgS0eM9sCqosoqRyYoTiuPZlaAKo4QNICE_58vEGthESFdknGIgupmLVDE31obikUdQYL7OgnhA9GJWx'
    ],
    description: 'Lightweight insulation engineered for urban cold and transitional seasons. Features water-resistant micro-ripstop shell, stand collar with storm flap, and storm cuffs in a rich forest olive green.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    fabric: '100% Recycled Nylon with Thermal Fill',
    fit: 'Relaxed Bomber Silhouette',
    rating: 4.9,
    reviewsCount: 98,
    isNewArrival: true,
    isFeatured: true
  },
  {
    id: 'prod-denim-blue',
    name: 'Denim Shirt Blue',
    category: 'shirt',
    categoryLabel: 'Shirts',
    price: 1599,
    originalPrice: 2399,
    discountPercentage: 33,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd-l34W5UwV1jJEj5VpxacECPGuwqh__ueYPeWU-XP4kMEpY5PptEUf5ntOo2yr9AHSJU88yqdPcSjcK2CY2NmPsjgJh-wtymYYNwmc6LsEaZ9GnYmTlKoKiVd4MA0JvbI_lZ_yMUuOAjZlHORJ_GeXNMpIHBPjLU_OHoTE2B1dEZQjd8cmZ1LCopQHJkHTXwwfjce9V6WIJXDMNBi0l124FCSszpQiJ99RrnN0kkxKV6PSJIOv8ea',
    additionalImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2fnovcEbTrvUexaR6MZkE4i0FUHBauxc01tEU1EDN1QLfIZQmqFiJ193Hi_9wWls8mT062ZH9fxzN0vmUiEKgmdytd8FniyUMXqjUl2aw7V2v9pvOtm5o0MiduXmewZLkOHFKNEU_WO9Yj5SAiIOQXqO-zXfYO9gqyUpgMG9P3FMz4WrJ83kboyms_jYxGoGllYyyWbG71RHzMtzU98izWo122_v6oBHSCHUwfXNJlYSC8_nX9w7x'
    ],
    description: 'Classic stone-washed indigo denim overshirt with mother-of-pearl snap closures, pointed western yoke, and twin chest utility pockets.',
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '100% Ring-Spun Vintage Slub Denim',
    fit: 'Tailored Regular Fit',
    rating: 4.7,
    reviewsCount: 76,
    isNewArrival: true,
    isFeatured: false
  },
  {
    id: 'prod-kurta-set',
    name: 'Premium Kurta Set',
    category: 'kurta',
    categoryLabel: 'Kurtas',
    price: 1999,
    originalPrice: 2999,
    discountPercentage: 33,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLMEOKWBF1qJ3hFg-1yZne2HgpTXXMOe9nIP89KFnLIejrQIqJiS5uc7c4X9s06Y8VXfwZ715_V-QOv9uxf86riI2gRVR6sRfC99rHntDV4DvfIuN2pAaUIXzzuBBJc4rJVwuoPQMA8p4EsWvJI0ww6rOpkIOiKCGX9XMI3ajNXCXpDIAYIGxCYIw5YrKO8TrnBHdR2plYzyFVJpcfp9fI_01yJcSEC_FAxGwvhvKAKaUxHRDQG4gH',
    additionalImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMnEt3UwnoB9UIJ42TDPUrUaltSa2Az_fhs3RFx2IE5gpzmKFJ6UhJksfEvrQpVFppkUZcU1zwGFeTggjNU5epj7dlpZV0DrBTa0_OTeO0dpr0muGgh2pqbUT7Ps2M76hjaq6UHUzOf6w_YQCr0iKArW1r-ndZMQ5bHzwICM5SJfIMUMdM58EXLTtSf4IJE_297c-enwWaPk0GwR9OQgZcSB6SHZJohRQXag-xMzXvDLHOuWg3DqiX',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfnHEhMJsHgnwyKn_GLcfwYgaDrCUcIqThemyoBQoCgrISqkPEFa_LojxNghHULAndQLQMXmFFHVsND3U-U5jRw7JvCE0F10S6DeS1oDm6Z7VyYf6nOz5x9b1Vn2ldl1LYcHdmuU53UpuH5H4h-0Hetb6PJ5NVtSSs39sywUlJ_dUP1oe7uyV6dfegNpDde_qu1Pb2nAV4RrE54yY48j6-Vi__d2CzMc5cqd5VXE7oPdvh_y5MbhaU'
    ],
    description: 'Elevated ceremonial festive wear with intricate collar embroidery, concealed placket, and paired with tailored ivory churidar trousers.',
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    fabric: 'Raw Silk Blend with Fine Cotton Lining',
    fit: 'Contemporary Straight Fit',
    rating: 4.9,
    reviewsCount: 110,
    isNewArrival: true,
    isFeatured: true
  },
  {
    id: 'prod-formal-maroon',
    name: 'Formal Shirt Maroon',
    category: 'shirt',
    categoryLabel: 'Shirts',
    price: 1299,
    originalPrice: 1999,
    discountPercentage: 35,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYihxAeKfJDZcCJLFMZVFrxMlLk3XjlpqBx4cgGRTPH9vnRnXkCfWI2a8DXUO7Nxl5uxbK7NBVB1m8-t2LNPLKQ6QQZwl4A99vvwdJbqBvfbj5_y8wpSQeqmIaGmHNBm5qFEtvhk2HyJnXAX5Ka0quMBlLi2wXu9LRPh6dB_MVhnCsa5Xi9aV8dwYvrZtHTGllYecKKszKUAABr6EYlLdtSy-VWCjmjCPl_-nd3Wh6MwHDLnMMl8kF',
    additionalImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBsx8tcI0ha8t6u9GvDAfF7lC69XSGpijJUqSExWFy_KQK5OOzDe_6gRaRT7vIiZizreVwIJ--WScYwoCwo82bqZRMvBo3MoTG7URGu3SduxKS8VwMpFVvvaxBmu-sO2CCjISBNKDKwbj8eNIvaVH1tXM1_cOUQmmBYAk9zD5Hnjc71119RNfJ-74JLOpSqXEircAGUimurGGsZOnDXRSehX_QzPt5y3g9Pb3ZQO6KJBLX8M4MttwrG'
    ],
    description: 'Deep royal maroon spread collar formal dress shirt. Crafted from 100-ply double twisted Egyptian cotton with anti-crease finish for boardroom and evening luxury.',
    sizes: ['38', '40', '42', '44'],
    fabric: '100% Giza Cotton',
    fit: 'Slim Sharp Fit',
    rating: 4.6,
    reviewsCount: 64,
    isNewArrival: true,
    isFeatured: false
  },
  {
    id: 'prod-coord-white',
    name: 'White Co-ord Set',
    category: 'tracksuit',
    categoryLabel: 'Tracksuits',
    price: 2299,
    originalPrice: 3499,
    discountPercentage: 34,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR6tvUGGEkxEFoVgQ2wWIkAmqFQ06U7d_ny5WUBpNsbuK85vtC_hYI14jw7wFo2Xz3pAXgy4btreDXkFXAD4wowaHcVXcWGwsv0ikOOruYw5lS5YxDtCofBSfjA5QJXZidC0gbtsLvZChkukedtC2ZvLeoX4GinQCk6ePR4qPNm1c8YFQWqRrW6e1YYrgjRKBJ0t8e6SgG7l1lg5YDIUegpGuYNHrjkJFUkqVlQnVcnX8nOlzOw02Z',
    additionalImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6SZ8StMmsCVEF3kvwaxV3vA4WXPgH9YmFAQMeiNu3VZAW1XMUL8bA_nn7mGnWEGt7FGUVx7zw9B-Nj7rOzmPNGy0IWEa_a15boUMqCgmkiKZ6UFXP7GR4rT1UScLmnKeegX50CQ-9q5-PcnP88wzXR9BKsV6yRiFYiQgImPT1q6gjHAENPfyw9HXKZ4-GBFWrdouKdq2nWCrNG-pFB5ws4e5isF6zj7_X4gMw0E6Gky-j_McBBGUL'
    ],
    description: 'Monochromatic resort-wear luxury co-ord set. Includes a relaxed cuban collar half-sleeve overshirt and matching drawstring pleated wide-leg trousers in optic white.',
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'French Linen & Slub Viscose Blend',
    fit: 'Relaxed Resort Silhouette',
    rating: 4.8,
    reviewsCount: 88,
    isNewArrival: true,
    isFeatured: true
  },
  {
    id: 'prod-timeless-oxford',
    name: 'Timeless Oxford Shirt & Chino Kit',
    category: 'shirt',
    categoryLabel: 'Shirts',
    price: 2799,
    originalPrice: 4199,
    discountPercentage: 33,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsx8tcI0ha8t6u9GvDAfF7lC69XSGpijJUqSExWFy_KQK5OOzDe_6gRaRT7vIiZizreVwIJ--WScYwoCwo82bqZRMvBo3MoTG7URGu3SduxKS8VwMpFVvvaxBmu-sO2CCjISBNKDKwbj8eNIvaVH1tXM1_cOUQmmBYAk9zD5Hnjc71119RNfJ-74JLOpSqXEircAGUimurGGsZOnDXRSehX_QzPt5y3g9Pb3ZQO6KJBLX8M4MttwrG',
    description: 'As featured in Timeless Classics editorial. Rich wine red twill woven button-down shirt paired with tailored sand beige slim chinos.',
    sizes: ['M', 'L', 'XL'],
    fabric: 'Washed Twill Cotton',
    fit: 'Modern Tailored',
    rating: 4.9,
    reviewsCount: 115,
    isNewArrival: false,
    isFeatured: true
  },
  {
    id: 'prod-comfort-hoodie',
    name: 'California Streetwear Graphic Hoodie',
    category: 'hoodie',
    categoryLabel: 'Hoodies',
    price: 1899,
    originalPrice: 2899,
    discountPercentage: 34,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNI_p8mSJx5DPWY66msMwICoPG_s7jgr8F7VBa2ewkHlV4IJ9nfmeUFhZbYZxixrftMZY4-xuheYuqAYVYFwdYjWmJX9MvecXjayd5CiyOQypK5Qg6Q7nvDosoAEuVxmNts2ag65KKqfX7JI4BqKRqv1NjyhUduS19SFPpHn9VybnFAiFDeR9WEtBQLfPz7czTnQHlqn9D2XS1ArdJ0l1V7Y91L9d5_xAgOmR6OTWWSPUf_7hfS4w6',
    description: 'Heavyweight 450 GSM fleece hoodie with washed distress finish, custom California Venice Beach varsity typography, and kangaroo pocket.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: '100% Combed Heavy Cotton Fleece',
    fit: 'Oversized Boxy Fit',
    rating: 4.8,
    reviewsCount: 167,
    isNewArrival: false,
    isFeatured: true
  },
  {
    id: 'prod-cargo-olive',
    name: 'Tactical Wide-Leg Cargo Pants',
    category: 'pants',
    categoryLabel: 'Pants',
    price: 1899,
    originalPrice: 2799,
    discountPercentage: 32,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBoscs2a3OKkoxb4Fh42LDx4Qi6088CJecFMGLniYwUm1rJgmnskZS_UlBJ7KyWYIJjpPs-D7KyHxRhopqDQ-eiYyID-gaeCKGMSGfCwXw7WzIwhJSB-6XyqzQBW-gJ2AbQYvMK4bJMrVZjl7Gn5Pqk6F2evfjLGkuvXiXcgLAUgyzIDxsF2VdVx_je7kMnYCuT190xvHtE3EZE_N4sybZy2KO5gK1xDCcTKxnQL-cHXmLelLPdIUB',
    description: 'Engineered with 6 bellows pockets, toggle cinch cuffs at hem, and reinforced knee articulators. Built for versatile city movement.',
    sizes: ['30', '32', '34', '36'],
    fabric: '100% Cotton Ripstop Weave',
    fit: 'Relaxed Wide Straight',
    rating: 4.7,
    reviewsCount: 52,
    isNewArrival: false,
    isFeatured: false
  },
  {
    id: 'prod-graphic-tee-slate',
    name: 'Vintage Acid Wash Graphic T-Shirt',
    category: 'tshirt',
    categoryLabel: 'T-Shirts',
    price: 999,
    originalPrice: 1599,
    discountPercentage: 37,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkXTpqgjcX4Qjo7Iq_FEUMYNm8Wjv004BAPO-n-u4K1hqXT551IbRRDkOvLejZbIFGTAkWSzPYnGhyWQn7L-yooq_cEUHO3fA5XNJJZF1a0QilX0qgdnrFW385hKj9U5oI3g9mho2gR9xebmDPh2lhnf6SSZadCFdSRgpzRHB0zMzqokREBruRo6YkmvrXK1EgWhbeQsd69Il5auZfxm-n5w07BGj4t5m8WO69kP8e3uuJrHdZlxDV',
    description: 'Hand-dyed mineral wash finish with cracked vintage streetwear screenprint on the chest and back. Thick ribbed collar that retains shape.',
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '240 GSM Organic Cotton',
    fit: 'Drop-Shoulder Boxy Fit',
    rating: 4.6,
    reviewsCount: 89,
    isNewArrival: false,
    isFeatured: false
  }
];

export const INSTAGRAM_LOOKS: InstagramLook[] = [
  {
    id: 'look-1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD4Ka7vgZprTvE-Hf79KeNM4qI8vatyFopvrVNAiO2scM7Kpiv4DzmAd5dQt4ZT0RM78mgsm9iPMqLP9eO1jsCjWUzu-6xZKAE8rprN5604RxMGvOJoejKyP0aIx2V9VY1sVATt1af3jP8HtSlvCH3epTEabgWQTEeAZg8XqwwR5_ug8TxjHTZbwtXhCI_Nlotl1MaYyuljLN8WkKaWDILLxKvs8u2bl9U2x17x1HkNHboJv6sxD-y',
    likes: 1420,
    tag: '#ReloadStreetStyle'
  },
  {
    id: 'look-2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ48i7IAlAx9TeZKjs84QJXlHzKPwFUzcmFti0fodq9rLPykJnE4bmK96mCKP1adlfloCjAtRaXgpslmcEYycy0U5E-xr1IiQJ7_7dkUdnWBPdTSNJ4KFu8tZrUqQB9fRYC8edpeFZSeWmcZ9Ja0bqxwXNcOEzwjuHizAVA0XsVHUF7TFb_TCENAE0Ajr9ghu8o9h2SlPaqQHNfmmsx7GOAsC9qadWxewzJV7ukCaTCSxbwLAavojD',
    likes: 2180,
    tag: '#ReloadElegance'
  },
  {
    id: 'look-3',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw6qv7Bs_9XjMbcDT9PohgiCg3uMuaOzA85gRaVPfPW53Jb2g0djg9jzTkyp-tA5NajNpbpe2NjBSA58jS9ceEoyoDvBBh3LQFMArbCtmtfBnKY0bMu1x4gp54F9dL-I2m9uGMGc1T_YGtgb3hM4FzWnVFKwIUGj7BRJWWA4sCQBJwq54ICjG1crFwlXoyg0ePVRnZT4dx3rD_WH4a5P3fZJkqX_q6fL4mmuJb9Q9VPkfNdiGBjayn',
    likes: 980,
    tag: '#CasualComfort'
  },
  {
    id: 'look-4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqu7iq4gABPVC0QRFLsxBtNZSl6gdQw6xpxZubVWkMUNF92PQUsR3-_SXpGt7vEOEto3ndlJP14j5I-JZmXOgjvnoNdBhboMlE7XUcsHFlJCl-l0mvxDY2u9MHucYFEPFP6RfKl38XIeWXBSQdcmZavIqvnLPeOTXl97BdkAaGbf0mdSD1e4s7GCxIxnOqTsIYoJkJE5Of4qdu3W1642PNXnrH7en-1iZAcKP9BJfD2rXN0LVrzI7_',
    likes: 3120,
    tag: '#AutumnTransit'
  },
  {
    id: 'look-5',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADTEkQ8TI_1gU-RcSXnNQvv-fXUbUhFPUWMryzfVas_P0gGYuWoVyA9J--Zz4sApxSynBxzjCUIWNCNUenjchKeDavunux4WPiUECLYMymqk6tzz2E2bsDb9zCsHCr_wbCHS7jBr4Dj11xEHnTiJ5-zYEf9ZVLLYK7wT_0wIdF17WGVu_Hbx79bCpzvBm3trdg1NPcuqs6JX3nC7tn_QGecMHeM-Gf3ruQHAJm5mHBjYYb7IxRrZUm',
    likes: 1845,
    tag: '#ReloadLuxury'
  }
];

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'ORD-89211',
    date: '14 Sep 2026',
    items: [
      {
        name: 'Denim Shirt Blue',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd-l34W5UwV1jJEj5VpxacECPGuwqh__ueYPeWU-XP4kMEpY5PptEUf5ntOo2yr9AHSJU88yqdPcSjcK2CY2NmPsjgJh-wtymYYNwmc6LsEaZ9GnYmTlKoKiVd4MA0JvbI_lZ_yMUuOAjZlHORJ_GeXNMpIHBPjLU_OHoTE2B1dEZQjd8cmZ1LCopQHJkHTXwwfjce9V6WIJXDMNBi0l124FCSszpQiJ99RrnN0kkxKV6PSJIOv8ea',
        size: 'L',
        quantity: 1,
        price: 1599
      }
    ],
    totalAmount: 1599,
    status: 'In Transit',
    estimatedDelivery: 'Arriving Tomorrow by 8 PM'
  },
  {
    id: 'ORD-76430',
    date: '28 Aug 2026',
    items: [
      {
        name: 'Formal Shirt Maroon',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYihxAeKfJDZcCJLFMZVFrxMlLk3XjlpqBx4cgGRTPH9vnRnXkCfWI2a8DXUO7Nxl5uxbK7NBVB1m8-t2LNPLKQ6QQZwl4A99vvwdJbqBvfbj5_y8wpSQeqmIaGmHNBm5qFEtvhk2HyJnXAX5Ka0quMBlLi2wXu9LRPh6dB_MVhnCsa5Xi9aV8dwYvrZtHTGllYecKKszKUAABr6EYlLdtSy-VWCjmjCPl_-nd3Wh6MwHDLnMMl8kF',
        size: '40 (M)',
        quantity: 1,
        price: 1299
      }
    ],
    totalAmount: 1299,
    status: 'Delivered',
    estimatedDelivery: 'Delivered on 31 Aug 2026'
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    subheading: 'NEW ARRIVALS',
    titleMain: 'SUMMER',
    titleHighlight: 'COLLECTION',
    description: 'Effortless style. Everyday confidence.',
    cta: 'SHOP NOW',
    linkCategory: 'kurta',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6SZ8StMmsCVEF3kvwaxV3vA4WXPgH9YmFAQMeiNu3VZAW1XMUL8bA_nn7mGnWEGt7FGUVx7zw9B-Nj7rOzmPNGy0IWEa_a15boUMqCgmkiKZ6UFXP7GR4rT1UScLmnKeegX50CQ-9q5-PcnP88wzXR9BKsV6yRiFYiQgImPT1q6gjHAENPfyw9HXKZ4-GBFWrdouKdq2nWCrNG-pFB5ws4e5isF6zj7_X4gMw0E6Gky-j_McBBGUL'
  },
  {
    id: 2,
    subheading: 'EXCLUSIVE RELEASE',
    titleMain: 'MODERN',
    titleHighlight: 'STREETWEAR',
    description: 'Urban tailoring redefined for everyday ease.',
    cta: 'EXPLORE TRACKSUITS',
    linkCategory: 'tracksuit',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZyP-ZYgp80flo6kwd1t5XLDrVNkKjAUNj9A7OZsvND3AqUXgz3WHtVP3NGTPFlV1OFWuglqgg0takBpMtofF7GMY1MCQwPYlXHfriEi_RGj4NzGoXaBabl0WiJePI-YaP_4idmL_81sWGgGOYZxMan-VpFftfEFtnA69EL7uSIpOh6R2iDCSL8kI5upyjnUeVe5ZfmEqvzrxEFIV6nE29hFFs5FfxsWHW0kwkCscbnj0tUXHS7ivQ'
  },
  {
    id: 3,
    subheading: 'LIMITED EDITION',
    titleMain: 'ROYAL',
    titleHighlight: 'OCCASION WEAR',
    description: 'Festive craft reimagined with sharp western drape.',
    cta: 'DISCOVER KURTAS',
    linkCategory: 'kurta',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMnEt3UwnoB9UIJ42TDPUrUaltSa2Az_fhs3RFx2IE5gpzmKFJ6UhJksfEvrQpVFppkUZcU1zwGFeTggjNU5epj7dlpZV0DrBTa0_OTeO0dpr0muGgh2pqbUT7Ps2M76hjaq6UHUzOf6w_YQCr0iKArW1r-ndZMQ5bHzwICM5SJfIMUMdM58EXLTtSf4IJE_297c-enwWaPk0GwR9OQgZcSB6SHZJohRQXag-xMzXvDLHOuWg3DqiX'
  }
];
