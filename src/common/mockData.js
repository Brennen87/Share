// TODO REMOVE ONCE BACKEND SYNCED

export const mockResourceData = {
  list: [
    {
      id: 0,
      date: 'Dec 22, 2019 ',
      title: 'Docker Enterprise Customer eBook',
      describe:
        'Digital transformation is one of the top priorities for CIOs and CEOs today. According to a 2018 Gartner survey.Digital transformation is one of the',
      tag: 'some tag'
    },
    {
      id: 1,
      date: 'Dec 22, 2019 ',
      title: 'Docker Enterprise Customer eBook',
      describe:
        'Digital transformation is one of the top priorities for CIOs and CEOs today. According to a 2018 Gartner survey.Digital transformation is one of the',
      tag: 'some tag'
    },
    {
      id: 2,
      date: 'Dec 22, 2019 ',
      title: 'Docker Enterprise Customer eBook',
      describe:
        'Digital transformation is one of the top priorities for CIOs and CEOs today. According to a 2018 Gartner survey.Digital transformation is one of the',
      tag: 'some tag'
    },
    {
      id: 3,
      date: 'Dec 22, 2019 ',
      title: 'Docker Enterprise Customer eBook',
      describe:
        'Digital transformation is one of the top priorities for CIOs and CEOs today. According to a 2018 Gartner survey.Digital transformation is one of the',
      tag: 'some tag'
    }
  ],
  categories: [
    { value: 0, label: 'All' },
    { value: 1, label: 'Editing' },
    { value: 2, label: 'Writing/Ghostwriting' },
    { value: 4, label: 'Plotting/Structure' },
    { value: 5, label: 'Legal' },
    { value: 6, label: 'Tools' }
  ]
};

export const mockDataPaymets = [
  {
    id: 0,
    name: 'Brooklyn Cooper',
    project: 2,
    grosspayment: '$100.00',
    servicefee: '$16.00',
    adjustments: '$0.00',
    totalpaid: '$0.00'
  },
  {
    id: 1,
    name: 'Arlene Lane',
    project: 2,
    grosspayment: '$200.00',
    servicefee: '$32.00',
    adjustments: '$0.00',
    totalpaid: '$168.00'
  },
  {
    id: 2,
    name: 'Juanita Wilson',
    project: 1,
    grosspayment: '$100.00',
    servicefee: '$16.00',
    adjustments: '$0.00',
    totalpaid: '$0.00'
  },
  {
    id: 3,
    name: 'Johnny Watson',
    project: 2,
    grosspayment: '$100.00',
    servicefee: '$16.00',
    adjustments: '$0.00',
    totalpaid: '$0.00'
  }
];

export const randomInt = (min, max) => Math.floor(Math.random() * max) + min;
