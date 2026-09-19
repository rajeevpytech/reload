import { Review } from '../types';

export const INITIAL_REVIEWS: Record<string, Review[]> = {
  'prod-tracksuit-black': [
    {
      id: 'rev-1',
      author: 'Vikramaditya S.',
      rating: 5,
      date: '12 Sep 2026',
      comment: 'Exceptional heavy cotton blend. The white piping and funnel neck give a very tailored luxury streetwear aesthetic. Fits impeccably.',
      verifiedBuyer: true
    },
    {
      id: 'rev-2',
      author: 'Karan Mehra',
      rating: 5,
      date: '28 Aug 2026',
      comment: 'Quality rivaling European luxury houses. Zippers are smooth and heavy-duty. Highly recommended for travel.',
      verifiedBuyer: true
    }
  ],
  'prod-puffer-green': [
    {
      id: 'rev-3',
      author: 'Arjun K.',
      rating: 5,
      date: '02 Sep 2026',
      comment: 'The olive tone is rich and subtle in natural light. Keeps very warm without feeling bulky.',
      verifiedBuyer: true
    }
  ],
  'prod-denim-blue': [
    {
      id: 'rev-4',
      author: 'Rohit Verma',
      rating: 5,
      date: '05 Sep 2026',
      comment: 'Authentic stone wash drape with genuine pearl snap buttons. Perfect over a white tank or tee.',
      verifiedBuyer: true
    }
  ],
  'prod-kurta-set': [
    {
      id: 'rev-5',
      author: 'Ananya & Sahil G.',
      rating: 5,
      date: '10 Sep 2026',
      comment: 'Wore this for an engagement evening in Udaipur. Received endless compliments. The collar embroidery is magnificent.',
      verifiedBuyer: true
    }
  ]
};
