export default {
  locale: 'en',

  dateTimeFormats: {
    en: {
      date: {
        year: 'numeric', month: 'numeric', day: 'numeric'
      },
      datelong: {
        year: 'numeric', month: 'long', day: 'numeric'
      },
      datetime: {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', hour12: false,
      },
      time: {
        hour: 'numeric', minute: 'numeric', second: 'numeric'
      },
    },
  },

  messages: {
    en: {
      place_type: {
        homestay: 'Homestay',
        residence: 'Residence',
        guesthouse: 'Guesthouse',
        hostel: 'Hostel',
        hotel: 'Hotel',
      },
      room_type: {
        private: 'Private room',
        dorm: 'Dorm',
      },
      place_perk: {
        'coffee-tea': 'Free coffee & tea',
        'restaurant': 'Restaurant',
        'bar': 'Bar',
        'swimming-pool': 'Swimming pool',
        'pool-table': 'Pool table',
      },
      room_perk: {
        'ac': 'Air conditioner',
        'desk': 'Desk & chair',
        'private-bathroom': 'Private bathroom',
        'hot-shower': 'Hot shower',
        'window': 'Window',
        'terrace': 'Terrace',
      },
      bed_type: {
        'single': 'Single',
        'double': 'Double',
        'single-bunk': 'Bunk',
        'double-bunk': 'Bunk double',
      },
      bed_price: {
        1: 'Single bed price',
        2: 'Double bed price',
      },
    },
  },
}
