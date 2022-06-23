Page({
  data: {
    text: "",
    outfit: [{
      "name": "Casual",
      "views": 8743,
      "items": [
          {
              "index": 1,
              "name": "mock neck embroidery suede sweatshirt",
              "price": 24.0,
              "likes": 10,
              "image": "/assets/image/0/1.jpg",
              "categoryid": 4495
          },
          {
              "index": 2,
              "name": "luxe double zip hooded jacket",
              "price": 150.0,
              "likes": 2250,
              "image": "/assets/image/0/2.jpg",
              "categoryid": 25
          }
      ],
      "image": '/assets/image/0/0.jpg',
      "likes": 394,
      "date": "One month",
      "set_url": "http://www.polyvore.com/casual/set?id=214181831",
      "set_id": "214181831",
      "desc": "A fashion look from January 2017 by beebeely-look featuring Fuji, Citizens of Humanity, casual, casualoutfit, Packandgo, winterjacket and gearbest"
  },
  {
    "name": "Casual",
    "views": 2332,
    "items": [
        {
            "index": 1,
            "name": "mock neck embroidery suede sweatshirt",
            "price": 24.0,
            "likes": 10,
            "image": "/assets/image/1/1.jpg",
            "categoryid": 4495
        },
        {
            "index": 2,
            "name": "luxe double zip hooded jacket",
            "price": 150.0,
            "likes": 2250,
            "image": "/assets/image/1/2.jpg",
            "categoryid": 25
        }
    ],
    "image": "/assets/image/1/0.jpg",
    "likes": 200,
    "date": "One month",
    "set_url": "http://www.polyvore.com/casual/set?id=214181831",
    "set_id": "214181831",
    "desc": "fashion look from January 2017 by beebeely-look featuring Fuji, Citizens of Humanity, casual, casualoutfit, Packandgo, winterjacket and gearbest"
}
]
  },
  onInput(e) {
    console.log('onInput', e);
    this.setData({text: e.detail.value})
  },
  onPost(){
    my.request({
      url: 'https://127.0.0.1:5000/review-outfit',
      method: 'POST',
      headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1NTk0NjU2MSwianRpIjoiZGYyY2IyZjEtNzAyMC00NWVlLWI2ZjgtMTNkYjk4ZDJlMzAwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImxvbmcubHQiLCJuYmYiOjE2NTU5NDY1NjEsImV4cCI6MTY4NzQ4MjU2MX0.uIMrMgymKshKfpI8iXPln1ByRA63wUoffnhcYwBPiC8"
      },
      data: {'outfitId': "62b3bd565cdb696246acdd69","review": this.data.text},
      success: (response) => {
        my.navigateTo({ url: 'pages/outfit-social/index' });
        console.log(response)
        // this.setData({items: response.data.items,isLoading: false})
      }
    });
  },
	onLoad(query) {
    console.log(query)
	},
	onReady() {
	},
	onShow() {
	},
	onHide() {
	},
	onUnload() {
	}
});