export interface Donation {
  id: string;
  title: string;
  imageUrl: string;
  categoryId: string;
  description: string;
  donor: string;
  postedDate: string;
}

export const MOCK_DONATIONS: Donation[] = [
  {
    id: '1',
    title: 'Leather Sofa',
    imageUrl: 'https://picsum.photos/seed/sofa/400/300',
    categoryId: 'furniture',
    description: 'Gently used 3-seater leather sofa in great condition. No tears or stains. Pick-up only.',
    donor: 'Maria S.',
    postedDate: '2026-04-05',
  },
  {
    id: '2',
    title: 'Winter Jacket (M)',
    imageUrl: 'https://picsum.photos/seed/jacket/400/300',
    categoryId: 'clothing',
    description: 'Warm winter jacket, size medium. Worn only one season. Perfect for cold weather.',
    donor: 'James T.',
    postedDate: '2026-04-06',
  },
  {
    id: '3',
    title: 'KitchenAid Stand Mixer',
    imageUrl: 'https://picsum.photos/seed/mixer/400/300',
    categoryId: 'kitchen',
    description: 'KitchenAid stand mixer, 5 qt. All attachments included. Works perfectly.',
    donor: 'Priya R.',
    postedDate: '2026-04-04',
  },
  {
    id: '4',
    title: 'All-Purpose Cleaner Set',
    imageUrl: 'https://picsum.photos/seed/cleaner/400/300',
    categoryId: 'cleaning',
    description: 'Bundle of unopened cleaning supplies — spray bottles, wipes, and detergent.',
    donor: 'Carlos M.',
    postedDate: '2026-04-07',
  },
  {
    id: '5',
    title: 'Wooden Bookshelf',
    imageUrl: 'https://picsum.photos/seed/bookshelf/400/300',
    categoryId: 'furniture',
    description: 'Solid wood 5-shelf bookcase. Minor scratches on the side, otherwise solid.',
    donor: 'Anna K.',
    postedDate: '2026-04-03',
  },
  {
    id: '6',
    title: 'Kids\' Clothes Bundle',
    imageUrl: 'https://picsum.photos/seed/kidclothes/400/300',
    categoryId: 'clothing',
    description: 'Assorted kids clothes, ages 4–6. Mix of shirts, pants, and light jackets.',
    donor: 'Lin W.',
    postedDate: '2026-04-06',
  },
  {
    id: '7',
    title: 'Cast Iron Skillet',
    imageUrl: 'https://picsum.photos/seed/skillet/400/300',
    categoryId: 'kitchen',
    description: 'Well-seasoned 12-inch cast iron skillet. Ready to use, just needs a rinse.',
    donor: 'Robert H.',
    postedDate: '2026-04-05',
  },
  {
    id: '8',
    title: 'Vacuum Cleaner',
    imageUrl: 'https://picsum.photos/seed/vacuum/400/300',
    categoryId: 'cleaning',
    description: 'Dyson V7 cordless vacuum. Works great. Includes all heads and charger.',
    donor: 'Sofia B.',
    postedDate: '2026-04-04',
  },
  {
    id: '9',
    title: 'Coffee Table',
    imageUrl: 'https://picsum.photos/seed/coffeetable/400/300',
    categoryId: 'furniture',
    description: 'Modern walnut coffee table, 48"x24". Light use, no damage.',
    donor: 'David N.',
    postedDate: '2026-04-07',
  },
];
